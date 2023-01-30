<template>
  <ToolsWrapper :cards_list="cards_list" />
</template>

<script setup>
import cards_list from '@/assets/tools/fileconverter/cards'
import stepper_tree from '@/assets/tools/fileconverter/stepper_tree'
provide('stepper_tree', stepper_tree)
</script>

