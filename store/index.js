export const state = () => ({
  ID: '',
  cloudRunning: false
})

export const mutations = {
  setID (state, ID) {
    this.state.ID = ID
  },
  setCloudRunning (cloudRunning) {
    this.cloudRunning = cloudRunning
  }
}

export const actions = {
  CheckID () {
    if (process.client) {
      console.log(this.$config.API_URL)
      var ID = localStorage.getItem('ID')
      if (ID === null || typeof ID !== 'undefined') {
        console.log("ID null")
        this.dispatch('CreateBackEnd')
      } else {
        this.$axios
          .post(`${ID}/ping`)
          .then((response) => {
            if (response.status == 200) {
              this.commit("setID", ID)
              this.commit("setCloudRunning", true)
              this.dispatch('PingTask')
            } else {
              this.dispatch('CreateBackEnd')
            }
          })
          .catch(() => {
            this.dispatch('CreateBackEnd')
          })
      }
    }
  },
  async CreateBackEnd ({ commit }) {
    await this.$axios
      .post(`/tools/createbackend`)
      .then((response) => {
        console.log('response : ', response)
        if (response.status == 200) {
          this.commit("setID", response.data.ID)
          localStorage.setItem('ID', response.data.ID)
          this.commit("setCloudRunning", true)
        } else {
          console.log('Task creation failed !')
          this.dispatch('CreateBackEnd')
        }
      })
    // this.GetAllowedFiles()
    this.dispatch('PingTask')
  },
  PingTask () {
    setInterval(() => this.dispatch('DoPing'), 10 * 1000)
  },
  DoPing () {
    console.log("this.state.ID : ", this.state.ID)
    this.$axios.post(`${this.state.ID}/ping`).then((response) => {
      // console.log(response)
      if (response.status != 200) {
        console.log('PingTask response : ', response)
        commit("setCloudRunning", false)
        this.dispatch('CreateBackEnd')
      }
    })
  },
}