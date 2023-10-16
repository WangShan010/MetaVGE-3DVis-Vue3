import { createStore } from 'vuex';


import VGEEarthStore from '@/store/modules/VGEEarthStore.js';

const store = createStore({
    modules: {
        VGEEarthStore
    }
});

export default store;
