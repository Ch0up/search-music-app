import {defineStore} from 'pinia'
import config from "../../config";

const url = config.AGILIUM_BASE_URL + 'album.php?i='

export const useAlbumsStore = defineStore('albums', {
    state: () => ({
        albums: [],
        isLoading: false,
        error: null as Error | null,
    }),
    getters: {},
    actions: {
        async getAlbums(idArtist) {
            this.albums = []
            this.isLoading = true
            try {
                const response = await fetch(url + idArtist)
                const {album} = await response.json();
                this.albums = album;
            } catch (error) {
                this.error = error as Error
            } finally {
                this.isLoading = false
            }
        }
    }
})