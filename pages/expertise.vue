<template>
  <v-container>
    <v-row class="flex-column align-center">
      <v-col cols="9">
        <h1 class="text-h2 my-5 py-5" align="center">
          Our expertise
        </h1>
        <p class="container text-h6 font-weight-light" align="justify">
          Geode-solutions is looking, researching and developing
          technologies and expertise to tackle next generation of 2D and 3D
          modeling challenges using advanced meshing.
        </p>
        <v-card v-for="(mesh, index) in meshing" :key="index" style="margin-bottom: 40px">
          <v-row align="center" justify="space-around">
            <v-col :order-sm="index % 2" cols="12" sm="5">
              <v-card-title primary-title class="text-center text-h4" v-text="mesh.title">
              </v-card-title>
            </v-col>
            <v-col cols="12" sm="7">
              <v-card flat>
                <v-card-text align="justify" class="text-h6" v-text="mesh.text">
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
        <h2 class="text-h4 my-5 py-5" align="center">
          Let us know how we can help!
          <div class="my-2">
            <CommonContactUsButton />
          </div>
        </h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'GeodeExpertise',
  data: () => ({
    meshing: [
      {
        title: 'Geosciences meshing',
        text: 'Surfaces remeshing or volumetric meshing, using tetrahedral or more complex meshes \
          such as hybrid meshes, is a necessary but often difficult operation.\
          This is particularly the case when dealing with open surfaces including holes, multiple contacts and small angles, \
          as it is in geological models. Our meshing technologies are based on robust and pragmatic algorithms \
          to garantee the result of this key operation.',
      },
      {
        title: 'Geosciences modeling',
        text: 'Creating a complete geological model from a set of independent surfaces or a set of points is known as explicit or implicit modeling. \
          Based on data, knowledge, interpolation, and robust geometrical/topological editing operations, \
          our modeling tools are able to build numerical models of the subsurface domain of interest.',
      },
      {
        title: 'Geosciences model repair',
        text: 'Before doing any computation or meshing step, make sure your data satisfies your needs.\
          Meshes can be degenerated, non-manifold, collocated and boundary representations can have topological issues. \
          Our model repair technologies tracks, exposes and fixs a lot of flawed configurations from your data',
      },
    ],
  }),
  head() {
    return {
      title: 'Geode-solutions expertise',
    }
  },
}
</script>
