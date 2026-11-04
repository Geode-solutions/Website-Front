<template>
  <svg
    class="logo-transition"
    viewBox="0 0 1286 310"
    role="img"
    aria-label="Geode Solutions"
  >
    <defs>
      <linearGradient
        :id="FADE_ID"
        gradientUnits="userSpaceOnUse"
        :x1="frame.edge - FADE_WIDTH"
        :x2="frame.edge"
        y1="0"
        y2="0"
      >
        <stop offset="0" stop-color="#fff" />
        <stop offset="1" stop-color="#000" />
      </linearGradient>
      <mask :id="MASK_ID" maskUnits="userSpaceOnUse">
        <rect
          x="-100"
          y="-100"
          width="1500"
          height="510"
          :fill="`url(#${FADE_ID})`"
        />
      </mask>
    </defs>

    <g :transform="`translate(${frame.shift} 0)`">
      <g :transform="frame.stage">
        <!-- Previous logo, morphing piece by piece into the new mark -->
        <template v-if="!frame.settled">
          <path
            v-for="(shape, index) in frame.shapes"
            :key="index"
            :d="shape.d"
            :fill="shape.fill"
            :opacity="shape.opacity"
          />
          <!-- Original file on top at first, for its exact details -->
          <image
            v-if="frame.old_opacity > 0"
            :href="old_logo_url"
            :x="OLD_LOGO_BOX.x"
            :y="OLD_LOGO_BOX.y"
            :width="OLD_LOGO_BOX.width"
            :height="OLD_LOGO_BOX.height"
            :opacity="frame.old_opacity"
          />
        </template>

        <!-- Official mark once the morph is over -->
        <template v-else>
          <path
            v-for="(path, index) in MARK_PATHS"
            :key="index"
            :d="path.d"
            :opacity="path.opacity"
            :fill="INK"
          />
        </template>
      </g>

      <!-- Wordmark, revealed with a soft left-to-right fade -->
      <g :mask="`url(#${MASK_ID})`">
        <path
          v-for="(d, index) in WORD_PATHS"
          :key="index"
          :d="d"
          :fill="INK"
        />
      </g>
    </g>
  </svg>
</template>

<script setup>
  import old_logo_url from "@/assets/img/logo.svg"
  import {
    MARK_PATHS,
    OLD_LOGO_BOX,
    SHAPES,
    WORD_PATHS,
  } from "./logoMorphData.js"

  const props = defineProps({
    // Delay before the transition starts, in milliseconds
    delay: { type: Number, default: 300 },
    // Final colour of the new logo: an official version (Anthracite on light
    // backgrounds, white on dark ones)
    ink: { type: String, default: "#1E1E1E" },
    // Size of the mark on its own, before it slides next to the wordmark
    startScale: { type: Number, default: 2 },
  })

  const clamp = (value) => Math.min(1, Math.max(0, value))
  const progress = (step, t) => clamp((t - step.start) / step.duration)
  const lerp = (a, b, t) => a + (b - a) * t
  const in_out = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  const out = (t) => 1 - Math.pow(1 - t, 3)

  // Unique ids for the mask and gradient of this instance
  const uid = useId()
  const FADE_ID = `lt-fade-${uid}`
  const MASK_ID = `lt-mask-${uid}`

  const INK = props.ink
  const FADE_WIDTH = 160

  // Timeline, in milliseconds after the delay
  const MORPH = { start: 0, duration: 1300 }
  const OLD_FADE = { start: 0, duration: 380 }
  const SLIDE = { start: 1250, duration: 950 }
  const REVEAL = { start: 1500, duration: 1000 }
  const END = REVEAL.start + REVEAL.duration

  // Mark centered in the lockup at first, shown larger on its own
  const START_SHIFT = 643 - 155
  const START_SCALE = props.startScale

  // Shape modes (see logoMorphData.js):
  // - morph: a piece of the previous logo becomes a piece of the new mark
  // - merge: a secondary piece melts into the closest band and vanishes
  // - appear: a band underside, fading in once the bands are in place
  // Secondary pieces are drawn below the solid bands, so they never cross
  // over them. In the final mark everything is the same ink, so the stacking
  // order no longer shows.
  const layer = (shape) => {
    if (shape.mode === "appear") return 0
    if (shape.mode === "merge") return 1
    return shape.opacity < 1 ? 2 : 3
  }
  const DRAW_ORDER = SHAPES.map((_, i) => i).sort(
    (a, b) => layer(SHAPES[a]) - layer(SHAPES[b]),
  )

  const to_path = (points, t, from) => {
    let d = ""
    for (let k = 0; k < points.length; k += 2) {
      const x = from ? lerp(from[k], points[k], t) : points[k]
      const y = from ? lerp(from[k + 1], points[k + 1], t) : points[k + 1]
      d += `${k ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`
    }
    return d + "Z"
  }

  // The morph sweeps from top to bottom, like strata settling
  const center_y = (points) => {
    let sum = 0
    for (let k = 1; k < points.length; k += 2) sum += points[k]
    return sum / (points.length / 2)
  }
  const STAGGER = SHAPES.map((shape) => (center_y(shape.to) / 310) * 140)
  const APPEAR_PATHS = SHAPES.map((shape) =>
    shape.mode === "appear" ? to_path(shape.to, 1) : null,
  )

  const time = ref(0)

  function mix(from, to, t) {
    const parse = (color) =>
      [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16))
    const a = parse(from)
    const b = parse(to)
    return (
      "#" +
      a
        .map((value, i) =>
          Math.round(lerp(value, b[i], t))
            .toString(16)
            .padStart(2, "0"),
        )
        .join("")
    )
  }

  // One shared tint for the whole logo, from the previous teal to the final
  // colour, so every piece changes together
  function tint_at(color, t) {
    const tint = in_out(clamp((t - MORPH.start) / (MORPH.duration * 0.85)))
    return mix(color, INK, tint)
  }

  function shape_at(shape, index, t) {
    if (shape.mode === "appear") {
      const start = MORPH.start + MORPH.duration * 0.6
      const fade = clamp((t - start) / (MORPH.duration * 0.4))
      return {
        d: APPEAR_PATHS[index],
        fill: INK,
        opacity: (shape.opacity * fade).toFixed(3),
      }
    }
    const span = MORPH.duration - 140
    const local = in_out(clamp((t - MORPH.start - STAGGER[index]) / span))
    const opacity =
      shape.mode === "merge"
        ? 1 - clamp((local - 0.15) / 0.35)
        : lerp(1, shape.opacity, local)
    return {
      d: to_path(shape.to, local, shape.from),
      fill: tint_at(shape.color, t),
      opacity: opacity.toFixed(3),
    }
  }

  const frame = computed(() => {
    const t = time.value
    const slide = in_out(progress(SLIDE, t))
    const scale = lerp(START_SCALE, 1, slide)
    const settled = t >= MORPH.start + MORPH.duration
    return {
      settled,
      shapes: settled ? [] : DRAW_ORDER.map((i) => shape_at(SHAPES[i], i, t)),
      old_opacity: 1 - progress(OLD_FADE, t),
      shift: lerp(START_SHIFT, 0, slide).toFixed(2),
      stage: `translate(155 155) scale(${scale.toFixed(4)}) translate(-155 -155)`,
      edge: lerp(330, 1286 + FADE_WIDTH, out(progress(REVEAL, t))),
    }
  })

  let raf = null
  let timer = null

  function run() {
    const start = performance.now()
    const tick = (now) => {
      time.value = Math.min(END, Math.max(0, now - start))
      if (time.value < END) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
  }

  onMounted(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      time.value = END
    } else {
      timer = setTimeout(run, props.delay)
    }
  })

  onBeforeUnmount(() => {
    clearTimeout(timer)
    cancelAnimationFrame(raf)
  })
</script>

<style scoped>
  .logo-transition {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }
</style>
