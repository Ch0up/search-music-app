<template>
  <div>

    <!--SEARCH-->
    <v-responsive
        class="mx-auto py-2 mt-4"
        max-width="500"
    >
      <div class="text-h5 text-md-h4 font-weight-bold text-grey mt-6 mb-12 d-flex justify-center align-center">
        <v-icon class="mr-2">mdi-music</v-icon>
        The love of music
      </div>
      <v-text-field
          v-model="artistValue"
          ref="toto"
          @keyup.enter="searchArtists"
          placeholder="Search an artist..."
          variant="solo"
          clearable
          hide-details="auto"
          prepend-inner-icon="mdi-magnify"
          autofocus
          rounded
      ></v-text-field>
    </v-responsive>

    <!--BEST SONG CARD-->
    <BestSongsCard :best-songs="bestSongs"/>
  </div>

</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import {useArtistsStore} from "@/stores/artists";
import {useAlbumsStore} from "@/stores/albums";
import {useSongsStore} from "@/stores/songs";
import BestSongsCard from "@/components/cards/BestSongsCard.vue";
import {useRouter} from "vue-router";

const router = useRouter()

const artistsStore = useArtistsStore()
const albumsStore = useAlbumsStore()
const songsStore = useSongsStore()
const artistValue = ref('');

const searchArtists = () => {
  artistsStore.searchArtists(artistValue.value.toLowerCase()).then((artist => {
    albumsStore.getAlbums(artist.idArtist)
    router.push({name: 'artist', params: {artistName: artist.strArtist.toLowerCase()}})
  }))
}

const bestSongs = computed(() => {
  const sortedSongs = songsStore.ratedSongs.slice().sort((a, b) => b.rating - a.rating);

  return sortedSongs.slice(0, 10);
});

</script>
