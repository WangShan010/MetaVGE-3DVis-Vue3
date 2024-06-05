/****************************************************************************
名称：视角书签工具
最后修改日期：2022-04-23
****************************************************************************/
<template>

    <vm-content v-if="show"></vm-content>

</template>

<script>
import VmContent from './vm-content.vue';

export default {
    name: 'visualMarker',
    components: { VmContent },
    computed: {
        show() {
            return this.$store.getters.comStatus('visualMarker');
        }
    }
};
</script>

<style lang="less" scoped>

</style>
