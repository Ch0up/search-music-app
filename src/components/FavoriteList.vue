<template>
  <div class="text-h5 text-md-h4 font-weight-bold text-grey mb-4 mt-10 d-flex justify-center align-center">
    <v-icon class="mr-2" color="warning">mdi-star</v-icon>
    My favorite songs
  </div>
  <template v-if="favoriteStore.favoriteList.length > 0">

    <v-list density="compact">
      <template
          v-for="song in favoriteStore.favoriteList"
          :key="song.idTrack"
      >
        <v-list-item
            @click="getSongs(song.idAlbum)"
        >
          <v-list-item-title>
            <span>{{ song.strTrack }} - (Album : {{ song.strAlbum }})</span>
          </v-list-item-title>
          <template v-slot:append>
            <v-btn
                icon="mdi-star"
                variant="text"
                @click="removeFromFavorite(song.idTrack)"
            >
              <v-icon color="warning">mdi-star</v-icon>
            </v-btn>
          </template>
          <template v-slot:prepend>
            <v-avatar color="grey-lighten-1">
              <v-icon color="white">mdi-music</v-icon>
            </v-avatar>
          </template>
        </v-list-item>
      </template>
    </v-list>
  </template>
  <template v-else>
    <div class="text-center mt-8 text-grey">You don't have any favorites yet</div>
  </template>
</template>
<script lang="ts">
import {useFavoriteListStore} from "@/stores/favorite";
import {useRouter} from "vue-router";

export default {

  setup() {
    const favoriteStore = useFavoriteListStore()
    const router = useRouter()

    const removeFromFavorite = (favoriteListIdSong: number) => {
      favoriteStore.removeFavorite(favoriteListIdSong);
    };
    const getSongs = (idAlbum) => {
      router.push({name: 'album', params: {albumId: idAlbum}})
    }
    return {
      favoriteStore,
      getSongs,
      removeFromFavorite
    }
  }
}

</script>