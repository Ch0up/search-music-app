<template>
  <div v-if="albumsStore.albums.length > 0">
    <div class="text-h5 text-md-h4 font-weight-bold text-grey my-4">Albums</div>

    <!--ALBUM CARD INFO-->
    <div class="albums-container">
      <v-card
          v-for="album in albumsStore.albums.slice(0, 20)"
          :key="album.idAlbum"
          class="ma-2 rounded-lg"
          height="270"
          width="250"
          theme="dark"
          @click="getSongs(album.idAlbum)"
      >
        <v-img
            :src="album.strAlbumThumb"
            height="210px"
            cover
        ></v-img>

        <v-card-title class="d-flex align-center my-3">
          <span class="text-body-2 text-truncate">{{ album.strAlbum }}</span>
          <v-spacer></v-spacer>
          <div class="text-body-2">
            ({{ album.intYearReleased }})
          </div>
        </v-card-title>
      </v-card>
    </div>
  </div>
</template>
<script setup>
import {useAlbumsStore} from "@/stores/albums";
import {useRouter} from "vue-router";

const albumsStore = useAlbumsStore()
const router = useRouter()

const getSongs = (idAlbum) => {
  router.push({name: 'album', params: {albumId: idAlbum}})
}
</script>

<style scoped>
.albums-container {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  justify-items: center;
}
</style>