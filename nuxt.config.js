import colors from 'vuetify/es5/util/colors'

export default {
  /*
    ** Environment variables
  */
  publicRuntimeConfig: {
    API_URL: process.env.NODE_ENV === 'production' ? 'https://api.geode-solutions.com' : 'http://localhost:5000',
    SITE_URL: process.env.SITE_URL,
    SITE_BRANCH: process.env.NODE_ENV === 'production' ? process.env.SITE_BRANCH : '',
    NODE_ENV: process.env.NODE_ENV,
    recaptcha: {
      siteKey: process.env.RECAPTCHA_SITE_KEY
    }
  },

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
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['@/assets/css/global_classes.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins:
    [
      '@/plugins/vuetify_icons', { src: '@/plugins/carousel', ssr: false },
      { src: '@/plugins/particles', ssr: false }, '@/plugins/axios'
    ],

  /*
   ** Nuxt.js modules
   */
  modules:
    [
      ['nuxt-cookie-control',
        {
          controlButton: true,
          domain: 'geode-solutions.com',
          colors: {
            modalOverlay: '#000',
            barBackground: colors.teal.darken1,
            barButtonColor: '#000',
            modalTextColor: '#000',
            modalOverlayOpacity: 0,
            modalButtonColor: '#fff',
            modalUnsavedColor: '#000',
            modalButtonBackground: colors.teal.darken1,
            controlButtonIconColor: colors.teal.darken1,
            checkboxActiveBackground: colors.teal.darken1,
            checkboxInactiveBackground: '#000',
            modalButtonHoverBackground: '#333',
            checkboxDisabledBackground: '#ddd',
            controlButtonIconHoverColor: colors.amber.accent4,
            controlButtonHoverBackground: colors.brown.darken4
          }
        }
      ],
      '@nuxtjs/axios',
      '@aceforth/nuxt-netlify',
      '@nuxtjs/vuetify',
      ['@nuxtjs/google-analytics', { id: 'UA-137823587-1', dev: false }],
      '@nuxtjs/recaptcha'
    ],

  recaptcha: {
    version: 2,
  },

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

  cookies: {
    necessary: [
      {
        name: 'Default Cookies',
        description: 'Used for cookie control.',
        cookies: ['cookie_control_consent', 'cookie_control_enabled_cookies'],
        isSecureContext: true
      }
    ]
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


