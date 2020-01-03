<template>
  <v-col>
    <h2
      class="section display-2 ma-5"
      align="center"
    >
      {{ category }}
    </h2>
    <v-row
      justify="space-around"
    >
      <v-col
        v-for="(card, i) in products"
        :key="i"
        cols="12"
        md="6"
      >
        <v-card
          v-scroll-reveal
          class="elevation-5"
          height="100%"
        >
          <v-carousel v-if="card.images.length > 1" cycle hide-delimiter-background interval="2000" :height="height"> 
            <v-carousel-item
              v-for="(image, j) in card.images"
              :key="j"
            >
              <v-img
                :src="image"
                height="100%"
              />
            </v-carousel-item>
          </v-carousel>
          <v-img
            v-else-if="card.images.length == 1"
            :src="card.images[0]"
            :height="height"
          />
          <v-img
            v-else
            src="https://cdn.pixabay.com/photo/2017/07/28/23/18/coming-soon-2550190_960_720.jpg"
            :height="height"
          />
              

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
</template>

<script>
export default {
  props: {
    category: {
      required: true,
      type: String
    },
    products: {
      required: true,
      type: Array
    }
  },
  data: () => ({height: "300"})
}
</script>
