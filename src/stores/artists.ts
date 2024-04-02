import { defineStore } from 'pinia'
import config from "../../config";
import type {RouteParamValue, RouteParamValueRaw} from "vue-router";

const url = config.AGILIUM_BASE_URL + 'search.php?s='
export const useArtistsStore = defineStore('artists', {
  state: () => ({
    artists: [],
    isLoading: false,
    error: null as Error | null,
  }),
  getters: {},
  actions: {
    async searchArtists(artistValue: string | RouteParamValue[]) {
      this.artists = []
      this.isLoading = true
      try {
        const response = await fetch(url + artistValue)
        const { artists } = await response.json();
        return this.artists = artists[0];
      } catch (error) {
        this.error = error as Error
      } finally {
        this.isLoading = false
      }
    },
  }
})