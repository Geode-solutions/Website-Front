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

  },
})
