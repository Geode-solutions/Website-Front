<template>
  <Carousel :settings="carrousel_settings">
    <Slide
      v-for="(item, index) in props.items"
      :key="index"
      class="carousel__slide"
    >
      <a
        :href="item.url"
        target="_blank"
      >
        <img
          :src="item.logo"
          class="carousel__item"
        >
      </a>
    </Slide>
    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
  items: { type: Array, required: true }
})

const { name } = useDisplay()
const nb_items_to_display = computed(() => {
  switch (name.value) {
    case 'xs': return 1
    case 'sm': return 2
    default: return 3
  }
})

const carrousel_settings = {
  autoplay: 2000,
  itemsToShow: nb_items_to_display.value,
  itemsToScroll: props.items.length / nb_items_to_display.value,
  pauseAutoplayOnHover: true,
  transition: 1000,
  wrapAround: true
}
</script>

<style scoped>
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-white);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>