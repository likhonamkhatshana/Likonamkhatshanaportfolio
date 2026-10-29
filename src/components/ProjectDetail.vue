<script setup>
defineProps({ project: { type: Object, required: true } })
</script>

<template>
  <section class="container section">
    <RouterLink class="link-pink back-link" to="/projects">← Back to projects</RouterLink>
    <h1 class="display">{{ project.title }}</h1>
    <p class="lead">{{ project.description }}</p>
    <ul class="tags"><li v-for="t in project.tech" :key="t" class="tag">{{ t }}</li></ul>

    <img v-if="project.image" :src="project.image" :alt="`Screenshot of ${project.title}`" class="card" style="margin-top:2rem;padding:0" />

    <div class="cta-row">
      <a v-if="project.liveUrl" class="btn btn-primary" :href="project.liveUrl" target="_blank" rel="noopener">View live</a>
      <a v-if="project.repoUrl" class="btn btn-outline" :href="project.repoUrl" target="_blank" rel="noopener">View code</a>
    </div>

    <div class="detail-grid">
      <article class="card"><h3>Overview</h3><p>{{ project.overview }}</p></article>
      <article class="card"><h3>The problem</h3><p>{{ project.problem }}</p></article>
      <article class="card"><h3>Key features</h3><ul><li v-for="f in project.features" :key="f">{{ f }}</li></ul></article>
      <article class="card"><h3>My role</h3><p>{{ project.role }}</p></article>
      <article class="card"><h3>Challenges</h3><p>{{ project.challenges }}</p></article>
      <article class="card"><h3>Lessons learned</h3><p>{{ project.lessons }}</p></article>
    </div>
  </section>
</template>
