import { defineStore } from 'pinia'

export const use_errors_store = defineStore('errors', {
  state: () => ({
    errors: [
      { 'code': 500, 'route': '/fileconverter/convert_file', 'message': 'Couldn\'t cast string to number' },
      { 'code': 404, 'route': '/fileconverter/ping', 'message': 'Not found' },
    ],
    server_error: false,
  }),
  actions: {
    add_error (error_object) {
      console.log('toto')
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
