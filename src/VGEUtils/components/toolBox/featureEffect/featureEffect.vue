/****************************************************************************
名称：几何特效 显隐控制器
作者：冯功耀
最后修改日期：2022-04-20
****************************************************************************/

<template>

    <FEContent v-if="show"></FEContent>

</template>

<script>
import FEContent from './fe-content.vue';

export default {
    name: 'featureEffect',
    components: { FEContent },
    computed: {
        show() {
            return this.$store.getters.comStatus('featureEffect');
        }
    }
};
</script>
