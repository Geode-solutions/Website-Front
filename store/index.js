
export const state = () => ({
  ID: '',
  connexionLaunched: false,
  cloudRunning: false,
  underMaintenance: false,
  internalError: false,
  captchaValidated: false
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
        return dispatch('CreateBackEnd')
      }
    }
  },
  async CreateBackEnd ({ commit, dispatch }) {
    const botRegex = /bot|googlebot|crawler|spider|robot|crawling/i
    const isBot = navigator.userAgent && botRegex.test(navigator.userAgent)
    if (!isBot) {
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
    }
  },
  PingTask ({ dispatch }) {
    setInterval(() => dispatch('DoPing'), 10 * 1000)
  },
  async DoPing ({ state }) {
    try {
      const response = await this.$axios.post(`${state.ID}/ping`)
      if (response.status != 200) {
        commit("setCloudRunning", false)
      }
    } catch (e) {
      console.log("error: ", e)
    }
  }
}
