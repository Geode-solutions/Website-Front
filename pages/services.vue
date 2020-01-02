<template>
  <v-container>
    <v-row>
      <v-col>
        <h1
          class="display-3 my-5 py-5"
          align="center"
        >
          Custom-tailored services
        </h1>
        <v-card
          v-for="(service, index) in services"
          :key="index"
          class="my-5"
        >
          <v-row
            align="center"
            justify="space-around"
          >
            <v-col
              :order-sm="(index + 1) % 2"
              cols="12"
              sm="5"
            >
              <v-card-text>
                <v-img
                  v-scroll-reveal
                  :src="service.image"
                  :alt="'Geode-solutions '+ service.title"
                  contain
                />
              </v-card-text>
            </v-col>
            <v-col
              cols="12"
              sm="7"
            >
              <v-card
                flat
                style="background: rgba(0,0,0,0)"
              >
                <v-card-title
                  primary-title
                  class="justify-center display-1"
                >
                  {{ service.title }}
                </v-card-title>
                <v-card-text
                  align="justify"
                  class="body-1"
                >
                  {{ service.text }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
        <h2
          class="display-1 my-5 py-5"
          align="center"
        >
          Let us know how we can help: <a href="mailto:contact@geode-solutions.com"><strong>Contact us</strong></a>
        </h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
      services: [
        {
          title: 'Open source platform',
          image: require('@/assets/open-source.jpg'),
          text:
            'OpenGeode is our open source platform for representing and manipulating geological models.\
              It is designed from the ground up to support any geosciences applications requiring a discretized geological model.\
              The platform is easy to use thanks to its readable API and its JavaScript scriptability for quick prototyping.',
        },
        {
          title: 'Advanced meshing and modeling',
          image: require('@/assets/mesh_JD_Hancock.png'),
          text:
            'Our reliable and pratical solutions for meshing and modeling combine innovative technologies across industrial fields.\
             It allows us to bring robustness and high industrial quality meshes on deeply complex models.\
            Available in proprietary OpenGeode extension.',
        },
        {
          title: 'Custom-tailored services',
          image: require('@/assets/mesh_JD_Hancock.png'),
          text:
            'We delivers custom-tailored services to address your specific needs and challenges. \
            Our experts can provide training, support and software development on a wild range of applications from geometry and software to geosciences.',
        }
      ],
    }
  ),
  head() {
    return {
      title: 'Geode-solutions custom-tailored services'
    }
  }
}
</script>
