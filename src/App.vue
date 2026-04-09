<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from './components/Sidebar.vue';
import Topbar from './components/Topbar.vue';
import DashboardView from './components/DashboardView.vue';
import VisionView from './components/VisionView.vue';
import ExploreView from './components/ExploreView.vue';
import CreativeView from './components/CreativeView.vue';
import NarrativeView from './components/NarrativeView.vue';

const activeTab = ref('profile');

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
};
</script>

<template>
  <div class="min-h-screen bg-background text-on-background font-sans selection:bg-primary/30">
    <Topbar />
    <Sidebar :active-tab="activeTab" @set-active-tab="setActiveTab" />
    
    <main class="pl-64 pt-16 h-screen overflow-y-auto custom-scrollbar">
      <div :class="activeTab === 'profile' ? 'p-8' : 'h-full'">
        <DashboardView v-if="activeTab === 'profile'" />
        <VisionView v-else-if="activeTab === 'vision'" />
        <ExploreView v-else-if="activeTab === 'explore'" />
        <CreativeView v-else-if="activeTab === 'creative'" />
        <NarrativeView v-else-if="activeTab === 'narrative'" />
        <DashboardView v-else />
      </div>
    </main>
  </div>
</template>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(34, 211, 238, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(34, 211, 238, 0.2);
}
</style>
