<template>
  <v-container width="100%">
    <v-row no-gutters>
      <v-col>
        <HomePageLandingView />
        <HomePageOurOffer />
        <HomePageApplicationFields />
        <HomePageOurConcepts />
        <HomePageOurSkills />
        <HomePageOurPersonnel />
        <HomePageOurSupports />
        <HomePageOurPartners />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
useHead({
  title: 'Geode-solutions - next generation of modeling tools',
  meta:
    [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }, {
        hid: 'description',
        name: 'description',
        content:
          'Technology company tackling next generation of modeling challenges using advanced meshing'
      }
    ],
  link:
    [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
})
</script>

<style>
.section {
  padding-top: 0;
  padding-bottom: 50px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
