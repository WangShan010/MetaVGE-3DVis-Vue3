import { createStore } from 'vuex';


import VGEEarthStore from './modules/VGEEarthStore.js';

const store = createStore({
    modules: {
        VGEEarthStore
    }
});

export default store;
