<template>
  <ToolsWrapper :cards_list="cards_list" :stepper_tree="stepper_tree" />
</template>

<script setup>
import cards_list from '@/assets/tools/validitychecker/cards'
import stepper_tree from '@/assets/tools/validitychecker/stepper_tree'
provide('stepper_tree', stepper_tree)
</script>
