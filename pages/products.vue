<template>
  <v-row>
    <v-col>
      <h1 class="display-2" align="center">
        Our products
      </h1>
    </v-col>  

    <v-container fluid style="background-color: white">
      <v-row class="container mx-auto">
        <v-col>
          <h2
            class="section display-3"
            align="center"
          >
            Modeling
          </h2>
          <v-row
            justify="center"
          >
            <v-col
              v-for="(card, index) in modelingProducts"
              :key="index"
                cols="12"
                md="5"
            >
              <v-card
                v-scroll-reveal
                class="elevation-5"
                height="100%"
              >
              <v-carousel cycle interval="2000" height="200"> 
              <v-carousel-item
                v-for="(image, index) in card.images"
                :key="index">
                <v-img
                  :src="image"
                  :alt="'Geode-solutions '+ card.title"
                  height="100%"
                  gradient="to top right, rgba(255,255,255,.4), rgba(255,255,255,.8)"
                >
                </v-img>
              </v-carousel-item>
              </v-carousel>
                  <v-card-title 
                    primary-title
                    class="display-1 justify-center"
                  >
                    {{ card.title }}
                  </v-card-title>
                <v-card-text class="body-1 font-weight-medium text-center">
                  {{ card.text }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>


    <v-container >
      <v-row >
        <v-col>
          <h2
            class="section display-3"
            align="center"
          >
            Meshing
          </h2>
          <v-row
            justify="center"
          >
            <v-col
              v-for="(card, index) in meshingProducts"
              :key="index"
                cols="12"
                md="5"
            >
              <v-card
                v-scroll-reveal
                class="elevation-5"
                height="100%"
              >
              <v-carousel cycle interval="2000" height="200"> 
              <v-carousel-item
                v-for="(image, index) in card.images"
                :key="index">
                <v-img
                  :src="image"
                  :alt="'Geode-solutions '+ card.title"
                  height="100%"
                  gradient="to top right, rgba(255,255,255,.4), rgba(255,255,255,.8)"
                >
                </v-img>
              </v-carousel-item>
              </v-carousel>
                  <v-card-title 
                    primary-title
                    class="display-1 justify-center"
                  >
                    {{ card.title }}
                  </v-card-title>
                <v-card-text class="body-1 font-weight-medium text-center">
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
