<template>
  <div ref="mapEl" class="map-container" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'

const emit = defineEmits(['select-spot'])

const mapEl = ref(null)
let map = null

function makeIcon() {
  return L.divIcon({
    className: '',
    html: '<div style="width:24px;height:24px;border-radius:50%;background:#3b82f6;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4);"></div>',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

onMounted(async () => {
  map = L.map(mapEl.value)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map)

  const res = await fetch('/nicatrip/data/spots.json')
  const spots = await res.json()

  const markers = spots.map(spot => {
    const [lat, lng] = spot.coordinates
    const marker = L.marker([lat, lng], { icon: makeIcon() }).addTo(map)
    marker.on('click', () => {
      console.log('select-spot', spot.id, spot.name)
      emit('select-spot', spot)
    })
    return marker
  })

  const group = L.featureGroup(markers)
  map.fitBounds(group.getBounds(), { padding: [32, 32] })
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
