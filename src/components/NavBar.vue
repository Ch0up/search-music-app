<template>
  <v-card class="mx-auto" color="grey-lighten-3">
    <v-layout>
      <v-app-bar
          color="teal-darken-4"
      >
        <template v-slot:image>
          <v-img
              gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>

        <template v-slot:prepend>

          <v-btn to="/">
            <v-icon>mdi-home</v-icon>
            <span class="ml-1">Home</span>
          </v-btn>

          <v-btn to="/favorite">
            <v-icon>mdi-star</v-icon>
            <span class="ml-1">Favorite</span>
          </v-btn>

          <v-badge
              offset-y="-20" v-if="favoriteStore.favoriteList.length > 0"
              color="warning"
              :content="favoriteStore.favoriteList.length">
          </v-badge>

        </template>

        <v-spacer></v-spacer>

        <h3 class="mr-4 d-none d-sm-flex">
          <v-icon class="mr-2">mdi-music</v-icon>
          Let the music play
        </h3>
      </v-app-bar>

      <v-main>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import {useFavoriteListStore} from "@/stores/favorite";

export default {
  setup() {
    const favoriteStore = useFavoriteListStore()

    return {
      favoriteStore
    }
  }
}

</script>