<script setup>
import { projects } from '../data/projects'
import HeroSection from '../components/HeroSection.vue'
import ProjectCarousel from '../components/ProjectCarousel.vue'
import TestimonialSection from '../components/TestimonialSection.vue'
</script>

<template>
  <HeroSection />
  <section class="container section"><ProjectCarousel :projects="projects" /></section>
  <TestimonialSection />
</template>
