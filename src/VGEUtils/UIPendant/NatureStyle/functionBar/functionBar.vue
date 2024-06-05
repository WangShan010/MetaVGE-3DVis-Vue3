<template>
    <div class="theme-green">
        <div v-show="show" class="vge-functionBar">
            <div class="vge-functionBar-btns">
                <div @click="changeSelected('toolBox')">
                    <img v-if="selected === 'toolBox'" :src="toolSelected" alt="">
                    <img v-else alt="" src="../assets/img/tool.png">
                    <span :style="{color: selected === 'toolBox' ? baseColor : '#fff'}">工具</span>
                </div>
                <div @click="changeSelected('resourceTree')">
                    <img v-if="selected === 'resourceTree'" :src="layerSelected" alt="">
                    <img v-else alt="" src="../assets/img/layer.png">
                    <span :style="{color: selected === 'resourceTree' ? baseColor : '#fff'}">数据</span>
                </div>
                <div @click="changeSelected('Echarts-MapV')">
                    <img v-if="selected === 'Echarts-MapV'" :src="echarts_mapvSelected" alt="">
                    <img v-else alt="" src="../assets/img/layer.png">
                    <span :style="{color: selected === 'Echarts-MapV' ? baseColor : '#fff'}">可视化</span>
                </div>
                <div @click="changeSelected('spatialAnalyze')">
                    <img v-if="selected === 'spatialAnalyze'" :src="baseMapSelected" alt="">
                    <img v-else alt="" src="../assets/img/base-map.png">
                    <span :style="{color: selected === 'baseMap' ? baseColor : '#fff'}">分析</span>
                </div>
            </div>
            <baseMap v-if="false"></baseMap>
            <toolBox></toolBox>
            <echarts_mapv></echarts_mapv>
        </div>
    </div>
</template>

<script>

import toolBox from './com/toolBox.vue';
import BaseMap from './com/baseMap.vue';

import Echarts_mapv from './com/echartsMapvLayer/echarts_mapv.vue';

import bmsYellow from '../assets/img/base-map-selected-yellow.png';
import bmsGreen from '../assets/img/base-map-selected.png';
import toolYellow from '../assets/img/tool-selected-yellow.png';
import toolGreen from '../assets/img/tool-selected.png';
import layerYellow from '../assets/img/layer-selected-yellow.png';
import layerGreen from '../assets/img/layer-selected.png';

export default {
    name: 'functionBar',
    data: function () {
        return {
            selected: 'layer' // baseMap/tool/layer
        };
    },
    computed: {
        show: function () {
            return this.$store.getters.comStatus('functionBar');
        },
        themeColor() {
            return this.$store.state.VGEEarthStore.themeColor;
        },

        baseMapSelected() {
            return this.themeColor === 'yellow' ? bmsYellow : bmsGreen;
        },
        toolSelected() {
            return this.themeColor === 'yellow' ? toolYellow : toolGreen;
        },
        layerSelected() {
            return this.themeColor === 'yellow' ? layerYellow : layerGreen;
        },
        echarts_mapvSelected() {
            return this.themeColor === 'yellow' ? layerYellow : layerGreen;
        },
        baseColor() {
            return this.themeColor === 'yellow' ? '#F4BB42' : '#23D0C4';
        }
    },
    components: {
        BaseMap,
        toolBox,
        Echarts_mapv
    },
    methods: {
        changeSelected(val) {
            if (val !== 'toolBox') this.$store.commit('setVGEEarthComAction', { name: 'toolBox', on_off: 2 });
            if (val !== 'baseMap') this.$store.commit('setVGEEarthComAction', { name: 'baseMap', on_off: 2 });
            if (val !== 'resourceTree') this.$store.commit('setVGEEarthComAction', { name: 'resourceTree', on_off: 2 });
            if (val !== 'Echarts-MapV') this.$store.commit('setVGEEarthComAction', { name: 'Echarts-MapV', on_off: 2 });

            switch (val) {
                case 'toolBox': {
                    this.$store.commit('setVGEEarthComAction', { name: 'toolBox', on_off: 3 });
                }
                    break;
                case 'baseMap': {
                    this.$store.commit('setVGEEarthComAction', { name: 'baseMap', on_off: 3 });
                }
                    break;
                case 'resourceTree': {
                    this.$store.commit('setVGEEarthComAction', { name: 'resourceTree', on_off: 3 });
                }
                    break;
                case 'Echarts-MapV': {
                    this.$store.commit('setVGEEarthComAction', { name: 'Echarts-MapV', on_off: 3 });
                }
                    break;
                case 'spatialAnalyze': {
                    this.$store.commit('setVGEEarthComAction', { name: 'spatialAnalyze', on_off: 3 });
                }
            }

            this.selected = val;
        },
        baseMapChange() {
            const mapsDom = document.querySelectorAll('.maps > div');
            mapsDom.forEach(item => {
                item.addEventListener('click', function () {
                    const preActive = document.querySelector('.map-selected');
                    preActive.classList.remove('map-selected');
                    item.classList.add('map-selected');
                });
            });
        },
        toolBtnChange() {
            const toolBtnsDom = document.querySelectorAll('.tool-btn > div');
            toolBtnsDom.forEach(item => {
                item.addEventListener('click', function () {
                    const preActive = document.querySelector('.tool-selected');
                    preActive.classList.remove('tool-selected');
                    item.classList.add('tool-selected');
                });
            });
        }
    },
    mounted() {
        this.baseMapChange();
        this.toolBtnChange();
    }
};
</script>

<style lang='less' scoped>
@import "./../assets/css/common-theme.less";
@import "./../assets/css/green-theme.less";
@import "./../assets/css/yellow-theme.less";
</style>
