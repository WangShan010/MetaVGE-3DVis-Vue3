/****************************************************************************
名称：坐标定位
描述：地图选点和定位功能
最后修改日期：2021-04-24
****************************************************************************/

<template>
    <CContent v-if="show"></CContent>
</template>

<script>
import CContent from './c-content.vue';

export default {
    name: 'coordinates',
    components: { CContent },
    computed: {
        show() {
            return this.$store.getters.comStatus('coordinates');
        }
    }
};
</script>
