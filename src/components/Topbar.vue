<script setup lang="ts">
import { Search, Settings, Bell } from 'lucide-vue-next';
</script>

<template>
  <header class="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-primary/10 flex justify-between items-center px-6 h-16">
    <div class="flex items-center w-64">
      <span class="text-xl font-display font-bold bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent tracking-tight">
        GeoVerse AI
      </span>
    </div>
    
    <div class="flex-1 flex justify-center max-w-2xl">
      <div class="relative w-full group">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60 group-focus-within:text-primary transition-colors" />
        <input 
          class="w-full bg-slate-900/60 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all outline-none" 
          placeholder="搜索区域、时间或地理现象..." 
          type="text"
        />
      </div>
    </div>
    
    <div class="flex items-center gap-2 w-64 justify-end">
      <button class="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all active:scale-95">
        <Settings class="w-5 h-5" />
      </button>
      <button class="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all active:scale-95">
        <Bell class="w-5 h-5" />
      </button>
      <div class="w-9 h-9 rounded-full border-2 border-primary/30 overflow-hidden ml-2 cursor-pointer hover:border-primary transition-all">
        <img 
          alt="Profile" 
          class="w-full h-full object-cover" 
          src="https://picsum.photos/seed/geoverse-user/100/100"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  </header>
</template>
