<template>
  <Transition name="drawer">
    <div v-if="open" class="drawer">
      <div class="drawer-header">
        <span class="drawer-title">My Lists</span>
        <button class="btn-close" @click="emit('close')">×</button>
      </div>

      <div class="drawer-body">
        <div class="section-title">Wishlist</div>

        <div v-if="wishlistSpots.length === 0" class="empty">
          No spots wishlisted yet.
        </div>

        <div v-for="spot in wishlistSpots" :key="spot.id" class="wishlist-entry">
          <span class="entry-name">{{ spot.name }}</span>
          <div class="entry-actions">
            <button class="btn-view" @click="onView(spot)">View</button>
            <button class="btn-remove" @click="toggleWishlist(spot.id)">✕</button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { useUserLists } from '../composables/useUserLists.js'

const props = defineProps({
  open: Boolean,
  spots: { type: Array, default: () => [] },
})
const emit = defineEmits(['close', 'open-spot'])

const { toggleWishlist, wishlistIds } = useUserLists()

const wishlistSpots = computed(() =>
  props.spots.filter(s => wishlistIds.value.includes(s.id))
)

function onView(spot) {
  emit('open-spot', spot)
  emit('close')
}
</script>

<style scoped>
.drawer {
  position: fixed;
  top: 48px;
  left: 0;
  bottom: 0;
  width: 360px;
  background: #1f2937;
  color: #f9fafb;
  display: flex;
  flex-direction: column;
  z-index: 900;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.5);
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #374151;
  flex-shrink: 0;
}

.drawer-title {
  font-size: 1rem;
  font-weight: 700;
}

.btn-close {
  background: none;
  border: none;
  color: #d1d5db;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  line-height: 1;
}

.btn-close:hover { background: #374151; color: #fff; }

.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
}

.section-title {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6b7280;
  margin-bottom: 12px;
}

.empty {
  color: #6b7280;
  font-size: 0.875rem;
}

.wishlist-entry {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: #111827;
  border-radius: 8px;
  margin-bottom: 8px;
}

.entry-name {
  font-size: 0.9rem;
  color: #e5e7eb;
}

.entry-actions {
  display: flex;
  gap: 6px;
}

.btn-view {
  padding: 3px 10px;
  font-size: 0.75rem;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-view:hover { background: #2563eb; }

.btn-remove {
  padding: 3px 8px;
  font-size: 0.75rem;
  background: none;
  color: #9ca3af;
  border: 1px solid #374151;
  border-radius: 4px;
  cursor: pointer;
}

.btn-remove:hover { color: #ef4444; border-color: #ef4444; }

.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.25s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(-100%);
}
</style>
