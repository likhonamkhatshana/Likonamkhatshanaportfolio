<script setup>
import { computed } from 'vue'
import ProjectDetail from '../components/ProjectDetail.vue'
import { projects } from '../data/projects'

const props = defineProps({ slug: String })
const project = computed(() => projects.find((p) => p.slug === props.slug))
</script>

<template>
  <ProjectDetail v-if="project" :project="project" />
  <section v-else class="container section">
    <h1 class="display">Project not found</h1>
    <RouterLink class="link-pink" to="/projects">Back to projects</RouterLink>
  </section>
</template>
