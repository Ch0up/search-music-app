<template>
  <v-overlay
      :model-value="props.overlay"
      class="align-center justify-center"
  >
    <v-progress-circular
        color="primary"
        size="64"
        indeterminate
    ></v-progress-circular>
  </v-overlay>
</template>
<script setup>
import { defineProps } from 'vue'
const props = defineProps(['overlay'])
</script>