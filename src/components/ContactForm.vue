<script setup>
import { reactive, ref } from 'vue'

// Set VITE_FORMSPREE_ENDPOINT in .env. No endpoint = the form says it is not connected yet.
const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT
const form = reactive({ name: '', email: '', subject: '', message: '', _gotcha: '' }) // _gotcha is a spam honeypot
const errors = reactive({})
const status = ref('idle') // idle | sending | success | error | unconfigured
const fields = [['name', 'Name', 'text'], ['email', 'Email', 'email'], ['subject', 'Subject', 'text']]

function validate() {
  for (const k of ['name', 'email', 'subject', 'message']) errors[k] = form[k].trim() ? '' : 'This field is required.'
  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address.'
  return !Object.values(errors).some(Boolean)
}

async function submit() {
  if (form._gotcha) return // bots fill the hidden field
  if (!validate()) return
  if (!endpoint) { status.value = 'unconfigured'; return }
  status.value = 'sending'
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, subject: form.subject, message: form.message }),
    })
    if (!res.ok) throw new Error('Request failed')
    status.value = 'success'
    Object.assign(form, { name: '', email: '', subject: '', message: '' })
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <form class="form" novalidate @submit.prevent="submit">
    <div v-for="[key, label, type] in fields" :key="key" class="field">
      <label :for="key">{{ label }}</label>
      <input :id="key" v-model="form[key]" :type="type" :aria-invalid="!!errors[key]" :aria-describedby="errors[key] ? `${key}-err` : null" autocomplete="off" />
      <p v-if="errors[key]" :id="`${key}-err`" class="error">{{ errors[key] }}</p>
    </div>
    <div class="field">
      <label for="message">Message</label>
      <textarea id="message" v-model="form.message" rows="6" :aria-invalid="!!errors.message"></textarea>
      <p v-if="errors.message" class="error">{{ errors.message }}</p>
    </div>
    <input v-model="form._gotcha" class="honeypot" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" />
    <button class="btn btn-primary" type="submit" :disabled="status === 'sending'">{{ status === 'sending' ? 'Sending…' : 'Send message' }}</button>

    <p v-if="status === 'success'" class="status success" role="status">Thank you! Your message has been sent.</p>
    <p v-if="status === 'error'" class="status error-box" role="alert">Something went wrong. Please try again.</p>
    <p v-if="status === 'unconfigured'" class="status error-box" role="alert">The form isn’t connected yet. Add your Formspree endpoint to .env.</p>
  </form>
</template>
