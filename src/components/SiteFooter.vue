<script setup>
import { site } from '../data/site'
import SocialLinks from './SocialLinks.vue'
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <nav aria-label="Footer">
        <ul class="footer-nav">
          <li v-for="item in site.nav" :key="item.to"><RouterLink :to="item.to">{{ item.label }}</RouterLink></li>
        </ul>
      </nav>
      <SocialLinks />
      <p class="copyright">© {{ new Date().getFullYear() }} {{ site.name }}. All rights reserved.</p>
    </div>
  </footer>
</template>
