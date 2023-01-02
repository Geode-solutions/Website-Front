<template>
    <h2 class="section text-h2" align="center">
        They support us
    </h2>
    <Carousel wrapAround :itemsToShow="nb_partners">
        <Slide
            v-for="(supporter, index) in supporters"
            :key="index"
            class="logo"
        >
            {{ supporter }}
            <!-- <a :href="supporter.url" target="_blank">
                <v-img
                    width="80%"
                    :src="supporter.logo"
                >
                </v-img>
            </a> -->
            <Navigation />
            <Pagination />
        </Slide>
    </Carousel>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'


export default defineComponent({
    name: 'Partners',
    components: {
        Carousel, Slide, Navigation, Pagination 
    },
    data() {
        return {
            supporters: [
                {
                    name: 'Helioparc',
                    logo: 'logo_helioparc.svg',
                    url: 'http://www.helioparc.fr',
                },
                {
                    name: 'LaBanquiz',
                    logo: 'logo_banquiz.png',
                    url: 'https://labanquiz.com',
                },
                {
                    name: 'NAOS',
                    logo: 'logo_NAOS.png',
                    url: 'https://naos-cluster.com',
                },
                {
                    name: 'Nouvelle-Aquitaine',
                    logo: 'logo_region.png',
                    url: 'https://www.nouvelle-aquitaine.fr',
                },
                {
                    name: 'Geoliens',
                    logo: 'logo_geoliens.png',
                    url: 'https://www.geoliens.org',
                },
            ],
        }
    },
    computed: {
        nb_partners() {
            // switch (this.$vuetify.breakpoint.name) {
            //     case 'xs':
            //     return 1
            //     case 'sm':
            //     return 2
            //     default:
            //     return 3
            // }
            return 3
        },
    },
})
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

