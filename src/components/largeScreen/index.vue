<template>
    <div class="main">
        <VGEUtils></VGEUtils>
        <NatureStyleScreen></NatureStyleScreen>
    </div>
</template>

<script>
import VGEUtils from '@/VGEUtils/components/VGEUtils.vue';
import NatureStyleScreen from '@/VGEUtils/UIPendant/NatureStyle/index.vue';

export default {
    name: 'index',
    components: { NatureStyleScreen, VGEUtils }
};
</script>


<style scoped lang="less">
.main {
    height: 100%;
    width: 100%;
}
</style>
<style>
.cesium-infoBox {
    top: auto !important;
    right: auto !important;
    left: 30px !important;
    bottom: 80px !important;
    background: rgb(1 36 55) !important;
}

.cesium-infoBox-title {
    background: rgb(4, 46, 62) !important;
}
</style>