export const state = () => ({
  ID: '',
  cloudRunning: false
})

export const mutations = {
  setID (state, ID) {
    state.ID = ID
  }
}

export const actions = {
  async CreateBackEnd ({ commit }) {
    console.log(this.API)
    await this.$axios
      .post(`/tools/createbackend`)
      .then((response) => {
        console.log('response : ', response)
        if (response.status == 200) {
          commit("setID", response.data.ID)
          localStorage.setItem('ID', this.ID)
          this.cloudRunning = true
        } else {
          console.log('Task creation failed !')
          this.CreateBackEnd()
        }
      })
    // this.GetAllowedFiles()
    this.PingTask()
  },
}