<template>
    <v-container>
      <v-row class="text-center">
    <v-col>
      <h1 class="display-3 ma-5" align="center">
        Our products
      </h1>
      <p class="container title font-weight-light" align="justify">
        Geode-solutions provide a set of OpenGeode extensions designed to overcome 
        classical bottlenecks in modeling and meshing applications both 2D and 3D.
        These extensions offer new solutions developed with state-of-the-art technologies 
        with robustness, performance and pragmatism as main development driver.
        Every extension is deeply tested to reach optimum stability and efficiency.
        They are delivered as a complete application with user interface and
        as software components easily integrable in any software suite using their API, 
        and available on Windows, macOS and Linux.
      </p>
      <h2 class="display-2 font-weight-light ma-5" align="center">
        Technologies
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
                  class="justify-center display-1 px-5 ma-4"
                >
                  <v-badge
                    v-if="card.badge"
                    :color="card.color"
                    :content="card.badge"
                  >
                    {{ card.title }}
                  </v-badge>
                  <span v-else>
                    {{ card.title }}
                  </span>
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
      <!-- <h2 class="display-2 font-weight-light ma-5" align="center">
        Workflows
      </h2> -->
    </v-col>  
  </v-row>
    </v-container>
</template>

<script>
export default {
  head() {
    return {
      title: 'Geode-solutions products for geometric and geosciences models'
    }
  },
  data() {
    return {
      cards: [
        {
          title: '2D/3D triangular meshing',
          image: require('@/assets/fractures.png'),
          text:
            'OpenGeode is an open source C++ framework available on GitHub, \
            under a permissive software license (MIT). \
            We also provide pre-compiled releases on several platforms: \
            Windows, UNIX-based, macOS.',
          badge: "beta",
          color: "green"
        },        
        {
          title: '3D tetrahedral meshing',
          image: 'https://cdn.pixabay.com/photo/2016/01/08/18/00/antelope-canyon-1128815_960_720.jpg',
          text:
            'OpenGeode offers a CAD framework dedicated to Geosciences with \
            data structures for meshes (wells, faults, horizons, 3D structured, \
            partially or fully unstructured meshes), and for boundary representations \
            organizing a rich set of relationships between geological features (structural \
            models, cross-sections).',
          badge: "beta",
          color: "green"
        },
        {
          title: 'Incremental surface-based modeling',
          image: 'https://cdn.pixabay.com/photo/2012/03/01/01/42/connect-20333_960_720.jpg',
          text:
            'OpenGeode supports users in adding new functionalities to allow easy adaptation to specific requirements. \
            We provide a quick start template to create your own technologies based on OpenGeode.',
          badge: "beta",
          color: "green"
        },
        {
          title: 'Watertight mesh/model sealing',
          image: 'https://cdn.pixabay.com/photo/2014/06/18/16/31/jet-engine-371412_960_720.jpg',
          text:
            'Modern concurrency and GPU-accelerated solutions are planned to be integrated to reach real-time computations. \
            We want to deliver turnkey powerful solutions for effective and immediate use.',
          badge: "beta",
          color: "green"
        },
        {
          title: '3D mixed-element meshing',
          image: 'https://cdn.pixabay.com/photo/2017/07/28/23/18/coming-soon-2550190_960_720.jpg',
          text:
            'A complete set of tools is used around OpenGeode to ensure its quality and its stability. \
            The Continuous Integration and Continuous Delivery philosophy has been chosen: code changes \
            are delivered more frequently, more reliably (high-leveled tests) and as automatic as possible, \
            using Microsoft Azure DevOps tools.'
        },
        {
          title: 'Mesh/model validity checker',
          image: 'https://cdn.pixabay.com/photo/2017/07/28/23/18/coming-soon-2550190_960_720.jpg',
          text:
            'OpenGeode is easy to read since its code intelligibility:\
            API librairies are heavily documented, classes and methods are meaningful named. \
            OpenGeode is easy to get and to compile.  Convenient and open-source tools will soon be associated to OpenGeode:\
            a Javascript-based scriptability framework for quick prototyping and \
            a web-based application using an innovative UI and modern technologies.'
        }
      ]
    }
  }
}
</script>
