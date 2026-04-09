/**
 * 通用 AI 服务封装 (支持 OpenAI 兼容接口)
 * 
 * -------------------------------------------------------------------
 * 【如何更换模型】
 * -------------------------------------------------------------------
 * 您可以通过以下两种方式轻松更换模型：
 * 
 * 1. 修改 .env.local 文件 (推荐):
 *    AI_MODEL_NAME="deepseek-r1:latest"  <-- 修改这里
 *    AI_BASE_URL="http://localhost:11434/v1"
 * 
 * 2. 直接修改下方的 defaultConfig 对象中的默认值。
 * -------------------------------------------------------------------
 */

export interface AIServiceConfig {
  apiKey?: string;
  baseURL: string;
  model: string;
}

// 这里的环境变量对应于 .env 文件中的配置，通过 vite.config.ts 注入到前端
const defaultConfig: AIServiceConfig = {
  // 如有需要请在 .env 中设置 AI_API_KEY
  apiKey: (process.env as any).AI_API_KEY || '',
  
  // Ollama 的默认 OpenAI 兼容地址为 http://localhost:11434/v1
  baseURL: (process.env as any).AI_BASE_URL || 'http://localhost:11434/v1',
  
  // 当前使用的模型名称，默认为您指定的 deepseek-r1:latest
  model: (process.env as any).AI_MODEL_NAME || 'deepseek-r1:latest', 
};

/**
 * 基础聊天接口
 */
export async function chatCompletion(messages: Array<{ role: 'user' | 'system' | 'assistant'; content: string }>) {
  const { apiKey, baseURL, model } = defaultConfig;

  console.log(`[AI Request] Model: ${model}, BaseURL: ${baseURL}`);
  console.log('[AI Messages]', messages);

  try {
    const response = await fetch(`${baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[AI Response Error]', response.status, errorData);
      throw new Error(`AI API Error [${response.status}]: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    console.log('[AI Raw Response]', content);
    return content;
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.error('AI Service Network/CORS Error:', error);
      throw new Error('无法连接到本地模型服务。请检查：1. 模型已启动 2. 已设置 OLLAMA_ORIGINS="*" 环境变量以解决跨域问题。');
    }
    console.error('AI Service Error:', error);
    throw error;
  }
}

/**
 * 清洗 AI 返回的内容，更加鲁棒地提取 JSON 对象
 */
function cleanAIResponse(response: string): string {
  let cleaned = response;
  
  // 1. 彻底移除 <think> 标签及其内容
  cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/g, '');
  
  // 2. 尝试匹配第一个 { 和最后一个 } 之间的内容 (提取纯 JSON)
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    cleaned = jsonMatch[0];
  } else {
    // 如果没匹配到，尝试移除 Markdown 标记
    cleaned = cleaned.replace(/```json|```/g, '');
  }
  
  const result = cleaned.trim();
  console.log('[AI Cleaned Result]', result);
  return result;
}

/**
 * 结构化反向地理编码 (通过大模型进行地理分析)
 */
export async function reverseGeocodeAI(lat: number, lng: number) {
  const prompt = `你是一个地理专家。请根据给定的经纬度坐标 (${lat.toFixed(4)}, ${lng.toFixed(4)})，告诉我它所属的全球大概位置。
  
【重要：输出规范】
你必须返回且仅返回一个 JSON 对象，严禁包含任何 Markdown 标签、解释、前言或后缀。
JSON 字段必须严格如下（注意全小写）：
- "location": (字符串) 格式为 "省份/州 · 城市/地区" (如果是公海或无人区，请写出大洋名或区域名)
- "fact": (字符串) 关于该地点的一句话趣闻或地理背景 (20字以内)

示例：{"location": "日本 · 东京", "fact": "这里是全球人口最稠密的都市圈之一。"}`;

  try {
    const response = await chatCompletion([
      { role: 'system', content: '你是一个精准的地理分析接口，只输出纯 JSON 数据，禁止任何自然语言描述。' },
      { role: 'user', content: prompt },
    ]);

    const cleanedJson = cleanAIResponse(response);
    const parsed = JSON.parse(cleanedJson);
    
    // 兼容处理：确保键名统一小写
    const result = {
      location: parsed.location || parsed.Location || '未知区域',
      fact: parsed.fact || parsed.Fact || '扫描完成。'
    };
    
    return result;
  } catch (e) {
    console.error('Failed to parse AI response as JSON:', e);
    return { location: '未知区域/海域', fact: '正在重新扫描定位...' };
  }
}

// 暴露给控制台进行测试
(window as any).testAI = async () => {
  console.log('--- Starting AI Test ---');
  try {
    const res = await reverseGeocodeAI(31.2304, 121.4737); // 测试上海坐标
    console.log('Test Success:', res);
  } catch (e) {
    console.error('Test Failed:', e);
  }
};
