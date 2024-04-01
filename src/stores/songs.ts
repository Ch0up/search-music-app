import {defineStore} from 'pinia'
import config from "../../config";
import {useStorage} from "@vueuse/core";

const url = config.AGILIUM_BASE_URL + 'track.php?m='

export const useSongsStore = defineStore('songs', {
    state: () => ({
        songs: [],
        ratedSongs: useStorage('ratedSongs', []),
        commentedSongs: useStorage('commentedSongs', []),
        isLoading: false,
        error: null as Error | null,
    }),
    getters: {},
    actions: {
        async getSongs({idAlbum}) {
            this.songs = []
            this.isLoading = true
            try {
                const response = await fetch(url + idAlbum)
                const {track} = await response.json();
                this.songs = track;
            } catch (error) {
                this.error = error as Error
            } finally {
                this.isLoading = false
            }
        },
        async updateRating(songId: number, rating: number) {
            // Add note
            let songToUpdate = this.ratedSongs.find(song => song.idTrack === songId);
            if (!songToUpdate) {
                songToUpdate = this.songs.find(song => song.idTrack === songId);
                if (!songToUpdate) return;
                this.ratedSongs.push({...songToUpdate});
            }
            // Update note
            songToUpdate.rating = rating;
            const songIndex = this.songs.findIndex(song => song.idTrack === songId);
            if (songIndex !== -1) {
                this.songs[songIndex].rating = rating;
            }
            // Remove note
            if (rating === 0) {
                const index = this.ratedSongs.findIndex(song => song.idTrack === songId);
                if (index !== -1) {
                    this.ratedSongs.splice(index, 1);
                }
            }
        },
        async updateComment(songId: number, comment: string) {
            // Add comment
            let songToUpdate = this.commentedSongs.find(song => song.idTrack === songId);
            if (!songToUpdate) {
                songToUpdate = this.songs.find(song => song.idTrack === songId);
                if (!songToUpdate) return;
                this.commentedSongs.push({...songToUpdate});
            }
            // Update comment
            songToUpdate.comment = comment;

            const songIndex = this.songs.findIndex(song => song.idTrack === songId);
            if (songIndex !== -1) {
                this.songs[songIndex].comment = comment;
            }
            // Remove comment
            if (!comment) {
                const index = this.commentedSongs.findIndex(song => song.idTrack === songId);
                if (index !== -1) {
                    this.commentedSongs.splice(index, 1);
                }
            }
        },
    }
})