<template>
    <ppContent v-if="show"></ppContent>
</template>

<script>

import ppContent from './pp-content.vue';

export default {
    name: 'pathPlanning',
    components: { ppContent },
    computed: {
        show() {
            return this.$store.getters.comStatus('pathPlanning');
        }
    }
};
</script>
