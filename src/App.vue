<template>
  <v-app>
    <main>
      <NavBar/>

      <v-container class="main-container">
        <RouterView/>
      </v-container>
    </main>
  </v-app>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
import NavBar from "@/components/NavBar.vue";
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
