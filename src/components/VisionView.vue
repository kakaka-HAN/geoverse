<script setup lang="ts">
import { 
  Satellite, 
  History, 
  BarChart3, 
  Brain, 
  Droplets, 
  AlertTriangle, 
  Mountain,
  Layers,
  LineChart,
  Grid3X3,
  Cloud,
  Upload
} from 'lucide-vue-next';
</script>

<template>
  <div class="h-full relative flex flex-col overflow-hidden animate-in fade-in duration-700">
    <!-- 3D Map Viewport -->
    <div class="absolute inset-0 z-0 bg-surface">
      <img 
        class="w-full h-full object-cover opacity-60 mix-blend-luminosity" 
        src="https://picsum.photos/seed/terrain-map/1920/1080" 
        alt="Terrain Map"
        referrerPolicy="no-referrer"
      />
      <!-- Scanning HUD Overlay -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="w-[60%] h-[60%] border border-primary/20 relative">
          <div class="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary"></div>
          <div class="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-primary"></div>
          <div class="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-primary"></div>
          <div class="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary"></div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center">
            <div class="w-1 h-8 bg-primary/40 absolute"></div>
            <div class="w-8 h-1 bg-primary/40 absolute"></div>
            <div class="w-4 h-4 border border-primary rounded-full animate-ping"></div>
          </div>
          <div class="absolute left-0 w-full h-[100px] bg-gradient-to-b from-transparent via-primary-container/30 to-transparent pointer-events-none animate-scan"></div>
        </div>
      </div>
    </div>

    <!-- Layout Controls -->
    <div class="relative z-10 flex h-full p-6 gap-6">
      <!-- Left Side -->
      <div class="w-80 flex flex-col gap-6">
        <!-- Upload & Sensors -->
        <section class="glass-panel rounded-lg p-5 shadow-2xl border-l-4 border-primary">
          <h3 class="text-xs font-bold text-primary tracking-widest mb-4 flex items-center gap-2">
            <Satellite class="w-4 h-4" />
            数据采集
          </h3>
          <button class="w-full py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium transition-all mb-6 flex items-center justify-center gap-2 border border-primary/20">
            <Upload class="w-4 h-4" />
            上传卫星数据集
          </button>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-[10px] mb-2 font-mono uppercase text-slate-400">
                <span>传感器灵敏度</span>
                <span class="text-primary">85%</span>
              </div>
              <input class="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary" type="range" defaultValue="85" />
            </div>
            <div>
              <div class="flex justify-between text-[10px] mb-2 font-mono uppercase text-slate-400">
                <span>深度解析精度</span>
                <span class="text-primary">0.5m</span>
              </div>
              <input class="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary" type="range" defaultValue="50" />
            </div>
          </div>
        </section>

        <!-- Scanning Records -->
        <section class="glass-panel rounded-lg p-5 flex-1 shadow-2xl overflow-hidden flex flex-col">
          <h3 class="text-xs font-bold text-slate-400 tracking-widest mb-4 flex items-center gap-2">
            <History class="w-4 h-4" />
            近期扫描记录
          </h3>
          <div class="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
            <RecordItem title="桂林阳朔岩溶区" time="0.2s ago" coords="24.77°N, 110.48°E" active />
            <RecordItem title="武隆天坑群" time="2h ago" coords="29.25°N, 107.72°E" />
            <RecordItem title="织金洞地下河系统" time="5h ago" coords="26.75°N, 105.89°E" />
          </div>
        </section>
      </div>

      <div class="flex-1"></div>

      <!-- Right Side -->
      <div class="w-96 flex flex-col gap-6">
        <!-- Terrain Attributes -->
        <section class="glass-panel rounded-lg p-5 shadow-2xl border-r-4 border-primary">
          <h3 class="text-xs font-bold text-primary tracking-widest mb-4 flex items-center gap-2">
            <BarChart3 class="w-4 h-4" />
            地形属性分析
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-slate-900/60 p-3 rounded border border-primary/10">
              <p class="text-[10px] text-slate-500 uppercase font-mono mb-1">平均坡度</p>
              <p class="text-xl font-bold text-slate-200">42.5°</p>
            </div>
            <div class="bg-slate-900/60 p-3 rounded border border-primary/10">
              <p class="text-[10px] text-slate-500 uppercase font-mono mb-1">岩石成分</p>
              <p class="text-xl font-bold text-slate-200">石灰岩</p>
            </div>
            <div class="col-span-2 bg-slate-900/60 p-3 rounded border border-primary/10">
              <p class="text-[10px] text-slate-500 uppercase font-mono mb-1">地质纪元</p>
              <p class="text-sm font-medium text-slate-300">二叠纪 (约2.7亿年前)</p>
              <p class="text-[10px] text-slate-500 mt-1">浅海沉积形成的碳酸盐岩地层</p>
            </div>
          </div>
        </section>

        <!-- AI Insights -->
        <section class="glass-panel rounded-lg p-5 shadow-2xl flex-1 border-r-4 border-secondary-container">
          <h3 class="text-xs font-bold text-secondary-container tracking-widest mb-4 flex items-center gap-2">
            <Brain class="w-4 h-4" />
            AI 深度洞察
          </h3>
          <div class="space-y-4">
            <InsightItem 
              :icon="Droplets"
              title="地下河检测"
              desc="检测到地下 140m 处存在活跃水系，推测连接至北侧暗河系统。"
              color="secondary"
            />
            <InsightItem 
              :icon="AlertTriangle"
              title="滑坡风险评估"
              desc="西北侧峭壁存在结构性缝隙。稳定性系数降至 0.65。"
              color="error"
            />
            <InsightItem 
              :icon="Mountain"
              title="地貌演变模拟"
              desc="预计该天坑区域将在未来 50,000 年内扩大约 15%。"
              color="primary"
            />
          </div>
        </section>
      </div>
    </div>

    <!-- Bottom HUD Controls -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-4">
      <div class="glass-panel rounded-full px-6 py-2 flex items-center gap-6 shadow-2xl border border-primary/20">
        <ControlItem :icon="Layers" label="等高线" active />
        <div class="w-[1px] h-4 bg-slate-800"></div>
        <ControlItem :icon="LineChart" label="山脊线" />
        <div class="w-[1px] h-4 bg-slate-800"></div>
        <ControlItem :icon="Grid3X3" label="坐标网格" />
        <div class="w-[1px] h-4 bg-slate-800"></div>
        <ControlItem :icon="Cloud" label="植被遮罩" />
      </div>
    </div>

    <!-- Telemetry HUD -->
    <div class="absolute bottom-6 right-6 z-20 glass-panel rounded-lg p-4 opacity-90 border border-primary/20">
      <div class="font-mono text-[10px] space-y-1.5">
        <div class="flex justify-between gap-6">
          <span class="text-slate-500">LAT:</span>
          <span class="text-primary">24° 46' 31.2" N</span>
        </div>
        <div class="flex justify-between gap-6">
          <span class="text-slate-500">LNG:</span>
          <span class="text-primary">110° 28' 54.1" E</span>
        </div>
        <div class="flex justify-between gap-6">
          <span class="text-slate-500">ALT:</span>
          <span class="text-primary">382.4 m</span>
        </div>
        <div class="flex justify-between gap-6">
          <span class="text-slate-500">SPD:</span>
          <span class="text-primary">0.0 km/h</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const RecordItem = {
  props: ['title', 'time', 'coords', 'active'],
  template: `
    <div :class="['p-3 rounded border transition-colors cursor-pointer group', active ? 'bg-primary/5 border-primary/20' : 'bg-slate-900/40 border-slate-800 hover:border-primary/20']">
      <div class="flex justify-between items-start mb-1">
        <span :class="['text-xs font-bold', active ? 'text-slate-200' : 'text-slate-400']">{{ title }}</span>
        <span :class="['text-[10px] font-mono', active ? 'text-primary' : 'text-slate-600']">{{ time }}</span>
      </div>
      <p :class="['text-[10px]', active ? 'text-slate-500' : 'text-slate-600']">坐标: {{ coords }}</p>
    </div>
  `
};

const InsightItem = {
  props: ['icon', 'title', 'desc', 'color'],
  template: `
    <div :class="['flex gap-4 p-3 rounded-lg border', color === 'secondary' ? 'bg-secondary-container/5 border-secondary-container/10 text-secondary-container' : color === 'error' ? 'bg-error-container/5 border-error-container/10 text-error' : 'bg-primary/5 border-primary/20 text-primary']">
      <div class="mt-1"><component :is="icon" class="w-4 h-4" /></div>
      <div>
        <h4 class="text-xs font-bold mb-1">{{ title }}</h4>
        <p class="text-[11px] text-slate-400 leading-relaxed">{{ desc }}</p>
      </div>
    </div>
  `
};

const ControlItem = {
  props: ['icon', 'label', 'active'],
  template: `
    <div class="flex items-center gap-2 cursor-pointer group">
      <button :class="['w-8 h-8 rounded-full flex items-center justify-center transition-all', active ? 'bg-primary text-on-primary' : 'bg-slate-900 border border-slate-700 text-slate-500 group-hover:text-primary']">
        <component :is="icon" class="w-4 h-4" />
      </button>
      <span :class="['text-xs font-medium', active ? 'text-slate-200' : 'text-slate-500 group-hover:text-slate-300']">{{ label }}</span>
    </div>
  `
};
</script>

<style scoped>
@keyframes scan {
  0% { top: 0%; }
  50% { top: 100%; }
  100% { top: 0%; }
}
.animate-scan {
  animation: scan 4s linear infinite;
}
</style>
