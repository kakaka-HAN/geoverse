<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { 
  Layers, 
  Rotate3d, 
  Plus, 
  Minus, 
  Mic,
  Sparkles
} from 'lucide-vue-next';
import { cn } from '../lib/utils';
import { reverseGeocodeAI } from '../lib/ai';
import { 
  Viewer, 
  Cartographic, 
  Math as CesiumMath,
  createWorldImageryAsync,
  Ion,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  defined
} from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

// --- Cesium Logic ---
const viewer = ref<Viewer | null>(null);
const cesiumContainer = ref<HTMLElement | null>(null);

// Telemetry Data (Reactive)
const lat = ref('---');
const lng = ref('---');
const zoomLabel = ref('区域观测');
const regionName = ref('');

// --- AI Logic (Using local Qwen) ---
let geocodeTimeout: any = null;
let currentRequestId = 0; 
let lastProcessedCoords = { lat: 0, lng: 0 }; // 新增：记录上一次提交给 AI 的坐标

const isCompanionSpeaking = ref(true);
const isGeocoding = ref(false); 
const currentMessage = ref('“探测到该区域正处于典型的热带季风气候。你想了解其高湿度和丰沛降水是如何影响当地独特生物多样性的吗？”');

const fetchRegionNameAI = async (latitude: number, longitude: number) => {
  // 1. 坐标精度过滤：只保留小数点后一位
  const roundedLat = parseFloat(latitude.toFixed(1));
  const roundedLng = parseFloat(longitude.toFixed(1));

  // 2. 变化检测：如果精度范围内的坐标没有变化，直接拦截请求
  if (roundedLat === lastProcessedCoords.lat && roundedLng === lastProcessedCoords.lng) {
    return; 
  }

  if (geocodeTimeout) clearTimeout(geocodeTimeout);
  
  geocodeTimeout = setTimeout(async () => {
    const requestId = ++currentRequestId; 
    
    // 更新最后处理的坐标，防止防抖期间的重复进入
    lastProcessedCoords = { lat: roundedLat, lng: roundedLng };

    try {
      isGeocoding.value = true;
      const startTime = Date.now();
      
      const result = await reverseGeocodeAI(latitude, longitude);
      
      if (requestId === currentRequestId) {
        const duration = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`[Explore] AI Update UI (ID: ${requestId}, Lat: ${roundedLat}, Lng: ${roundedLng}, Time: ${duration}s):`, result);
        
        if (result && result.location) {
          regionName.value = result.location;
          if (result.fact) {
            currentMessage.value = `“${result.fact}”`;
            isCompanionSpeaking.value = true;
          }
        }
        isGeocoding.value = false;
      }
    } catch (error) {
      if (requestId === currentRequestId) {
        console.error('[Explore] AI Geocoding Error:', error);
        regionName.value = '分析超时或异常';
        isGeocoding.value = false;
      }
    }
  }, 1000); 
};

// 视角模式更新 (相机高度相关)
const updateZoomMode = () => {
  if (!viewer.value) return;
  const camera = viewer.value.camera;
  const cartographic = Cartographic.fromCartesian(camera.position);
  if (!cartographic) return;
  
  const height = cartographic.height;
  if (height > 1000000) {
    zoomLabel.value = '太空视角';
    regionName.value = ''; // 太空视角清空地名
  } else if (height > 1000) {
    zoomLabel.value = '区域观测';
  } else {
    zoomLabel.value = '街道细节';
  }
};

// 实时位置更新 (鼠标位置相关)
const setupMouseTelemetry = () => {
  if (!viewer.value) return;
  
  const handler = new ScreenSpaceEventHandler(viewer.value.scene.canvas);
  
  handler.setInputAction((movement: any) => {
    if (!viewer.value) return;
    
    let cartesian;
    if (viewer.value.scene.mode !== 2) {
      cartesian = viewer.value.scene.pickPosition(movement.endPosition);
    }
    
    if (!defined(cartesian)) {
      cartesian = viewer.value.camera.pickEllipsoid(movement.endPosition, viewer.value.scene.globe.ellipsoid);
    }

    if (defined(cartesian)) {
      const cartographic = Cartographic.fromCartesian(cartesian!);
      if (cartographic) {
        const latitude = CesiumMath.toDegrees(cartographic.latitude);
        const longitude = CesiumMath.toDegrees(cartographic.longitude);

        lat.value = `${latitude.toFixed(4)}° ${latitude >= 0 ? 'N' : 'S'}`;
        lng.value = `${longitude.toFixed(4)}° ${longitude >= 0 ? 'E' : 'W'}`;
        
        if (zoomLabel.value !== '太空视角') {
          fetchRegionNameAI(latitude, longitude);
        }
      }
    } else {
      // 注意：这里不再清空 regionName，保留上一次扫描到的地名，直到下一次扫描成功
      lat.value = '---';
      lng.value = '---';
    }
  }, ScreenSpaceEventType.MOUSE_MOVE);

  return handler;
};

let mouseHandler: ScreenSpaceEventHandler | null = null;

onMounted(async () => {
  if (cesiumContainer.value) {
    viewer.value = new Viewer(cesiumContainer.value, {
      terrainProvider: undefined,
      animation: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      sceneModePicker: false,
      selectionIndicator: false,
      timeline: false,
      navigationHelpButton: false,
      scene3DOnly: true,
    });

    viewer.value.camera.setView({
      destination: Cartographic.toCartesian(
        Cartographic.fromDegrees(109.5121, 18.2528, 50000)
      ),
    });

    // 监听相机变化更新模式
    viewer.value.camera.changed.addEventListener(updateZoomMode);
    updateZoomMode();

    // 设置鼠标实时遥测
    mouseHandler = setupMouseTelemetry() || null;
  }
});

onUnmounted(() => {
  if (mouseHandler) {
    mouseHandler.destroy();
  }
  if (viewer.value) {
    viewer.value.destroy();
  }
});

const handleZoomIn = () => {
  viewer.value?.camera.zoomIn(viewer.value.camera.positionCartographic.height * 0.5);
};

const handleZoomOut = () => {
  viewer.value?.camera.zoomOut(viewer.value.camera.positionCartographic.height * 0.5);
};
</script>

<template>
  <div class="h-full relative overflow-hidden bg-[#020617] animate-in fade-in duration-1000">
    
    <!-- 1. 3D Earth/Map Background (Cesium JS) -->
    <div ref="cesiumContainer" class="absolute inset-0 z-0"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-40 pointer-events-none"></div>

    <!-- HUD Elements -->
    <div class="absolute top-8 left-8 z-10 flex flex-col gap-4">
      <div class="glass-panel p-5 rounded-lg border-l-4 border-primary shadow-2xl max-w-[420px]">
        <h1 class="text-3xl font-display text-primary mb-1 tracking-tight font-bold truncate">
          <span v-if="isGeocoding" class="animate-pulse opacity-70">AI 分析中...</span>
          <span v-else>{{ regionName || (zoomLabel === '太空视角' ? '地球·全景监测' : '等待扫描...') }}</span>
        </h1>
        <p class="text-[10px] font-bold text-primary/60 tracking-[0.3em] uppercase">
          VIEW MODE: {{ zoomLabel }}
        </p>
      </div>
      
      <div class="flex gap-2">
        <span class="px-3 py-1.5 bg-primary/20 text-primary rounded-full text-[10px] font-bold flex items-center gap-2 border border-primary/30">
          <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          实时数据流
        </span>
        <span class="px-3 py-1.5 bg-slate-900/60 text-primary/80 rounded-full text-[10px] font-bold border border-primary/10">
          精度: 实时渲染
        </span>
      </div>
    </div>

    <!-- Telemetry Data -->
    <div class="absolute bottom-10 left-8 z-10 space-y-2 pointer-events-none">
      <div class="mono-text text-[10px] text-primary/60 leading-relaxed font-medium">
        LAT: {{ lat }}<br />
        LONG: {{ lng }}
      </div>
      <div class="h-[2px] w-32 bg-gradient-to-r from-primary/60 to-transparent"></div>
    </div>

    <!-- 2 & 3. 悬浮数字人伴侣 (AI Companion) & 动态气泡 -->
    <div class="absolute bottom-8 right-8 z-30 flex flex-col items-end gap-4 max-w-[450px]">
      
      <!-- Dynamic Speech Bubble -->
      <transition 
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform translate-y-4 opacity-0 scale-95"
        enter-to-class="transform translate-y-0 opacity-100 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100 scale-100"
        leave-to-class="transform translate-y-4 opacity-0 scale-95"
      >
        <div v-if="isCompanionSpeaking" class="relative group">
          <div class="glass-panel p-5 rounded-2xl rounded-br-none border border-primary/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#0f172a]/80 backdrop-blur-xl">
            <div class="flex items-center gap-2 mb-3">
              <Sparkles class="w-3 h-3 text-primary animate-pulse" />
              <span class="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">NOVA - 智能伴侣</span>
            </div>
            <p class="text-sm text-slate-100 leading-relaxed font-medium">
              {{ currentMessage }}
            </p>
            <div class="mt-4 flex gap-2">
              <button class="px-4 py-1.5 text-[11px] bg-primary text-[#020617] rounded-full font-bold hover:brightness-110 transition-all uppercase tracking-wider">执行分析</button>
              <button class="px-4 py-1.5 text-[11px] text-primary hover:bg-primary/10 rounded-full border border-primary/20 transition-all uppercase tracking-wider">切换话题</button>
            </div>
          </div>
          <!-- Bubble Tail Decor -->
          <div class="absolute -bottom-2 right-0 w-4 h-4 bg-[#0f172a]/80 border-r border-b border-primary/30 transform rotate-45 translate-y-1/2 -translate-x-1/2"></div>
        </div>
      </transition>

      <!-- Digital Human Container -->
      <div class="relative w-48 h-48 group cursor-pointer" @click="isCompanionSpeaking = !isCompanionSpeaking">
        <div id="digital-human-container" class="w-full h-full rounded-full border-2 border-primary/20 bg-slate-900/40 backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.2)] group-hover:border-primary/50 transition-all duration-500">
          <img 
            alt="AI Companion Placeholder" 
            class="w-full h-full object-cover mix-blend-lighten scale-110 group-hover:scale-105 transition-transform duration-700" 
            src="https://picsum.photos/seed/ai-avatar/400/400"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"></div>
          <div class="absolute top-0 left-0 w-full h-[2px] bg-primary/40 animate-scan"></div>
        </div>

        <!-- Mic Button Overlay -->
        <div class="absolute -bottom-2 -left-2">
          <button class="w-12 h-12 bg-primary text-[#020617] rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all">
            <Mic class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Floating Map Controls -->
    <div class="absolute right-8 top-8 z-10 flex flex-col gap-3">
      <MapControlButton :icon="Layers" />
      <MapControlButton :icon="Rotate3d" />
      <div class="flex flex-col glass-panel rounded-lg border border-primary/20 shadow-lg overflow-hidden">
        <button 
          @click="handleZoomIn"
          class="w-12 h-12 flex items-center justify-center text-primary hover:bg-primary/20 transition-all"
        >
          <Plus class="w-5 h-5" />
        </button>
        <div class="h-[1px] bg-primary/10 mx-2"></div>
        <button 
          @click="handleZoomOut"
          class="w-12 h-12 flex items-center justify-center text-primary hover:bg-primary/20 transition-all"
        >
          <Minus class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Bottom Chips/Filters -->
    <div class="absolute bottom-8 left-8 z-30 flex gap-3">
      <FilterChip label="卫星红外" />
      <FilterChip label="大气流场" active />
      <FilterChip label="地壳变动" />
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
