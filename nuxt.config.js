import colors from 'vuetify/es5/util/colors'

export default {
  /*
    ** Environment variables
  */
  publicRuntimeConfig: {
    API_URL: process.env.NODE_ENV === 'production' ? 'https://api.geode-solutions.com' : 'http://localhost:5000'
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
          {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
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

  cookies: {
    necessary: [
      {
        name: 'Default Cookies',
        description: 'Used for cookie control.',
        cookies: ['cookie_control_consent', 'cookie_control_enabled_cookies'],
        isSecureContext: true
      }
    ],
    // optional: [
    //   {
    //     name: 'Google Analitycs',
    //     identifier: 'ga',
    //     description: 'To improve user experience on our website',
    //     initialState: true,
    //     src: 'https://www.googletagmanager.com/gtag/js?id=<API-KEY>',
    //     async: true,
    //     cookies: ['_ga', '_gat', '_gid'],
    //     accepted: () => {
    //       window.dataLayer = window.dataLayer || [];
    //       window.dataLayer.push({
    //         'gtm.start': new Date().getTime(),
    //         event: 'gtm.js'
    //       });
    //     },
    //     declined: () => {
    //     }
    //   }
    // ],
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


