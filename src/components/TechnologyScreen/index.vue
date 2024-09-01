<template>
    <div class="main">
        <VGEUtils></VGEUtils>
        <TileHeader></TileHeader>
        <info-page></info-page>
        <function-bar></function-bar>
    </div>
</template>

<script>
import VGEUtils from '@/VGEUtils/components/VGEUtils.vue';
import NatureStyleScreen from '@/VGEUtils/UIPendant/NatureStyle/index.vue';
import FunctionBar from '@/VGEUtils/UIPendant/NatureStyle/functionBar/functionBar.vue';

import TileHeader from '@/VGEUtilsPlus/UIPendant/TechnologyStyle/views/screen/TitleHeader/index.vue';
import InfoPage from '@/VGEUtilsPlus/UIPendant/TechnologyStyle/views/screen/infoPage/index.vue';

export default {
    name: 'index',
    components: { FunctionBar, InfoPage, TileHeader, NatureStyleScreen, VGEUtils }
};
</script>


<style scoped lang="less">
.main {
    height: 100%;
    width: 100%;
}
</style>
