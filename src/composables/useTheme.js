import { ref } from 'vue'

const theme = ref('dark') // dark is the default look

function apply(value) {
  theme.value = value
  document.documentElement.dataset.theme = value
  try { localStorage.setItem('theme', value) } catch { /* storage unavailable */ }
}

export function initTheme() {
  let saved = null
  try { saved = localStorage.getItem('theme') } catch { /* ignore */ }
  apply(saved === 'light' ? 'light' : 'dark')
}

export function useTheme() {
  const toggle = () => apply(theme.value === 'dark' ? 'light' : 'dark')
  return { theme, toggle }
}
