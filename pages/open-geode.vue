<template>
  <v-layout column>
    

    <vue-particles class="particles-wrapper mb-3"
      color="00897B"
      :particleOpacity="0.5"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="5"
      linesColor="00897B"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.8"
      :linesDistance="150"
      :moveSpeed="4"
    >
    </vue-particles>

    <v-flex
      class="text-xs-center title"
    >
    <h1 class="display-3 primary--text">
      OpenGeode
    </h1>
    </v-flex>

    <v-container>

    <v-layout column class="text-xs-center" >
    <v-flex
    class="text-xs-center"
    >
      <h2 class="headline primary--text my-3">
        Open source platform for representing and manipulating geometric models
      </h2>
    </v-flex >  

    <v-flex
    class="text-xs-center"
    xs12
    sm4
    >
      <v-card
        flat
        style="background: rgba(0,0,0,0)"
        my-5
      >
        <v-card-title
          primary-title
          class="justify-center display-1"
          >
          Visit Github repo
          </v-card-title>
        <a 
          href="https://github.com/Geode-solutions/OpenGeode" 
          target="_blank">
            <v-icon  
              :size="$vuetify.breakpoint.smAndUp ? 150 : 100"
              color="#000000">fab fa-github
            </v-icon>
          </a> 
      </v-card>
    </v-flex>
  
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
                    class="subheading"
                  >
                    {{ card.text }}
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>


      <h2 class="headline primary--text my-3">
        Because of all these points both academic and industrial 
            applications can safely rely on OpenGeode to develop new geomodeling and 
            meshing technologies, without losing time and energy on the complex task 
            of designing and maintaining model data structures.
      </h2>


      <v-carousel>
        <v-carousel-item
          v-for="(card, index) in cards"
          :key="index"
          :src="card.image"
          cycle
          interval=10
        >
          <v-jumbotron light>
            <v-container fill-height>
              <v-layout align-center>
                <v-flex>
                  <h3 class="display-3">{{ card.title }}</h3>
                  <span class="subheading">{{ card.text }}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-jumbotron>
        </v-carousel-item>
      </v-carousel>
            
    </v-layout>

      <h2 class="headline primary--text my-3">
        Academic and industrial applications can safely rely on OpenGeode to develop new geomodeling and 
            meshing technologies, without losing time and energy on the complex task 
            of designing and maintaining model data structures.
      </h2>


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
          title: 'Open source platform',
          image: 'http://www.picpedia.org/highway-signs/images/open-source.jpg',
          text:
            'OpenGeode is our open source platform. Because of these features and \
            its permissive software license (modified BSD), both academic and industrial \
            applications can safely rely on OpenGeode to develop new geomodeling and \
            meshing technologies without losing time and energy on the complex task \
            of designing and maintaining geological model data structures.',
          reverse: true
        },
        
        {
          title: 'Geometrical models',
          image: 'http://www.picpedia.org/highway-signs/images/open-source.jpg',
          text:
            'OpenGeode is for representing and manipulating geological models. CAD',
          reverse: false
        },

        {
          title: 'Extensibility and scriptability',
          image: 'http://www.picpedia.org/highway-signs/images/open-source.jpg',
          text:
            'OpenGeode is easy to use thanks to its readable API and its JavaScript scriptability for quick prototyping. \
            Entire extensible through a plugin system',
          reverse: true
        },

        {
          title: 'Geosciences',
          image: 'http://www.picpedia.org/highway-signs/images/open-source.jpg',
          text:
            'OpenGeode is designed from the ground up to support any geosciences applications requiring \
            a discretized geological model. It is the industrialisation of RINGMesh',
          reverse: false
        },

        {
          title: 'Efficiency',
          image: 'http://www.picpedia.org/highway-signs/images/open-source.jpg',
          text:
            'OpenGeode combines modern concurrency and GPU-accelerated programming. Written C++.',
          reverse: true
        },

        {
          title: 'CI/CD',
          image: 'http://www.picpedia.org/highway-signs/images/open-source.jpg',
          text:
            'A complete set of tools is used around OpenGeode to ensure its quality and its stability, \
            from continuous integration for building and testing on multiple architectures to continuous \
            deployment for keeping the platform up to date with latest improvements.',
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
