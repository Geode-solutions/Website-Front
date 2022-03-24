<template>
  <v-row no-gutters>
    <v-col>
      <client-only>
        <v-parallax
          :src="require('@/assets/hero.jpg')"
          :height="windowHeight"
          alt="Geode-solutions next generation of modeling challenges"
        >
          <v-card
            class="container"
            width="600"
            style="
              border-radius: 80px 0px;
              background-color: rgba(255, 255, 255, 0.8);
            "
          >
            <v-row
              class="flex-column pa-3"
              align="center"
              align-content="space-around"
            >
              <v-col>
                <v-img
                  :src="require('@/assets/logo.svg')"
                  alt="Geode-solutions logo"
                  width="50%"
                  class="mx-auto"
                />
                <h1 class="text-h2 text-center mb-3 primary--text">
                  Geode-solutions
                </h1>
              </v-col>
              <v-col>
                <h2 class="text-h5 text-center primary--text">
                  Technology company tackling next generation of modeling
                  challenges using advanced meshing
                </h2>
              </v-col>
            </v-row>
          </v-card>
        </v-parallax>
      </client-only>
      <v-container>
        <v-row>
          <v-col>
            <h2 class="section text-h2" align="center">
              What we do
            </h2>
            <v-row justify="space-around">
              <v-col
                v-for="card in masterCards"
                :key="card.title"
                cols="12"
                md="6"
              >
                <v-hover v-slot="{ hover }">
                  <v-lazy
                    :options="{
                      threshold: 0.5,
                    }"
                  >
                    <v-card
                      dark
                      height="500"
                      :elevation="hover ? 20 : 2"
                      :img="require('@/assets/index/' + card.image)"
                      nuxt
                      :to="card.url"
                      class="d-flex"
                    >
                      <v-img
                        :src="require('@/assets/index/' + card.image)"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)"
                      >
                        <v-row
                          class="flex-column"
                          no-gutters
                          style="height: 100%"
                        >
                          <v-spacer />
                          <v-col cols="auto">
                            <v-card-title class="text-h4" align="end">
                              {{ card.title }}
                            </v-card-title>
                          </v-col>
                          <v-col cols="auto">
                            <v-card-text align="justify" class="text-body-1">
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
            <h2 class="section text-h2" align="center">
              Which applications
            </h2>
            <v-timeline>
              <v-timeline-item small fill-dot class="text-h4 font-weight-light">
                Geo&shy;thermal
              </v-timeline-item>
              <v-timeline-item
                small
                fill-dot
                class="text-h4 font-weight-light text-right"
              >
                Mining
              </v-timeline-item>
              <v-timeline-item small fill-dot class="text-h4 font-weight-light">
                CCUS
              </v-timeline-item>
              <v-timeline-item
                small
                fill-dot
                class="text-h4 font-weight-light text-right"
              >
                Oil&shy;Gas
              </v-timeline-item>
              <v-timeline-item small fill-dot class="text-h4 font-weight-light">
                Geo&shy;mecha&shy;nics
              </v-timeline-item>
              <v-timeline-item
                small
                fill-dot
                class="text-h4 font-weight-light text-right"
              >
                Hydro&shy;geology
              </v-timeline-item>
              <v-timeline-item small fill-dot class="text-h4 font-weight-light">
                Urban geology
              </v-timeline-item>
            </v-timeline>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid>
        <v-row class="container mx-auto">
          <v-col>
            <h2 class="section text-h2" align="center">
              Why Geode-solutions
            </h2>
            <v-row justify="center">
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
                    threshold: 0.5,
                  }"
                >
                  <v-card class="elevation-5" height="100%">
                    <v-img
                      :src="require('@/assets/index/' + card.image)"
                      :alt="'Geode-solutions ' + card.title"
                      aspect-ratio="2.75"
                      gradient="to top right, rgba(255,255,255,.4), rgba(255,255,255,.8)"
                    >
                      <v-card-title
                        primary-title
                        class="text-h4 justify-center fill-height"
                      >
                        {{ card.title }}
                      </v-card-title>
                    </v-img>
                    <v-card-text
                      class="text-body-1 font-weight-medium text-center"
                    >
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
        <h2 class="section text-h2" align="center">
          What are our skills
        </h2>
        <v-row justify="space-around" class="container mx-auto">
          <v-col>
            <v-lazy
              :options="{
                threshold: 0.5,
              }"
            >
              <client-only>
                <vue-word-cloud
                  style="height: 480px; width: 100%"
                  spacing="0.4"
                  :words="skills"
                  :color="getColor"
                  font-family="Roboto"
                />
              </client-only>
            </v-lazy>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid>
        <h2 class="section text-h2" align="center">
          Who we are
        </h2>
        <v-row justify="space-around" class="container mx-auto">
          <v-col
            v-for="(guy, index) in us"
            :key="index"
            cols="8"
            sm="4"
            class="ma-2"
          >
            <v-lazy
              :options="{
                threshold: 0.5,
              }"
            >
              <v-card class="elevation-5 text-center">
                <v-avatar
                  :size="$vuetify.breakpoint.mdAndUp ? 200 : 150"
                  class="ma-2"
                >
                  <v-img :src="guy.pict" :alt="'Geode-solutions ' + guy.name" />
                </v-avatar>
                <v-card-title primary-title class="justify-center text-h5">
                  {{ guy.name }}
                  <v-btn icon target="_blank" :href="guy.url">
                    <v-icon size="24px" color="#0A66C2">
                      mdi-linkedin
                    </v-icon>
                  </v-btn>
                  {{ guy.job }}
                </v-card-title>
                <v-card-text class="justify-center text-h5 font-italic">
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
            <h2 class="section text-h2" align="center">
              They support us
            </h2>

            <v-lazy
              :options="{
                threshold: 0.5,
              }"
            >
              <carousel autoplay loop :per-page="nbPartners">
                <slide
                  v-for="(supporter, index) in supporters"
                  :key="index"
                  class="logo"
                >
                  <a :href="supporter.url" target="_blank">
                    <img
                      width="80%"
                      :src="require('@/assets/logos/' + supporter.logo)"
                    >
                  </a>
                </slide>
              </carousel>
            </v-lazy>
          </v-col>
        </v-row>
        <v-row class="container mx-auto">
          <v-col>
            <h2 class="section text-h2" align="center">
              Our partners
            </h2>

            <v-lazy
              :options="{
                threshold: 0.5,
              }"
            >
              <carousel autoplay loop :per-page="nbPartners">
                <slide
                  v-for="(partner, index) in partners"
                  :key="index"
                  class="logo"
                >
                  <a :href="partner.url" target="_blank">
                    <img
                      width="80%"
                      :src="require('@/assets/logos/' + partner.logo)"
                    >
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
  name: 'GeodeIndex',
  components: {
    VueWordCloud,
  },
  data() {
    return {
      windowHeight: 0,
      cards: [
        {
          image: 'light.jpg',
          title: 'Fast',
          text: 'Aiming real-time using modern concurrency and GPU-accelerated programming ',
        },
        {
          image: 'hand.jpg',
          title: 'Reinvented UI',
          text: "Dedicated for scientists using today's technologies, offering intuitivity and reactiveness",
        },
        {
          image: 'map-of-the-world.jpg',
          title: 'Cross-platform',
          text: 'Compatible and constinuously tested on Windows, Linux and MacOS',
        },
        {
          image: '31045227201_57b9c73426_b.jpg',
          title: 'Auto update',
          text: 'New features and improvements continuously shipped using automatic updates',
        },
        {
          image: 'puzzle.jpg',
          title: 'Extensible',
          text: 'Free open-source framework and plugin system for modular and custom developments',
        },
      ],
      masterCards: [
        {
          title: 'Advanced meshing',
          image: 'cobweb.jpg',
          text: 'Our reliable and pratical solutions for meshing combine innovative technologies across industrial fields.\
             It brings robustness and high industrial quality meshes on deeply complex models.\
             Available in proprietary OpenGeode extension.',
          url: '/expertise',
        },
        {
          title: 'Modeling',
          image: 'nut.jpg',
          text: 'Technologies to generate an explicit model from given surfaces or an implicit model from given points.\
             We take advantage of our strong meshing expertise to ensure robustness and model requirements for meshing and simulation applications.\
             Available in proprietary OpenGeode extension.',
          url: '/expertise',
        },
        {
          title: 'Model repair',
          image: 'screw.jpg',
          text: 'Useful and handy tools to check, verify and fix surface-based models.\
            These tools are customizable and can target model watertighness or geometric simplification.\
            Available in proprietary OpenGeode extensions.',
          url: '/expertise',
        },
        {
          title: 'OpenGeode framework',
          image: 'road.jpg',
          text: 'Open source framework for representing and manipulating models.\
             It is designed from the ground up to support any geometrical and geosciences application requiring a discretized model.\
             The framework is easy to use with readable API and Python scriptability.',
          url: '/opengeode',
        },
        {
          title: 'Custom-tailored services',
          image: 'tailoring.jpg',
          text: 'We deliver custom-tailored services to address your specific needs and challenges. \
             Our experts can provide training, support and software development on a wide range of applications from geometry and software to geosciences.',
          url: '/services',
        },
      ],
      supporters: [
        {
          name: 'Helioparc',
          logo: 'logo_helioparc.svg',
          url: 'http://www.helioparc.fr',
        },
        {
          name: 'LaBanquiz',
          logo: 'logo_banquiz.png',
          url: 'https://labanquiz.com',
        },
        {
          name: 'NAOS',
          logo: 'logo_NAOS.png',
          url: 'https://naos-cluster.com',
        },
        {
          name: 'Nouvelle-Aquitaine',
          logo: 'logo_region.png',
          url: 'https://www.nouvelle-aquitaine.fr',
        },
        {
          name: 'Geoliens',
          logo: 'logo_geoliens.png',
          url: 'https://www.geoliens.org',
        },
      ],
      partners: [
        {
          name: 'Pole Avenia',
          logo: 'logo-avenia.svg',
          url: 'https://www.pole-avenia.com',
        },
        {
          name: 'Total SE',
          logo: 'logo_totalenergies.png',
          url: 'https://www.ep.total.com',
        },
        {
          name: 'RING',
          logo: 'logo_ring.png',
          url: 'https://www.ring-team.org',
        },
        {
          name: 'GeoRessources',
          logo: 'logo_georessources.jpg',
          url: 'http://georessources.univ-lorraine.fr/',
        },
        {
          name: 'CNRS',
          logo: 'logo_cnrs.jpg',
          url: 'http://georessources.univ-lorraine.fr/',
        },
        {
          name: 'Université de Lorraine',
          logo: 'logo_UL.png',
          url: 'http://www.univ-lorraine.fr/',
        },
        {
          name: 'ENEREX',
          logo: 'logo_enerex.png',
          url: 'https://enerex.fr/',
        },
        {
          name: 'ARXITEK',
          logo: 'logo_arxitek.png',
          url: 'https://arxitek.fr/',
        },
        {
          name: 'Earth Quick',
          logo: 'logo_earth_quick.jpg',
          url: 'https://www.earth-quick.com/',
        },
        {
          name: 'MOSART PME',
          logo: 'LOGOMOSART-PME.png',
          url: 'https://www.mosart-pme.org/',
        },
      ],
      us: [
        {
          name: 'Arnaud Botella',
          pict: require('@/assets/ArnaudB.jpg'),
          job: 'President & co-founder',
          url: 'https://linkedin.com/in/arnaud-botella',
          topic: 'Mesh generation',
        },
        {
          name: 'Pierre Anquez',
          pict: require('@/assets/PierreA.jpg'),
          job: 'CEO & co-founder',
          url: 'https://linkedin.com/in/pierre-anquez',
          topic: 'Explicit modeling',
        },
        {
          name: 'Melchior Schuh-Senlis',
          pict: require('@/assets/Melchior.jpg'),
          job: 'Research engineer',
          url: 'https://www.linkedin.com/in/melchior-schuh-senlis-a9573aba',
          topic: 'Implicit modeling',
        },
        {
          name: 'Julien Champagnol',
          pict: require('@/assets/Julien.jpg'),
          job: 'Cloud developer',
          url: 'https://www.linkedin.com/in/julien-champagnol-90330b17b',
          topic: 'Web and microservices',
        },
      ],
      skills: [
        ['C++', 5],
        ['DevOps', 4],
        ['Meshing', 5],
        ['Python', 2],
        ['Algorithms', 3],
        ['Computational geometry', 4],
        ['Geomodeling', 2],
        ['Unstructured meshes', 3],
        ['BoundaryRepresentation', 2],
        ['Model editing', 4],
        ['Mesh repair', 2],
        ['Model repair', 5],
        ['Continuous integration', 2],
        ['Continuous deployment', 2],
        ['Software engineering', 4],
        ['Robustness', 3],
        ['JavaScript', 2],
        ['Web technologies', 2],
        ['Visualization', 2],
      ],
    }
  },
  computed: {
    nbPartners() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 1
        case 'sm':
          return 2
        default:
          return 3
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.getWindowHeight)
    this.getWindowHeight()
  },
  methods: {
    getWindowHeight() {
      this.windowHeight = document.documentElement.clientHeight
    },
    getColor() {
      const number = Math.random()
      if (number > 0.6) return '#00897B'
      if (number < 0.3) return '#26A69A'
      return '#80CBC4'
    },
  },
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
