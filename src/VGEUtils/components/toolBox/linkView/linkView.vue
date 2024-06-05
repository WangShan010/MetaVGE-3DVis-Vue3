<template>
    <lvContent v-if="show"></lvContent>
</template>

<script>

import lvContent from './lv-content.vue';

export default {
    name: 'linkView',
    components: { lvContent },
    computed: {
        show() {
            return this.$store.getters.comStatus('linkView');
        }
    }
};
</script>
