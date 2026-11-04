// While the website is being rebuilt, only the "under construction" home page
// and the legal notice are reachable: every other route goes back home.
const ALLOWED_PATHS = ["/", "/legalNotice"]

export default defineNuxtRouteMiddleware((to) => {
  const path = to.path.replace(/\/+$/, "") || "/"
  if (!ALLOWED_PATHS.includes(path)) {
    return navigateTo("/", { redirectCode: 302 })
  }
})
