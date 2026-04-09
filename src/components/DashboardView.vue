<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as d3 from 'd3';
import { AlertTriangle, Play, BarChart3 } from 'lucide-vue-next';

const radarContainer = ref<HTMLElement | null>(null);

const radarData = [
  { subject: '制图学', value: 120 },
  { subject: '地形分析', value: 98 },
  { subject: '气候动力', value: 86 },
  { subject: '水文模拟', value: 99 },
  { subject: '社会经济', value: 85 },
  { subject: '地缘政治', value: 65 },
];

onMounted(() => {
  if (!radarContainer.value) return;

  const width = 400;
  const height = 400;
  const margin = 50;
  const radius = Math.min(width, height) / 2 - margin;
  const levels = 5;
  const maxValue = 150;

  const svg = d3.select(radarContainer.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

  // 绘制网格圆圈
  for (let i = 1; i <= levels; i++) {
    const r = (radius / levels) * i;
    svg.append('circle')
      .attr('r', r)
      .attr('fill', 'none')
      .attr('stroke', '#3b494c')
      .attr('stroke-width', 1);
  }

  const angleStep = (Math.PI * 2) / radarData.length;

  // 绘制轴线
  radarData.forEach((d, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    svg.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', x)
      .attr('y2', y)
      .attr('stroke', '#3b494c')
      .attr('stroke-width', 1);

    // 标签
    const labelX = Math.cos(angle) * (radius + 20);
    const labelY = Math.sin(angle) * (radius + 20);
    svg.append('text')
      .attr('x', labelX)
      .attr('y', labelY)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#bac9cc')
      .attr('font-size', '12px')
      .text(d.subject);
  });

  // 绘制雷达区域
  const line = d3.lineRadial<any>()
    .radius(d => (d.value / maxValue) * radius)
    .angle((d, i) => i * angleStep)
    .curve(d3.curveLinearClosed);

  svg.append('path')
    .datum(radarData)
    .attr('d', line)
    .attr('fill', '#22d3ee')
    .attr('fill-opacity', 0.2)
    .attr('stroke', '#22d3ee')
    .attr('stroke-width', 2);
});
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="font-display text-4xl font-bold tracking-tight text-primary">认知分析报告</h1>
        <p class="text-on-surface-variant mt-2">基于 256 次模拟演练生成的实时智力拓扑图</p>
      </div>
      <div class="flex gap-2">
        <span class="px-3 py-1 bg-surface-container-highest text-secondary text-xs font-mono rounded flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          同步状态: 100%
        </span>
        <span class="px-3 py-1 bg-surface-container-highest text-primary text-xs font-mono rounded">
          UUID: GV-8829-01
        </span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Radar Chart Container -->
      <div class="lg:col-span-8 glass-panel rounded-xl p-8 relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(circle,rgba(34,211,238,0.05)_0%,transparent_70%)] pointer-events-none"></div>
        <div class="relative z-10">
          <div class="flex justify-between items-start mb-8">
            <h3 class="font-display text-xl text-primary flex items-center gap-2">
              <BarChart3 class="w-5 h-5 text-secondary" />
              技能主权图谱
            </h3>
            <button class="text-xs text-on-surface-variant hover:text-primary underline font-mono">导出原始数据</button>
          </div>
          
          <div ref="radarContainer" class="h-[400px] w-full flex items-center justify-center"></div>
        </div>
      </div>

      <!-- Anomaly Detection -->
      <div class="lg:col-span-4 flex flex-col gap-6">
        <div class="glass-panel rounded-xl p-6 flex-1">
          <h3 class="font-display text-xl text-tertiary-container flex items-center gap-2 mb-6">
            <AlertTriangle class="w-5 h-5" />
            异常检测
          </h3>
          <div class="space-y-4">
            <div class="bg-surface-container-low p-4 rounded-lg border-l-4 border-error">
              <div class="flex justify-between items-start">
                <span class="text-xs font-mono text-error">CRITICAL</span>
                <span class="text-[10px] text-on-surface-variant font-mono">14:02:11</span>
              </div>
              <p class="text-sm font-medium mt-1">检测到认知偏差</p>
              <p class="text-xs text-on-surface-variant mt-1 leading-relaxed">
                在西南喀斯特地貌的演化推演中，算法识别出 12% 的逻辑断层。
              </p>
            </div>
            <div class="bg-surface-container-low p-4 rounded-lg border-l-4 border-secondary-container">
              <div class="flex justify-between items-start">
                <span class="text-xs font-mono text-secondary-container">NOTICE</span>
                <span class="text-[10px] text-on-surface-variant font-mono">12:45:00</span>
              </div>
              <p class="text-sm font-medium mt-1">数据源漂移</p>
              <p class="text-xs text-on-surface-variant mt-1 leading-relaxed">
                全球变暖模块已更新，您的极地模型需要重新标定。
              </p>
            </div>
          </div>
          <button class="w-full mt-6 py-2 bg-surface-container-high border border-outline-variant/30 rounded text-sm text-on-surface hover:bg-surface-variant transition-all font-medium">
            查看完整日志
          </button>
        </div>

        <div class="bg-primary/5 rounded-xl p-6 border border-primary/20">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-[10px] text-primary/60 uppercase font-mono tracking-widest">综合指数</p>
              <p class="text-3xl font-display font-bold text-primary">89.4</p>
            </div>
            <div>
              <p class="text-[10px] text-primary/60 uppercase font-mono tracking-widest">胜率</p>
              <p class="text-3xl font-display font-bold text-primary">76%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recommended Training Tasks -->
      <div class="lg:col-span-12">
        <h3 class="font-display text-xl text-primary mb-6 flex items-center gap-2">
          <Radar class="w-5 h-5" />
          推荐强化训练
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TrainingCard 
            title="喀斯特地形模拟"
            desc="针对检测到的认知偏差，模拟石灰岩溶蚀过程及地下河网布局，修复逻辑断层。"
            difficulty="高"
            time="45m"
            img="https://picsum.photos/seed/karst/400/200"
            difficultyColor="bg-secondary-container text-on-secondary-container"
          />
          <TrainingCard 
            title="等高线高精解析"
            desc="在高海拔复杂地形中进行视距测算，强化对极端地形坡度的感知精度。"
            difficulty="中"
            time="30m"
            img="https://picsum.photos/seed/mountain/400/200"
            difficultyColor="bg-primary-container text-on-primary-container"
          />
          <TrainingCard 
            title="社会经济流向预测"
            desc="利用多维数据流模拟特大城市群的扩张边界，评估资源错配风险。"
            difficulty="极高"
            time="120m"
            img="https://picsum.photos/seed/city/400/200"
            difficultyColor="bg-tertiary-container text-on-tertiary-container"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// 在此处内联定义子组件或在单独文件中定义。
// 为简洁起见并确保其可用，我将在此处定义它。
const TrainingCard = {
  props: ['title', 'desc', 'difficulty', 'time', 'img', 'difficultyColor'],
  template: `
    <div class="group relative bg-surface-container-low rounded-xl overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all duration-300">
      <div class="h-32 relative">
        <img class="w-full h-full object-cover" :src="img" :alt="title" referrerPolicy="no-referrer" />
        <div class="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
        <div :class="['absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded', difficultyColor]">
          难度: {{ difficulty }}
        </div>
      </div>
      <div class="p-6">
        <h4 class="font-display text-lg text-primary group-hover:text-primary-container transition-colors">{{ title }}</h4>
        <p class="text-xs text-on-surface-variant mt-2 leading-relaxed">{{ desc }}</p>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-[10px] font-mono text-outline">预估时长: {{ time }}</span>
          <button class="bg-primary text-on-primary px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 active:scale-95 transition-transform">
            开始任务
          </button>
        </div>
      </div>
    </div>
  `
};
</script>
