// export default function api_fetch (url, options) {
//     const config = useRuntimeConfig()
//     const API_URL = config.public.API_URL
//     return $fetch(`${url}`, options, { baseURL: API_URL })
// }

export function api_fetch (url, options = {}) {
    const config = useRuntimeConfig()
    const API_URL = config.public.API_URL

    // console.log(url)
    return $fetch(`/${url}`, options, { baseURL: API_URL })
}


