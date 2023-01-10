import { defineStore } from 'pinia'

export const useCloudStore = defineStore('cloud', {
  state: () => {
    return {
      ID: '',
      is_captcha_validated: false,
      is_cloud_running: false,
      is_connexion_launched: false,
      is_under_maintenance: false,
      internal_error: false,
      request_counter: 0
    }

  },
  actions: {
    async create_connexion ({ commit, dispatch }) {
      if (this.is_connexion_launched) { return }
      commit("set_is_connexion_launched", true)
      const ID = localStorage.getItem('ID')
      if (ID === null || typeof ID === 'undefined') {
        return dispatch('create_backend')
      } else {
        try {
          const response = await this.$axios.post(`${ID}/ping`)
          if (response.status === 200) {
            commit("set_id", ID)
            commit("set_is_cloud_running", true)
            return dispatch('ping_task')
          }
        } catch (e) {
          // If first ping fails
          return dispatch('create_backend')
        }
      }
    },
    async create_backend ({ commit, dispatch }) {
      try {
        const response = await this.$axios.post(`${this.$config.SITE_BRANCH}/tools/createbackend`)
        if (response.status == 200) {
          commit("set_id", response.data.ID)
          localStorage.setItem('ID', response.data.ID)
          commit("set_is_cloud_running", true)
          return dispatch('ping_task')
        }
      } catch (e) {
        let status = e.toJSON().status
        if (status === 500) {
          commit("set_internal_error", true)
        } else if (status === 404) {
          commit("set_is_under_maintenance", true)
        }
        console.log("error: ", e.toJSON().message)
      }
    },

    ping_task ({ dispatch }) {
      setInterval(() => dispatch('do_ping'), 10 * 1000)
    },
    async do_ping ({ state, commit }) {
      try {
        const response = await this.$axios.post(`${state.ID}/ping`)
        if (response.status == 200) {
          commit("set_is_cloud_running", true)
        }
      } catch (e) {
        if (state.request_counter == 0) {
          console.log("error: ", e)
          commit("set_is_cloud_running", false)
        }
      }
    },
  },

  mutations: {
    set_id (state, ID) {
      state.ID = ID
    },
    set_is_connexion_launched (state, is_connexion_launched) {
      state.is_connexion_launched = is_connexion_launched
    },
    set_is_cloud_running (state, is_cloud_running) {
      state.is_cloud_running = is_cloud_running
    },
    set_is_under_maintenance (state, is_under_maintenance) {
      state.is_under_maintenance = is_under_maintenance
    },
    set_internal_error (state, internal_error) {
      state.internal_error = internal_error
    },
    set_is_captcha_validated (state, is_captcha_validated) {
      state.is_captcha_validated = is_captcha_validated
    },
    start_request (state) {
      state.request_counter++
    },
    stop_request (state) {
      state.request_counter--
    }
  },
})
