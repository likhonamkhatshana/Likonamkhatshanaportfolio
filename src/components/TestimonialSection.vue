<script setup>
import { testimonials } from '../data/testimonials'
</script>

<template>
  <section v-if="testimonials.length" class="container section" aria-labelledby="testi-h">
    <p class="eyebrow">Kind words</p>
    <h2 id="testi-h" class="display">Testimonials</h2>
    <div class="testimonials">
      <figure v-for="(t, i) in testimonials" :key="i" class="card">
        <blockquote>“{{ t.quote }}”</blockquote>
        <figcaption>{{ t.name }}, {{ t.role }}</figcaption>
      </figure>
    </div>
  </section>
</template>
