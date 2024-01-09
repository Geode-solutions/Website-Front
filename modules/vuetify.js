import colors from "vuetify/lib/util/colors"
import { defineNuxtModule } from "@nuxt/kit"
// import vuetify from "@geode/opengeodeweb-front/plugins/vuetify"

const light_theme = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    primary: colors.teal.darken1,
    secondary: colors.teal.lighten4,
    accent: colors.amber.accent4,
    error: colors.red.lighten2,
    info: colors.yellow.accent4,
    success: colors.green.accent4,
    warning: colors.orange.accent4,
  },
}

export default defineNuxtModule({
  setup(_options, nuxt) {
    nuxt.hook("vuetify:registerModule", (register) =>
      register({
        moduleOptions: {},
        vuetifyOptions: {
          //   vuetify,
          theme: {
            defaultTheme: "light_theme",
            themes: {
              light_theme,
            },
          },
        },
      }),
    )
  },
})
