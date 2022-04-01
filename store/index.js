// State
export const state = () => ({
  ID: '',
  cloudRunning: false
})

// Getters
export const mutations = {
  setID (state, ID) {
    state.ID = ID
  },
  setCloudRunning (state, cloudRunning) {
    state.cloudRunning = cloudRunning
  }
}
// 
// Actions
export const actions = {
  CheckID ({ commit, dispatch }) {
    commit("setID", '123456')
    commit("setCloudRunning", true)
    // if (process.client) {
    //   var ID = localStorage.getItem('ID')
    //   if (ID === null || typeof ID !== 'undefined') {
    //     return dispatch('CreateBackEnd')
    //   } else {
    //     this.$axios
    //       .post(`${ID}/ping`)
    //       .then((response) => {
    //         if (response.status == 200) {
    //           commit("setID", ID)
    //           commit("setCloudRunning", true)
    //           return dispatch('PingTask')
    //         } else {
    //           return dispatch('CreateBackEnd')
    //         }
    //       })
    //       .catch(() => {
    //         return dispatch('CreateBackEnd')
    //       })
    //   }
    // }
  },
  // CreateBackEnd ({ commit, dispatch }) {
  //   this.$axios
  //     .post(`${this.$config.API_URL}tools/createbackend`)
  //     .then((response) => {
  //       if (response.status == 200) {
  //         commit("setID", response.data.ID)
  //         localStorage.setItem('ID', response.data.ID)
  //         commit("setCloudRunning", true)
  //       } else {
  //         return dispatch('CreateBackEnd')
  //       }
  //     })
  //   return dispatch('PingTask')
  // },
  PingTask () {
    setInterval(() => this.dispatch('DoPing'), 10 * 1000)
  },
  DoPing ({ state, dispatch }) {
    this.$axios.post(`${state.ID}/ping`).then((response) => {
      if (response.status != 200) {
        commit("setCloudRunning", false)
        dispatch('CreateBackEnd')
      }
    })
  },
}