<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { 
  Plus, 
  Minus
} from 'lucide-vue-next';
import { 
  Viewer, 
  Cartographic, 
  Math as CesiumMath,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  defined
} from 'cesium';
import * as turf from '@turf/turf';
import "cesium/Build/Cesium/Widgets/widgets.css";

// --- Cesium ---
const viewer = ref<Viewer | null>(null);
const cesiumContainer = ref<HTMLElement | null>(null);

// --- UI Data ---
const lat = ref('---');
const lng = ref('---');
const zoomLabel = ref('区域观测');
const regionName = ref('');

// =======================
// GeoJSON 数据
// =======================
let geoData: any = null;
const isDataLoading = ref(true);
let admin0Data: any = null;
let placesData: any = null;

const currentMessage = ref('“Global administrative parsing ready.”');

const loadGeoJSON = async () => {
  try {
    const admin0Url =
      'https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@v5.1.2/geojson/ne_50m_admin_0_countries.geojson';
    const admin1Url =
      'https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@v5.1.2/geojson/ne_50m_admin_1_states_provinces_lakes.geojson';
    const placesUrl =
      'https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@v5.1.2/geojson/ne_50m_populated_places_simple.geojson';

    const [r0, r1, r2] = await Promise.all([
      fetch(admin0Url),
      fetch(admin1Url),
      fetch(placesUrl),
    ]);

    if (!r0.ok || !r1.ok || !r2.ok) throw new Error('CDN error');

    admin0Data = await r0.json();
    geoData = await r1.json();
    placesData = await r2.json();

    isDataLoading.value = false;
  } catch (err) {
    currentMessage.value = '“Geo data loading failed.”';
    isDataLoading.value = false;
  }
};

// =======================
// 全球三级逆地理编码（稳定版）
// =======================
const reverseGeocodeLocal = (latitude: number, longitude: number) => {
  if (!admin0Data || !geoData || !placesData) return;

  const point = turf.point([longitude, latitude]);

  let countryName = '';
  let provinceName = '';
  let cityName = ''; // 👈 每次调用时重置

  // ===== 国家 =====
  for (const f of admin0Data.features) {
    if (turf.booleanPointInPolygon(point, f)) {
      const p: any = f.properties || {};
      countryName = p.ADMIN || p.admin || p.NAME || p.name || '';
      break;
    }
  }

  // ===== 省 =====
  for (const f of geoData.features) {
    if (turf.booleanPointInPolygon(point, f)) {
      const p: any = f.properties || {};
      provinceName = p.name || p.NAME || p.name_en || p.NAME_EN || '';
      break;
    }
  }

  // ===== 城市（最近点）=====
  let minD = 100; // 100km 阈值
  let nearest: any = null;

  for (const f of placesData.features) {
    const g: any = f.geometry;
    if (!g || g.type !== 'Point') continue;

    const d = turf.distance(point, turf.point(g.coordinates), {
      units: 'kilometers'
    });

    const props: any = f.properties || {};
    const adm0 = props.adm0name || props.ADM0NAME || '';

    // 限制同一国家
    if (countryName && adm0 && adm0 !== countryName) continue;

    if (d < minD) {
      minD = d;
      nearest = f;
    }
  }

  if (nearest) {
    const p: any = nearest.properties || {};
    cityName = p.name || p.NAME || p.nameascii || '';
  }

  // ===== 组装结果 =====
  const parts = [countryName, provinceName, cityName].filter(Boolean);
  if (parts.length === 0) {
    regionName.value = '公海 / 未知区域';
  } else {
    regionName.value = parts.join(' · ');
  }
};

// --- 相机 ---
const updateZoomMode = () => {
  if (!viewer.value) return;
  const cartographic = Cartographic.fromCartesian(viewer.value.camera.position);
  if (!cartographic) return;
  
  const height = cartographic.height;
  if (height > 1000000) {
    zoomLabel.value = '太空视角';
    regionName.value = '';
  } else if (height > 1000) {
    zoomLabel.value = '区域观测';
  } else {
    zoomLabel.value = '街道细节';
  }
};

// --- 鼠标 ---
const setupMouseTelemetry = () => {
  if (!viewer.value) return;
  
  const handler = new ScreenSpaceEventHandler(viewer.value.scene.canvas);
  
  handler.setInputAction((movement: any) => {
    if (!viewer.value) return;
    
    let cartesian = viewer.value.scene.pickPosition(movement.endPosition);

    if (!defined(cartesian)) {
      cartesian = viewer.value.camera.pickEllipsoid(
        movement.endPosition,
        viewer.value.scene.globe.ellipsoid
      );
    }

    if (defined(cartesian)) {
      const cartographic = Cartographic.fromCartesian(cartesian!);
      if (cartographic) {
        const latitude = CesiumMath.toDegrees(cartographic.latitude);
        const longitude = CesiumMath.toDegrees(cartographic.longitude);

        lat.value = `${latitude.toFixed(4)}° ${latitude >= 0 ? 'N' : 'S'}`;
        lng.value = `${longitude.toFixed(4)}° ${longitude >= 0 ? 'E' : 'W'}`;
        
        if (zoomLabel.value !== '太空视角') {
          reverseGeocodeLocal(latitude, longitude);
        }
      }
    } else {
      lat.value = '---';
      lng.value = '---';
    }
  }, ScreenSpaceEventType.MOUSE_MOVE);

  return handler;
};

let mouseHandler: ScreenSpaceEventHandler | null = null;

onMounted(async () => {
  await loadGeoJSON();

  if (cesiumContainer.value) {
    viewer.value = new Viewer(cesiumContainer.value, {
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

    viewer.value.camera.changed.addEventListener(updateZoomMode);
    updateZoomMode();

    mouseHandler = setupMouseTelemetry() || null;
  }
});

onUnmounted(() => {
  if (mouseHandler) mouseHandler.destroy();
  if (viewer.value) viewer.value.destroy();
});

const handleZoomIn = () => {
  viewer.value?.camera.zoomIn(
    viewer.value.camera.positionCartographic.height * 0.5
  );
};

const handleZoomOut = () => {
  viewer.value?.camera.zoomOut(
    viewer.value.camera.positionCartographic.height * 0.5
  );
};
</script>

<template>
  <div class="relative w-full h-full overflow-hidden bg-black">
    <div ref="cesiumContainer" class="w-full h-full"></div>

    <div class="absolute inset-0 pointer-events-none flex flex-col p-6">
      
      <!-- 左上 -->
      <div class="absolute top-6 left-6 pointer-events-auto">
        <div class="glass-panel p-4 rounded-lg flex flex-col gap-2 min-w-[200px]">
          
          <div v-if="isDataLoading" class="flex items-center gap-2">
            <div class="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span class="text-xs text-primary/70 font-mono">加载中...</span>
          </div>

          <div v-else>
            <p class="text-2xl font-bold text-primary">{{ regionName || 'Unknown' }}</p>
            <p class="text-xs font-mono mt-1">
              {{ lat }} | {{ lng }}
            </p>
          </div>

        </div>
      </div>

      <!-- 右下 -->
      <div class="mt-auto ml-auto flex flex-col gap-5 pointer-events-auto">
        <div class="flex flex-col glass-panel rounded-full p-1.5">
          <button @click="handleZoomIn" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/20">
            <Plus class="w-5 h-5" />
          </button>
          <button @click="handleZoomOut" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/20">
            <Minus class="w-5 h-5" />
          </button>
        </div>

        <div class="glass-panel px-5 py-2.5 rounded-full">
          <span class="text-xs font-mono">{{ zoomLabel }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-panel {
  background: rgba(18, 20, 21, 0.7);
  backdrop-filter: blur(12px);
}
</style>
