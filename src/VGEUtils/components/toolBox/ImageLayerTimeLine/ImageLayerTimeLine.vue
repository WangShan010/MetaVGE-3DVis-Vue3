<template>
    <ITContent v-if="show"></ITContent>
</template>

<script>
import ITContent from './IT-content.vue';

export default {
    name: 'ImageLayerTimeLine',
    components: {
        ITContent
    },
    computed: {
        show() {
            return this.$store.getters.comStatus('ImageLayerTimeLine');
        }
    }
};
</script>

