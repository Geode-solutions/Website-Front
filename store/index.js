// State
export const state = () => ({
  ID: '',
  cloudRunning: false
})
// Mutations
export const mutations = {
  setID (state, ID) {
    state.ID = ID
  },
  setCloudRunning (state, cloudRunning) {
    state.cloudRunning = cloudRunning
  }
}
// Actions
export const actions = {
  async CheckID ({ commit, dispatch }) {
    var ID = localStorage.getItem('ID')
    if (ID === null || typeof ID !== 'undefined') {
      return dispatch('CreateBackEnd')
    } else {
      var response = await this.$axios.post(`${ID}/ping`)
      if (response.status == 200) {
        commit("setID", ID)
        commit("setCloudRunning", true)
        return dispatch('PingTask')
      } else {
        return dispatch('CreateBackEnd')
      }
    }
  },
  async CreateBackEnd ({ commit, dispatch }) {
    const response = await this.$axios.post(`${this.$config.API_URL}tools/createbackend`)
    if (response.status == 200) {
      commit("setID", response.data.ID)
      localStorage.setItem('ID', response.data.ID)
      commit("setCloudRunning", true)
      return dispatch('PingTask')
    } else {
      return dispatch('CreateBackEnd')
    }
  },
  PingTask () {
    setInterval(() => this.dispatch('DoPing'), 10 * 1000)
  },
  DoPing ({ state, dispatch }) {
    this.$axios.post(`${state.ID}/ping`).then((response) => {
      if (response.status != 200) {
        commit("setCloudRunning", false)
        return dispatch('CreateBackEnd')
      }
    })
  },
}