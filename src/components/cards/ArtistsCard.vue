<template>
  <template v-if="!albumsStore.isLoading">

    <!--ARTIST CARD INFO-->
    <div v-if="artistsStore.artists.idArtist">
      <div class="text-h5 text-md-h4 font-weight-bold text-grey my-4">{{ artistsStore.artists.strArtist }}</div>
      <div class="d-md-flex">
        <v-col>
          <img class="w-100 rounded-lg" :src="artistsStore.artists.strArtistThumb"
               :alt="artistsStore.artists.strArtist" :title="artistsStore.artists.strArtist">
        </v-col>
        <v-col>
          <v-list lines="one">
            <v-list-item
                title="Members"
                :subtitle="artistsStore.artists.intMembers + ' males'"
            ></v-list-item>
            <v-list-item
                title="Origin"
                :subtitle="artistsStore.artists.strCountry"
            ></v-list-item>
            <v-list-item
                title="Genre"
                :subtitle="artistsStore.artists.strGenre"
            ></v-list-item>
            <v-list-item
                title="Style"
                :subtitle="artistsStore.artists.strStyle"
            ></v-list-item>
            <v-list-item
                title="Born"
                :subtitle="artistsStore.artists.intBornYear"
            ></v-list-item>
            <v-list-item
                title="Mood"
                :subtitle="artistsStore.artists.strMood"
            >
            </v-list-item>
          </v-list>
        </v-col>
      </div>
    </div>

    <!--ALBUM CARD INFO-->
    <div v-if="albumsStore.albums.length > 0">
      <AlbumsCard />
    </div>
  </template>

  <!--LOADER-->
  <template v-else>
    <LoadingSpinner :overlay="albumsStore.isLoading"/>
  </template>

</template>
<script setup lang="ts">
import {onMounted} from "vue";
import {useArtistsStore} from "@/stores/artists";
import {useAlbumsStore} from "@/stores/albums";
import {useRouter} from "vue-router";
import AlbumsCard from '@/components/cards/AlbumsCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const artistsStore = useArtistsStore()
const albumsStore = useAlbumsStore()
const router = useRouter()

onMounted(() => {
  if (router.currentRoute.value) {
    const artistName = router.currentRoute.value.params.artistName
    artistsStore.searchArtists(artistName).then((artist => {
      albumsStore.getAlbums(artist.idArtist)
    }))
  }
});


</script>
