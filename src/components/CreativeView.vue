<script setup lang="ts">
import { 
  Waves, 
  Train, 
  Sun, 
  PlayCircle, 
  Layers, 
  Rotate3d, 
  Plus, 
  Minus 
} from 'lucide-vue-next';
</script>

<template>
  <div class="h-full relative overflow-hidden bg-background animate-in fade-in duration-700">
    <!-- Interactive Globe Background -->
    <div class="absolute inset-0 z-0">
      <div class="w-full h-full bg-[#0b0f1a] relative">
        <img 
          class="w-full h-full object-cover opacity-40 mix-blend-screen grayscale" 
          src="https://picsum.photos/seed/digital-globe/1920/1080" 
          alt="Digital Globe"
          referrerPolicy="no-referrer"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>
    </div>

    <!-- Planner Mode HUD -->
    <div class="absolute left-8 top-8 z-20 flex flex-col gap-6 w-80">
      <div class="glass-panel p-6 rounded-xl border border-primary/20 shadow-2xl">
        <h2 class="text-2xl font-bold text-primary mb-2 tracking-tight">规划师模式</h2>
        <p class="text-[10px] text-primary/60 leading-relaxed uppercase tracking-[0.2em] mb-6">Mode: I am a Planner</p>
        <div class="space-y-4">
          <PlannerCard 
            :icon="Waves"
            title="水电大坝"
            desc="在动态地貌上部署高能效水利枢纽。"
          />
          <PlannerCard 
            :icon="Train"
            title="磁悬浮轨道"
            desc="连接全球都市的高速磁浮交通网络。"
          />
          <PlannerCard 
            :icon="Sun"
            title="光伏矩阵"
            desc="优化日照分布，部署可持续能源站。"
          />
        </div>
      </div>

      <!-- Telemetry HUD Component -->
      <div class="bg-slate-900/40 backdrop-blur-md p-4 rounded-lg border border-primary/10">
        <div class="flex justify-between items-center mb-2">
          <span class="text-[10px] text-primary font-bold tracking-widest">实时遙測数据</span>
          <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
        </div>
        <div class="font-mono text-[10px] text-slate-300 space-y-1">
          <div>LAT: 31.2304° N</div>
          <div>LNG: 121.4737° E</div>
          <div>ALT: 42,000 KM</div>
        </div>
      </div>
    </div>

    <!-- World Sound Museum: Bottom Horizontal Section -->
    <div class="absolute bottom-0 left-0 w-full z-20 px-8 pb-8">
      <div class="bg-slate-900/40 backdrop-blur-2xl rounded-xl p-6 border-t border-primary/10 shadow-inner">
        <div class="flex justify-between items-end mb-6">
          <div>
            <h3 class="text-xl font-bold text-white mb-1 tracking-tight">世界声音博物馆</h3>
            <p class="text-xs text-slate-400 uppercase tracking-widest opacity-70">探索不同地域的方言与自然声景</p>
          </div>
          <button class="px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all">
            查看全部
          </button>
        </div>
        
        <div class="grid grid-cols-4 gap-4">
          <SoundCard 
            region="东亚"
            title="吴语·江南雨声"
            img="https://picsum.photos/seed/watertown/400/225"
          />
          <SoundCard 
            region="欧洲"
            title="德语·阿尔卑斯风笛"
            img="https://picsum.photos/seed/alps/400/225"
          />
          <SoundCard 
            region="亚马逊"
            title="原住民语·雨林鸟鸣"
            img="https://picsum.photos/seed/rainforest/400/225"
          />
          <SoundCard 
            region="北美"
            title="英语·西海岸迷雾"
            img="https://picsum.photos/seed/bridge/400/225"
          />
        </div>
      </div>
    </div>

    <!-- Floating UI Tools -->
    <div class="absolute right-8 top-8 z-10 flex flex-col gap-3">
      <button class="w-12 h-12 glass-panel rounded-lg flex items-center justify-center text-primary border border-primary/20 hover:bg-primary hover:text-on-primary transition-all shadow-lg">
        <Layers class="w-5 h-5" />
      </button>
      <button class="w-12 h-12 glass-panel rounded-lg flex items-center justify-center text-primary border border-primary/20 hover:bg-primary hover:text-on-primary transition-all shadow-lg">
        <Rotate3d class="w-5 h-5" />
      </button>
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
  </div>
</template>

<script lang="ts">
const PlannerCard = {
  props: ['icon', 'title', 'desc'],
  template: `
    <div class="group cursor-pointer bg-slate-900/60 p-4 rounded-lg border border-transparent hover:border-primary/50 transition-all">
      <div class="flex items-center gap-3 mb-2">
        <component :is="icon" class="w-5 h-5 text-primary" />
        <span class="font-bold">{{ title }}</span>
      </div>
      <p class="text-[11px] text-slate-400">{{ desc }}</p>
    </div>
  `
};

const SoundCard = {
  props: ['region', 'title', 'img'],
  template: `
    <div class="group relative aspect-video rounded-lg overflow-hidden cursor-pointer shadow-lg">
      <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" :src="img" :alt="title" referrerPolicy="no-referrer" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
      <div class="absolute bottom-3 left-4">
        <span class="text-[9px] bg-primary text-on-primary px-2 py-0.5 rounded-sm font-black mb-1.5 inline-block uppercase tracking-tighter">{{ region }}</span>
        <h4 class="text-sm font-bold text-white">{{ title }}</h4>
      </div>
      <div class="absolute top-3 right-4 opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100">
        <PlayCircle class="w-6 h-6 text-primary" />
      </div>
    </div>
  `
};
</script>
