<script setup lang="ts">
// 地貌学模块：黄土高原演化
</script>

<template>
  <div class="h-full relative bg-surface overflow-hidden animate-in fade-in duration-700">
    <!-- 3D Visualization Placeholder / Background -->
    <div class="absolute inset-0 z-0">
      <img 
        class="w-full h-full object-cover opacity-50" 
        alt="Cinematic 3D geological visualization of the Loess Plateau" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3Ycjt_EZoDPl9C5Il7PWQ36OfDbhNvZEmM7EaUV5bC6Y44Nke7qukZVELJ2MnJrs-7HD3kMiqQrA2_X_ngI4JUgdpHe__GdyUqWxGwHnnFMqsADhR_dUUrL7tSkB_f_sDH3GPQ_hQnEn4X1iRVpwRUmb-3_Gtg8vkcNb4kuukQrpeVpc6WuzrGbXGon-X4PvEDpw_-ZfQKGxEedN_hyoyyMMD_qR8Zd0gIVdfetO51hn42ubPfGSuaztLN-bysO_DcySgnV7amo3k"
        referrerPolicy="no-referrer"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent opacity-70"></div>
      <!-- Overlay Grid -->
      <div class="absolute inset-0" style="background-image: linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px); background-size: 60px 60px;"></div>
    </div>

    <!-- Content Overlay -->
    <div class="relative z-10 h-full flex flex-row pt-32 px-12 gap-10">
      <!-- Left Side: Main Title & Interactive Visualization Controls -->
      <div class="flex-1 flex flex-col">
        <div class="mb-12">
          <h1 class="text-7xl font-display font-bold text-primary mb-4 tracking-tighter">
            黄土高原 <span class="text-2xl font-light text-cyan-400/40 ml-4 font-mono tracking-widest uppercase">LOESS PLATEAU</span>
          </h1>
          <p class="text-on-surface-variant max-w-xl font-sans text-lg leading-relaxed opacity-90">
            黄土高原是地球上分布最集中的黄土沉积区，其地貌演化是数百万年地质作用与气候变迁的史诗交响。通过AI智能模拟，揭示其从始新世至今的地表形态重构。
          </p>
        </div>

        <!-- HUD Overlays -->
        <div class="mt-auto mb-12 flex gap-6 items-end">
          <!-- Evolution Slider HUD -->
          <div class="glass-panel rounded-xl p-8 w-[420px] shadow-[0px_20px_50px_rgba(0,0,0,0.5)]">
            <div class="flex justify-between items-center mb-6">
              <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Evolution Timeline</span>
              <span class="text-xs font-mono text-slate-400">Present Day</span>
            </div>
            <div class="relative h-1.5 bg-slate-800 rounded-full mb-4">
              <div class="absolute top-0 left-0 h-full w-4/5 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]"></div>
              <div class="absolute top-1/2 left-[80%] -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-cyan-400 cursor-pointer hover:scale-110 transition-transform"></div>
            </div>
            <div class="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>2.6 MA</span>
              <span>1.2 MA</span>
              <span>600 KA</span>
              <span class="text-cyan-400">NOW</span>
            </div>
          </div>
          <!-- Telemetry HUD -->
          <div class="glass-panel rounded-xl px-6 py-4 text-[11px] font-mono flex flex-col gap-2">
            <div class="flex justify-between gap-12">
              <span class="text-slate-500">LAT:</span>
              <span class="text-cyan-400">35.6895° N</span>
            </div>
            <div class="flex justify-between gap-12">
              <span class="text-slate-500">LON:</span>
              <span class="text-cyan-400">109.1890° E</span>
            </div>
            <div class="flex justify-between gap-12">
              <span class="text-slate-500">ALT:</span>
              <span class="text-cyan-400">1,245 M</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side: AI Intelligent Analysis Panel -->
      <div class="w-[440px] flex flex-col gap-5 pb-12">
        <div class="glass-panel rounded-xl flex-1 overflow-hidden flex flex-col border border-cyan-400/20">
          <!-- Header -->
          <div class="p-6 border-b border-cyan-400/10 bg-cyan-400/5">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-cyan-400" style="font-variation-settings: 'FILL' 1;">psychology</span>
              <h2 class="text-xl font-display font-bold text-white tracking-wide">AI 智能地质分析</h2>
            </div>
            <p class="text-[10px] text-cyan-400/60 font-mono mt-2 uppercase tracking-widest font-medium">Active Processing: Geological Factors</p>
          </div>
          <!-- Analysis Content -->
          <div class="p-6 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
            <!-- Factor 1: Tectonic Uplift -->
            <div class="group cursor-pointer">
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-sm font-bold text-primary group-hover:text-cyan-400 transition-colors">板块构造与地壳抬升</h3>
                <span class="bg-cyan-400/20 text-cyan-400 text-[9px] px-2.5 py-1 rounded-sm font-bold uppercase tracking-wider">Critical</span>
              </div>
              <p class="text-xs text-on-surface-variant leading-relaxed mb-4 opacity-80">青藏高原的剧烈抬升改变了大气环流，形成了亚洲季风系统，为黄土堆积创造了动力基础。</p>
              <div class="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full w-[92%] bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.4)]"></div>
              </div>
              <div class="flex justify-between mt-2 text-[9px] font-mono text-slate-500 uppercase font-bold tracking-tighter">
                <span>Impact Factor</span>
                <span class="text-cyan-400">92.4%</span>
              </div>
            </div>
            <!-- Factor 2: Wind Erosion -->
            <div class="group cursor-pointer">
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-sm font-bold text-primary group-hover:text-cyan-400 transition-colors">风力搬运与粉尘沉积</h3>
                <span class="bg-cyan-400/10 text-cyan-400/80 text-[9px] px-2.5 py-1 rounded-sm font-bold uppercase tracking-wider">Primary</span>
              </div>
              <p class="text-xs text-on-surface-variant leading-relaxed mb-4 opacity-80">强劲的冬季风将西北荒漠的细小颗粒带至此处，历经百万年堆积形成厚达百米的黄土层。</p>
              <img 
                class="w-full h-28 object-cover rounded-lg border border-cyan-400/10 mb-2 opacity-70 group-hover:opacity-100 transition-all duration-500" 
                alt="Wind patterns diagram" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdNOy4I_UcgQTHwjQ_w09ksOWaWmQW4z4x3fm0YX7qEoeixRGTCkj801qOwG7crB0glHf-do5qTlhFnsZXwaJfW9cP1p0c4wbiRRChpg3guTULqPJTsx_nQzqnIgwrCFaLHYFORfoBEoHThfe7MYE6Olua5OvYNOUU7yRzrcY0HI1Xa3GjyH4tpIxDUgUGx1e9JjxQ0Mgwe5mpHrqOf9f3g5ypg17OyKI8sdELHVZfhXRl0_r5E2zOXC7SKv1zhLGf-11gtQg_-4sZ"
                referrerPolicy="no-referrer"
              />
            </div>
            <!-- Factor 3: Water Erosion -->
            <div class="group cursor-pointer">
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-sm font-bold text-primary group-hover:text-cyan-400 transition-colors">流水侵蚀与壑貌塑造</h3>
                <span class="border border-cyan-400/30 text-cyan-400 text-[9px] px-2.5 py-1 rounded-sm font-bold uppercase tracking-wider">Current</span>
              </div>
              <p class="text-xs text-on-surface-variant leading-relaxed opacity-80">暴雨冲刷导致严重的水土流失，切割黄土台地，形成了沟壑纵横、梁、峁交错的独特景观。</p>
            </div>
          </div>
          <!-- Footer Action -->
          <div class="p-6 mt-auto border-t border-cyan-400/10 bg-slate-950/20">
            <button class="w-full py-3.5 bg-cyan-400 text-slate-950 font-display font-bold text-sm rounded shadow-[0px_10px_30px_rgba(34,211,238,0.3)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
              <span class="material-symbols-outlined text-lg">play_circle</span>
              运行演化模型模拟
            </button>
          </div>
        </div>
        <!-- Quick Legend -->
        <div class="glass-panel rounded-xl p-5 border border-cyan-400/10">
          <h4 class="text-[10px] font-mono text-cyan-400/60 uppercase mb-4 tracking-[0.2em] font-bold">Map Legend</h4>
          <div class="grid grid-cols-2 gap-y-3 gap-x-4">
            <div class="flex items-center gap-3">
              <div class="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"></div>
              <span class="text-[11px] text-slate-300 font-medium">沉积核心带</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(215,255,197,0.6)]"></div>
              <span class="text-[11px] text-slate-300 font-medium">地壳活动区</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim shadow-[0_0_8px_rgba(255,182,146,0.6)]"></div>
              <span class="text-[11px] text-slate-300 font-medium">侵蚀风险点</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
              <span class="text-[11px] text-slate-300 font-medium">历史基岩层</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-panel {
  background: rgba(14, 19, 30, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(34, 211, 238, 0.1);
}
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #22d3ee;
  border-radius: 10px;
}
</style>
