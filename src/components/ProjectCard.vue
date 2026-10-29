<script setup>
defineProps({ project: { type: Object, required: true } })
</script>

<template>
  <RouterLink class="card project-card" :to="`/projects/${project.slug}`">
    <img v-if="project.image" :src="project.image" :alt="`Screenshot of ${project.title}`" class="shot" />
    <div v-else class="shot-placeholder" aria-hidden="true">{{ project.title }}</div>
    <div class="project-body">
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>
      <ul class="tags"><li v-for="t in project.tech" :key="t" class="tag">{{ t }}</li></ul>
      <span class="more">View details →</span>
    </div>
  </RouterLink>
</template>
