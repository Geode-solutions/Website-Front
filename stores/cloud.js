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
      // console.log("create_connexion")
      if (this.is_connexion_launched) { return }
      this.is_connexion_launched = true
      // console.log(this.is_connexion_launched)
      const ID = localStorage.getItem('ID')
      if (ID === null || typeof ID === 'undefined') {
        return this.create_backend()
      } else {
        try {
          const config = useRuntimeConfig()
          await $fetch(`${config.public.API_URL}/${ID}/ping`, { method: 'POST' })
          this.ID = ID
          this.is_cloud_running = true
          return this.ping_task()
        } catch (e) {
          // If first ping fails
          // console.log("e", e)
          return this.create_backend()
        }
      }
    },
    async create_backend () {
      try {
        const config = useRuntimeConfig()
        const { data, error } = await useFetch(`${config.public.BASE_URL}/${config.public.SITE_BRANCH}/tools/createbackend`, { method: 'POST' })
        // console.log("data", data)
        // console.log("error2", error)
        this.ID = data.ID
        localStorage.setItem('ID', data.ID)
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
        await useFetch(`${config.public.API_URL}/${this.ID}/ping`, {
          method: 'POST'
        })
        this.is_cloud_running = true
      } catch (e) {
        if (this.request_counter == 0) {
          console.log("error: ", e)
          this.is_cloud_running = false
        }
      }
    },
  },

  mutations: {
    start_request (state) {
      state.request_counter++
    },
    stop_request (state) {
      state.request_counter--
    }
  },
})
