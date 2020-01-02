<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="display-3 my-5 py-5" align="center">Custom-tailored services</h1>
        <v-card v-for="(service, index) in services" :key="index" class="my-5">
          <v-row align="center" justify="space-around">
            <v-col :order-sm="(index + 1) % 2" cols="12" sm="5">
              <v-card-text>
                <v-img
                  v-scroll-reveal
                  :src="service.image"
                  :alt="'Geode-solutions '+ service.title"
                  contain
                />
              </v-card-text>
            </v-col>
            <v-col cols="12" sm="7">
              <v-card flat style="background: rgba(0,0,0,0)">
                <v-card-title primary-title class="justify-center display-1">{{ service.title }}</v-card-title>
                <v-card-text align="justify" class="title">{{ service.text }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
        <h2 class="display-1 my-5 py-5" align="center">
          Let us know how we can help:
          <div class="my-2">
            <v-btn large color="primary" dark href="mailto:contact@geode-solutions.com">Contact us</v-btn>
          </div>
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
        title: 'OpenGeode integration',
        image: require('@/assets/mesh_JD_Hancock.png'),
        text:
          'You would like to use OpenGeode features and technologies as another software plugin. \
            We offer you the possibility to develop integration of OpenGeode through other platform plugins.'
      },
      {
        title: 'Third party integration in OpenGeode',
        image: require('@/assets/mesh_JD_Hancock.png'),
        text:
          'You are used to specific code and you need its feature in a OpenGeode module. \
            We are able to develop your OpenGeode module integrating a code or its features.'
      },
      {
        title: 'Prototyping ideas',
        image: require('@/assets/mesh_JD_Hancock.png'),
        text:
          'You need a technical solution to solve a dedicated problem. \
            You have or have not preliminary idea to reach that goal. \
            Geode-solutions listens to you to develop for you a working prototype.'
      },
      {
        title: 'Custom development',
        image: require('@/assets/mesh_JD_Hancock.png'),
        text:
          'You have precise needs on tool development in mesh and modeling domains. \
            You do not have technical skills to execute this development project. \
            We propose you our skills and experience in these domains to design and develop your solution.'
      },
      {
        title: 'Expertise and Consulting',
        image: require('@/assets/mesh_JD_Hancock.png'),
        text:
          'You have specific needs on meshing tasks or existing tools. \
            Our experts advices and skills will allow you to reach your objectives faster.'
      },
      {
        title: 'Education',
        image:
          'https://cdn.pixabay.com/photo/2016/06/29/08/50/pencil-1486278_960_720.jpg',
        text:
          'You need to learn how to work with OpenGeode platform and our products. \
            You ask for courses on modeling and meshing. \
            We can build together custom training program designed from your needs.'
      }
    ]
  }),
  head() {
    return {
      title: 'Geode-solutions custom-tailored services'
    }
  }
}
</script>
