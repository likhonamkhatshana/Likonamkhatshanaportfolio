<script setup>
import { site } from '../data/site'
import ContactForm from '../components/ContactForm.vue'
import SocialLinks from '../components/SocialLinks.vue'
</script>

<template>
  <section class="container section contact-grid">
    <div>
      <p class="eyebrow">Get in touch</p>
      <h1 class="display">Let’s build something <em style="color:var(--pink)">meaningful.</em></h1>
      <p class="lead">Have a question, an opportunity or just want to say hi? Send a message and I’ll reply as soon as I can.</p>
      <ul class="contact-list">
        <li><strong>Email:</strong> <a :href="`mailto:${site.email}`">{{ site.email }}</a></li>
        <li><strong>Location:</strong> {{ site.location }}</li>
      </ul>
      <div style="margin-top:1.5rem"><SocialLinks /></div>
    </div>
    <ContactForm />
  </section>
</template>
