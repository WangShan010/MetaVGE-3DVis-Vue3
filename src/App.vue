<template>
    <router-view/>
</template>

<script>

import { useStore } from 'vuex';

export default {
    name: 'App',
    created() {
        const store = useStore();
        window.App = this;
        window.store = store;
    }
};
</script>
