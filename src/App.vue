<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import ClosingSection from './components/ClosingSection.vue'

const route = useRoute()
// The Contact page already uses the closing heading, so skip the closing section there.
const showClosing = computed(() => route.name !== 'contact')
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <SiteHeader />
  <main id="main"><RouterView /></main>
  <ClosingSection v-if="showClosing" />
  <SiteFooter />
</template>
