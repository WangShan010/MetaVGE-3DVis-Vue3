/****************************************************************************
名称：系统主页面 => 图例
****************************************************************************/

<template>
    <div v-show="legends.list.length !== 0 || legends.img" id="legendContent">
        <div class="boxContent">
            <img alt="关闭按钮" class="close-btn" src="./close.png" @click="close">

            <div class="centreBox">
                <span v-show="legends.title" class="title">{{ legends.title }}</span>
            </div>
            <div v-for="item in legends.list" v-if="!legends.list.flag"
                 :key="item.color"
                 class="bottomBox">
                <div v-if="!item.isLine" class="colorBox" v-bind:style="{ 'background-color': item.color }"></div>
                <div v-else class="colorBox" v-bind:style="{ 'border-color': item.color, 'border-style': 'solid', 'border-width': '1px'}"></div>
                <span>{{ item.text }}</span>
            </div>
            <div v-if="legends.list.flag">
                <span style="margin-left: 30px;">{{ legends.list.max.toFixed(2) }}</span>
                <div v-for="item in colors"
                     :key="item"
                     class="bottomMap">
                    <div class="colorBox" v-bind:style="{ 'background-color': item }"></div>
                </div>
                <span style="margin-left: 30px;">{{ legends.list.min.toFixed(2) }}</span>
                <span style="margin-left: 30px;display: block;text-align: left;">单位：{{ legends.list.unity }}</span>
            </div>
            <div v-if="legends.img" class="bottomBox">
                <img :src="legends.img" style="max-height: 250px">
            </div>
        </div>
    </div>
</template>

<script>

import colormap from 'colormap';

let addFunc = function (e) {
    if (e.properties.legend) {
        App.$store.commit('setLegendCurrent', {
            title: '',
            img: e.properties.legend,
            list: []
        });
    }
};
let removeFunc = function (e) {
    if (e.properties.legend) {
        App.$store.commit('setLegendCurrent', {
            title: '',
            img: '',
            list: []
        });
    }
};


export default {
    name: 'legends',
    data() {
        return {
            colors: colormap({
                colormap: 'greys',
                nshades: 200,
                format: 'hex',
                alpha: 1
            }).reverse()
        };
    },
    methods: {
        close() {
            this.$store.commit('setVGEEarthComAction', { name: 'legend', on_off: 3 });
            this.$store.commit('resetLegend');
        }
    },
    computed: {
        legends() {
            return this.$store.state.VGEEarthStore.legendCurrent;
        }
    },
    mounted() {
        VGEEarth.EventMana.sourceEvent.addEventListener(
            VGEEarth.EventMana.ListenType.DataEventType.addData,
            VGEEarth.EventMana.ScopeType.Viewer3D,
            addFunc
        );
        VGEEarth.EventMana.sourceEvent.addEventListener(
            VGEEarth.EventMana.ListenType.DataEventType.removeData,
            VGEEarth.EventMana.ScopeType.Viewer3D,
            removeFunc
        );
    },
    unmounted() {
        VGEEarth.EventMana.sourceEvent.removeEventListener(
            addFunc
        );
        VGEEarth.EventMana.sourceEvent.removeEventListener(
            removeFunc
        );
    }
};
</script>

<style lang="less" scoped>
#legendContent {
    min-height: 180px;
    max-height: 380px;
    min-width: 150px;
    max-width: 230px;
    border-radius: 4px;
    z-index: 10;
    display: inline-block;
    background: rgba(0, 0, 0, 0.3);
    border: solid 1px rgba(189, 250, 255, 0.46);
    color: rgba(233, 234, 233, 0.77);
    left: 100px;
    bottom: 100px;
    position: absolute;

    .close-btn {
        position: absolute;
        right: 5px;
        top: 9px;
        width: 20px;
        background-color: rgba(235, 117, 0, 0.48);
    }

    .close-btn:hover {
        background-color: rgba(235, 117, 0, 0.8);
    }

    .boxContent {
        padding: 10px 32px 10px 10px;


        .centreBox {
            .title {
                color: white;
            }
        }

        .bottomBox {
            margin-top: 7px;
            margin-left: 5px;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: left;


            .colorBox {
                width: 24px;
                height: 15px;
                margin: 2px 5px 2px 2px;
                display: inline-block;
            }
        }

        .bottomMap {
            margin-left: 20px;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: left;

            .colorBox {
                width: 24px;
                height: 1px;
                display: inline-block;
            }
        }
    }
}
</style>
