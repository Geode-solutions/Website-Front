<template>
  <v-row>
    <v-col>
      <h1 class="display-2" align="center">
        Our products
      </h1>
    </v-col>  

    <v-container fluid style="background-color: white">
      <v-row class="container mx-auto">
        <product category="Modeling" :products="modelingProducts"/>
      </v-row>
    </v-container>


    <v-container>
      <v-row>
        <product category="Meshing" :products="meshingProducts"/>
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
          images: [
            'https://cdn.pixabay.com/photo/2016/11/18/12/55/light-1834289_960_720.jpg',
            'https://cdn.pixabay.com/photo/2017/06/14/08/20/map-of-the-world-2401458_960_720.jpg'],
          title: 'Fast',
          text:
            'Aiming real-time using modern concurrency and GPU-accelerated programming '
        },
        {
          images: [
            'https://cdn.pixabay.com/photo/2016/08/05/09/28/hand-1571851_960_720.jpg',
            'https://cdn.pixabay.com/photo/2017/06/14/08/20/map-of-the-world-2401458_960_720.jpg'],
          title: 'Reinvented UI',
          text:
            "Dedicated for scientists using today's technologies, offering intuitivity and reactiveness"
        },
        {
          images: [
            'https://cdn.pixabay.com/photo/2016/08/05/09/28/hand-1571851_960_720.jpg',
            'https://cdn.pixabay.com/photo/2017/06/14/08/20/map-of-the-world-2401458_960_720.jpg'],
          title: 'Cross-platform',
          text:
            'Compatible and constinuously tested on Windows, Linux and MacOS'
        }
      ],
    meshingProducts: [
        {
          images: [
            'https://cdn.pixabay.com/photo/2016/11/18/12/55/light-1834289_960_720.jpg',
            'https://cdn.pixabay.com/photo/2017/06/14/08/20/map-of-the-world-2401458_960_720.jpg'],
          title: 'Fast',
          text:
            'Aiming real-time using modern concurrency and GPU-accelerated programming '
        },
        {
          images: [
            'https://cdn.pixabay.com/photo/2016/08/05/09/28/hand-1571851_960_720.jpg',
            'https://cdn.pixabay.com/photo/2017/06/14/08/20/map-of-the-world-2401458_960_720.jpg'],
          title: 'Reinvented UI',
          text:
            "Dedicated for scientists using today's technologies, offering intuitivity and reactiveness"
        },
        {
          images: [
            'https://cdn.pixabay.com/photo/2016/08/05/09/28/hand-1571851_960_720.jpg',
            'https://cdn.pixabay.com/photo/2017/06/14/08/20/map-of-the-world-2401458_960_720.jpg'],
          title: 'Cross-platform',
          text:
            'Compatible and constinuously tested on Windows, Linux and MacOS'
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
