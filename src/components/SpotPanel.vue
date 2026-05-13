<template>
  <Transition name="panel">
    <div v-if="spot" class="panel">
      <div class="panel-header">
        <div class="name-row">
          <span class="spot-name">{{ spot.name }}</span>
          <span v-if="wishlisted" class="badge-wishlist">★ Wishlist</span>
        </div>
        <div class="header-actions">
          <button class="btn-icon" :class="{ wishlisted }" title="Wishlist" @click="toggleWishlist(spot.id)">
            {{ wishlisted ? '★' : '☆' }}
          </button>
          <button class="btn-icon" title="Close" @click="emit('close')">×</button>
        </div>
      </div>

      <div class="tab-bar">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="tab"
          :class="{ active: activeTab === tab }"
          @click="activeTab = tab"
        >{{ tab }}</button>
      </div>

      <div class="panel-body">
        <template v-if="activeTab === 'Guide'">
          <p class="description">{{ spot.guide?.description || 'No description available.' }}</p>
          <div class="guide-rows">
            <div class="guide-row">
              <span class="label">Best season</span>
              <span class="value">{{ spot.guide?.bestSeason || '—' }}</span>
            </div>
            <div class="guide-row">
              <span class="label">Best tide</span>
              <span class="value">{{ spot.guide?.bestTide || '—' }}</span>
            </div>
            <div class="guide-row">
              <span class="label">Crowd level</span>
              <span class="value">{{ spot.guide?.crowdLevel || '—' }}</span>
            </div>
            <div class="guide-row">
              <span class="label">Hazards</span>
              <span class="value">{{ spot.guide?.hazards || '—' }}</span>
            </div>
          </div>
        </template>

        <template v-else>
          <p class="placeholder">{{ activeTab }} coming soon.</p>
        </template>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useUserLists } from '../composables/useUserLists.js'

const props = defineProps({ spot: Object })
const emit = defineEmits(['close'])

const { toggleWishlist, isWishlisted } = useUserLists()
const wishlisted = computed(() => props.spot ? isWishlisted(props.spot.id) : false)

const tabs = ['Guide', 'Forecast', 'Stay', 'Around']
const activeTab = ref('Guide')

watch(() => props.spot, () => { activeTab.value = 'Guide' })
</script>

<style scoped>
.panel {
  position: fixed;
  top: 48px;
  right: 0;
  bottom: 0;
  width: 420px;
  background: #1f2937;
  color: #f9fafb;
  display: flex;
  flex-direction: column;
  z-index: 900;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #374151;
  flex-shrink: 0;
}

.name-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.spot-name {
  font-size: 1.125rem;
  font-weight: 700;
}

.badge-wishlist {
  font-size: 0.7rem;
  color: #f59e0b;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.header-actions {
  display: flex;
  gap: 4px;
}

.btn-icon {
  background: none;
  border: none;
  color: #d1d5db;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  line-height: 1;
}

.btn-icon:hover {
  background: #374151;
  color: #fff;
}

.btn-icon.wishlisted {
  color: #f59e0b;
}

.tab-bar {
  display: flex;
  border-bottom: 1px solid #374151;
  flex-shrink: 0;
}

.tab {
  flex: 1;
  padding: 10px 0;
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 0.875rem;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}

.tab:hover { color: #f9fafb; }

.tab.active {
  color: #f9fafb;
  border-bottom-color: #3b82f6;
  font-weight: 600;
}

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.description {
  margin: 0 0 20px;
  line-height: 1.6;
  color: #d1d5db;
}

.guide-rows {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.guide-row {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #111827;
  border-radius: 8px;
}

.label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  min-width: 90px;
  padding-top: 1px;
}

.value {
  font-size: 0.9rem;
  color: #e5e7eb;
}

.placeholder {
  color: #6b7280;
  font-size: 0.9rem;
}

.panel-enter-active,
.panel-leave-active {
  transition: transform 0.25s ease;
}

.panel-enter-from,
.panel-leave-to {
  transform: translateX(100%);
}
</style>
