export async function api_fetch (request, options) {

  const config = useRuntimeConfig()
  const ID = '123456'
  console.log(request)
  console.log(options)
  const base_url = `${config.API_URL}/${ID}`
  return $fetch(request, { baseURL: base_url, ...options })
}

export default api_fetch