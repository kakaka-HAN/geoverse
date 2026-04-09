<script setup lang="ts">
import { 
  Layers, 
  BarChart3, 
  Thermometer, 
  Rocket, 
  Plus 
} from 'lucide-vue-next';
import { cn } from '../../lib/utils';

const LayerToggle = {
  props: ['label', 'active'],
  template: `
    <div :class="['flex items-center justify-between p-2 rounded transition-colors border', active ? 'bg-primary/10 border-primary/20' : 'bg-surface-container-low/50 border-transparent hover:bg-surface-container-high/50']">
      <span :class="['text-sm', !active && 'text-slate-300']">{{ label }}</span>
      <div :class="['w-8 h-4 rounded-full relative', active ? 'bg-primary/40' : 'bg-slate-700']">
        <div v-if="active" class="absolute right-1 top-1 w-2 h-2 bg-primary rounded-full"></div>
      </div>
    </div>
  `
};

const WeightBar = {
  props: ['label', 'weight'],
  template: `
    <div class="group">
      <div class="flex justify-between text-xs mb-2">
        <span class="text-on-surface">{{ label }}</span>
        <span class="font-mono text-primary">{{ weight }}%</span>
      </div>
      <div class="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
        <div 
          class="h-full bg-primary group-hover:shadow-[0_0_8px_#c3f5ff] transition-all"
          :style="{ width: weight + '%' }"
        ></div>
      </div>
    </div>
  `
};

const TelemetryRow = {
  props: ['label', 'value'],
  template: `
    <div class="flex justify-between gap-6">
      <span class="text-[10px] font-mono text-slate-400 uppercase">{{ label }}</span>
      <span class="text-[10px] font-mono text-primary">{{ value }}</span>
    </div>
  `
};
</script>

<template>
  <div class="h-full relative overflow-hidden bg-background animate-in fade-in duration-700">
    <!-- Background Thematic Map -->
    <div class="absolute inset-0 z-0">
      <img 
        alt="topographic satellite map" 
        class="w-full h-full object-cover opacity-40 mix-blend-luminosity" 
        src="https://picsum.photos/seed/northeast-china/1920/1080"
        referrerPolicy="no-referrer"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background"></div>
    </div>

    <!-- Dashboard Layout -->
    <div class="relative z-10 h-full pt-10 px-10 grid grid-cols-12 gap-6">
      <!-- Left Panel -->
      <div class="col-span-3 space-y-6">
        <div class="bg-slate-900/40 glass-panel p-6 rounded-lg border-l-4 border-primary">
          <div class="text-primary font-mono text-xs mb-2 tracking-[0.2em]">MISSION: ORIGIN_ANALYSIS</div>
          <h1 class="text-2xl font-display font-bold text-primary mb-2">为什么东北大米更好吃？</h1>
          <p class="text-on-surface-variant text-sm leading-relaxed">基于地质构造、气候耦合及土壤化学多维数据的溯源分析。</p>
        </div>

        <div class="bg-slate-900/30 glass-panel p-5 rounded-lg">
          <div class="flex items-center justify-between mb-4">
            <span class="font-display text-xs font-bold tracking-widest text-slate-400 uppercase">数据图层</span>
            <Layers class="w-4 h-4 text-primary" />
          </div>
          <div class="space-y-3">
            <LayerToggle label="黑土有机质分布" active />
            <LayerToggle label="积温等值线" />
            <LayerToggle label="嫩江/松花江水系" />
          </div>
        </div>

        <div class="bg-slate-900/60 glass-panel p-4 rounded-lg">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span class="font-mono text-[10px] tracking-tighter text-primary">LIVE_SOIL_TELEMETRY</span>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="text-[10px] text-slate-500 uppercase">有机质含量</div>
              <div class="text-lg font-display font-bold text-primary">12.5%</div>
            </div>
            <div>
              <div class="text-[10px] text-slate-500 uppercase">PH 酸碱值</div>
              <div class="text-lg font-display font-bold text-primary">6.8 <span class="text-xs font-normal">弱酸</span></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Center -->
      <div class="col-span-6 relative">
        <div class="absolute bottom-10 left-10 glass-panel bg-slate-950/40 p-4 rounded-lg">
          <div class="text-[10px] font-mono text-primary mb-2">TERRAIN_GRADIENT</div>
          <div class="flex items-center gap-1">
            <div class="h-2 w-12 bg-gradient-to-r from-slate-900 via-primary/40 to-primary rounded-full"></div>
            <span class="text-[8px] text-slate-400">0 - 500m</span>
          </div>
        </div>
        <div class="absolute bottom-10 right-10 glass-panel bg-slate-950/40 p-3 rounded-lg flex flex-col gap-1">
          <TelemetryRow label="LAT" value="45° 45' 0&quot; N" />
          <TelemetryRow label="LON" value="126° 38' 0&quot; E" />
          <TelemetryRow label="ALT" value="142.0 m" />
        </div>
      </div>

      <!-- Right Panel -->
      <div class="col-span-3 space-y-6">
        <div class="bg-slate-900/40 glass-panel p-5 rounded-lg border-t border-primary/20">
          <div class="flex items-center justify-between mb-6">
            <span class="font-display text-xs font-bold tracking-widest text-primary uppercase">成因权重分析</span>
            <BarChart3 class="w-4 h-4 text-primary" />
          </div>
          <div class="space-y-6">
            <WeightBar label="黑土地质 (肥力)" :weight="42" />
            <WeightBar label="温差耦合 (淀粉积累)" :weight="35" />
            <WeightBar label="纯净水系 (嫩江水源)" :weight="15" />
            <WeightBar label="漫长生长期" :weight="8" />
          </div>
        </div>

        <div class="bg-slate-900/30 glass-panel p-5 rounded-lg">
          <h3 class="text-sm font-display font-bold text-slate-300 mb-4 flex items-center gap-2">
            <Thermometer class="w-4 h-4 text-primary" />
            气候关联模型
          </h3>
          <div class="flex items-center gap-4 mb-4">
            <div class="flex-1 bg-slate-950/50 p-2 rounded text-center border border-primary/5">
              <div class="text-[10px] text-slate-500 uppercase tracking-tighter">日夜温差</div>
              <div class="text-sm font-mono text-primary">+15°C</div>
            </div>
            <div class="flex-1 bg-slate-950/50 p-2 rounded text-center border border-primary/5">
              <div class="text-[10px] text-slate-500 uppercase tracking-tighter">无霜期</div>
              <div class="text-sm font-mono text-primary">145d</div>
            </div>
          </div>
          <p class="text-[11px] text-slate-400 leading-relaxed">
            高纬度寒冷气候抑制了病虫害，配合强烈的昼夜温差，极大提升了水稻内部干物质和糖分的积累效率。
          </p>
        </div>

        <button class="w-full py-4 bg-primary text-on-primary font-display font-bold rounded flex items-center justify-center gap-2 hover:bg-primary-container hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all active:scale-95">
          <Rocket class="w-4 h-4" />
          生成全要素分析报告
        </button>
      </div>
    </div>

    <button class="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-[0_0_20px_rgba(0,229,255,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
      <Plus class="w-6 h-6" />
    </button>
  </div>
</template>
