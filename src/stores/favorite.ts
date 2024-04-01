import {defineStore} from "pinia";
import {useStorage} from "@vueuse/core/index";

export const useFavoriteListStore = defineStore("favoriteList", {
    state: () => ({
        favoriteList: useStorage('favoriteList', []) ,
    }),
    actions: {
        addFavorite(song) {
            this.favoriteList.push(song);
        },
        removeFavorite(songId: number) {
            const index = this.favoriteList.findIndex(favorite => favorite.idTrack === songId);
            if (index !== -1) {
                this.favoriteList.splice(index, 1);
            }
        }
    },
});