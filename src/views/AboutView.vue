<script setup>
import { site } from '../data/site'
import DeveloperJourney from '../components/DeveloperJourney.vue'
</script>

<template>
  <section class="container page-head">
    <p class="eyebrow">About me</p>
    <h1 class="display">Hi, I’m Likona.</h1>
  </section>
  <section class="container section about-grid">
    <div>
      <p v-for="p in site.about" :key="p" class="lead">{{ p }}</p>
      <div class="cta-row"><a class="btn btn-primary" :href="site.cvPath" download>Download CV</a></div>
    </div>
    <DeveloperJourney />
  </section>
</template>
