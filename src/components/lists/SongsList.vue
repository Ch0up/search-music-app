<template>
  <template v-if="!songsStore.isLoading">
    <template v-if="songsStore.songs.length > 0">
      <div class="text-h5 text-md-h4 font-weight-bold text-grey my-4 px-4">
        Album ({{ songsStore.songs[0].strAlbum }}) - {{ songsStore.songs[0].strArtist }}
      </div>
    </template>

    <!--LIST OF SONGS-->
    <template v-if="songsStore.songs.length > 0">
      <v-list density="compact">
        <template v-for="song in songsStore.songs"
                  :key="song.idTrack">
          <v-list-item @click="openTrackDetailDialog(song)">
            <v-list-item-title>
              <div class="d-flex align-center text-truncate">
                {{ song.strTrack }}
                <template v-if="getRatingForSong(song.idTrack)">
                  <div class="ml-4 d-flex align-center">
                    <svg height="40" width="40" class="mb-1">
                      <path
                          d="m12.958 32.167 1.875-8-6.208-5.375 8.167-.709L20 10.542l3.208 7.541 8.167.709-6.208 5.375 1.875 8L20 27.917Z"
                          fill="#fb8c00"
                      />
                    </svg>
                    <div class="text-body-2">
                      {{ getRatingForSong(song.idTrack) }}
                    </div>
                  </div>
                </template>
                <template v-if="getCommentedForSong(song.idTrack)">
                  <div class="ml-4 text-caption">
                    <span>Comment : {{ getCommentedForSong(song.idTrack) }}</span>
                  </div>
                </template>
              </div>
            </v-list-item-title>
            <template v-slot:prepend>
              <v-avatar
                  color="grey-lighten-1"
              >
                <v-icon color="white">mdi-music</v-icon>
              </v-avatar>
            </template>
            <template v-slot:append>
              <v-btn
                  color="grey-lighten-1"
                  icon="mdi-star"
                  variant="text"
                  @click.stop="isSongInMyFavoriteList(song.idTrack) ? removeFromFavorite(song.idTrack) : addToFavorite(song)"
              >
                <v-icon v-if="isSongInMyFavoriteList(song.idTrack)" color="warning">mdi-star</v-icon>
                <v-icon v-else>mdi-star-outline</v-icon>
              </v-btn>
            </template>
          </v-list-item>

        </template>
      </v-list>
    </template>
  </template>

  <!--LOADER-->
  <template v-else>
    <LoadingSpinner :overlay="songsStore.isLoading"/>
  </template>

  <!--DIALOG INFO SONGS-->
  <v-dialog
      v-model="trackDetailDialog"
      width="600"
  >
    <v-card>
      <v-card-title>{{ selectedSongDetails.strTrack }}</v-card-title>

      <v-divider class="mx-5"></v-divider>

      <v-card-text>
        <div><span class="font-weight-bold">Artist</span> : {{ selectedSongDetails.strArtist }}</div>
        <div><span class="font-weight-bold">Album</span> : {{ selectedSongDetails.strAlbum }}</div>
        <div><span class="font-weight-bold">Genre</span> : {{ selectedSongDetails.strGenre }}</div>
        <div><span class="font-weight-bold">Duration</span> : {{ convertDuration(selectedSongDetails.intDuration) }}
        </div>
        <div class="d-flex align-center"><span class="font-weight-bold">Note : </span>
          <v-rating
              v-model="selectedSongDetails.rating"
              @update:modelValue="updateRating"
              clearable
              half-increments
              color="warning"
          ></v-rating>
        </div>
        <div><span class="font-weight-bold">Comment : </span>
          <v-textarea
              v-model="selectedSongDetails.comment"
              @update:modelValue="updateComment"
              placeholder="Add a comment"
          ></v-textarea>
        </div>
      </v-card-text>

      <template v-slot:actions>
        <v-btn
            class="ms-auto"
            text="Ok"
            @click="trackDetailDialog = false"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useSongsStore} from "@/stores/songs";
import {useFavoriteListStore} from "@/stores/favorite";
import {useRouter} from "vue-router";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const songsStore = useSongsStore()

// ADD OR REMOVE FAVORITE
const favoriteStore = useFavoriteListStore()
const addToFavorite = (song) => {
  favoriteStore.addFavorite(song)
};

const removeFromFavorite = (favoriteListIdSong: number) => {
  favoriteStore.removeFavorite(favoriteListIdSong);
};

// DIALOG
const trackDetailDialog = ref(false)
const selectedSongDetails = ref({});
const openTrackDetailDialog = (song) => {
  selectedSongDetails.value = song;
  if (!selectedSongDetails.value.rating) {
    selectedSongDetails.value.rating = getRatingForSong(song.idTrack)
  }
  if (!selectedSongDetails.value.comment) {
    selectedSongDetails.value.comment = getCommentedForSong(song.idTrack)
  }
  trackDetailDialog.value = true;
};

const updateRating = (rating) => {
  if (selectedSongDetails.value) {
    selectedSongDetails.value.rating = rating;
    songsStore.updateRating(selectedSongDetails.value.idTrack, rating);
  }
}

const updateComment = (comment) => {
  if (selectedSongDetails.value) {
    selectedSongDetails.value.comment = comment;
    songsStore.updateComment(selectedSongDetails.value.idTrack, comment);
  }
}

const getRatingForSong = (songId) => {
  const ratedSong = songsStore.ratedSongs.find(rated => rated.idTrack === songId);
  return ratedSong ? ratedSong.rating : 0;
}

const getCommentedForSong = (songId) => {
  const commentedSong = songsStore.commentedSongs.find(commented => commented.idTrack === songId);
  return commentedSong ? commentedSong.comment : '';
}

const isSongInMyFavoriteList = (songId) => {
  return favoriteStore.favoriteList.some(favorite => favorite.idTrack === songId);
}

const convertDuration = (time) => {
  const durationInSeconds = time / 1000;

  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedMinutes}:${formattedSeconds}`;
}

const router = useRouter()

onMounted(() => {
  if (router.currentRoute.value) {
    const idAlbum = router.currentRoute.value.params.albumId
    songsStore.getSongs({idAlbum: idAlbum})
  }
});
</script>