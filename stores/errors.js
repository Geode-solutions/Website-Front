import { defineStore } from 'pinia'

export const use_errors_store = defineStore('errors', {
  state: () => ({
    errors: [
      // {
      //   "code": 404,
      //   "route": '/fileconverter/toto',
      //   "description": "The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.",
      //   "name": "Not Founddddddddddddddddddddddddddddddddddddddddddddddddddddddxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      // },
      // {
      //   "code": 400,
      //   "route": '/fileconverter/convertfile',
      //   "description": "No object sent.",
      //   "name": "Bad Request"
      // }
    ],
    server_error: false,
  }),
  actions: {
    add_error (error_object) {
      this.errors.push(error_object)
      console.log(this.errors)
    },
    delete_error (error_index) {
      this.errors.splice(error_index, 1)
    },
    delete_server_error () {
      this.server_error = false
    }
  }
})
