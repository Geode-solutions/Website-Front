<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <h1 class="text-h2 ma-5" align="center">Our software</h1>
        <p class="container text-h6 font-weight-light" align="justify">
          Geode-solutions provide a set of OpenGeode extensions designed to
          overcome classical bottlenecks in modeling and meshing applications
          both 2D and 3D. These extensions offer new solutions developed with
          state-of-the-art technologies with robustness, performance and
          pragmatism as main development driver. Every extension is deeply
          tested to reach optimum stability and efficiency. They are delivered
          as a complete application with user interface and as software
          components easily integrable in any software suite using their C++ and
          Python API, and available on Windows and Linux.
        </p>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid style="background-color: white">
    <v-row class="mx-auto justify-center">
      <v-col cols="11">
        <h2 class="text-h3 font-weight-light ma-5" align="center">
          Pilot program
        </h2>
        <p class="container text-h6 font-weight-light" align="start">
          Join our pilot program to be the first to take advantage of
          Geode-solutions new high technologies.
        </p>

        <ul>
          <li>
            <span class="text-h6">Involvement:</span>
            You participate in bringing mature and production-ready technologies
            into your workflows
          </li>
          <li>
            <span class="text-h6">Influence:</span>
            Your feedbacks drive technologies to overcome your current
            bottlenecks
          </li>
          <li>
            <span class="text-h6">Premiere:</span>
            You receive prime access to early technology developments
          </li>
          <li>
            <span class="text-h6">Keep abreast:</span>
            You benefit from continuous improvements releasing, up to each week
          </li>
          <li>
            <span class="text-h6">Acknowledgment:</span>
            Your investment is rewarded with price discount
          </li>
        </ul>

        <h2 class="text-h4 my-5 pb-5" align="center">
          <CommonContactUsButton />
        </h2>
        <h2 class="text-h4 font-weight-light ma-5" align="center">
          Pilot program technologies
        </h2>
        <v-row justify="space-around">
          <v-col
            v-for="beta in betas_list"
            :key="beta.title"
            cols="11"
            sm="5"
            md="6"
          >
            <v-card height="100%">
              <v-img
                :src="beta.image"
                :alt="'Geode-solutions ' + beta.title"
                cover
              />
              <v-card-title
                primary-title
                class="justify-center text-h4 px-5 ma-4"
              >
                {{ beta.title }}
              </v-card-title>
              <v-card-text align="justify" class="text-body-1">
                {{ beta.text }}
                <ul class="ma-2">
                  <li
                    v-for="feature in beta.features"
                    :key="feature"
                    class="text-body-1 font-weight-medium"
                  >
                    {{ feature }}
                  </li>
                </ul>
              </v-card-text>
              <v-card-text
                align="center"
                class="text-body-1 font-weight-medium"
              >
                Readiness
                <v-progress-linear
                  color="primary"
                  :model-value="beta.readiness"
                  height="10"
                  striped
                  rounded
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h3 font-weight-light ma-5" align="center">
          Next technologies
        </h2>
        <v-row justify="space-around">
          <v-col
            v-for="next in nexts"
            :key="next.title"
            cols="11"
            sm="5"
            md="6"
          >
            <v-card>
              <v-img
                :src="coming_soon"
                :alt="'Geode-solutions ' + next.title"
                cover
              />
              <v-card-title
                class="justify-center text-h4 px-5 ma-4"
                v-text="next.title"
              />
              <v-card-text
                align="justify"
                class="text-body-1"
                v-text="next.text"
              />
            </v-card>
          </v-col>
        </v-row>
        <h2 class="text-h4 my-5 py-5" align="center">
          Want to try these solutions or looking for another technology?
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
        <h2 class="section text-h2" align="center">Thanks to our pilots</h2>
        <CommonCarousel :items="pilots_list" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import coming_soon from "@/assets/img/techno/coming-soon.jpg"
  import dfn from "@/assets/img/techno/dfn.jpg"
  import corbi from "@/assets/img/techno/corbi.gif"
  import fractures from "@/assets/img/techno/fractures.png"
  import repair from "@/assets/img/techno/repair.png"
  import incremental from "@/assets/img/techno/incremental.png"
  import validity_checker from "@/assets/img/techno/validity_checker.svg"

  import logo_ring from "@/assets/img/logos/logo_ring.png"
  import logo_GSC from "@/assets/img/logos/logo_GSC.png"
  import logo_BSC from "@/assets/img/logos/logo_BSC.png"
  import logo_DHI from "@/assets/img/logos/logo_DHI.png"

  useHead({ titleTemplate: "Geode-solutions software" })

  const pilots_list = [
    {
      name: "RING",
      logo: logo_ring,
      url: "https://www.ring-team.org",
    },
    {
      name: "GSC",
      logo: logo_GSC,
      url: "https://www.nrcan.gc.ca/home",
    },
    {
      name: "BSC",
      logo: logo_BSC,
      url: "https://www.bsc.es/",
    },
    {
      name: "DHI",
      logo: logo_DHI,
      url: "https://www.dhigroup.com/",
    },
  ]

  const betas_list = [
    {
      title: "2D/3D triangular remeshing",
      image: dfn,
      text: "Remeshing of 2D and 3D triangulated surfaces, \
              targeting both triangle equilaterality and user input mesh sizes.",
      features: [
        "Robust to degenerated input meshes",
        "Guaranteed conformal to surface intersections",
      ],
      readiness: "95",
    },
    {
      title: "3D tetrahedral meshing",
      image: corbi,
      text: "Tetrahedral mesh generation from a set of triangulated surfaces, \
              targeting both tetrahedron regularity and user input mesh sizes.",
      features: [
        "Robust to degenerated input meshes",
        "Guaranteed conformal to input boundary surface meshes",
      ],
      readiness: "90",
    },
    {
      title: "Conversion between model and mesh",
      image: fractures,
      text: "Handy tools to convert mesh to boundary representation and boundary representation to mesh.",
      features: [
        "Automatic recovery of model components and topology from mesh",
        "Output mesh gathering all model information as attributes",
      ],
      readiness: "95",
    },
    {
      title: "Watertight model sealing",
      image: repair,
      text: "Repair and build a boundary representation which ensure the watertightness. \
              This property is key to guarantee model integrity, topological requests validity and conformal meshing.",
      features: [
        "Remove all gaps and intersections between surfaces",
        "Compute watertight model components and topology",
        "Guaranteed full conformal meshes with all model components",
      ],
      readiness: "40",
    },
    {
      title: "Incremental surface-based modeling",
      image: incremental,
      text: "Build a boundary representation from an independent set of surfaces in an extreme robust way.",
      features: [
        "Produce surface to surface intersections and topology",
        "Interactive surface addition and removal from the model",
        "Guaranteed model validity at any time",
      ],
      readiness: "80",
    },
    {
      title: "Mesh/model validity checker",
      image: validity_checker,
      text: "Before doing any computation or meshing step, make sure your data satisfy your needs. \
              Meshes can be degenerated, non-manifold, colocated and boundary representations can have \
              topological issues. This checker tracks and exposes all flawed configurations from your data.",
      features: [
        "Track any topological issues in your model",
        "Track geometrical problems in your meshes, including colocated points, non-manifold or degeneration issues, and polygon adjacencies problems.",
      ],
      readiness: "90",
    },
  ]

  const nexts = [
    {
      title: "3D hybrid meshing",
      text: "Hexahedral elements have great numerical properties but hard to respect a given geometry. \
            By combining hexahedra, tetrahedra and/or pyramids, hybrid meshes provide both \
            good numerical properties and respect to the input geometry.",
    },
    {
      title: "Implicit modeling",
      text: "Build a boundary representation from an independent set of points representing each feature of the model. \
            Interpolation techniques are used to build each fault and the stratigraphic pile.",
    },
  ]
</script>

<style scoped>
  .section {
    padding-top: 50px;
    padding-bottom: 50px;
  }
</style>
