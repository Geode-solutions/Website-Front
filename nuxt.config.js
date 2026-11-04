// While the website is being rebuilt, it only serves the "under construction"
// page and the legal notice (see middleware/under-construction.global.js).
export default defineNuxtConfig({
  devtools: {
    enabled: process.env.NODE_ENV !== "production",
  },

  compatibilityDate: "2024-09-16",
})
