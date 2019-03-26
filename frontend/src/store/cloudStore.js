/* ----- DEPEND -----*/
import cloudService from '../services/cloudService.js';

export default {
    state: {
    },
    mutations: {

    },
    getters: {

    },
    actions: {
        async uploadProfileImg(context, { imgFile }) {
            let imgUrl = await cloudService.uploadProfileImg(imgFile);
            return imgUrl;
        },
    }
}