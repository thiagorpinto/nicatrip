<template>
  <TopBar />
  <MapView @select-spot="onSelectSpot" />
</template>

<script setup>
import { ref } from 'vue'
import TopBar from './components/TopBar.vue'
import MapView from './components/MapView.vue'

const selectedSpot = ref(null)

function onSelectSpot(spot) {
  selectedSpot.value = spot
}
</script>
