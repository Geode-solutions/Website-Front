<template>
  <v-container>
    <v-layout column align-center>
      <v-layout justify-space-around row class="py-5">
        <v-flex>
          <v-card class="elevation-5 mx-5  text-xs-center">
            <v-avatar size="300px" class="ma-2">
              <img src="@/assets/ArnaudB.png">
            </v-avatar>
            <v-card-title primary-title justify-center>
              <p class="headline text-xs-center">
                Arnaud Botella
              </p>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex>
          <v-card class="elevation-5 mx-5  text-xs-center">
            <v-avatar size="300px" class="ma-2">
              <img src="@/assets/PierreA.png">
            </v-avatar>
            <v-card-title primary-title>
              <p class="headline text-xs-center" style="width:300px">
                Pierre Anquez
              </p>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>

    <h4 class="headline" align="center">
      Our team is young but our experience is strong. We are both specialists in
      geosciences and software development. Since 8 years, we are tackling
      meshing issues.
    </h4>
  </v-container>
</template>

<script>
export default {}
</script>
