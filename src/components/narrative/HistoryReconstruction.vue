<script setup lang="ts">
// History Reconstruction Module
</script>

<template>
  <div class="h-full relative overflow-hidden bg-background animate-in fade-in duration-700">
    <!-- Main Canvas: 3D Map -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0e131e_100%)] z-10 pointer-events-none"></div>
      <img alt="Silk Road Map" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuWpnasr5nCFvdZTpjbRjSSHXAnlVzp-8rMaJW_xSXIPs74yGh1K9cSTiTpAxsi77HfskWZoRlRtDQ7geQW1LCrnDRCc6fzFNMRIg7MhCTQLxXjuG_ezABm3y87E30YIAkcctVsaLZpxGa6CZfz3UX8WHNQIjCm8RVIsbEZxrm5O_O0d9_TVeB4cKSUrnRk-Zz_STNjWt0ZdZB7t3VxYLM8rrPqLlGLsP_u_KIvo3_eZHtK0V7XaOAvCkTYQOh25B_hGxzpuLeAeuU" referrerPolicy="no-referrer" />
      <div class="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        <svg class="w-full h-full opacity-60" viewBox="0 0 1000 600">
          <path class="filter drop-shadow-[0_0_10px_rgba(34,211,238,1)]" d="M100,450 Q250,420 400,430 T700,380 T950,300" fill="none" stroke="#22d3ee" stroke-dasharray="8 4" stroke-linecap="round" stroke-width="4"></path>
          <circle class="filter drop-shadow-[0_0_15px_rgba(34,211,238,1)]" cx="700" cy="380" fill="#22d3ee" r="8"></circle>
        </svg>
      </div>
    </div>

    <!-- Floating Info Panel: Dunhuang -->
    <section class="absolute right-8 top-24 w-80 z-20 glass-panel border border-cyan-400/20 rounded-xl overflow-hidden shadow-2xl">
      <div class="relative h-40">
        <img alt="Dunhuang" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtAsC0sv70Grem4yHbvA_9OxneEmm5BUyUAL7FB9hr-4J7CjWQs4oDtHEpxqXXBVpncjIQJ6ASf-Pnz52_g411zExb1HEH0OUxuzFcZ8_TuVbAr54S4nJVTGBXkV0JNU7HFYvoU5jmZA0qUEMFid3vszQTzAE0FbbqK-yy6C8RVYqIX3-afsWFU506wxJgSjwDQVh9ABITDI99TDEn5G_R1xoy6_k23TgNyl5VbDeCF3-klz3RNa-jnLi5GBc0n2o681-naGvSFRI6" referrerPolicy="no-referrer" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        <div class="absolute bottom-4 left-4">
          <h2 class="text-2xl font-bold text-cyan-400">敦煌 (DUNHUANG)</h2>
          <p class="text-[10px] text-cyan-200 uppercase tracking-widest">Node ID: SR-402-NW</p>
        </div>
      </div>
      <div class="p-6 space-y-4">
        <div class="flex items-center gap-3">
          <div class="flex-1 h-px bg-cyan-400/30"></div>
          <span class="text-[10px] text-cyan-400 font-bold tracking-widest">TACTICAL INTEL</span>
          <div class="flex-1 h-px bg-cyan-400/30"></div>
        </div>
        <p class="text-sm text-slate-300 leading-relaxed">
          丝绸之路的咽喉门户。公元4世纪至14世纪，这里不仅是东西方贸易的集散地，更是文化、艺术与宗教思想交汇的熔炉。莫高窟的壁画记录了横跨千年的地缘文明演变。
        </p>
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-slate-800/50 p-3 rounded-lg border border-white/5">
            <p class="text-[9px] text-slate-500 uppercase tracking-widest">海拔高度</p>
            <p class="text-cyan-400 font-bold">1,139m</p>
          </div>
          <div class="bg-slate-800/50 p-3 rounded-lg border border-white/5">
            <p class="text-[9px] text-slate-500 uppercase tracking-widest">地理坐标</p>
            <p class="text-cyan-400 font-bold">40.1°N 94.6°E</p>
          </div>
        </div>
        <button class="w-full bg-cyan-400 text-slate-950 font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
          <span class="material-symbols-outlined text-lg">map</span>
          <span>启动深度分析</span>
        </button>
      </div>
    </section>

    <!-- Telemetry HUD -->
    <div class="absolute bottom-6 right-6 z-20 glass-panel px-4 py-2 rounded-lg border border-cyan-400/20 text-[10px] text-cyan-400/80">
      <div class="flex items-center gap-4 font-medium">
        <div class="flex flex-col">
          <span class="text-slate-500 scale-75 origin-left">LATITUDE</span>
          <span>40.1421° N</span>
        </div>
        <div class="w-px h-6 bg-cyan-400/20"></div>
        <div class="flex flex-col">
          <span class="text-slate-500 scale-75 origin-left">LONGITUDE</span>
          <span>94.6618° E</span>
        </div>
        <div class="w-px h-6 bg-cyan-400/20"></div>
        <div class="flex flex-col">
          <span class="text-slate-500 scale-75 origin-left">ALTITUDE</span>
          <span>32,450 FT</span>
        </div>
      </div>
    </div>

    <!-- Interactive Timeline -->
    <footer class="absolute bottom-0 left-0 right-0 z-20 px-12 py-8 bg-gradient-to-t from-slate-950 to-transparent">
      <div class="glass-panel p-6 rounded-2xl border border-cyan-400/10 shadow-2xl max-w-5xl mx-auto">
        <div class="flex justify-between items-end mb-6">
          <div>
            <h3 class="text-lg font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              时空轨迹控制台
            </h3>
            <p class="text-[10px] text-slate-500 uppercase tracking-widest">Current Focus: 120 BCE - 1400 CE</p>
          </div>
          <div class="flex gap-2">
            <button class="w-10 h-10 rounded-full border border-cyan-400/20 flex items-center justify-center text-cyan-400 hover:bg-cyan-400/10 transition-colors">
              <span class="material-symbols-outlined">skip_previous</span>
            </button>
            <button class="w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:scale-105 transition-transform">
              <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
            </button>
            <button class="w-10 h-10 rounded-full border border-cyan-400/20 flex items-center justify-center text-cyan-400 hover:bg-cyan-400/10 transition-colors">
              <span class="material-symbols-outlined">skip_next</span>
            </button>
          </div>
        </div>
        <div class="relative h-12 flex items-center px-4">
          <div class="absolute inset-x-4 h-1 bg-slate-800 rounded-full"></div>
          <div class="absolute left-4 w-2/3 h-1 bg-gradient-to-r from-cyan-400/20 to-cyan-400 rounded-full"></div>
          <div class="absolute left-4 -top-6 text-[10px] text-slate-500">西汉 (张骞出使)</div>
          <div class="absolute left-1/3 -top-6 text-[10px] text-slate-500">魏晋南北朝</div>
          <div class="absolute left-2/3 -top-6 text-[10px] text-cyan-400 font-bold">隋唐盛世 (敦煌高峰)</div>
          <div class="absolute right-4 -top-6 text-[10px] text-slate-500">元明清</div>
          <div class="absolute left-4 w-3 h-3 bg-slate-700 border-2 border-slate-900 rounded-full -translate-x-1/2"></div>
          <div class="absolute left-1/3 w-3 h-3 bg-slate-700 border-2 border-slate-900 rounded-full -translate-x-1/2"></div>
          <div class="absolute left-2/3 w-5 h-5 bg-cyan-400 border-4 border-slate-950 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.6)] z-10 -translate-x-1/2"></div>
          <div class="absolute right-4 w-3 h-3 bg-slate-700 border-2 border-slate-900 rounded-full translate-x-1/2"></div>
        </div>
      </div>
    </footer>
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
</style>
