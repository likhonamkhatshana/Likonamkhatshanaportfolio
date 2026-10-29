<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import ProjectCard from './ProjectCard.vue'

const props = defineProps({ projects: { type: Array, required: true } })

// 3 cards on desktop, 2 on tablet, 1 on mobile
const width = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)
const onResize = () => { width.value = window.innerWidth; page.value = Math.min(page.value, maxPage.value) }
onMounted(() => window.addEventListener('resize', onResize))
onBeforeUnmount(() => window.removeEventListener('resize', onResize))

const perView = computed(() => (width.value >= 1024 ? 3 : width.value >= 640 ? 2 : 1))
const page = ref(0)
const maxPage = computed(() => Math.max(0, props.projects.length - perView.value))
const offset = computed(() => `calc(${page.value} * -1 * ((100% - (${perView.value} - 1) * 1.25rem) / ${perView.value} + 1.25rem))`)

const prev = () => { page.value = Math.max(0, page.value - 1) }
const next = () => { page.value = Math.min(maxPage.value, page.value + 1) }
</script>

<template>
  <div>
    <div class="carousel-head">
      <div>
        <p class="eyebrow">Selected work</p>
        <h2 class="display" style="margin:0">Projects</h2>
      </div>
      <div class="carousel-controls">
        <button class="icon-btn" type="button" aria-label="Previous projects" :disabled="page === 0" @click="prev">←</button>
        <button class="icon-btn" type="button" aria-label="Next projects" :disabled="page === maxPage" @click="next">→</button>
      </div>
    </div>
    <div class="carousel-viewport">
      <div class="carousel-track" :style="{ '--per': perView, transform: `translateX(${offset})` }">
        <div v-for="p in projects" :key="p.slug" class="carousel-item"><ProjectCard :project="p" /></div>
      </div>
    </div>
    <div v-if="maxPage > 0" class="dots">
      <button v-for="n in maxPage + 1" :key="n" type="button" :class="['dot', { active: page === n - 1 }]" :aria-label="`Go to position ${n}`" @click="page = n - 1"></button>
    </div>
  </div>
</template>
