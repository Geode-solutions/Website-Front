<template>
  <v-row>
    <v-col class="text-center text-h4 text-h6" cols="12">
      <h1 class="text-h2 my-5 py-5" align="center">OpenGeode</h1>
    </v-col>
    <client-only>
      <Particles
        id="tsparticles"
        class="particles-wrapper mb-5"
        style="z-index: 1"
        :particles-init="particlesInit"
        :options="{
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 2,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          fullScreen: {
            enable: false,
          },
          particles: {
            color: {
              value: '#004D40',
            },
            links: {
              color: '#00897B',
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: 'none',
              enable: true,
              outMode: 'bounce',
              random: false,
              speed: 3,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: 'circle',
            },
            size: {
              random: true,
              value: 5,
            },
          },
        }"
      />
    </client-only>

    <v-container>
      <v-row class="text-center">
        <v-col>
          <h2 class="text-h4 text-primary my-5">
            Open source framework <br />
            for representing and manipulating geometric models
          </h2>

          <v-hover v-slot="{ hover }">
            <v-card
              class="mx-auto"
              max-width="500"
              rounded
              :elevation="hover ? 20 : 2"
              href="https://github.com/Geode-solutions/OpenGeode"
              target="_blank"
            >
              <v-card-title primary-title class="justify-center text-h3">
                Visit GitHub repo
              </v-card-title>
              <v-card-text>
                <v-icon :size="smAndUp ? 180 : 100" color="#000000">
                  mdi-github
                </v-icon>
              </v-card-text>
            </v-card>
          </v-hover>

          <h2 class="section text-h2 mt-5" align="center">Key features</h2>
          <v-row justify="space-around">
            <v-col
              v-for="card in cards_list"
              :key="card.title"
              cols="11"
              sm="5"
              md="6"
            >
              <v-card height="100%">
                <v-img
                  :src="card.image"
                  :alt="'Geode-solutions ' + card.title"
                  cover
                />
                <v-card-title primary-title class="justify-center text-h4">
                  {{ card.title }}
                </v-card-title>
                <v-card-text align="justify" class="text-body-1">
                  {{ card.text }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <h2 class="text-h4 my-5 py-5" align="center">
            Interested by OpenGeode features?
            <div class="my-2">
              <CommonContactUsButton />
            </div>
          </h2>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid style="background-color: white">
      <v-row class="container mx-auto">
        <v-col>
          <h2 class="section text-h2" align="center">They use it</h2>
          <Carousel :items="users_list" />
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>

<script setup>
  import { useDisplay } from "vuetify"
  import road from "@/assets/img/opengeode/road.jpg"
  import canyon from "@/assets/img/opengeode/antelope-canyon.jpg"
  import technique from "@/assets/img/opengeode/technique.jpg"
  import ruler from "@/assets/img/opengeode/ruler.jpg"
  import hands from "@/assets/img/opengeode/hands.jpg"
  import jet_engine from "@/assets/img/opengeode/jet-engine.jpg"
  import logo_totalenergies from "@/assets/img/logos/logo_totalenergies.png"
  import logo_ring from "@/assets/img/logos/logo_ring.png"
  import logo_gsc from "@/assets/img/logos/logo_GSC.png"
  import logo_bsc from "@/assets/img/logos/logo_BSC.png"

  import { loadFull } from "tsparticles"

  const particlesInit = async (engine) => {
    await loadFull(engine)
  }

  useHead({
    titleTemplate: "OpenGeode - open source framework for geometric models",
  })

  const users_list = [
    {
      name: "Total SE",
      logo: logo_totalenergies,
      url: "https://totalenergies.com/",
    },
    {
      name: "RING",
      logo: logo_ring,
      url: "https://www.ring-team.org",
    },
    {
      name: "GSC",
      logo: logo_gsc,
      url: "https://www.nrcan.gc.ca/home",
    },
    {
      name: "BSC",
      logo: logo_bsc,
      url: "https://www.bsc.es/",
    },
  ]

  const cards_list = [
    {
      title: "Open source and cross-platform",
      image: road,
      text: "OpenGeode is an open source C++ framework available on GitHub, \
              under a permissive software license (MIT). \
              We also provide pre-compiled releases on several platforms: \
              Windows and UNIX-based.",
    },
    {
      title: "Geometric and geological models",
      image: canyon,
      text: "OpenGeode offers a CAD framework dedicated to Geosciences with \
              data structures for meshes (wells, faults, horizons, 3D structured, \
              partially or fully unstructured meshes), and for boundary representations \
              organizing a rich set of relationships between geological features (structural \
              models, cross-sections).",
    },
    {
      title: "Industrial quality",
      image: technique,
      text: "A complete set of tools is used around OpenGeode to ensure its quality and its stability. \
              The Continuous Integration and Continuous Delivery philosophy has been chosen: code changes \
              are delivered more frequently, more reliably (high-leveled tests) and automatically, \
              using open-source GitHub tools.",
    },
    {
      title: "Ease-of-use",
      image: ruler,
      text: "OpenGeode is easy to read since its code intelligibility:\
              API librairies are heavily documented, classes and methods are meaningful named. \
              OpenGeode is easy to get and to compile.  Convenient and open-source tools will soon be associated to OpenGeode:\
              a Python-based scriptability framework for quick prototyping and \
              a web-based application using an innovative UI and modern technologies.",
    },
    {
      title: "Extensibility",
      image: hands,
      text: "OpenGeode supports users in adding new functionalities to allow easy adaptation to specific requirements. \
              We provide a quick start template to create your own technologies based on OpenGeode.",
    },
    {
      title: "Efficiency",
      image: jet_engine,
      text: "Modern concurrency and GPU-accelerated solutions are planned to be integrated to reach real-time computations. \
              We want to deliver turnkey powerful solutions for effective and immediate use.",
    },
  ]

  const { smAndUp } = useDisplay()
</script>

<style scoped>
  .particles-wrapper {
    width: 100%;
    height: 50vh;
  }

  .title {
    position: absolute;
    top: 25vh;
    width: 100%;
    height: 50%;
  }

  .section {
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
