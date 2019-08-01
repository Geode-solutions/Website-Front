<template>
  <v-layout column>
    <v-flex
      class="text-center title"
    >
      <h1 class="display-4 primary--text">
        OpenGeode
      </h1>
    </v-flex>
    
    <no-ssr>
      <vue-particles class="particles-wrapper mb-3" style="z-index: 1"
                     color="00897B"
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
      <v-layout column class="text-center">
        <v-flex
          class="text-center"
          mb-5
        >
          <h2 class="display-1 primary--text my-3">
            Open source platform for representing and manipulating geometric models
          </h2>
        </v-flex>  

        <v-flex
          class="text-center"
          xs12
          sm4
          my-5
        >
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
              >fab fa-github
              </v-icon>
            </a> 
          </v-card>
        </v-flex>
  
        <h2
          class="section display-3 mt-5"
          align="center"
        >
          Key features
        </h2>
        <v-flex
          v-for="(card, index) in cards"
          :key="index"
          v-scroll-reveal.reset
          md1
        >
          <v-card
            flat
            style="background: rgba(0,0,0,0)"
          >
            <v-layout
              :reverse="card.reverse"
              row
              wrap
              align-center
              justify-space-around
            >
              <v-flex
                xs12
                sm5
              >
                <v-card-text>
                  <v-img
                    :src="card.image"
                    contain
                  />
                </v-card-text>
              </v-flex>
              <v-flex
                xs12
                sm7
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
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>        
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  head() {
    return {
      title: 'OpenGeode - open source platform for geometric models'
    }
  },
  data() {
    return {
      windowHeight: 0,
      cards: [
        {
          title: 'Open source and cross-platform',
          image: 'http://www.picpedia.org/highway-signs/images/open-source.jpg',
          text:
            'OpenGeode is an open source C++ framework available on GitHub, \
            under a permissive software license (MIT). \
            We also provide pre-compiled releases on several platforms: \
            Windows, UNIX-based, macOS.',
          reverse: true
        },
        
        {
          title: 'Geometric and geological models',
          image: 'https://cdn.pixabay.com/photo/2016/01/08/18/00/antelope-canyon-1128815_960_720.jpg',
          text:
            'OpenGeode offers a CAD framework dedicated to Geosciences with \
            data structures for meshes (wells, faults, horizons, 3D structured, \
            partially or fully unstructured meshes), and for boundary representations \
            organizing a rich set of relationships between geological features (structural \
            models, cross-sections).',
          reverse: false
        },

        {
          title: 'Industrial quality',
          image: 'https://cdn.pixabay.com/photo/2015/11/28/23/20/technique-1068097_960_720.jpg',
          text:
            'A complete set of tools is used around OpenGeode to ensure its quality and its stability. \
            The Continuous Integration and Continuous Delivery philosophy has been chosen: code changes \
            are delivered more frequently, more reliably (high-leveled tests) and as automatic as possible, \
            using Microsoft Azure DevOps tools.',
          reverse: true
        },

        {
          title: 'Ease-of-use',
          image: 'https://cdn.pixabay.com/photo/2016/03/09/15/26/ruler-1246653_960_720.jpg',
          text:
            'OpenGeode is easy to read since its code intelligibility:\
            API librairies are heavily documented, classes and methods are meaningful named. \
            OpenGeode is easy to get and to compile.  Convenient and open-source tools will soon be associated to OpenGeode:\
            a Javascript-based scriptability framework for quick prototyping and \
            a web-based application using an innovative UI and modern technologies.',
          reverse: false
        },

        {
          title: 'Extensibility',
          image: 'https://cdn.pixabay.com/photo/2012/03/01/01/42/connect-20333_960_720.jpg',
          text:
            'OpenGeode supports users in adding new functionalities to allow easy adaptation to specific requirements. \
            We provide a quick start template to create your own technologies based on OpenGeode.',
          reverse: true
        },


        {
          title: 'Efficiency',
          image: 'https://cdn.pixabay.com/photo/2014/06/18/16/31/jet-engine-371412_960_720.jpg',
          text:
            'Modern concurrency and GPU-accelerated solutions are planned to be integrated to reach real-time computations. \
            We want to deliver turnkey powerful solutions for effective and immediate use.',
          reverse: false
        },


      ]
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
