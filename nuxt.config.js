import colors from 'vuetify/es5/util/colors'

export default {
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Geode-solutions - next generation of modeling tools',
    meta:
      [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }, {
          hid: 'description',
          name: 'description',
          content:
            'Technology company tackling next generation of modeling challenges using advanced meshing'
        }
      ],
    link:
      [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
        }
      ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins:
    [
      '@/plugins/vuetify_icons', { src: '@/plugins/carousel', ssr: false },
      { src: '@/plugins/particles', ssr: false }
    ],

  /*
   ** Nuxt.js modules
   */
  modules:
    [
      '@nuxtjs/axios', '@bazzite/nuxt-netlify', '@nuxtjs/vuetify',
      ['@nuxtjs/google-analytics', { id: 'UA-137823587-1', dev: false }]
    ],

  vuetify: {
    theme: {
      themes: {
        light: {
          primary: colors.teal.darken1,
          secondary: colors.teal.lighten4,
          accent: colors.red.darken4
        }
      }
    },
    icons: { iconfont: 'mdi', values: { logo: { component: 'GeodeLogo' } } }
  },

  /*
  ** Netlify configuration
  */
  netlify: {
    redirects: [{
      from: 'https://geode-solutions.netlify.com/*',
      to: 'https://geode-solutions.com/:splat',
      status: 301,
      force: true
    }]
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {}
  }
}
