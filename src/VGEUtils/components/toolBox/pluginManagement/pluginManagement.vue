<template>
    <PmContent v-if="show"></PmContent>
</template>
<script>
import PmContent from './pm-content.vue';

export default {
    name: 'PluginManagement',
    components: {
        PmContent
    },
    computed: {
        show() {
            return this.$store.getters.comStatus('PluginManagement');
        }
    }
};
</script>
<style lang="less" scoped>

</style>
