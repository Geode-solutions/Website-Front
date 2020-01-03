<template>
  <v-row>
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
    <v-container fluid style="background-color: white">
      <v-row class="container mx-auto">
        <product category="Modeling" :products="modelingProducts" />
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <product category="Meshing" :products="meshingProducts" />
      </v-row>
    </v-container>
  </v-row>
</template>

<script>
import Product from "@/components/Product"

export default {
  components: {
    Product
  },
  data: () => ({
    modelingProducts: [
        {
          images: [],
          title: 'Modeling from surfaces',
          text:
            'Build your sealed model by inserting/removing surfaces incrementally, always valid at each step.'
        },
        {
          images: [],
          title: 'Modeling from data points',
          text:
            "Compute surfaces fitting your set of points and design your sealed model"
        }
      ],
    meshingProducts: [
        {
          images: [],
          title: 'Validating and repairing',
          text:
            'Checking mesh and/or model required features to design your simulation application'
        },
        {
          images: [],
          title: 'Surface model remeshing',
          text:
            "Robust triangulated surface model remesher, adapted to any geometric constraint."
        },
        {
          images: [],
          title: 'Volume model meshing',
          text:
            "Robust tetrahedral model mesher, adapted to any geometric constraint."
        }
      ]
    }
  ),
  head() {
    return {
      title: 'Geode-solutions products for geometric and geosciences models'
    }
  }
}
</script>
