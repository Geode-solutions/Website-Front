// plugins/vuetify.js
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import colors from 'vuetify/lib/util/colors'

const light_theme = {
  dark: false,
  colors: {
    primary: colors.teal.darken1,
    secondaryColor: colors.teal.lighten4,
    accent: colors.red.darken4
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
    }
  })

  nuxtApp.vueApp.use(vuetify)
})