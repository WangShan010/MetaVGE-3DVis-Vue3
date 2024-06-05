<template>

    <FireContent v-if="show"></FireContent>

</template>

<script>
import FireContent from './fire-content.vue';

export default {
    name: 'firePlot',
    components: { FireContent },
    computed: {
        show() {
            return this.$store.getters.comStatus('firePlot');
        }
    }
};
</script>
