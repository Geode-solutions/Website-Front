<template>
  <v-col>
    <h2
      class="section display-3"
      align="center"
    >
      {{ category }}
    </h2>
    <v-row
      justify="space-around"
    >
      <v-col
        v-for="(card, index) in products"
        :key="index"
        cols="12"
        md="6"
      >
        <v-card
          v-scroll-reveal
          class="elevation-5"
          height="100%"
        >
          <v-carousel cycle hide-delimiter-background interval="2000" height="200"> 
            <v-carousel-item
              v-for="(image, index) in card.images"
              :key="index"
            >
              <v-img
                :src="image"
                :alt="'Geode-solutions '+ card.title"
                height="100%"
                gradient="to top right, rgba(255,255,255,.4), rgba(255,255,255,.8)"
              />
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
  }
}
</script>
