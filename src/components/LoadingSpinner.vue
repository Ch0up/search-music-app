<template>
  <v-overlay
      :model-value="overlay"
      class="align-center justify-center"
  >
    <v-progress-circular
        color="primary"
        size="64"
        indeterminate
    ></v-progress-circular>
  </v-overlay>
</template>
<script>
export default {
  props: ['overlay'],
}
</script>