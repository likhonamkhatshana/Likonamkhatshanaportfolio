<script setup>
defineProps({ category: { type: Object, required: true } })
</script>

<template>
  <article class="card">
    <h3>{{ category.title }}</h3>
    <p class="muted">{{ category.note }}</p>
    <ul class="tags"><li v-for="s in category.skills" :key="s" class="tag">{{ s }}</li></ul>
  </article>
</template>
