<template>
    <div style="height: 100%">
        <VGEUtils></VGEUtils>
        <resource-box></resource-box>
    </div>
</template>

<script>
import VGEUtils from '@/VGEUtils/components/VGEUtils.vue';
import ResourceBox from '@/VGEUtils/components/left/ResourceBox/index.vue';

export default {
    name: 'blank',
    components: { ResourceBox, VGEUtils }
};
</script>

<style lang="less" scoped>
</style>
