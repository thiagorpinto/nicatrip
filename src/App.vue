<template>
  <TopBar />
  <MapView @select-spot="onSelectSpot" />
  <SpotPanel :spot="selectedSpot" @close="selectedSpot = null" />
</template>

<script setup>
import { ref } from 'vue'
import TopBar from './components/TopBar.vue'
import MapView from './components/MapView.vue'
import SpotPanel from './components/SpotPanel.vue'

const selectedSpot = ref(null)

function onSelectSpot(spot) {
  selectedSpot.value = spot
}
</script>
