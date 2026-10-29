<script setup>
import TechBlueprintBackground from './TechBlueprintBackground.vue'
import { ref } from 'vue'
import { site } from '../data/site'
const photoMissing = ref(false)
</script>

<template>
  <section class="hero">
    <TechBlueprintBackground />
    <div class="container hero-grid">
      <div>
        <p class="eyebrow">{{ site.role }}</p>
        <h1 class="display hero-title">A Full-Stack Developer <em>in the Making.</em></h1>
        <p class="lead">Hi, I’m {{ site.name }},I'm an aspiring software developer building my technical foundation through hands-on projects, continuous learning and practical problem-solving. My Journey is about more than learning code ,it's about becoming someone who can turn ideas into thoughful, functional digital experiences.</p>
        <div class="cta-row">
          <RouterLink class="btn btn-primary" to="/projects">Explore My Projects</RouterLink>
          <RouterLink class="btn btn-outline" to="/about">Get to Know Me</RouterLink>
          <a class="link-underline" :href="site.cvPath" download>Download CV</a>
        </div>
      </div>
      <div class="portrait">
        <img v-if="!photoMissing" src="/images/portrait.png" :alt="`Portrait of ${site.name}`" @error="photoMissing = true" />
        <p v-else>Portrait unavailable</p>
      </div>
    </div>
  </section>
</template>
