<script setup lang="ts">
import { 
  Compass, 
  BookOpen, 
  Sparkles, 
  Eye, 
  User, 
  Settings, 
  LogOut,
  Wifi,
  Server,
  BrainCircuit
} from 'lucide-vue-next';
import { cn } from '../lib/utils';
import { ref, onMounted, onUnmounted } from 'vue';

defineProps<{
  activeTab: string;
}>();

const emit = defineEmits<{
  (e: 'setActiveTab', tab: string): void;
}>();

// ===== 状态 =====
const backendStatus = ref<'online' | 'offline' | 'checking'>('checking');
const modelStatus = ref<'ready' | 'loading' | 'error'>('loading');
const networkStatus = ref(navigator.onLine);

const AI_BASE_URL = (process.env as any).AI_BASE_URL || 'http://localhost:11434/v1';
const AI_MODEL_NAME = (process.env as any).AI_MODEL_NAME || 'deepseek-r1:latest';

// ===== 检测函数 =====
async function checkBackend() {
  backendStatus.value = 'checking';
  try {
    // 检查 Ollama 服务是否存活 (访问基础端口)
    const baseUrl = AI_BASE_URL.replace('/v1', '');
    const res = await fetch(baseUrl, { method: 'GET', mode: 'no-cors' });
    backendStatus.value = 'online';
  } catch (e) {
    backendStatus.value = 'offline';
  }
}

async function checkModel() {
  modelStatus.value = 'loading';
  try {
    // 检查特定模型是否已加载
    const baseUrl = AI_BASE_URL.replace('/v1', '');
    const res = await fetch(`${baseUrl}/api/tags`);
    if (!res.ok) throw new Error();

    const data = await res.json();
    const models = data.models || [];
    const isReady = models.some((m: any) => m.name === AI_MODEL_NAME || m.name.startsWith(AI_MODEL_NAME));
    
    modelStatus.value = isReady ? 'ready' : 'error';
  } catch (e) {
    modelStatus.value = 'error';
  }
}

// ===== 网络监听 =====
function updateNetwork() {
  networkStatus.value = navigator.onLine;
}

// ===== 生命周期 =====
let timer: any = null;

onMounted(() => {
  checkBackend();
  checkModel();

  // 每5秒刷新
  timer = setInterval(() => {
    checkBackend();
    checkModel();
  }, 5000);

  window.addEventListener('online', updateNetwork);
  window.addEventListener('offline', updateNetwork);
});

onUnmounted(() => {
  clearInterval(timer);
  window.removeEventListener('online', updateNetwork);
  window.removeEventListener('offline', updateNetwork);
});

// ===== UI工具函数 =====
function statusColor(status: string | boolean) {
  if (status === 'online' || status === 'ready' || status === true) return 'text-green-400';
  if (status === 'checking' || status === 'loading') return 'text-yellow-400 animate-pulse';
  return 'text-red-400';
}

function statusDot(status: string | boolean) {
  if (status === 'online' || status === 'ready' || status === true) return 'bg-green-400';
  if (status === 'checking' || status === 'loading') return 'bg-yellow-400 animate-pulse';
  return 'bg-red-400';
}

// ===== 文本 =====
const navItems = [
  { id: 'explore', label: '探索', icon: Compass },
  { id: 'narrative', label: '叙事', icon: BookOpen },
  { id: 'creative', label: '创想', icon: Sparkles },
  { id: 'vision', label: '视界', icon: Eye },
  { id: 'profile', label: '个人中心', icon: User },
];
</script>

<template>
  <aside class="fixed left-0 top-0 h-full w-64 z-40 bg-slate-900/40 backdrop-blur-2xl border-r border-primary/10 flex flex-col pt-20 pb-6">

    <!-- ===== 状态栏 ===== -->
    <div class="mx-4 mb-6 p-4 rounded-2xl bg-slate-800/40 border border-primary/10 backdrop-blur-xl shadow-lg">

      <div class="text-xs text-slate-400 tracking-widest mb-3">
        SYSTEM STATUS
      </div>

      <div class="space-y-4">

        <!-- Backend -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Server class="w-4 h-4 text-slate-400" />
            <span class="text-slate-300 text-sm">Backend</span>
          </div>
          <div class="flex items-center gap-2">
            <span :class="['w-2 h-2 rounded-full', statusDot(backendStatus)]"></span>
            <span :class="['text-xs font-semibold', statusColor(backendStatus)]">
              {{ backendStatus === 'online' ? '在线' : backendStatus === 'checking' ? '检测中' : '离线' }}
            </span>
          </div>
        </div>

        <!-- Model -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <BrainCircuit class="w-4 h-4 text-slate-400" />
            <span class="text-slate-300 text-sm">Model</span>
          </div>
          <div class="flex items-center gap-2">
            <span :class="['w-2 h-2 rounded-full', statusDot(modelStatus)]"></span>
            <span :class="['text-xs font-semibold', statusColor(modelStatus)]">
              {{ modelStatus === 'ready' ? '就绪' : modelStatus === 'loading' ? '加载中' : '异常' }}
            </span>
          </div>
        </div>

        <!-- Network -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Wifi class="w-4 h-4 text-slate-400" />
            <span class="text-slate-300 text-sm">Network</span>
          </div>
          <div class="flex items-center gap-2">
            <span :class="['w-2 h-2 rounded-full', statusDot(networkStatus)]"></span>
            <span :class="['text-xs font-semibold', statusColor(networkStatus)]">
              {{ networkStatus ? '在线' : '断开' }}
            </span>
          </div>
        </div>

      </div>
    </div>

    <!-- ===== 导航 ===== -->
    <nav class="flex-1 space-y-1">
      <button
        v-for="item in navItems"
        :key="item.id"
        @click="emit('setActiveTab', item.id)"
        :class="cn(
          'w-full flex items-center gap-3 px-6 py-3 transition-all duration-300 text-sm uppercase tracking-widest text-left',
          activeTab === item.id 
            ? 'bg-primary/10 text-primary border-r-4 border-primary font-bold' 
            : 'text-slate-400 hover:text-primary hover:bg-primary/5'
        )"
      >
        <component :is="item.icon" :class="cn('w-5 h-5', activeTab === item.id && 'fill-primary/20')" />
        <span>{{ item.label }}</span>
      </button>
    </nav>

    <!-- ===== 底部 ===== -->
    <div class="mt-auto pt-4 border-t border-primary/5">
      <button class="w-full flex items-center gap-3 text-slate-400 hover:text-primary px-6 py-3 transition-all text-sm uppercase tracking-widest text-left">
        <Settings class="w-5 h-5" />
        <span>设置</span>
      </button>
      <button class="w-full flex items-center gap-3 text-slate-400 hover:text-error px-6 py-3 transition-all text-sm uppercase tracking-widest text-left">
        <LogOut class="w-5 h-5" />
        <span>退出</span>
      </button>
    </div>

  </aside>
</template>
