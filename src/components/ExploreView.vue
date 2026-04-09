<script setup lang="ts">
import { 
  Layers, 
  Rotate3d, 
  Plus, 
  Minus, 
  Mic
} from 'lucide-vue-next';
import { cn } from '../lib/utils';
</script>

<template>
  <div class="h-full relative overflow-hidden bg-background animate-in fade-in duration-700">
    <!-- 3D Terrain Map Base -->
    <div class="absolute inset-0 z-0">
      <img 
        alt="Hainan Terrain" 
        class="w-full h-full object-cover grayscale-[0.2] brightness-[0.4] contrast-[1.2]" 
        src="https://picsum.photos/seed/hainan/1920/1080"
        referrerPolicy="no-referrer"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
    </div>

    <!-- HUD Elements -->
    <div class="absolute top-8 left-8 z-10 flex flex-col gap-4">
      <div class="glass-panel p-5 rounded-lg border-l-4 border-primary shadow-2xl">
        <h1 class="text-3xl font-display text-primary mb-1 tracking-tight font-bold">海南岛·三亚地区</h1>
        <p class="text-[10px] font-bold text-primary/60 tracking-[0.3em] uppercase">REGION SURVEY: ACTIVE</p>
      </div>
      
      <div class="flex gap-2">
        <span class="px-3 py-1.5 bg-primary/20 text-primary rounded-full text-[10px] font-bold flex items-center gap-2 border border-primary/30">
          <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          实时气候监控
        </span>
        <span class="px-3 py-1.5 bg-slate-900/60 text-primary/80 rounded-full text-[10px] font-bold border border-primary/10">
          地形渲染: 3.5X
        </span>
      </div>
    </div>

    <!-- Telemetry Data -->
    <div class="absolute bottom-10 left-8 z-10 space-y-2 pointer-events-none">
      <div class="mono-text text-[10px] text-primary/60 leading-relaxed font-medium">
        LAT: 18.2528° N<br />
        LONG: 109.5121° E<br />
        ALT: 482m MSL<br />
        TEMP: 28.5°C
      </div>
      <div class="h-[2px] w-32 bg-gradient-to-r from-primary/60 to-transparent"></div>
    </div>

    <!-- AI Guide Panel -->
    <div class="absolute bottom-8 right-8 z-20 w-[420px]">
      <div class="relative glass-panel rounded-xl overflow-hidden border border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div class="flex p-5 gap-5">
          <div class="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-primary/30 bg-slate-900">
            <img 
              alt="AI Guide" 
              class="w-full h-full object-cover" 
              src="https://picsum.photos/seed/ai-guide/200/200"
              referrerPolicy="no-referrer"
            />
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">NOVA - AI GUIDE</span>
              <div class="flex gap-0.5">
                <div class="w-1 h-1 bg-primary"></div>
                <div class="w-1 h-1 bg-primary/50"></div>
              </div>
            </div>
            <p class="text-sm text-slate-200 leading-relaxed font-medium">
              “探测到该区域正处于典型的<span class="text-primary font-bold">热带季风气候</span>。你想了解其高湿度和丰沛降水是如何影响当地独特生物多样性的吗？”
            </p>
          </div>
        </div>
        <div class="bg-primary/5 p-3 flex justify-between items-center px-5 border-t border-primary/10">
          <div class="flex gap-2">
            <button class="px-4 py-1.5 text-[11px] bg-primary text-on-primary rounded font-bold hover:brightness-110 transition-all uppercase tracking-wider">分析气候</button>
            <button class="px-4 py-1.5 text-[11px] text-primary hover:bg-primary/10 rounded transition-all uppercase tracking-wider">查看地形</button>
          </div>
          <Mic class="w-5 h-5 text-primary cursor-pointer hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>

    <!-- Floating Map Controls -->
    <div class="absolute right-8 top-8 z-10 flex flex-col gap-3">
      <MapControlButton :icon="Layers" />
      <MapControlButton :icon="Rotate3d" />
      <div class="flex flex-col glass-panel rounded-lg border border-primary/20 shadow-lg overflow-hidden">
        <button class="w-12 h-12 flex items-center justify-center text-primary hover:bg-primary/20 transition-all">
          <Plus class="w-5 h-5" />
        </button>
        <div class="h-[1px] bg-primary/10 mx-2"></div>
        <button class="w-12 h-12 flex items-center justify-center text-primary hover:bg-primary/20 transition-all">
          <Minus class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Coordinates Label -->
    <div class="absolute top-[42%] left-[58%] z-10 pointer-events-none">
      <div class="flex items-center">
        <div class="relative flex items-center justify-center">
          <div class="w-4 h-4 rounded-full border-2 border-primary animate-ping absolute"></div>
          <div class="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
        </div>
        <div class="ml-4 glass-panel px-4 py-1.5 rounded border border-primary/30">
          <span class="mono-text text-[11px] text-primary font-bold whitespace-nowrap tracking-wide">五指山主峰 · 1867M</span>
        </div>
      </div>
    </div>

    <!-- Bottom Chips/Filters -->
    <div class="absolute bottom-8 left-8 z-30 flex gap-3">
      <FilterChip label="地质断层" />
      <FilterChip label="气候分带" active />
      <FilterChip label="洋流模拟" />
    </div>
  </div>
</template>

<script lang="ts">
const MapControlButton = {
  props: ['icon'],
  template: `
    <button class="w-12 h-12 glass-panel rounded-lg flex items-center justify-center text-primary border border-primary/20 hover:bg-primary hover:text-on-primary transition-all shadow-lg">
      <component :is="icon" class="w-5 h-5" />
    </button>
  `
};

const FilterChip = {
  props: ['label', 'active'],
  template: `
    <button :class="['px-5 py-2 rounded-full text-xs font-bold transition-all tracking-wider uppercase', active ? 'bg-primary text-on-primary shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'glass-panel text-slate-300 hover:text-primary hover:border-primary/50']">
      {{ label }}
    </button>
  `
};
</script>
