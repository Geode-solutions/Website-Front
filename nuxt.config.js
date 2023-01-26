export default defineNuxtConfig({
  runtimeConfig: {
    // recaptcha: {
    //     siteKey: process.env.RECAPTCHA_SITE_KEY
    // },
    public: {
      API_URL: process.env.NODE_ENV === 'production' ? 'https://api.geode-solutions.com' : 'http://localhost:443',
      SITE_URL: process.env.SITE_URL,
      SITE_BRANCH: process.env.NODE_ENV === 'production' ? process.env.SITE_BRANCH : '',
      NODE_ENV: process.env.NODE_ENV,
    }
  },

  // ** Customize the progress-bar color
  loading: { color: '#fff' },

  // ** Global CSS
  css: ['vuetify/lib/styles/main.sass'],

  // ** Nuxt.js modules
  modules:
    [
      // ['nuxt-cookie-control',
      // {
      //   controlButton: true,
      //   domain: 'geode-solutions.com',
      //   colors: {
      //     modalOverlay: '#000',
      //     barBackground: colors.teal.darken1,
      //     barButtonColor: '#000',
      //     modalTextColor: '#000',
      //     modalOverlayOpacity: 0,
      //     modalButtonColor: '#fff',
      //     modalUnsavedColor: '#000',
      //     modalButtonBackground: colors.teal.darken1,
      //     controlButtonIconColor: colors.teal.darken1,
      //     checkboxActiveBackground: colors.teal.darken1,
      //     checkboxInactiveBackground: '#000',
      //     modalButtonHoverBackground: '#333',
      //     checkboxDisabledBackground: '#ddd',
      //     controlButtonIconHoverColor: colors.amber.accent4,
      //     controlButtonHoverBackground: colors.brown.darken4
      //   }
      // }
      // ],
      // '@aceforth/nuxt-netlify',
      // ['@nuxtjs/google-analytics', { id: 'UA-137823587-1', dev: false }],
      // '@nuxtjs/recaptcha'
      ['@pinia/nuxt',
        {
          autoImports: [
            // automatically imports `usePinia()`
            'storeToRefs',
            // automatically imports `usePinia()` as `usePiniaStore()`
            // ['defineStore', 'definePiniaStore'],
          ],
        }],
    ],

  // recaptcha: {
  // version: 2,
  // },

  // cookies: {
  //   necessary: [
  //     {
  //       name: 'Default Cookies',
  //       description: 'Used for cookie control.',
  //       cookies: ['cookie_control_consent', 'cookie_control_enabled_cookies'],
  //       isSecureContext: true
  //     }
  //   ]
  // },

  // ** Netlify configuration
  netlify: {
    redirects: [{
      from: 'https://geode-solutions.netlify.com/*',
      to: 'https://geode-solutions.com/:splat',
      status: 301,
      force: true
    }]
  },

  // ** Build configuration
  build: {
    transpile: ['vuetify'],
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['md-linedivider'].includes(tag)
    }
  }
})
