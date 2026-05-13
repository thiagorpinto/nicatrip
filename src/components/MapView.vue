<template>
  <div ref="mapEl" class="map-container" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'

const mapEl = ref(null)
let map = null

const spots = [
  { name: 'Playa Maderas', coords: [11.470, -85.888] },
  { name: 'Popoyo', coords: [11.350, -86.013] },
  { name: 'Aposentillo', coords: [12.550, -87.120] },
]

function makeIcon() {
  return L.divIcon({
    className: '',
    html: '<div style="width:24px;height:24px;border-radius:50%;background:#3b82f6;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4);"></div>',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

onMounted(() => {
  map = L.map(mapEl.value).setView([12.865, -85.207], 8)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map)
  spots.forEach(({ name, coords }) => {
    L.marker(coords, { icon: makeIcon() }).bindPopup(name).addTo(map)
  })
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style scoped>
.map-container {
  position: fixed;
  top: 48px;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
