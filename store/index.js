
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
      console.log("coucouavant")
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
    try {
      const response = await this.$axios.post(`${this.$config.SITE_BRANCH}/tools/createbackend`)
      if (response.status == 200) {
        commit("setID", response.data.ID)
        localStorage.setItem('ID', response.data.ID)
        commit("setCloudRunning", true)
        return dispatch('PingTask')
      } else {
        return dispatch('CreateBackEnd')
      }
    } catch (e) {
      console.log("error: ", e)
      return dispatch('CreateBackEnd')
    }
  },
  PingTask ({ dispatch }) {
    setInterval(() => dispatch('DoPing'), 10 * 1000)
  },
  DoPing ({ state, dispatch }) {
    try {
      this.$axios.post(`${state.ID}/ping`).then((response) => {
        if (response.status != 200) {
          commit("setCloudRunning", false)
          return dispatch('CreateBackEnd')
        }
      })
    } catch (e) {
      console.log("error: ", e)
      return dispatch('CreateBackEnd')
    }
  }
}
