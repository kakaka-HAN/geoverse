export interface AIServiceConfig {
  apiKey?: string;
  baseURL: string;
  model: string;
}

const defaultConfig: AIServiceConfig = {
  apiKey: (process.env as any).AI_API_KEY || '',
  baseURL: (process.env as any).AI_BASE_URL || 'http://localhost:11434/v1',
  model: (process.env as any).AI_MODEL_NAME || 'deepseek-r1:latest',
};

/**
 * 通用聊天接口（保留给你后续用）
 */
export async function chatCompletion(
  messages: Array<{ role: 'user' | 'system' | 'assistant'; content: string }>
) {
  const { apiKey, baseURL, model } = defaultConfig;

  try {
    const response = await fetch(`${baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
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
      throw new Error(
        `AI API Error [${response.status}]: ${
          errorData.error?.message || response.statusText
        }`
      );
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error: any) {
    console.error('AI Service Error:', error);
    throw error;
  }
}
