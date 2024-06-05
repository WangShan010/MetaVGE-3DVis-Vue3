<template>
    <left-bar ref="leftBar" :css_top="'55vh'" :has-show-btn="false" title="海峡-风向图">
        <div v-show="show"></div>
        <!--      <iframe style="height: 35vh" src="https://earth.nullschool.net/zh-cn/#current/wind/surface/level/waterman=120.26,-19.65,7215"></iframe>-->
        <!--      <iframe style="height: 35vh" src="http://101.43.223.126:3000/GlobalWind2.html"></iframe>-->
        <iframe src="./app/map/GlobalWind2.html" style="height: 35vh"></iframe>
    </left-bar>
</template>


<script>
import { defineComponent } from 'vue';
import LeftBar from './template/leftBar.vue';

export default defineComponent({
    name: 'WaveHeight',
    components: { LeftBar },
    computed: {
        show() {
            const show = this.$store.state.HKSJStore.WindDirectionShow;

            if (show) {
                this.$refs.leftBar?.showBackBtn();
            } else {
                this.$refs.leftBar?.hideBackBtn();
            }

            return show;
        }
    }
});
</script>

<style lang="less" scoped>
@import "./css/wind.less";
</style>
