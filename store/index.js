
export const state = () => ({
  ID: '',
  connexionLaunched: false,
  cloudRunning: false
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
      const botRegex = /bot|googlebot|crawler|spider|robot|crawling/i
      const isBot = navigator.userAgent && botRegex.test(navigator.userAgent)
      if (!isBot) {
        const response = await this.$axios.post(`${this.$config.SITE_BRANCH}/tools/createbackend`)
        if (response.status == 200) {
          commit("setID", response.data.ID)
          localStorage.setItem('ID', response.data.ID)
          commit("setCloudRunning", true)
          return dispatch('PingTask')
        }
      }
    } catch (e) {
      console.log("error: ", e)
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
      commit("setCloudRunning", false)
    }
  }
}
