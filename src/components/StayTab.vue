<template>
  <div class="stay-tab">
    <div v-if="!accommodations || accommodations.length === 0" class="empty">
      No accommodation data for this spot yet.
    </div>
    <template v-else>
      <!-- Filter chips -->
      <div v-if="availableAmenities.length > 0" class="filter-bar">
        <button
          v-for="amenity in availableAmenities"
          :key="amenity"
          class="chip"
          :class="{ active: selectedAmenities.includes(amenity) }"
          @click="toggleAmenity(amenity)"
        >{{ amenity }}</button>
      </div>

      <!-- Filter summary -->
      <div v-if="selectedAmenities.length > 0" class="filter-summary">
        <span>{{ filtered.length }} of {{ accommodations.length }} stays match</span>
        <button class="btn-clear" @click="selectedAmenities = []">Clear</button>
      </div>

      <!-- Cards -->
      <div class="cards">
        <div v-for="acc in filtered" :key="acc.name" class="card">
          <ImageCarousel :photos="acc.photos ?? []" />

          <div class="card-body">
            <div class="card-header">
              <div>
                <div class="acc-name">{{ acc.name }}</div>
                <div class="acc-meta">
                  <span class="type-badge">{{ acc.type === 'surf-camp' ? '🏄 Surf camp' : '🏨 Hotel' }}</span>
                  <span v-if="acc.rating" class="rating">★ {{ acc.rating }}</span>
                </div>
              </div>
              <button class="btn-heart">♡</button>
            </div>

            <div v-if="acc.nightlyPrice" class="price">${{ acc.nightlyPrice }} / night</div>

            <div v-if="acc.amenities && acc.amenities.length > 0" class="amenities">
              <span v-for="a in acc.amenities" :key="a" class="amenity-chip">{{ a }}</span>
            </div>

            <a
              v-if="acc.instagramHandle"
              :href="`https://instagram.com/${acc.instagramHandle}`"
              target="_blank"
              rel="noopener"
              class="instagram"
            >@{{ acc.instagramHandle }}</a>

            <div v-if="acc.reviews && acc.reviews.length > 0" class="reviews">
              <p v-for="(review, i) in acc.reviews.slice(0, 3)" :key="i" class="review">"{{ review }}"</p>
            </div>

            <button class="btn-plan">Add to Plan</button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import ImageCarousel from './ImageCarousel.vue'

const props = defineProps({ accommodations: { type: Array, default: () => [] } })

const selectedAmenities = ref([])

const availableAmenities = computed(() => {
  const set = new Set()
  for (const acc of props.accommodations ?? []) {
    for (const a of acc.amenities ?? []) set.add(a)
  }
  return [...set]
})

const filtered = computed(() => {
  if (selectedAmenities.value.length === 0) return props.accommodations ?? []
  return (props.accommodations ?? []).filter(acc =>
    selectedAmenities.value.every(a => (acc.amenities ?? []).includes(a))
  )
})

function toggleAmenity(amenity) {
  const idx = selectedAmenities.value.indexOf(amenity)
  if (idx === -1) selectedAmenities.value.push(amenity)
  else selectedAmenities.value.splice(idx, 1)
}

watch(() => props.accommodations, () => { selectedAmenities.value = [] })
</script>

<style scoped>
.stay-tab { display: flex; flex-direction: column; gap: 12px; }

.empty { color: #6b7280; font-size: 0.875rem; }

.filter-bar { display: flex; flex-wrap: wrap; gap: 6px; }

.chip {
  padding: 4px 10px;
  border-radius: 9999px;
  border: 1px solid #374151;
  background: none;
  color: #9ca3af;
  font-size: 0.75rem;
  cursor: pointer;
}
.chip.active { background: #3b82f6; border-color: #3b82f6; color: #fff; }

.filter-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #9ca3af;
}

.btn-clear {
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  font-size: 0.8rem;
}

.cards { display: flex; flex-direction: column; gap: 16px; }

.card {
  background: #111827;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #374151;
}

.card-body { padding: 12px; display: flex; flex-direction: column; gap: 8px; }

.card-header { display: flex; justify-content: space-between; align-items: flex-start; }

.acc-name { font-weight: 600; font-size: 0.95rem; color: #f9fafb; }

.acc-meta { display: flex; gap: 8px; align-items: center; margin-top: 3px; }

.type-badge { font-size: 0.75rem; color: #9ca3af; }

.rating { font-size: 0.75rem; color: #f59e0b; }

.btn-heart {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #9ca3af;
  padding: 0 4px;
  line-height: 1;
}

.price { font-size: 0.875rem; color: #34d399; font-weight: 500; }

.amenities { display: flex; flex-wrap: wrap; gap: 5px; }

.amenity-chip {
  font-size: 0.7rem;
  padding: 2px 7px;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 9999px;
  color: #d1d5db;
}

.instagram { font-size: 0.8rem; color: #818cf8; text-decoration: none; }
.instagram:hover { text-decoration: underline; }

.reviews { display: flex; flex-direction: column; gap: 4px; }

.review {
  font-size: 0.78rem;
  color: #9ca3af;
  font-style: italic;
  margin: 0;
  line-height: 1.4;
}

.btn-plan {
  align-self: flex-start;
  padding: 5px 12px;
  background: #22c55e;
  color: #000;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}
</style>
