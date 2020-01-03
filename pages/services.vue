<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="display-3 my-5 py-5" align="center">
          Custom-tailored services
        </h1>
        <h2 class="display-1 my-5 pb-5" align="center">
          <v-btn large color="primary" dark href="mailto:contact@geode-solutions.com">
            Contact us
          </v-btn>
        </h2>
        <v-card v-for="(service, index) in services" :key="index" style="margin-bottom: 40px">
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
              <v-card flat>
                <v-card-title primary-title class="justify-center display-1">
                  {{ service.title }}
                </v-card-title>
                <v-card-text align="justify" class="title">
                  {{ service.text }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
        <h2 class="display-1 my-5 py-5" align="center">
          Let us know how we can help!
          <div class="my-2">
            <v-btn large color="primary" dark href="mailto:contact@geode-solutions.com">
              Contact us
            </v-btn>
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
        title: 'OpenGeode integration in software suite',
        image: 'https://cdn.pixabay.com/photo/2017/08/13/05/08/solve-2636254_960_720.jpg',
        text:
          'You would like to use OpenGeode environment, features and technologies within another software suite. \
            We offer you the possibility to integrate OpenGeode ecosystem through other platform plugins.'
      },
      {
        title: 'Third party integration in OpenGeode',
        image: 'https://cdn.pixabay.com/photo/2016/05/01/10/26/integration-1364673_960_720.jpg',
        text:
          'You are used to specific code and you need its features in an OpenGeode extension. \
            We are able to develop your OpenGeode extension integrating your code and its features.'
      },
      {
        title: 'Prototyping ideas',
        image: 'https://cdn.pixabay.com/photo/2017/03/07/13/02/thought-2123970_960_720.jpg',
        text:
          'You need a technical solution to solve a dedicated problem. \
            You have or have not preliminary idea to reach that goal. \
            Geode-solutions listens to you to develop for you a working prototype.'
      },
      {
        title: 'Custom development',
        image: 'https://cdn.pixabay.com/photo/2015/09/29/22/49/blueprint-964630_960_720.jpg',
        text:
          'You have precise needs on software development and features. \
            You do not have technical skills to execute this development project. \
            We propose you our skills and experience to design and develop your solution.'
      },
      {
        title: 'Expertise and Consulting',
        image: 'https://cdn.pixabay.com/photo/2017/02/19/23/09/success-2081168_960_720.jpg',
        text:
          'You have specific questions or needs on meshing tasks or existing tools. \
            Our experts advices and skills will allow you to reach your objectives faster.'
      },
      {
        title: 'Education',
        image:
          'https://cdn.pixabay.com/photo/2016/06/29/08/50/pencil-1486278_960_720.jpg',
        text:
          'You need to learn how to work with OpenGeode platform and our products. \
            You ask for courses on modeling and meshing or on software development. \
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
