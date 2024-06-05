<template>
    <smokeContent v-if="show"></smokeContent>
</template>

<script>
import smokeContent from './sm-content.vue';

export default {
    name: 'smokePlot',
    components: { smokeContent },
    computed: {
        show() {
            return this.$store.getters.comStatus('smokePlot');
        }
    }
};
</script>

