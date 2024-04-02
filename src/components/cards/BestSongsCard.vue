<template>
  <div class="text-h5 text-md-h4 font-weight-bold text-grey mb-4 mt-10 d-flex justify-center align-center">
    <v-icon class="mr-2" color="error">mdi-heart</v-icon>
    My best songs
  </div>

  <!--BEST SONGS CARDS-->
  <template v-if="props.bestSongs.length > 0">
    <div class="best-songs-container">
      <v-card
          v-for="song in props.bestSongs.slice(0, 6)"
          :key="song.idTrack"
          class="ma-2 rounded-lg"
          height="270"
          width="250"
          theme="dark"
          @click="getSongs(song.idAlbum)"
      >
        <v-img
            :src="song.strTrackThumb"
            height="210px"
            cover
        ></v-img>

        <v-card-title class="d-flex align-center">
          <span class="text-body-2 text-truncate">{{ song.strTrack }}</span>
          <v-spacer></v-spacer>
          <v-icon color="warning">mdi-star</v-icon>
          <div class="ml-2 text-body-2">
            {{ song.rating }}
          </div>
        </v-card-title>
      </v-card>
    </div>
  </template>

  <!--EMPTY BEST SONGS-->
  <template v-else>
    <div class="text-center mt-8 text-grey">You haven't rated any songs yet</div>
  </template>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import {useRouter} from "vue-router";
const props = defineProps(['bestSongs'])

const router = useRouter()

const getSongs = (idAlbum) => {
  router.push({name: 'album', params: {albumId: idAlbum}})
}
</script>

<style scoped>
.best-songs-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  justify-items: center;
}
</style>