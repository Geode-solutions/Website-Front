import { defineStore } from 'pinia'

export const use_cloud_store = defineStore('cloud', {
  state: () => ({
    ID: '',
    is_captcha_validated: false,
    is_cloud_running: false,
    is_connexion_launched: false,
    is_under_maintenance: false,
    internal_error: false,
    request_counter: 0
  }),
  actions: {
    async create_connexion () {
      if (this.is_connexion_launched) { return }
      this.is_connexion_launched = true
      const ID = localStorage.getItem('ID')
      if (ID === null || typeof ID === 'undefined') {
        return this.create_backend()
      } else {
        try {
          const config = useRuntimeConfig()
          const { data, error } = await useFetch(`${config.public.API_URL}/${ID}/ping`, { method: 'POST' })
          console.log("dat", data)
          console.log("dat", data != null)
          console.log("dat", data !== null)
          console.log("dat", data.value != null)
          console.log("dat", data.value !== null)
          console.log("error", error)
          if (data !== null) {
            this.ID = ID
            this.is_cloud_running = true
            return this.ping_task()
          }
        } catch (e) {
          // If first ping fails
          console.log("e", e)
          return this.create_backend()
        }
      }
    },
    async create_backend () {
      try {
        const config = useRuntimeConfig()
        const { data, error } = await useFetch(`${config.public.API_URL}${config.public.SITE_BRANCH}/tools/createbackend`, { method: 'POST' })
        this.ID = data.value.ID
        localStorage.setItem('ID', data.value.ID)
        this.is_cloud_running = true
        return this.ping_task()
      } catch (e) {
        console.log("e", e)
        let status = e.toJSON().status
        if (status === 500) {
          this.internal_error = true
        } else if (status === 404) {
          this.is_under_maintenance = true
        }
        console.log("error: ", e.toJSON().message)
      }
    },

    ping_task () {
      setInterval(() => this.do_ping(), 10 * 1000)
    },
    async do_ping () {
      try {
        const config = useRuntimeConfig()
        const { data } = await useFetch(`${config.public.API_URL}/${this.ID}/ping`, { method: 'POST' })
        if (data) {
          this.is_cloud_running = true
        } else {
          this.is_cloud_running = false
        }
      } catch (e) {
        console.log("error : ", e)
      }
    },

    mutations: {
      start_request (state) {
        state.request_counter++
      },
      stop_request (state) {
        state.request_counter--
      }
    }
  }
})
