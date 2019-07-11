import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'
import '@fortawesome/fontawesome-free/css/all.css'
import Logo from "@/components/Logo";

Vue.use(Vuetify, {
  iconfont: 'fa',
  theme: {
    primary: colors.teal.darken1,
    secondary: colors.teal.lighten5,
    accent: colors.red.darken4,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3
  },
  icons: {
    logo: {
      component: Logo
    }
  }
})
