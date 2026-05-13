<template>
  <header class="topbar">
    <span class="logo">NicaTrip</span>
    <div class="right">
      <div class="chips">
        <span class="chip chip-blue">Spot</span>
        <span class="chip chip-amber">Wishlisted</span>
        <span class="chip chip-green">In Plan</span>
      </div>
      <button class="btn-lists" @click="emit('open-lists')">
        My Lists
        <span v-if="listCount > 0" class="badge">{{ listCount }}</span>
      </button>
    </div>
  </header>
</template>

<script setup>
defineProps({ listCount: { type: Number, default: 0 } })
const emit = defineEmits(['open-lists'])
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 16px;
  background: #111827;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.logo {
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 0.05em;
}

.right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chips {
  display: flex;
  gap: 6px;
}

.chip {
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.chip-blue {
  background: #3b82f6;
  color: #fff;
}

.chip-amber {
  background: #f59e0b;
  color: #fff;
}

.chip-green {
  background: #22c55e;
  color: #fff;
}

.btn-lists {
  padding: 4px 14px;
  border: 1px solid #4b5563;
  border-radius: 6px;
  background: transparent;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.badge {
  background: #f59e0b;
  color: #000;
  font-size: 0.7rem;
  font-weight: 700;
  border-radius: 9999px;
  padding: 1px 6px;
  line-height: 1.4;
}
</style>
