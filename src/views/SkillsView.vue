<script setup>
import { skillCategories } from '../data/skills'
import SkillCategory from '../components/SkillCategory.vue'
</script>

<template>
  <section class="container page-head">
    <p class="eyebrow">What I work with</p>
    <h1 class="display">Skills</h1>
    <p class="lead">The tools and technologies I’m learning and using right now.</p>
  </section>
  <section class="container section" style="padding-top:1rem">
    <div class="skills-grid"><SkillCategory v-for="c in skillCategories" :key="c.title" :category="c" /></div>
  </section>
</template>
