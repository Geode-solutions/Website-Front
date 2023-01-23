export async function api_fetch (request, options) {

  const config = useRuntimeConfig()

  const ID = '123456'
  
  const base_url = `${config.API_URL}/${ID}`
  return useFetch(request, { baseURL: base_url, options })
}

export default api_fetch