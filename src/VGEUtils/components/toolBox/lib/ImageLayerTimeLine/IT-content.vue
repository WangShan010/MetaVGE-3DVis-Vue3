/****************************************************************************
名称：图层时间轴组件
作者：冯功耀
最后修改日期：2022-03-31
****************************************************************************/

<template>
    <div id="ImageSliderMana">
        <div id="ImageSliderMana-select">
            <el-select v-model="selGroup" placeholder="请选择数据分组"
                       style="top: -14px"
                       size="small">
                <el-option
                    v-for="item in groupList"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
            </el-select>
        </div>
        <el-slider
            v-model="layerIndex"
            :max="layersInfo.length-1<1? 1 :layersInfo.length-1"
            :format-tooltip="formatLayerTip"
            @change="setLayer"
        >
        </el-slider>
    </div>
</template>

<script>

import ImageryXYZ_3857_Provider from '../ImageLayerSplitMana/lib/ImageryXYZ_3857_Provider';
import SingleTileImagery from '../ImageLayerSplitMana/lib/SingleTileImagery';

export default {
    name: 'ImageLayerTimeLine',
    data: function () {
        return {
            layersData: [],
            selGroup: '',
            layersInfo: [],

            layerIndex: 0,
            layers: []
        };
    },
    computed: {
        groupList() {
            return this.layersData.map(item => item.group);
        }
    },
    watch: {
        selGroup() {
            this.initImageLayerTimeLine();
        }
    },
    methods: {
        async getSHBLayers() {
            let {data} = await axios.get(new URL('/VGEEarth/Config/ImageLayerTimeLine/init.json', import.meta.url).href);
            this.layersData = data;
            if (this.layersData.length > 0) {
                this.selGroup = this.layersData[0].group;
            }
        },

        // 初始化图层管理器
        initImageLayerTimeLine() {
            let group = this.layersData.find(item => item.group === this.selGroup);
            let position = group.position;
            VGEEarth.SceneUtils.viewerFlyToLonLat (position.lon, position.lat, position.height);

            this.layersInfo = group.layers || [];
            this.removeAll();

            this.layersInfo.forEach(item => {
                let layer = earth.viewer3D.imageryLayers.addImageryProvider(this.creatLayer(item));
                layer.show = false;
                this.layers.push({name: item.name, time: item.time, layer: layer});
            });

            this.setLayer(0);
        },
        formatLayerTip() {
            let layerItem = this.layersInfo[this.layerIndex || 0] || {};
            return layerItem.time;
        },
        // 创建图层
        creatLayer(layerItem) {
            if (layerItem.properties.scheme === 'layer-xyz-3857') {
                return new ImageryXYZ_3857_Provider(layerItem.properties.url, layerItem);
            } else if (layerItem.properties.scheme === 'layer-singleTileImagery') {
                return new SingleTileImagery(layerItem.properties.url, layerItem);
            }
        },
        // 设置当前图层
        setLayer(layerIndex) {
            this.$store.commit('resetLegend');

            this.layers.forEach((i, index) => {
                i.layer.show = index === layerIndex;
            });

            let group = this.layersData.find(item => item.group === this.selGroup);
            if (group?.legend) {
                this.$store.commit('setLegendCurrent', {title: group.group, list: [], img: group.legend});
            }
        },
        removeAll() {
            console.log(this.layers);
            for (let i = 0; i < this.layers.length; i++) {
                const res = earth.viewer3D.imageryLayers.remove(this.layers[i].layer);
                console.log(res);
            }
            this.setLayer(null);
            this.layers = [];
            this.$store.commit('resetLegend');
        }
    },
    async mounted() {
        VGEEarth.SceneUtils.viewerFlyToLonLat (117.316034, 42.411409, 55150);
        await this.getSHBLayers();
    },
    unmounted() {
        this.removeAll();
    }
};
</script>

<style lang="less" scoped>
#ImageSliderMana {
    display: flex;
    position: fixed;
    bottom: 40px;
    width: 100%;
    text-align: center;
    justify-content: center;
    align-items: center;

    #ImageSliderMana-select {
    }

    :deep( .el-slider) {
        width: 550px;
        display: inline-block;
        padding-left: 40px;
    }
}
</style>
