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
            <v-lazy 
              :options="{
                threshold: .5
              }"
              min-height="500"
            >
              <v-card
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
            </v-lazy>
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
  data() {
    return {
      cards: [
        {
          title: '2D/3D triangular meshing',
          image: require('@/assets/dfn.png'),
          text:
            'Remeshing of 2D and 3D triangulated surfaces, \
            targeting both triangle equilaterality and user input mesh sizes. \
            Robust to degenerated input meshes and guaranteed conformal to surface intersections.',
          badge: "beta",
          color: "green"
        },        
        {
          title: '3D tetrahedral meshing',
          image: require('@/assets/corbi.gif'),
          text:
            'Tetrahedral mesh generation from a set of triangulated surfaces, \
            targeting both tetrahedron regularity and user input mesh sizes. \
            The mesh of all input surfaces is used to constrain the mesh generation.',
          badge: "beta",
          color: "green"
        },
        {
          title: 'Watertight mesh/model sealing',
          image: require('@/assets/repair.png'),
          text:
            'Repair and build a boundary representation which ensure the watertightness. \
            This property is key to guarantee model integrity, topological requests validity and conformal meshing.',
          badge: "beta",
          color: "green"
        },
        {
          title: 'Incremental surface-based modeling',
          image: 'https://cdn.pixabay.com/photo/2017/07/28/23/18/coming-soon-2550190_960_720.jpg',
          text:
            'Build a boundary representation from an independent set of surfaces. \
            This technology produces all surface intersections in an extreme robust way \
            and the topology associated to these surfaces. \
            New surface can be added or removed from the model at any time.'
        },
        {
          title: '3D mixed-element meshing',
          image: 'https://cdn.pixabay.com/photo/2017/07/28/23/18/coming-soon-2550190_960_720.jpg',
          text:
            'Hexahedral elements have great numerical properties but hard to respect a given geometry. \
            By combining hexahedra, tetrahedra and/or pyramids, mixed-element meshes provide both \
            good numerical properties and respect to the input geometry.'
        },
        {
          title: 'Mesh/model validity checker',
          image: 'https://cdn.pixabay.com/photo/2017/07/28/23/18/coming-soon-2550190_960_720.jpg',
          text:
            'Before doing any computation or meshing step, make sure your data satisfy your needs. \
            Meshes can be degenerated, non-manifold, colocated and boundary representations can have \
            topological issues. This checker can track and expose all flawed configurations from your data.'
        }
      ]
    }
  },
  head() {
    return {
      title: 'Geode-solutions products for geometric and geosciences models'
    }
  }
}
</script>
