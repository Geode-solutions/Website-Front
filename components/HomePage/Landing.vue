<template>
  <client-only>
    <v-parallax
      src="@/assets/hero.jpg"
      :height="window_height"
      alt="Geode-solutions next generation of modeling challenges"
    >
      <v-card
        class="container"
        width="600"
        style="
              border-radius: 80px 0px;
              background-color: rgba(255, 255, 255, 0.8);
            "
      >
        <v-row
          class="flex-column pa-3"
          align="center"
          align-content="space-around"
        >
          <v-col>
            <v-img
              :src="require('@/assets/logo.svg')"
              alt="Geode-solutions logo"
              width="50%"
              class="mx-auto"
            />
            <h1 class="text-h2 text-center mb-3 text-primary">
              Geode-solutions
            </h1>
          </v-col>
          <v-col>
            <h2 class="text-h5 text-center text-primary">
              Technology company tackling next generation of modeling
              challenges using advanced meshing
            </h2>
          </v-col>
        </v-row>
      </v-card>
    </v-parallax>
  </client-only>
</template>

<script setup>
    const window_height = 0
    onMounted(() => {
        window.addEventListener('resize', this.get_window_height)
        this.get_window_height()
    }),

  function get_window_height() {
    this.window_height = document.documentElement.clientHeight
  }
</script>