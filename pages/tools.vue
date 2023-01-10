<template>
  <v-row class="fill-height" no-gutters>
    <v-navigation-drawer permanent :rail="mini" :expand-on-hover="mini">
      <v-list>
        <v-list-item v-for="(tool, i) in tools_list" :key="i" :to="tool.to" router exact>
          <div>
            <v-list-item-action>
              <v-icon>{{ tool.icon }}</v-icon>
            </v-list-item-action>
            <v-badge v-if="tool.badge" :content="tool.badge" inline>
              <v-list-item-title v-text="tool.title" />
            </v-badge>
            <v-list-item-title v-else v-text="tool.title" />
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-col class="pa-4">
      <NuxtChild keep-alive />
    </v-col>
  </v-row>
</template>

<script setup>
import tools_list from '@/assets/tools/tools_list'
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const title = 'Free tools'
useHead({
  title: title,
  titleTemplate: (title) => `${title} - Geode-solutions`
})

const { name } = useDisplay()
const mini = computed(() => {
  switch (name.value) {
    case 'xs': return true
    case 'sm': return true
    case 'md': return true
    case 'lg': return false
    case 'xl': return false
    default: return false
  }
})
</script>
