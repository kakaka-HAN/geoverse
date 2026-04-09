<script setup lang="ts">
import { ref } from 'vue';
import HistoryReconstruction from './narrative/HistoryReconstruction.vue';
import Geomorphology from './narrative/Geomorphology.vue';
import EverythingOrigin from './narrative/EverythingOrigin.vue';
import { cn } from '../lib/utils';

const activeSubTab = ref('history');

const subTabs = [
  { id: 'history', label: '历史重现' },
  { id: 'geomorphology', label: '地貌成因' },
  { id: 'everything', label: '万物成因' },
];
</script>

<template>
  <div class="h-full relative overflow-hidden bg-background">
    <!-- Sub-Navigation -->
    <nav class="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full px-2 py-1 glass-panel border border-primary/20 shadow-lg">
      <button 
        v-for="tab in subTabs" 
        :key="tab.id"
        @click="activeSubTab = tab.id"
        :class="cn(
          'px-4 py-1 text-xs tracking-tighter transition-all rounded-full',
          activeSubTab === tab.id 
            ? 'bg-primary text-slate-950 font-bold' 
            : 'text-slate-300 hover:text-primary'
        )"
      >
        {{ tab.label }}
      </button>
    </nav>

    <!-- Sub-Module Content -->
    <div class="h-full">
      <HistoryReconstruction v-if="activeSubTab === 'history'" />
      <Geomorphology v-else-if="activeSubTab === 'geomorphology'" />
      <EverythingOrigin v-else-if="activeSubTab === 'everything'" />
    </div>
  </div>
</template>

<style scoped>
.glass-panel {
  background: rgba(14, 19, 30, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(34, 211, 238, 0.1);
}
</style>
