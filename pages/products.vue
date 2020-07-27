<template>
  <v-row no-gutters>
    <v-col>
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
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid style="background-color: white">
        <v-row class="container mx-auto">
          <v-col>
            <h2 class="display-2 font-weight-light ma-5" align="center">
              Pilot program
            </h2>
            <p class="container title font-weight-light" align="justify">
              Join our pilot program to be the first take advantage of Geode-solutions new high technologies.
              <ul>
                <li>
                  <span class="text-h6">Involvement:</span> 
                  You participate in bringing mature and production-ready technologies into your workflows
                </li>
                <li>
                  <span class="text-h6">Influence:</span> 
                  Your feedbacks drive technologies to overcome your current bottlenecks
                </li>
                <li>
                  <span class="text-h6">Premiere:</span> 
                  You receive prime access to early technology developments
                </li>
                <li>
                  <span class="text-h6">Keep abreast:</span> 
                  You benefit from continuous improvements releasing, up to each week
                </li>
                <li>
                  <span class="text-h6">Acknowledgment:</span> 
                  Your investment is rewarded with price discount
                </li>
              </ul>
            </p>
            <h2 class="display-1 my-5 pb-5" align="center">
              <v-btn large color="primary" dark href="mailto:contact@geode-solutions.com">
                Contact us
              </v-btn>
            </h2>
            <h2 class="display-1 font-weight-light ma-5" align="center">
              Pilot program technologies
            </h2>
            <v-row justify="space-around">
              <v-col
                v-for="beta in betas"
                :key="beta.title"
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
                      :src="beta.image"
                      :alt="'Geode-solutions '+ beta.title"
                      contain
                    />
                    <v-card-title
                      primary-title
                      class="justify-center display-1 px-5 ma-4"
                    >
                      {{ beta.title }}
                    </v-card-title>
                    <v-card-text
                      align="justify"
                      class="body-1"
                    >
                      {{ beta.text }}
                      <ul class="ma-2">
                        <li 
                          v-for="feature in beta.features"
                          :key="feature"
                          class="body-1 font-weight-medium"
                        >
                          {{ feature }}
                        </li>
                      </ul>
                    </v-card-text>
                  </v-card>
                </v-lazy>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col>
            <h2 class="display-2 font-weight-light ma-5" align="center">
              Next technologies
            </h2>
            <v-row justify="space-around">
              <v-col
                v-for="next in nexts"
                :key="next.title"
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
                      :src="next.image"
                      :alt="'Geode-solutions '+ next.title"
                      contain
                    />
                    <v-card-title
                      primary-title
                      class="justify-center display-1 px-5 ma-4"
                    >
                      {{ next.title }}
                    </v-card-title>
                    <v-card-text
                      align="justify"
                      class="body-1"
                    >
                      {{ next.text }}
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
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      betas: [
        {
          title: '2D/3D triangular remeshing',
          image: require('@/assets/dfn.png'),
          text:
            'Remeshing of 2D and 3D triangulated surfaces, \
            targeting both triangle equilaterality and user input mesh sizes.',
          features: [
            "Robust to degenerated input meshes", 
            "Guaranteed conformal to surface intersections"
          ]
        },        
        {
          title: '3D tetrahedral meshing',
          image: require('@/assets/corbi.gif'),
          text:
            'Tetrahedral mesh generation from a set of triangulated surfaces, \
            targeting both tetrahedron regularity and user input mesh sizes.',
          features: [
            "Robust to degenerated input meshes", 
            "Guaranteed conformal to input boundary surface meshes"
          ]
        },
        {
          title: 'Conversion between model and mesh',
          image: require('@/assets/fractures.png'),
          text:
            'Handy tools to convert mesh to boundary representation and boundary representation to mesh.',
          features: [
            'Automatic recovery of model components and topology from mesh',
            'Output mesh gathering all model information as attributes'
          ]
        },
        {
          title: 'Watertight model sealing',
          image: require('@/assets/repair.png'),
          text:
            'Repair and build a boundary representation which ensure the watertightness. \
            This property is key to guarantee model integrity, topological requests validity and conformal meshing.',
          features: [
            "Remove all gaps and intersections between surfaces",
            "Compute watertight model components and topology",
            "Guaranteed full conformal meshes with all model components"
          ]
        },
        {
          title: 'Incremental surface-based modeling',
          image: require('@/assets/incremental.png'),
          text:
            'Build a boundary representation from an independent set of surfaces in an extreme robust way.',
          features: [
            "Produce surface to surface intersections and topology",
            "Interactive surface addition and removal from the model",
            "Guaranteed model validity at any time"
          ]
        }
      ],
      nexts: [
        {
          title: 'Mesh/model validity checker',
          image: 'https://cdn.pixabay.com/photo/2017/07/28/23/18/coming-soon-2550190_960_720.jpg',
          text:
            'Before doing any computation or meshing step, make sure your data satisfy your needs. \
            Meshes can be degenerated, non-manifold, colocated and boundary representations can have \
            topological issues. This checker can track and expose all flawed configurations from your data.'
        },
        {
          title: '3D mixed-element meshing',
          image: 'https://cdn.pixabay.com/photo/2017/07/28/23/18/coming-soon-2550190_960_720.jpg',
          text:
            'Hexahedral elements have great numerical properties but hard to respect a given geometry. \
            By combining hexahedra, tetrahedra and/or pyramids, mixed-element meshes provide both \
            good numerical properties and respect to the input geometry.'
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
