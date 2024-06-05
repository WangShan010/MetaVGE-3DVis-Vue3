/****************************************************************************
名称：主线版本，大屏界面
最后修改日期：2022-05-27
****************************************************************************/

<template>
    <div :class="{ 'theme-green': themeColor==='green', 'theme-yellow': themeColor==='yellow' }">
        <tileHeader v-if="tileHeaderShow"></tileHeader>
        <div v-show="infoWindowsShow" class="vge-infoWindows">
            <weather></weather>
            <disaster></disaster>
            <earlyWarning></earlyWarning>
        </div>
        <functionBar></functionBar>
    </div>
</template>


<script>
import './assets/icon/iconfont.js';
import tileHeader from './titleHeader/titleHeader.vue';
import Weather from './leftPanel/weather.vue';
import EarlyWarning from './leftPanel/earlyWarning.vue';
import Disaster from './leftPanel/disaster.vue';
import FunctionBar from './functionBar/functionBar.vue';
import VGEUtils from '../../components/VGEUtils.vue';


export default {
    name: 'natureStyleScreen',
    components: {
        VGEUtils,
        tileHeader,
        FunctionBar,
        Disaster,
        EarlyWarning,
        Weather
    },
    data() {
        return {};
    },
    computed: {
        infoWindowsShow() {
            return this.$store.getters.comStatus('infoWindows');
        },
        tileHeaderShow() {
            return this.$store.getters.comStatus('titleHeader');
        },
        themeColor() {
            return this.$store.state.VGEEarthStore.themeColor;
        }
    },
    methods: {
        // 演示模式下，按下 Enter 键，自动主题颜色
        keydownEvent() {
            const that = this;
            document.onkeydown = function (e) {
                let e1 = e || event || window.event;
                if (e1.keyCode === 13) {
                    that.$store.commit('setThemeColor', that.themeColor === 'yellow' ? 'green' : 'yellow');
                }
            };
        }
    },
    mounted() {
        if (this.$store.state.VGEEarthStore.demoModel) {
            this.keydownEvent();
        }
    }
};
</script>

<style lang='less' scoped>
@import "./assets/css/common-theme.less";
@import "./assets/css/green-theme.less";
@import "./assets/css/yellow-theme.less";
</style>


<style lang="less" scoped>
img, span {
    vertical-align: middle;
}

.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
