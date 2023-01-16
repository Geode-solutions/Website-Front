import { defineStore } from 'pinia'

export const use_tools_store = defineStore('tools', {
  state: () => ({
    accepted_extensions: '',
    files: [],
    loading: true,
    packages_versions: []
  }),
  actions: {
    async get_allowed_files (tool_route) {
      const config = useRuntimeConfig()
      const { data } = await useFetch(`${config.public.API_URL}/${this.ID}/${tool_route}/allowedfiles`, { method: 'GET' })
      const extensions = data.extensions.map((extension) => '.' + extension)
      this.accepted_extensions = extensions.join(',')
    },
    async get_packages_versions (tool_route) {
      const config = useRuntimeConfig()
      const { data } = await useFetch(`${config.public.API_URL}/${this.ID}/${tool_route}/versions`, { method: 'GET' })
      this.packages_versions = data.versions
    },

    async get_allowed_objects (changedFiles, tool_route) {
      const config = useRuntimeConfig()
      this.success = true
      this.message = 'File(s) selected'
      this.files = [changedFiles]

      const params = new FormData()
      params.append('filename', this.files[0].name)

      const data = await $fetch(`${config.public.API_URL}/${this.ID}/${tool_route}/allowedobjects`,
        params
      )
      this.objects = data.objects
      this.current_step = this.current_step + 1
    }
  },
})
