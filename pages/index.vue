<template>
  <main class="uc">
    <p class="uc-status">
      <span class="uc-dot" aria-hidden="true" />
      Under construction
    </p>

    <h1 class="uc-title">
      <span class="uc-sr">Geode Solutions, new website: </span>
      <span class="uc-mask"><span class="uc-line">Coming</span></span>
      <span class="uc-mask"><span class="uc-line">soon</span></span>
    </h1>

    <div class="uc-circle">
      <div class="uc-logo">
        <ConstructionLogoTransition :delay="250" />
      </div>
    </div>

    <div class="uc-content">
      <p class="uc-text">
        We are rebuilding our website around our new identity. In the meantime,
        we keep turning geological complexity into ease of use, and our team is
        just an email away.
      </p>
      <div class="uc-actions">
        <a class="uc-btn" href="mailto:contact@geode-solutions.com">
          contact@geode-solutions.com
        </a>
        <a
          v-for="link in links"
          :key="link.label"
          class="uc-link"
          :href="link.url"
          target="_blank"
          rel="noopener"
        >
          {{ link.label }}
        </a>
      </div>
    </div>

    <footer class="uc-foot">
      <span>&copy; 2019&ndash;{{ year }} Geode Solutions SAS</span>
      <NuxtLink to="/legalNotice">Legal notice</NuxtLink>
    </footer>
  </main>
</template>

<script setup>
  definePageMeta({ layout: "construction" })

  const description =
    "Geode Solutions is rebuilding its website around its new identity. Turning geological complexity into ease of use."

  useHead({
    title: "Geode Solutions — New website coming soon",
    htmlAttrs: { style: "background-color: #3e6965" },
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "description", content: description },
      { name: "theme-color", content: "#3E6965" },
      { property: "og:title", content: "Geode Solutions" },
      { property: "og:url", content: "https://geode-solutions.com/" },
      { property: "og:description", content: description },
    ],
  })

  const year = new Date().getFullYear()

  const links = [
    {
      label: "LinkedIn",
      url: "https://linkedin.com/company/geode-solutions",
    },
    { label: "GitHub", url: "https://github.com/Geode-solutions" },
  ]
</script>

<style scoped>
  /* Composition taken from the brand book cover: Vert Platine background,
     oversized "ton sur ton" title in Vert Noir, and a large round shape.
     Entrance follows the brand book vocabulary: the round "core sample"
     opens, then each layer settles into place ("superposition strate"). */
  .uc {
    --platine: #3e6965;
    --vert-noir: #0c2825;
    --beige: #eeebe7;
    --fumee: #b2c5cc;
    --orange: #f48830;

    --pad: clamp(20px, 3.4vw, 56px);
    --title-size: clamp(64px, min(13vw, 22vh), 220px);
    --ease: cubic-bezier(0.22, 1, 0.36, 1);

    position: relative;
    min-height: 100vh;
    min-height: 100svh;
    /* Landscape: title and text on the left, the circle on the right */
    display: grid;
    /* The title column is derived from the font size, not from the rendered
       text, so the circle never moves while fonts load */
    grid-template-columns: calc(var(--title-size) * 3.6) minmax(0, 1fr);
    grid-template-rows: auto 1fr;
    column-gap: clamp(32px, 5vw, 96px);
    padding: var(--pad);
    box-sizing: border-box;
    overflow: hidden;
    background: var(--platine);
    color: var(--beige);
    font-family: "Onest", system-ui, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  .uc *,
  .uc *::before,
  .uc *::after {
    box-sizing: border-box;
  }

  .uc p {
    margin: 0;
  }

  .uc-sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  /* Status, top right */
  .uc-status {
    position: absolute;
    top: var(--pad);
    right: var(--pad);
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    animation: uc-fade 0.8s ease 0.1s both;
  }

  .uc-dot {
    position: relative;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--orange);
  }

  .uc-dot::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--orange);
    animation: uc-pulse 2.2s ease-out infinite;
  }

  /* Oversized title, in front of the circle */
  .uc-title {
    grid-column: 1;
    grid-row: 1;
    position: relative;
    z-index: 2;
    margin: calc(var(--title-size) * -0.12) 0 0;
    font-family: "Urbanist", "Onest", sans-serif;
    font-weight: 600;
    font-size: var(--title-size);
    line-height: 0.9;
    letter-spacing: -0.035em;
    color: var(--vert-noir);
  }

  /* Each line drops into place through a mask, like a settling layer */
  .uc-mask {
    display: block;
    /* Only the top edge clips (the line comes from above): descenders such as
       the "g" and side bearings can overflow freely */
    clip-path: inset(0 -0.5em -0.5em -0.5em);
  }

  .uc-line {
    display: block;
    animation: uc-drop 1s var(--ease) 0.2s both;
  }

  .uc-mask + .uc-mask .uc-line {
    animation-delay: 0.32s;
  }

  /* Round shape holding the logo transition: opens like a core sample */
  .uc-circle {
    grid-column: 2;
    grid-row: 1 / span 2;
    place-self: center;
    position: relative;
    z-index: 1;
    width: min(100%, 76vh);
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--beige);
    animation: uc-open 1.2s var(--ease) both;
  }

  .uc-logo {
    width: 78%;
  }

  /* Text and contact, bottom left, settling after the title */
  .uc-content {
    grid-column: 1;
    grid-row: 2;
    align-self: end;
    position: relative;
    z-index: 2;
    max-width: 460px;
    padding-top: 48px;
  }

  .uc-text {
    font-size: 18px;
    line-height: 1.45;
    text-wrap: pretty;
    animation: uc-settle 0.9s var(--ease) 0.55s both;
  }

  .uc-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 20px;
    margin-top: 28px;
    animation: uc-settle 0.9s var(--ease) 0.67s both;
  }

  .uc-btn {
    display: inline-flex;
    align-items: center;
    min-height: 48px;
    padding: 0 24px;
    border-radius: 999px;
    background: var(--beige);
    color: var(--vert-noir);
    font-weight: 500;
    text-decoration: none;
    transition: background-color 0.2s ease;
  }

  .uc-btn:hover {
    background: var(--fumee);
  }

  .uc-link {
    padding: 12px 0;
    color: var(--beige);
    font-weight: 500;
    text-decoration: underline;
    text-decoration-color: rgba(238, 235, 231, 0.4);
    text-underline-offset: 5px;
    transition: text-decoration-color 0.2s ease;
  }

  .uc-link:hover {
    text-decoration-color: currentColor;
  }

  .uc a:focus-visible {
    outline: 2px solid var(--orange);
    outline-offset: 3px;
  }

  /* Footer, bottom right */
  .uc-foot {
    position: absolute;
    right: var(--pad);
    bottom: var(--pad);
    z-index: 2;
    display: flex;
    gap: 20px;
    font-size: 13px;
    color: var(--beige);
    animation: uc-fade 0.8s ease 0.75s both;
  }

  .uc-foot a {
    color: inherit;
  }

  @keyframes uc-fade {
    from {
      opacity: 0;
    }
  }

  @keyframes uc-open {
    from {
      opacity: 0;
      transform: scale(0.55);
    }
  }

  @keyframes uc-drop {
    from {
      transform: translateY(-105%);
    }
  }

  @keyframes uc-settle {
    from {
      opacity: 0;
      transform: translateY(-14px);
    }
  }

  @keyframes uc-pulse {
    from {
      transform: scale(1);
      opacity: 0.7;
    }
    to {
      transform: scale(3.2);
      opacity: 0;
    }
  }

  /* Portrait screens: everything stacks, the circle still overlaps the title */
  @media (max-width: 900px), (max-aspect-ratio: 1/1) {
    .uc {
      --title-size: clamp(64px, 21vw, 180px);

      display: flex;
      flex-direction: column;
    }

    .uc-status {
      position: static;
      margin-bottom: 40px;
    }

    .uc-title {
      margin-top: 0;
    }

    .uc-circle {
      align-self: flex-end;
      width: min(100%, 560px);
      margin-top: calc(var(--title-size) * -0.55);
    }

    .uc-content {
      align-self: flex-start;
      max-width: 520px;
      padding-top: 40px;
    }

    .uc-foot {
      position: static;
      margin-top: 40px;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .uc *,
    .uc *::after {
      animation: none !important;
    }
  }
</style>
