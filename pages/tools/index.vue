<template>
  <v-container>

    <v-row justify="center">
      <v-col cols="12">
        <h1 class="text-h2 py-5" align="center">
          Free tools home page Test
        </h1>

        <p class="text-h6 font-weight-light" align="justify">
          All the tools offered here are entirely free to use.
          <br>
          We rely on a cloud technology for computing power. Each cloud instance
          is launched on demand, the downside is that you have to wait a few
          seconds for the cloud to be ready to be used. Each file that you send
          to us is deleted at the end of the cloud instance.
          <br>
          Some tools may be in beta version and you may experience some bugs,
          but they will be fixed in the near future.

          <br>
          We are interested in your feedback in case you encountered a problem
          during your usage, if you have some improvement ideas, if you simply
          have ideas for new tools that may be useful to you, or want to share
          your enthusiasm about these tools.
        </p>
        <div class="my-2" align="center">
          <CommonContactUsButton />
        </div>
      </v-col>
      <v-col>
        <v-row justify="space-around">
          <v-col v-for="(tool, i) in tools_list.slice(-tools_list.length + 1, tools_list.length)" :key="i" cols="11"
            md="4">
            <v-card v-ripple class="card pa-5" hover elevation="5" :to="tool.to">
              <v-row justify="center" align="center">
                <v-col cols="auto">
                  <v-icon color="primary" size="100" class="justify-center">
                    {{ tool.icon }}
                  </v-icon>
                </v-col>
                <v-col v-if="tool.chip" cols="auto">
                  <v-chip color="primary">
                    {{ tool.chip }}
                  </v-chip>
                </v-col>
              </v-row>
              <v-card-title primary-title class="text-center text-h4" v-text="tool.title" />
              <v-card-text class="text-center text-body-1" v-text="tool.text" />
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import tools_list from '@/assets/tools_list'

</script>

<style scoped>
.card {
  border-radius: 15px
}
</style>

