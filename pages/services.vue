<template>
  <v-container>
    <v-row>
      <v-col>
        <h1
          class="text-h2 my-5 py-5"
          align="center"
        >
          Custom-tailored services
        </h1>
        <h2
          class="text-h4 my-5 pb-5"
          align="center"
        >
          <CommonContactUsButton />
        </h2>

        <v-card
          v-for="(service, index) in services_list"
          :key="index"
          style="margin-bottom: 40px"
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
                  :src="service.image"
                  :alt="'Geode-solutions ' + service.title"
                  cover
                />
              </v-card-text>
            </v-col>
            <v-col
              cols="12"
              sm="7"
            >
              <v-card flat>
                <v-card-title
                  primary-title
                  class="text-center text-h4 pa-8"
                  v-text="service.title"
                />
                <v-card-text
                  align="justify"
                  class="text-h6"
                  v-text="service.text"
                />
              </v-card>
            </v-col>
          </v-row>
        </v-card>
        <h2
          class="text-h4 my-5 py-5"
          align="center"
        >
          Let us know how we can help!
          <div class="my-2">
            <CommonContactUsButton />
          </div>
        </h2>
      </v-col>
    </v-row>
  </v-container>
  <v-container
    fluid
    style="background-color: white"
  >
    <v-row class="container mx-auto">
      <v-col>
        <h2
          class="section text-h2"
          align="center"
        >
          They use our services
        </h2>
        <CommonCarousel :items="services_users" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import logo_totalenergies from "@/assets/img/logos/logo_totalenergies.png"
  import logo_DHI from "@/assets/img/logos/logo_DHI.png"
  import integration from "@/assets/img/services/integration.jpg"
  import idea from "@/assets/img/services/idea.webp"
  import success from "@/assets/img/services/success.webp"
  import pencil from "@/assets/img/services/pencil.jpg"

  useHead({ titleTemplate: "Geode-solutions custom-tailored services" })

  const services_list = [
    {
      title: "OpenGeode integration",
      image: integration,
      text: "You would like to use OpenGeode environment, features and technologies within another software suite. \
            You are used to specific code and you need its features in an OpenGeode extension. \
            We offer you the possibility to integrate OpenGeode ecosystem, and your code, through other platform plugins.",
    },
    {
      title: "Prototyping/Code development",
      image: idea,
      text: "You need a technical solution to solve a dedicated problem. \
            You have precise needs on software development and features. \
            We propose you our skills and experience to design and develop \
            your solution from a working prototype to a full featured product.",
    },
    {
      title: "Expertise and Consulting",
      image: success,
      text: "You have specific questions or needs on meshing tasks or existing tools. \
              Our experts advices and skills will allow you to reach your objectives faster.",
    },
    {
      title: "Education",
      image: pencil,
      text: "You need to learn how to work with OpenGeode platform and our products. \
              You ask for courses on modeling and meshing or on software development. \
              We can build together custom training program designed from your needs.",
    },
  ]

  const services_users = [
    {
      name: "Total SE",
      logo: logo_totalenergies,
      url: "https://totalenergies.com/",
    },
    {
      name: "DHI",
      logo: logo_DHI,
      url: "https://www.dhigroup.com/",
    },
  ]
</script>
