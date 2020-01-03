<template>
  <v-row>
    <v-col
      class="text-center title"
    >
      <h1 :class="display">
        OpenGeode
      </h1>
    </v-col>
    
    <no-ssr>
      <vue-particles class="particles-wrapper mb-5" style="z-index: 1"
                     color="004D40"
                     :particle-opacity="0.5"
                     :particles-number="80"
                     shape-type="circle"
                     :particle-size="5"
                     lines-color="00897B"
                     :lines-width="1"
                     :line-linked="true"
                     :line-opacity="0.8"
                     :lines-distance="150"
                     :move-speed="4"
      />
    </no-ssr>
    


    <v-container>
      <v-row class="text-center">
        <v-col>
          <h2 class="display-1 primary--text my-5">
            Open source platform for representing and manipulating geometric models
          </h2>

          <v-card
            flat
            style="background: rgba(0,0,0,0)"
          >
            <v-card-title
              primary-title
              class="justify-center display-2"
            >
              Visit GitHub repo
            </v-card-title>
            <a 
              href="https://github.com/Geode-solutions/OpenGeode" 
              target="_blank"
            >
              <v-icon  
                :size="$vuetify.breakpoint.smAndUp ? 150 : 100"
                color="#000000"
                style="display: ''"
              >
                fab fa-github
              </v-icon>
            </a> 
          </v-card>
  
          <h2
            class="section display-3 mt-5"
            align="center"
          >
            Key features
          </h2>
          <v-row justify="space-around">
            <v-col
              v-for="card in cards"
              :key="card.title"
              cols="11"
              sm="5"
              md="6"
            >
              <v-card
                v-scroll-reveal
                height="100%"
              >
                <v-img
                  :src="card.image"
                  :alt="'Geode-solutions '+ card.title"
                  contain
                />
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
              </v-card>
            </v-col>
          </v-row>
        </v-col>  
      </v-row>
    </v-container>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      windowHeight: 0,
      cards: [
        {
          title: 'Open source and cross-platform',
          image: 'https://cdn.pixabay.com/photo/2019/11/03/08/35/road-4598095_960_720.jpg',
          text:
            'OpenGeode is an open source C++ framework available on GitHub, \
            under a permissive software license (MIT). \
            We also provide pre-compiled releases on several platforms: \
            Windows, UNIX-based, macOS.'
        },
        
        {
          title: 'Geometric and geological models',
          image: 'https://cdn.pixabay.com/photo/2016/01/08/18/00/antelope-canyon-1128815_960_720.jpg',
          text:
            'OpenGeode offers a CAD framework dedicated to Geosciences with \
            data structures for meshes (wells, faults, horizons, 3D structured, \
            partially or fully unstructured meshes), and for boundary representations \
            organizing a rich set of relationships between geological features (structural \
            models, cross-sections).'
        },

        {
          title: 'Industrial quality',
          image: 'https://cdn.pixabay.com/photo/2015/11/28/23/20/technique-1068097_960_720.jpg',
          text:
            'A complete set of tools is used around OpenGeode to ensure its quality and its stability. \
            The Continuous Integration and Continuous Delivery philosophy has been chosen: code changes \
            are delivered more frequently, more reliably (high-leveled tests) and as automatic as possible, \
            using Microsoft Azure DevOps tools.'
        },

        {
          title: 'Ease-of-use',
          image: 'https://cdn.pixabay.com/photo/2016/03/09/15/26/ruler-1246653_960_720.jpg',
          text:
            'OpenGeode is easy to read since its code intelligibility:\
            API librairies are heavily documented, classes and methods are meaningful named. \
            OpenGeode is easy to get and to compile.  Convenient and open-source tools will soon be associated to OpenGeode:\
            a Javascript-based scriptability framework for quick prototyping and \
            a web-based application using an innovative UI and modern technologies.'
        },

        {
          title: 'Extensibility',
          image: 'https://cdn.pixabay.com/photo/2012/03/01/01/42/connect-20333_960_720.jpg',
          text:
            'OpenGeode supports users in adding new functionalities to allow easy adaptation to specific requirements. \
            We provide a quick start template to create your own technologies based on OpenGeode.'
        },


        {
          title: 'Efficiency',
          image: 'https://cdn.pixabay.com/photo/2014/06/18/16/31/jet-engine-371412_960_720.jpg',
          text:
            'Modern concurrency and GPU-accelerated solutions are planned to be integrated to reach real-time computations. \
            We want to deliver turnkey powerful solutions for effective and immediate use.'
        },


      ]
    }
  },
  computed: {
    display() {
      switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 'display-3'
          default: return 'display-4'
      }
    }
  },
  head() {
    return {
      title: 'OpenGeode - open source platform for geometric models'
    }
  }
}
</script>

<style scoped>
.particles-wrapper {
  width: 100%;
  height: 50vh;
}
.title {
  position: absolute;
  top: 25vh;
  width: 100%;
  height: 50%;
}
</style>