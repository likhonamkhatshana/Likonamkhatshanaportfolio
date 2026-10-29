<script setup>
const paths = [
  'M0 120 H180 L240 180 H420',
  'M0 300 H120 L180 360 H360 L420 420 H640',
  'M120 600 V480 L180 420',
  'M1200 90 H980 L920 150 H760 L700 210 H560',
  'M1200 330 H1040 L980 390 H860',
  'M1200 520 H900 L840 460 H700',
  'M420 180 V60 H520',
  'M640 420 V560',
  'M560 210 V320 H640',
]
const nodes = [
  { x: 420, y: 180, big: true }, { x: 640, y: 420, big: true, pink: true },
  { x: 520, y: 60 }, { x: 560, y: 210, big: true }, { x: 640, y: 320 },
  { x: 640, y: 560 }, { x: 180, y: 420 }, { x: 120, y: 600 },
  { x: 860, y: 390, big: true, pink: true }, { x: 700, y: 460 }, { x: 700, y: 210 },
  { x: 920, y: 150 }, { x: 980, y: 390 }, { x: 240, y: 180 },
  { x: 180, y: 360 }, { x: 760, y: 150, pink: true },
]
const chips = [{ x: 380, y: 400, w: 40, h: 40 }, { x: 540, y: 300, w: 28, h: 28 }, { x: 830, y: 440, w: 36, h: 36 }]
</script>

<template>
  <svg class="circuit" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <g class="traces"><path v-for="(d, i) in paths" :key="'t' + i" :d="d" /></g>
    <g class="pulses">
      <path v-for="(d, i) in paths" :key="'p' + i" :d="d" pathLength="100"
        :style="{ animationDuration: 5 + (i % 4) * 1.5 + 's', animationDelay: -i * 1.3 + 's' }" />
    </g>
    <g class="chips"><rect v-for="(c, i) in chips" :key="'c' + i" :x="c.x" :y="c.y" :width="c.w" :height="c.h" rx="4" /></g>
    <g class="nodes">
      <g v-for="(n, i) in nodes" :key="'n' + i" :class="{ pink: n.pink }">
        <circle v-if="n.big" class="ring" :cx="n.x" :cy="n.y" r="10" />
        <circle class="dot" :cx="n.x" :cy="n.y" r="4.5" />
      </g>
    </g>
  </svg>
</template>

<style scoped>
.circuit {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  color: var(--accent, #CDBBE3);
  -webkit-mask-image: linear-gradient(to bottom, #000 55%, transparent 100%);
  mask-image: linear-gradient(to bottom, #000 55%, transparent 100%);
}
.traces path, .pulses path { fill: none; stroke-linecap: round; stroke-linejoin: round; }
.traces path { stroke: currentColor; stroke-width: 1.6; opacity: 0.4; }
.pulses path { stroke: var(--pink, #F4A8B6); stroke-width: 2.4; stroke-dasharray: 5 95; animation: flow linear infinite; opacity: 0.9; }
.chips rect { fill: none; stroke: currentColor; stroke-width: 1.4; opacity: 0.45; }
.dot { fill: currentColor; opacity: 0.75; }
.ring { fill: none; stroke: currentColor; stroke-width: 1.4; opacity: 0.5; }
.pink .dot { fill: var(--pink, #F4A8B6); opacity: 1; animation: glow 3.5s ease-in-out infinite; }
.pink .ring { stroke: var(--pink, #F4A8B6); }

@keyframes flow { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
@keyframes glow { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }

@media (prefers-reduced-motion: reduce) {
  .pulses { display: none; }
  .pink .dot { animation: none; }
}
</style>