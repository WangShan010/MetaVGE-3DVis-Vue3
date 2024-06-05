<template>

    <fountainContent v-if="show"></fountainContent>

</template>

<script>
import fountainContent from './fo-content.vue';

export default {
    name: 'fountainPlot',
    components: { fountainContent },
    computed: {
        show() {
            return this.$store.getters.comStatus('fountainPlot');
        }
    }
};
</script>

