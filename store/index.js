export const state = () => ({
  ID: '',
  cloudRunning: false
})

export const mutations = {
  setID (state, ID) {
    state.ID = ID
  },
  setCloudRunning (state, cloudRunning) {
    state.cloudRunning = cloudRunning
  }
}

export const actions = {
  CheckID () {
    if (process.client) {
      console.log(this.$config.API_URL)
      var ID = localStorage.getItem('ID')
      if (ID === null) {
        this.CreateBackEnd()
      } else {
        // this.ID = ID
        // commit("setID", ID)
        this.$axios
          .post(`/ping`)
          .then((response) => {
            if (response.status == 200) {
              this.cloudRunning = true
              this.GetAllowedFiles()
              this.PingTask()
            } else {
              this.CreateBackEnd()
            }
          })
          .catch(() => {
            this.CreateBackEnd()
          })
      }
    }
  },
  async CreateBackEnd ({ commit }) {
    console.log(this.API)
    await this.$axios
      .post(`/tools/createbackend`)
      .then((response) => {
        console.log('response : ', response)
        if (response.status == 200) {
          commit("setID", response.data.ID)
          localStorage.setItem('ID', this.ID)
          commit("setCloudRunning", true)
        } else {
          console.log('Task creation failed !')
          this.CreateBackEnd()
        }
      })
    // this.GetAllowedFiles()
    this.PingTask()
  },
  PingTask () {
    setInterval(() => this.DoPing(), 10 * 1000)
  },
  DoPing () {
    this.$axios.post(`/ping`).then((response) => {
      console.log(this.path)
      if (response.status != 200) {
        console.log('PingTask response : ', response)
        setTimeout(() => this.DoPing, 2000)
        this.cloudRunning = false
        commit("setCloudRunning", true)
        this.ID = ''
        this.CreateBackEnd()
      }
    })
  },
}