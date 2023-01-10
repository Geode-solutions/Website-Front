import { defineStore } from 'pinia'

export const use_tools_store = defineStore('tools', {
  state: () => {
    return {
      accepted_extensions: '',
      files: [],
      packages_versions: []
    }
  },
  actions: {
    async get_allowed_files (tool_route) {
      const { data } = await useFetch(`${this.ID}/${tool_route}/allowedfiles`)
      const extensions = data.extensions.map((extension) => '.' + extension)
      this.accepted_extensions = extensions.join(',')
    },
    async get_packages_versions (tool_route) {
      const { data } = await useFetch(`${this.ID}/${tool_route}/versions`)
      this.packages_versions = data.versions
    },

    async get_allowed_objects (changedFiles, tool_route) {
      this.success = true
      this.message = 'File(s) selected'
      this.files = [changedFiles]

      const params = new FormData()
      params.append('filename', this.files[0].name)

      const data = await this.$axios.$post(
        `${this.ID}/${tool_route}/allowedobjects`,
        params
      )
      this.objects = data.objects
      this.current_step = this.current_step + 1
    }
  },
})
