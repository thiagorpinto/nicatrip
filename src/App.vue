<template>
  <TopBar :list-count="wishlistCount" @open-lists="drawerOpen = true" />
  <MapView @select-spot="onSelectSpot" />
  <SpotPanel :spot="selectedSpot" @close="selectedSpot = null" />
  <ListsDrawer :open="drawerOpen" :spots="allSpots" @close="drawerOpen = false" @open-spot="onSelectSpot" />
</template>

<script setup>
import { ref } from 'vue'
import TopBar from './components/TopBar.vue'
import MapView from './components/MapView.vue'
import SpotPanel from './components/SpotPanel.vue'
import ListsDrawer from './components/ListsDrawer.vue'
import { useUserLists } from './composables/useUserLists.js'

const { wishlistCount } = useUserLists()

const selectedSpot = ref(null)
const drawerOpen = ref(false)
const allSpots = ref([])

fetch('/nicatrip/data/spots.json').then(r => r.json()).then(d => { allSpots.value = d })

function onSelectSpot(spot) {
  selectedSpot.value = spot
}
</script>
