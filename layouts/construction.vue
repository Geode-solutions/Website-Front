<template>
  <div class="construction-layout">
    <slot />
  </div>
</template>

<script setup>
  useHead({
    htmlAttrs: { lang: "en" },
    meta: [
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Geode Solutions" },
      {
        property: "og:image",
        content: "https://geode-solutions.com/og-image.jpg",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    link: [
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      // Static stylesheet: the font faces are declared once, before any paint
      { rel: "stylesheet", href: "/fonts/fonts.css" },
      {
        rel: "preload",
        href: "/fonts/urbanist-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossorigin: "",
      },
      {
        rel: "preload",
        href: "/fonts/onest-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossorigin: "",
      },
    ],
  })
</script>

<style>
  body {
    margin: 0;
  }
</style>
