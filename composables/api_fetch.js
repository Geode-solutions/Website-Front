const errors_store = use_errors_store()
const cloud_store = use_cloud_store()
const { ID } = storeToRefs(cloud_store)

export async function api_fetch (request_url, request_options, { request_error_function, response_function, response_error_function } = {}) {
  const config = useRuntimeConfig()
  const base_url = `${config.API_URL}/${ID.value}`

  return useFetch(request_url,
    {
      baseURL: base_url,
      ...request_options,
      onRequestError ({ error }) {
        console.log('onRequestError', error)

        console.log({ "code": '', "route": request_url, 'name': error.message, 'description': error.stack })
        errors_store.add_error({ "code": '', "route": request_url, 'name': error.message, 'description': error.stack })

        if (request_error_function) { request_error_function(error) }
      },
      onResponse ({ response }) {
        if (response.ok) {
          console.log('onResponse', response)
          if (response_function) { response_function(response) }
        }
      },
      onResponseError ({ response }) {
        console.log('onResponseError', response)
        errors_store.add_error({ "code": response.status, "route": request_url, 'name': response._data.name, 'description': response._data.description })
        if (response_error_function) {
          response_error_function(response)
        }
      }
    }
  )
}

export default api_fetch