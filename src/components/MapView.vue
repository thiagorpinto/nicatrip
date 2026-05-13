<template>
  <div ref="mapEl" class="map-container" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import L from 'leaflet'
import { useUserLists } from '../composables/useUserLists.js'

const emit = defineEmits(['select-spot'])

const mapEl = ref(null)
let map = null
const markerMap = new Map() // spotId -> { marker, spot }

const { isWishlisted, wishlistIds } = useUserLists()

function makeSpotIcon(spotId) {
  const wishlisted = isWishlisted(spotId)
  const bg = wishlisted ? '#f59e0b' : '#3b82f6'
  const label = wishlisted ? '<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;line-height:1;">★</span>' : ''
  return L.divIcon({
    className: '',
    html: `<div style="position:relative;width:24px;height:24px;border-radius:50%;background:${bg};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4);">${label}</div>`,
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
    const marker = L.marker([lat, lng], { icon: makeSpotIcon(spot.id) }).addTo(map)
    marker.on('click', () => emit('select-spot', spot))
    markerMap.set(spot.id, { marker, spot })
    return marker
  })

  const group = L.featureGroup(markers)
  map.fitBounds(group.getBounds(), { padding: [32, 32] })
})

watch(wishlistIds, () => {
  for (const [spotId, { marker }] of markerMap) {
    marker.setIcon(makeSpotIcon(spotId))
  }
})

onUnmounted(() => {
  if (map) { map.remove(); map = null }
  markerMap.clear()
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
