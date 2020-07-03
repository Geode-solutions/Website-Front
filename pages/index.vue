<template>
  <v-row no-gutters>
    <v-col>
      <client-only>
        <v-parallax
          :src="require('@/assets/hero.jpg')"
          :height="windowHeight"
          alt="Geode-solutions next generation of meshing tools"
        > 
          <v-card 
            class="container" 
            width="600"
            style="border-radius: 80px 0px; background-color: rgba(255,255,255,0.8)"
          >
            <v-img
              :src="require('@/assets/logo.svg')"
              alt="Geode-solutions logo"
              width="50%"
              class="mx-auto"
            />
            <v-row
              class="flex-column"
              align="center"
            >
              <h1 class="display-3 text-center mb-3 primary--text">
                Geode-solutions
              </h1>
              <h2 class="headline text-center primary--text">
                Software company building the next generation of meshing tools for advanced modeling
              </h2>
            </v-row>
          </v-card>
        </v-parallax>
      </client-only>
      <v-container>
        <v-row>
          <v-col>
            <h2
              class="section display-3"
              align="center"
            >
              What we do
            </h2>
            <v-row justify="space-around">
              <v-col
                v-for="card in masterCards"
                :key="card.title"
                cols="12"
                md="6"
              >
                <v-hover #default="{ hover }">
                  <v-lazy 
                    :options="{
                      threshold: .5
                    }"
                  >
                    <v-card 
                      dark
                      height="500"
                      :elevation="hover ? 20 : 2"
                      :img="card.image"
                      nuxt
                      :to="card.url"
                      class="d-flex"
                    >
                      <v-img :src="card.image"
                             gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)"
                      >
                        <v-row class="flex-column" no-gutters style="height: 100%">
                          <v-spacer />
                          <v-col cols="auto">
                            <v-card-title
                              class="display-1"
                              align="end"
                            >
                              {{ card.title }}
                            </v-card-title> 
                          </v-col>
                          <v-col cols="auto">
                            <v-card-text
                              align="justify"
                              class="body-1"
                            >
                              {{ card.text }}
                            </v-card-text>
                          </v-col>
                        </v-row>
                      </v-img>
                    </v-card>
                  </v-lazy>
                </v-hover>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid style="background-color: white">
        <v-row class="container mx-auto">
          <v-col>
            <h2
              class="section display-3"
              align="center"
            >
              Which applications
            </h2>
            <v-timeline>
              <v-timeline-item small fill-dot class="display-2 font-weight-light">
                Geothermal
              </v-timeline-item>
              <v-timeline-item small fill-dot class="display-2 font-weight-light text-right">
                Mining
              </v-timeline-item>
              <v-timeline-item small fill-dot class="display-2 font-weight-light">
                CCUS
              </v-timeline-item>
              <v-timeline-item small fill-dot class="display-2 font-weight-light text-right">
                Oil&Gas
              </v-timeline-item>
              <v-timeline-item small fill-dot class="display-2 font-weight-light">
                Geomechanics
              </v-timeline-item>
              <v-timeline-item small fill-dot class="display-2 font-weight-light text-right">
                ...
              </v-timeline-item>
            </v-timeline>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid>
        <v-row class="container mx-auto">
          <v-col>
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
                cols="12"
                sm="5"
                lg="3"
                class="ma-3"
              >
                <v-lazy 
                  :options="{
                    threshold: .5
                  }"
                >
                  <v-card
                    class="elevation-5"
                    height="100%"
                  >
                    <v-img
                      :src="card.image"
                      :alt="'Geode-solutions '+ card.title"
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
                </v-lazy>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid style="background-color: white">
        <h2
          class="section display-3"
          align="center"
        >
          What are our skills
        </h2>
        <v-row 
          justify="space-around"
          class="container mx-auto"
        >
          <v-col>
            <v-lazy 
              :options="{
                threshold: .5
              }"
            >
              <client-only>
                <vue-word-cloud
                  style="height: 480px;width: 100%;"
                  spacing="0.3"
                  :words="skills"
                  :color="([, weight]) => weight > 4 ? '#00897B' : weight > 3 ? '#26A69A' : '#80CBC4'"
                  font-family="Roboto"
                />
              </client-only>
            </v-lazy>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid>
        <h2
          class="section display-3"
          align="center"
        >
          Who we are
        </h2>
        <v-row 
          justify="space-around"
          class="container mx-auto"
        >
          <v-col
            v-for="(guy, index) in us" :key="index"
            cols="8"
            sm="4"
            class="ma-2"
          >
            <v-lazy 
              :options="{
                threshold: .5
              }"
            >
              <v-card
                class="elevation-5 text-center"
              >
                <v-avatar
                  :size="$vuetify.breakpoint.mdAndUp ? 200 : 150"
                  class="ma-2"
                >
                  <v-img :src="guy.pict" 
                         :alt="'Geode-solutions '+ guy.name"
                  />
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
            </v-lazy>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid style="background-color: white">
        <v-row class="container mx-auto">
          <v-col>
            <h2
              class="section display-3"
              align="center"
            >
              They support us
            </h2>

            <v-lazy 
              :options="{
                threshold: .5
              }"
            >
              <carousel autoplay loop :per-page="nbPartners"> 
                <slide 
                  v-for="(supporter, index) in supporters"
                  :key="index"
                  class="logo"
                >
                  <a
                    :href="supporter.url"
                    target="_blank"
                  >
                    <img width="80%" :src="supporter.logo">
                  </a>
                </slide>
              </carousel>
            </v-lazy>
          </v-col>
        </v-row>
        <v-row class="container mx-auto">
          <v-col>
            <h2
              class="section display-3"
              align="center"
            >
              Our partners
            </h2>

            <v-lazy 
              :options="{
                threshold: .5
              }"
            >
              <carousel autoplay loop :per-page="nbPartners"> 
                <slide 
                  v-for="(partner, index) in partners"
                  :key="index"
                  class="logo"
                >
                  <a
                    :href="partner.url"
                    target="_blank"
                  >
                    <img width="80%" :src="partner.logo">
                  </a>
                </slide>
              </carousel>
            </v-lazy>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import VueWordCloud from 'vuewordcloud'

export default {
  components: {
    VueWordCloud
  },
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
            'New features and improvements continuously shipped using automatic updates'
        },
        {
          image:
            'https://cdn.pixabay.com/photo/2018/03/13/22/53/puzzle-3223941_960_720.jpg',
          title: 'Extensible',
          text:
            'Free open-source platform and plugin system for modular and custom developments'
        }
      ],
      masterCards: [
        {
          title: 'Advanced meshing',
          image: 'https://cdn.pixabay.com/photo/2015/09/26/19/09/cobweb-959578_960_720.jpg',
          text:
            'Our reliable and pratical solutions for meshing combine innovative technologies across industrial fields.\
             It brings robustness and high industrial quality meshes on deeply complex models.\
            Available in proprietary OpenGeode extension.',
          url: "/products"
        },
        {
          title: 'Explicit modeling',
          image: 'https://cdn.pixabay.com/photo/2013/07/18/20/27/nut-165083_960_720.jpg',
          text:
            'Useful and handy tools to generate an explicit model from given surfaces.\
             We take advantage of our strong meshing expertise to ensure robustness and model requirements for meshing and simulation applications.\
            Available in proprietary OpenGeode extension.',
          url: "/products"
        },
        {
          title: 'OpenGeode platform',
          image: 'https://cdn.pixabay.com/photo/2019/11/03/08/35/road-4598095_960_720.jpg',
          text:
            'Open source platform for representing and manipulating models.\
             It is designed from the ground up to support any geometrical and geosciences application requiring a discretized model.\
             The platform is easy to use with readable API and Python scriptability.',
          url: "/opengeode"
        },
        {
          title: 'Custom-tailored services',
          image: 'https://cdn.pixabay.com/photo/2017/08/03/12/21/tailoring-2575930_960_720.jpg',
          text:
            'We deliver custom-tailored services to address your specific needs and challenges. \
             Our experts can provide training, support and software development on a wide range of applications from geometry and software to geosciences.',
          url: "/services"
        }
      ],
      supporters: [
        {
          name: 'Helioparc',
          logo: require('@/assets/logo_helioparc.svg'),
          url: 'http://www.helioparc.fr'
        },
        {
          name: 'LaBanquiz',
          logo: require('@/assets/logo_banquiz.png'),
          url: 'https://labanquiz.com'
        },
        {
          name: 'NAOS',
          logo: require('@/assets/logo_NAOS.png'),
          url: 'https://naos-cluster.com'
        },
        {
          name: 'Nouvelle-Aquitaine',
          logo: require('@/assets/logo_region.png'),
          url: 'https://www.nouvelle-aquitaine.fr'
        },
        {
          name: 'Geoliens',
          logo: require('@/assets/logo_geoliens.png'),
          url: 'https://www.geoliens.org'
        }
      ],
      partners: [
        {
          name: 'Pole Avenia',
          logo: require('@/assets/logo_pole_avenia.png'),
          url: 'https://www.pole-avenia.com/eng'
        },
        {
          name: 'Total SA',
          logo: require('@/assets/logo_total.svg'),
          url: 'https://www.ep.total.com'
        },
        {
          name: 'RING',
          logo: require('@/assets/logo_ring.png'),
          url: 'https://www.ring-team.org'
        },
        {
          name: 'GeoRessources',
          logo: require('@/assets/logo_georessources.jpg'),
          url: 'http://georessources.univ-lorraine.fr/'
        },
        {
          name: 'CNRS',
          logo: require('@/assets/logo_cnrs.png'),
          url: 'http://georessources.univ-lorraine.fr/'
        },
        {
          name: 'Université de Lorraine',
          logo: require('@/assets/logo_UL.png'),
          url: 'http://www.univ-lorraine.fr/'
        },
        {
          name: 'ENEREX',
          logo: require('@/assets/logo_enerex.png'),
          url: 'https://enerex.fr/'
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
      ],
      skills:[
        ["C++", 5],
        ["Meshing", 5],
        ["Python", 2],
        ["Algorithms", 3],
        ["Computational geometry", 2],
        ["Geomodeling", 2],
        ["Unstructured meshes", 3],
        ["BoundaryRepresentation", 2],
        ["Model editing", 4],
        ["Mesh repair", 2],
        ["Model repair", 5],
        ["Continuous integration", 2],
        ["Continuous deployment", 2],
        ["Software engineering", 4],
        ["Robustness", 2],
        ["JavaScript", 2],
        ["Web technologies", 2],
      ]
    }
  },
  computed: {
    nbPartners() {
      switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 1
          case 'sm': return 2
          default: return 3
      }
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
  padding-top: 50px;
  padding-bottom: 50px;
}
.logo {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
