import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import colors from 'vuetify/lib/util/colors'
import '@mdi/font/css/materialdesignicons.css'

const light_theme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    primary: colors.teal.darken1,
    secondary: colors.teal.lighten4,
    accent: colors.red.darken4,
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