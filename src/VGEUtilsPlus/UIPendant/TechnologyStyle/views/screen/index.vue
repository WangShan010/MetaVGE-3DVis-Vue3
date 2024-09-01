<template>
    <div class="main">
        <TileHeader></TileHeader>
        <VGEUtils></VGEUtils>
    </div>
</template>

<script>
import VGEUtils from '@/VGEUtils/components/VGEUtils.vue';
import TileHeader from '@/VGEUtils/UIPendant/NatureStyle/titleHeader/titleHeader.vue';

export default {
    name: 'index',
    components: { TileHeader, VGEUtils }
};
</script>


<style lang="less" scoped>
.main {
    height: 100%;
    width: 100%;
}
</style>
