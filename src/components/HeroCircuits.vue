<script setup>
/*
  Decorative circuit traces for the hero.
  - Sits BEHIND the content (z-index 0). The hero content must be z-index 1.
  - Left-edge traces stay in the margin; nothing is drawn behind the heading,
    paragraph or buttons, and the middle-left area is also masked down to
    a faint level as a safety net.
  - "feed" traces run from the sides toward the portrait frame and stop just
    short of it with a node.
  - Everything is low opacity. A few traces carry a slow travelling pulse.

  viewBox is 1440 x 640. The portrait frame sits at roughly x 820-1195, y 55-553.
  If your frame is in a different place, move the end points of the "feed" traces
  (and the nodes at the end of them).
*/

const traces = [
  // Left edge (margin only)
  { d: 'M-10 70 H40 L100 128 V190',            tone: 'l', group: 'edge' },
  { d: 'M-10 100 H24 L72 148',                 tone: 'p', group: 'edge' },
  { d: 'M-10 290 H80 L150 360',                tone: 'l', group: 'edge' },
  { d: 'M-10 555 H60 L120 615',                tone: 'p', group: 'edge' },

  // Feed traces toward the portrait frame
  { d: 'M560 22 H770 L818 70 V150',            tone: 'l', group: 'feed', pulse: 9,  delay: 0 },
  { d: 'M180 618 H740 L782 573',               tone: 'p', group: 'feed', pulse: 12, delay: 3 },
  { d: 'M1450 90 H1370 L1318 142 V270 L1238 350', tone: 'p', group: 'feed', pulse: 8,  delay: 1.5 },
  { d: 'M1450 250 H1400 L1360 290',            tone: 'l', group: 'feed' },
  { d: 'M1450 400 H1340 L1285 455 V520 L1232 573', tone: 'l', group: 'feed', pulse: 10, delay: 4 },
  { d: 'M1450 560 H1392 L1340 612 V660',       tone: 'p', group: 'feed' },
  { d: 'M1270 -10 V40 L1230 80 H1215',         tone: 'l', group: 'feed' },
  { d: 'M1100 660 V610 L1140 585',             tone: 'p', group: 'feed' },
]

// Nodes sit at the ENDS of traces only, never behind text.
const nodes = [
  { x: 100,  y: 190, tone: 'l', ring: false, group: 'edge' },
  { x: 150,  y: 360, tone: 'l', ring: true,  group: 'edge', delay: 0.5 },
  { x: 818,  y: 150, tone: 'l', ring: true,  group: 'feed', delay: 1 },
  { x: 782,  y: 573, tone: 'p', ring: false, group: 'feed' },
  { x: 1238, y: 350, tone: 'p', ring: true,  group: 'feed', delay: 2 },
  { x: 1232, y: 573, tone: 'l', ring: true,  group: 'feed', delay: 3 },
  { x: 1215, y: 80,  tone: 'l', ring: false, group: 'feed' },
  { x: 1140, y: 585, tone: 'p', ring: false, group: 'feed' },
]
</script>

<template>
  <svg
    class="circuits"
    viewBox="0 0 1440 640"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    focusable="false"
  >
    <!-- static traces -->
    <g class="traces">
      <path
        v-for="(t, i) in traces"
        :key="'t' + i"
        :d="t.d"
        :class="['trace', t.tone, t.group]"
      />
    </g>

    <!-- slow travelling pulses on selected traces -->
    <g class="pulses">
      <template v-for="(t, i) in traces" :key="'p' + i">
        <path
          v-if="t.pulse"
          :d="t.d"
          pathLength="1000"
          :class="['pulse', t.tone, t.group]"
          :style="{ animationDuration: t.pulse + 's', animationDelay: (t.delay || 0) + 's' }"
        />
      </template>
    </g>

    <!-- nodes -->
    <g class="nodes">
      <g
        v-for="(n, i) in nodes"
        :key="'n' + i"
        :class="['node', n.tone, n.group]"
      >
        <circle :cx="n.x" :cy="n.y" r="4" class="dot" />
        <circle
          v-if="n.ring"
          :cx="n.x"
          :cy="n.y"
          r="9"
          class="ring"
          :style="{ animationDelay: (n.delay || 0) + 's' }"
        />
      </g>
    </g>
  </svg>
</template>

<style scoped>
.circuits {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;              /* behind the hero content */
  pointer-events: none;
  /* Safety net: even if a line drifts under the text column, it is faint there */
  -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 9%, rgba(0,0,0,.2) 15%, rgba(0,0,0,.2) 50%, #000 57%, #000 100%);
          mask-image: linear-gradient(90deg, #000 0%, #000 9%, rgba(0,0,0,.2) 15%, rgba(0,0,0,.2) 50%, #000 57%, #000 100%);
}

/* ---- colours (use the site tokens, so light mode works too) ---- */
.p { --c: var(--pink); }
.l { --c: var(--lavender); }
:root[data-theme='light'] .p { --c: #a23a58; }
:root[data-theme='light'] .l { --c: #7a5fa3; }

/* ---- lines: keep these low so the circuits stay decorative ---- */
.trace {
  fill: none;
  stroke: var(--c);
  stroke-width: 1.4;
  stroke-linejoin: round;
  stroke-linecap: round;
  opacity: 0.22;
}
.pulse {
  fill: none;
  stroke: var(--c);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-dasharray: 45 955;       /* short dash on a 1000-unit path */
  opacity: 0.5;
  animation: travel 10s linear infinite;
}
@keyframes travel {
  from { stroke-dashoffset: 0; }
  to   { stroke-dashoffset: -1000; }
}

.dot  { fill: var(--c); opacity: 0.45; }
.ring {
  fill: none;
  stroke: var(--c);
  stroke-width: 1;
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  animation: ping 5s ease-out infinite;
}
@keyframes ping {
  0%   { transform: scale(0.6); opacity: 0.4; }
  70%  { transform: scale(1.6); opacity: 0; }
  100% { transform: scale(1.6); opacity: 0; }
}

/* ---- responsive ---- */
/* Narrow screens: the text column reaches the left margin, so drop the edge traces */
@media (max-width: 1180px) {
  .edge { display: none; }
}
/* Stacked layout: keep it very quiet */
@media (max-width: 820px) {
  .circuits { opacity: 0.6; }
}

/* ---- motion ---- */
@media (prefers-reduced-motion: reduce) {
  .pulse { display: none; }
  .ring  { animation: none; opacity: 0; }
}
</style>