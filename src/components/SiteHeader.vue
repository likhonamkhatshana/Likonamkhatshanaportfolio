<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { site } from '../data/site'
import ThemeToggle from './ThemeToggle.vue'

const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { open.value = false }) // close the mobile menu after navigating
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink class="brand" to="/" aria-label="Home">Likona<span>.</span></RouterLink>
      <nav id="main-nav" :class="['nav', { open }]" aria-label="Main">
        <RouterLink v-for="item in site.nav" :key="item.to" :to="item.to">{{ item.label }}</RouterLink>
      </nav>
      <div class="header-actions">
        <ThemeToggle />
        <button class="icon-btn menu-btn" type="button" :aria-expanded="open" aria-controls="main-nav" aria-label="Toggle menu" @click="open = !open">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
            <path v-if="!open" d="M3 6h18M3 12h18M3 18h18" /><path v-else d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>
