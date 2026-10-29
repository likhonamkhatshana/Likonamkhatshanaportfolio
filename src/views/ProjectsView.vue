<script setup>
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard.vue'
</script>

<template>
  <section class="container page-head">
    <p class="eyebrow">Selected work</p>
    <h1 class="display">Projects</h1>
    <p class="lead">A few things I’ve built while learning. Select one for the full story.</p>
  </section>
  <section class="container section" style="padding-top:1rem">
    <div class="projects-grid"><ProjectCard v-for="p in projects" :key="p.slug" :project="p" /></div>
  </section>
</template>
