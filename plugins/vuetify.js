import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'

const light_theme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    primary: '#26A69A',
    secondary: '#B2DFDB',
    accent: '#B71C1C',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'light_theme',
      themes: {
        light_theme,
      }
    },
    defaultAssets: false,
    icons: {
      defaultSet: 'mdi'
    }
  })

  nuxtApp.vueApp.use(vuetify)
})