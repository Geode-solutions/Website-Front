
export const state = () => ({
  ID: '',
  connexionLaunched: false,
  cloudRunning: false,
  underMaintenance: false,
  internalError: false,
  captchaValidated: false,
  requestCounter: 0
})
export const mutations = {
  setID (state, ID) {
    state.ID = ID
  },
  setConnexionLaunched (state, connexionLaunched) {
    state.connexionLaunched = connexionLaunched
  },
  setCloudRunning (state, cloudRunning) {
    state.cloudRunning = cloudRunning
  },
  setUnderMaintenance (state, underMaintenance) {
    state.underMaintenance = underMaintenance
  },
  setInternalError (state, internalError) {
    state.internalError = internalError
  },
  setCaptchaValidated (state, captchaValidated) {
    state.captchaValidated = captchaValidated
  },
  startRequest (state) {
    state.requestCounter++
  },
  stopRequest (state) {
    state.requestCounter--
  }
}
export const actions = {
  async createConnexion ({ commit, dispatch }) {
    if (this.state.connexionLaunched) { return }
    commit("setConnexionLaunched", true)
    const ID = localStorage.getItem('ID')
    if (ID === null || typeof ID === 'undefined') {
      return dispatch('CreateBackEnd')
    } else {
      try {
        const response = await this.$axios.post(`${ID}/ping`)
        if (response.status === 200) {
          commit("setID", ID)
          commit("setCloudRunning", true)
          return dispatch('PingTask')
        }
      } catch (e) {
        // If first ping fails
        return dispatch('CreateBackEnd')
      }
    }
  },
  async CreateBackEnd ({ commit, dispatch }) {
    try {
      const response = await this.$axios.post(`${this.$config.SITE_BRANCH}/tools/createbackend`)
      if (response.status == 200) {
        commit("setID", response.data.ID)
        localStorage.setItem('ID', response.data.ID)
        commit("setCloudRunning", true)
        return dispatch('PingTask')
      }
    } catch (e) {
      let status = e.toJSON().status
      if (status === 500) {
        commit("setInternalError", true)
      } else if (status === 404) {
        commit("setUnderMaintenance", true)
      }
      console.log("error: ", e.toJSON().message)
    }
  },

  PingTask ({ dispatch }) {
    setInterval(() => dispatch('DoPing'), 10 * 1000)
  },
  async DoPing ({ state, commit }) {
    try {
      const response = await this.$axios.post(`${state.ID}/ping`)
      if (response.status == 200) {
        commit("setCloudRunning", true)
      }
    } catch (e) {
      if (state.requestCounter == 0) {
        console.log("error: ", e)
        commit("setCloudRunning", false)
      }
    }
  }
}
