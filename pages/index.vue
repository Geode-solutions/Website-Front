<template>
  <v-row no-gutters>
    <v-col>
      <no-ssr>
        <v-parallax
          :src="require('@/assets/hero.jpg')"
          :height="windowHeight"
        > 
          <v-row
            align="center"
          >
            <v-col>
              <h1 class="display-3 text-center mb-3 primary--text">
                Geode-solutions
              </h1>
              <h4 class="headline text-center primary--text">
                Software company building the next generation of meshing tools for advanced modeling
              </h4>
            </v-col>
          </v-row>
        </v-parallax>
      </no-ssr>
      <v-container>
        <v-row>
          <v-col>
            <h2
              class="section display-3"
              align="center"
            >
              What we do
            </h2>
            <v-card
              v-for="(card, index) in masterCards"
              :key="index"
              flat
              style="background: rgba(0,0,0,0)"
            >
              <v-row
                align="center"
                justify="space-around"
              >
                <v-col
                  :order="(index + 1) % 2"
                  xs="12"
                  sm="5"
                >
                  <v-card-text>
                    <v-img
                      :src="card.image"
                      v-scroll-reveal
                      contain
                    />
                  </v-card-text>
                </v-col>
                <v-col
                  xs="12"
                  sm="7"
                >
                  <v-card
                    flat
                    style="background: rgba(0,0,0,0)"
                  >
                    <v-card-title
                      primary-title
                      class="justify-center display-1"
                    >
                      {{ card.title }}
                    </v-card-title>
                    <v-card-text
                      align="justify"
                      class="body-1"
                    >
                      {{ card.text }}
                    </v-card-text>
                    <v-card-text
                      v-if="card.url"
                      align="justify"
                      class="title"
                    >
                      <a :href="card.url">{{ card.text2url }}</a>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <h2
          class="section display-3"
          align="center"
        >
          Why Geode-solutions
        </h2>
        <v-row
          justify="center"
        >
          <v-col
            v-for="(card, index) in cards"
            :key="index"
            xs="12"
            sm="5"
            lg="3"
            class="ma-3"
          >
            <v-card
              class="elevation-5"
              height="100%"
              v-scroll-reveal
            >
              <v-img
                :src="card.image"
                aspect-ratio="2.75"
                gradient="to top right, rgba(255,255,255,.4), rgba(255,255,255,.8)"
              >
                <v-card-title 
                  primary-title
                  class="display-1 justify-center fill-height"
                >
                  {{ card.title }}
                </v-card-title>
              </v-img>
              <v-card-text class="body-1 font-weight-medium text-center">
                {{ card.text }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <h2
          class="section display-3"
          align="center"
        >
          Our partners
        </h2>
        <v-row
          align="center"
          justify="space-around"
        >
          <v-col
            v-for="(partner, index) in partners"
            :key="index"
            v-scroll-reveal
            xs="12"
            sm="5"
            lg="3"
            class="ma-2"
          >
            <a
              :href="partner.url"
              target="_blank"
            >
              <v-img
                contain
                max-height="100"
                :src="partner.logo"
              />
            </a>
          </v-col> 
        </v-row>

        <h2
          class="section display-3"
          align="center"
        >
          Who we are
        </h2>
        <v-row 
          justify="space-around"
        >
          <v-col
            v-for="(guy, index) in us" :key="index"
            v-scroll-reveal
            xs="8"
            sm="4"
            class="ma-2"
          >
            <v-card
              class="elevation-5 text-center"
            >
              <v-avatar
                :size="$vuetify.breakpoint.mdAndUp ? 200 : 150"
                class="ma-2"
              >
                <v-img :src="guy.pict" />
              </v-avatar>
              <v-card-title
                primary-title
                class="justify-center headline"
              >
                {{ guy.name }}
                <v-btn
                  icon
                  target="_blank"
                  :href="guy.url"
                >
                  <v-icon size="24px" color="#0A66C2">
                    fab fa-linkedin
                  </v-icon>
                </v-btn>
                {{ guy.job }}
              </v-card-title>
              <v-card-text
                class="justify-center headline font-italic"
              > 
                {{ guy.topic }}
              </v-card-text> 
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      windowHeight: 0,
      cards: [
        {
          image:
            'https://cdn.pixabay.com/photo/2016/11/18/12/55/light-1834289_960_720.jpg',
          title: 'Fast',
          text:
            'Aiming real-time using modern concurrency and GPU-accelerated programming '
        },
        {
          image:
            'https://cdn.pixabay.com/photo/2016/08/05/09/28/hand-1571851_960_720.jpg',
          title: 'Reinvented UI',
          text:
            "Dedicated for scientists using today's technologies, offering intuitivity and reactiveness"
        },
        {
          image:
            'https://cdn.pixabay.com/photo/2017/06/14/08/20/map-of-the-world-2401458_960_720.jpg',
          title: 'Cross-platform',
          text:
            'Compatible and constinuously tested on Windows, Linux and MacOS'
        },
        {
          image:
            'https://live.staticflickr.com/5674/31045227201_57b9c73426_b.jpg',
          title: 'Auto update',
          text:
            'New features and improvments continuously shipped using automatic updates'
        },
        {
          image:
            'https://cdn.pixabay.com/photo/2018/03/13/22/53/puzzle-3223941_960_720.jpg',
          title: 'Extensible',
          text:
            'Free open-source platform and plugin system for modular and custom development'
        }
      ],
      masterCards: [
        {
          title: 'Open source platform',
          image: 'http://www.picpedia.org/highway-signs/images/open-source.jpg',
          text:
            'OpenGeode is our open source platform for representing and manipulating geological models.\
              It is designed from the ground up to support any geosciences applications requiring a discretized geological model.\
              The platform is easy to use thanks to its readable API and its JavaScript scriptability for quick prototyping.',
          url: "/opengeode",
          text2url: 'More details'
        },
        {
          title: 'Advanced meshing',
          image: require('../assets/mesh_JD_Hancock.png'),
          text:
            'Our reliable and pratical solutions for meshing combine innovative technologies across industrial fields.\
             It allows us to bring robustness and high industrial quality meshes on deeply complex models.\
            Available in proprietary OpenGeode extension.',
          url: "",
          text2url: 'More details soon'
        }
      ],
      partners: [
        {
          name: 'Helioparc',
          logo: 'http://www.helioparc.fr/theme/base-2014/img/header/logo.svg',
          url: 'http://www.helioparc.fr'
        },
        {
          name: 'LaBanquiz',
          logo:
            'https://labanquiz.com/wp-content/uploads/2016/10/cropped-cropped-cropped-la_banquiz.png',
          url: 'https://labanquiz.com'
        },
        {
          name: 'RING',
          logo: 'http://www.ring-team.org/images/Logos/logo_ring_blanc.png',
          url: 'http://www.ring-team.org'
        }
      ],
      us: [
        {
          name: 'Arnaud Botella',
          pict: require('@/assets/ArnaudB.png'),
          job: 'President & co-founder',
          url: 'https://linkedin.com/in/arnaud-botella',
          topic: 'Mesh generation'
        },
        {
          name: 'Pierre Anquez',
          pict: require('@/assets/PierreA.png'),
          job: 'CEO & co-founder',
          url: 'https://linkedin.com/in/pierre-anquez',
          topic: 'Repair and simplification'
        }
      ]
    }
  },
  mounted() {
    window.addEventListener('resize', this.getWindowHeight)
    this.getWindowHeight()
  },
  methods: {
    getWindowHeight() {
      this.windowHeight = document.documentElement.clientHeight
    }
  }
}
</script>

<style scoped>
.section {
  padding-top: 200px;
  padding-bottom: 48px;
}
</style>
