<template>
  <div class="carousel">
    <div v-if="photos.length === 0" class="placeholder">No photos</div>
    <template v-else>
      <img :src="photos[active]" :alt="`Photo ${active + 1}`" class="photo" />
      <button v-if="photos.length > 1" class="arrow prev" @click.stop="prev">‹</button>
      <button v-if="photos.length > 1" class="arrow next" @click.stop="next">›</button>
      <div v-if="photos.length > 1" class="dots">
        <button
          v-for="(_, i) in photos"
          :key="i"
          class="dot"
          :class="{ active: i === active }"
          @click.stop="active = i"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({ photos: { type: Array, default: () => [] } })
const active = ref(0)

watch(() => props.photos, () => { active.value = 0 })

function next() { active.value = (active.value + 1) % props.photos.length }
function prev() { active.value = (active.value - 1 + props.photos.length) % props.photos.length }
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  height: 180px;
  background: #111827;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #4b5563;
  font-size: 0.875rem;
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.5);
  color: #fff;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  padding: 4px 10px;
  cursor: pointer;
  border-radius: 4px;
}

.prev { left: 6px; }
.next { right: 6px; }

.dots {
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 5px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  border: none;
  cursor: pointer;
  padding: 0;
}

.dot.active { background: #fff; }
</style>
