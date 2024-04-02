<template>
  <v-layout>
    <NavBar/>

    <v-main>
      <v-container class="main-container">
        <RouterView/>
      </v-container>
    </v-main>

  </v-layout>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
import NavBar from "@/components/layout/NavBar.vue";
</script>

<style scoped>
.main-container {
  width: 70%;
}

@media (max-width: 1280px) {
  .main-container {
    width: 100%;
  }
}
</style>
