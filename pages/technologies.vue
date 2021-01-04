<template>
  <v-row no-gutters>
    <v-col>
      <v-container>
        <v-row>
          <v-col>
            <h1 class="display-3 my-5 py-5" align="center">
              Our technologies
            </h1>
            <p class="container title font-weight-light" align="justify">
              Geode-solutions is looking, researching and developing technologies
              to tackle next generation of 2D and 3D modeling challenges using advanced meshing.
            </p>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid style="background-color: white">
        <v-row class="container mx-auto">
          <v-col>
            <h2 class="display-2 font-weight-light ma-5" align="center">
              Meshing
            </h2>
            <v-card v-for="(mesh, index) in meshing" :key="index" style="margin-bottom: 40px">
              <v-row align="center" justify="space-around">
                <v-col :order-sm="(index + 1) % 2" cols="12" sm="5">
                  <v-card-text>
                    <v-lazy 
                      :options="{
                        threshold: .5
                      }"
                    >
                      <v-img
                        :src="require('@/assets/techno/'+mesh.image)"
                        :alt="'Geode-solutions '+ mesh.title"
                        contain
                      />
                    </v-lazy>
                  </v-card-text>
                </v-col>
                <v-col cols="12" sm="7">
                  <v-card flat>
                    <v-card-title primary-title class="justify-center display-1">
                      {{ mesh.title }}
                    </v-card-title>
                    <v-card-text align="justify" class="title">
                      {{ mesh.text }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col>
            <h2 class="display-2 font-weight-light ma-5" align="center">
              Modeling
            </h2>
            <v-card v-for="(model, index) in modeling" :key="index" style="margin-bottom: 40px">
              <v-row align="center" justify="space-around">
                <v-col :order-sm="(index + 1) % 2" cols="12" sm="5">
                  <v-card-text>
                    <v-lazy 
                      :options="{
                        threshold: .5
                      }"
                    >
                      <v-img
                        :src="require('@/assets/techno/'+model.image)"
                        :alt="'Geode-solutions '+ model.title"
                        contain
                      />
                    </v-lazy>
                  </v-card-text>
                </v-col>
                <v-col cols="12" sm="7">
                  <v-card flat>
                    <v-card-title primary-title class="justify-center display-1">
                      {{ model.title }}
                    </v-card-title>
                    <v-card-text align="justify" class="title">
                      {{ model.text }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid style="background-color: white">
        <v-row class="container mx-auto">
          <v-col>
            <h2 class="display-2 font-weight-light ma-5" align="center">
              Model repair
            </h2>
            <v-card v-for="(repair, index) in repairing" :key="index" style="margin-bottom: 40px">
              <v-row align="center" justify="space-around">
                <v-col :order-sm="(index + 1) % 2" cols="12" sm="5">
                  <v-card-text>
                    <v-lazy 
                      :options="{
                        threshold: .5
                      }"
                    >
                      <v-img
                        :src="require('@/assets/techno/'+repair.image)"
                        :alt="'Geode-solutions '+ repair.title"
                        contain
                      />
                    </v-lazy>
                  </v-card-text>
                </v-col>
                <v-col cols="12" sm="7">
                  <v-card flat>
                    <v-card-title primary-title class="justify-center display-1">
                      {{ repair.title }}
                    </v-card-title>
                    <v-card-text align="justify" class="title">
                      {{ repair.text }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    meshing: [
      {
        title: 'Surface remeshing',
        image: 'dfn.png',
        text:
          'Remeshing triangulated surfaces, both in 2D and 3D, is a necessary but often difficult operation.\
          This is particularly the case when dealing with open surfaces including holes, multiple contacts and small angles.'
      },
      {
        title: 'Tetrahedral meshing',
        image: 'corbi.gif',
        text:
          'Tetraheeral meshes are classical meshes used for various computations.\
          However, generating a good quality tetrahedral mesh of a complex geological model can still be challenging.'
      },
      {
        title: 'Hybrid meshing',
        image: 'coming-soon.jpg',
        text:
          'Hexahedral elements have great numerical properties but hard to respect a given geometry. \
            By combining hexahedra, tetrahedra and/or pyramids, hybrid meshes provide both \
            good numerical properties and respect to the input geometry.'
      }
    ],
    modeling: [
      {
        title: 'Explicit modeling',
        image: 'incremental.png',
        text:
          'XXXX.'
      },
      {
        title: 'Implicite modeling',
        image: 'coming-soon.jpg',
        text:
          'XXXX.'
      }
    ],
    repairing: [
      {
        title: 'Conversion between model and mesh',
        image: 'fractures.png',
        text:
          'XXXX.'
      },
      {
        title: 'Watertight model sealing',
        image: 'repair.png',
        text:
          'XXXX.'
      },
      {
        title: 'Model validity checker',
        image: 'coming-soon.jpg',
        text:
          'Before doing any computation or meshing step, make sure your data satisfy your needs.\
          Meshes can be degenerated, non-manifold, colocated and boundary representations can have topological issues.\
          This checker can track and expose all flawed configurations from your data.'
      },
      {
        title: 'Model simplification',
        image: 'coming-soon.jpg',
        text:
          'XXXXX.'
      }
    ]
  }),
  head() {
    return {
      title: 'Geode-solutions technologies'
    }
  }
}
</script>
