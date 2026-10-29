<script setup>
import { journey } from '../data/journey'
</script>

<template>
  <section aria-labelledby="journey-h">
    <p class="eyebrow">My developer journey</p>
    <h2 id="journey-h" class="display">How I got here</h2>
    <ol class="timeline">
      <li v-for="step in journey" :key="step.title">
        <span class="date">{{ step.date }}</span>
        <h3>{{ step.title }}</h3>
        <p>{{ step.text }}</p>
      </li>
    </ol>
  </section>
</template>
