/****************************************************************************
名称：卷帘对比
作者：冯功耀
最后修改日期：2021-12-2
****************************************************************************/
<template>

    <div id="ImageLayerSplitMana" class="main-menu-tool-warp">
        <div style="padding-bottom: 10px;position: relative">
            数据分组
            <el-select v-model="selGroup" placeholder="请选择数据分组"
                       size="small" style="width: 160px">
                <el-option
                    v-for="item in groupList"
                    :key="item"
                    :label="item"
                    :value="item"
                >
                </el-option>
            </el-select>
            <el-icon class="image-ctr" @click="exit">
                <Close/>
            </el-icon>
            <el-icon class="image-ctr" @click="closeSplit">
                <Refresh/>
            </el-icon>

        </div>
        <div>
            左侧图层
            <el-select v-model="leftLayer" placeholder="请选择左侧图层"
                       size="small" style="width: 160px"
                       @change="setLeftLayer">
                <el-option
                    v-for="item in layers"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                >
                </el-option>
            </el-select>
            右侧图层
            <el-select v-model="rightLayer" placeholder="请选择右侧图层"
                       size="small" style="width: 160px"
                       @change="setRightLayer">
                <el-option
                    v-for="item in layers"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                >
                </el-option>
            </el-select>
        </div>
    </div>

</template>

<script>
import ImageryXYZ_3857_Provider from './lib/ImageryXYZ_3857_Provider';
import SingleTileImagery from './lib/SingleTileImagery';
import { Close, Refresh } from '@element-plus/icons-vue';

let splitControlL = null;
let splitControlR = null;

export default {
    name: 'is-content',
    components: { Refresh, Close },
    data: function () {
        return {
            layersData: [],
            selGroup: '',
            layers: [],
            layerMap: new Map(),
            leftLayer: null,
            rightLayer: null
        };
    },
    methods: {
        // 获取图层数据
        async getSHBLayers() {
            let { data } = await axios.get('./VGEEarth/Config/ImageLayerTimeLine/init.json');
            this.layersData = data;
            if (this.layersData.length > 0) {
                this.selGroup = this.layersData[0].group;
            }
        },
        loadAllLayer() {
            let group = this.layersData.find(item => item.group === this.selGroup);
            let position = group.position;
            VGEEarth.SceneUtils.viewerFlyToLonLat (position.lon, position.lat, position.height);
            this.layers = group.layers || [];

            for (let i = 0; i < this.layers.length; i++) {
                let layer = this.layers[i];
                if (layer.properties.scheme === 'layer-xyz-3857') {
                    let provider = new ImageryXYZ_3857_Provider(layer.properties.url, layer);
                    this.layerMap.set(layer.name, provider);
                } else if (layer.properties.scheme === 'layer-singleTileImagery') {
                    let imagery = new SingleTileImagery(layer.properties.url, layer);
                    this.layerMap.set(layer.name, imagery);
                }
            }
        },

        closeSplit() {
            this.setLeftLayer(null);
            this.setRightLayer(null);
        },

        setLeftLayer(layerName) {
            this.$store.commit('resetLegend');
            if (splitControlL) {
                splitControlL.destroy();
                splitControlL = undefined;
            }
            if (layerName) {
                let layerL = this.layerMap.get(layerName);

                let group = this.layersData.find(item => item.group === this.selGroup);
                if (group.legend) {
                    this.$store.commit('setLegendCurrent', { title: group.group, list: [], img: group.legend });
                }

                splitControlL = new VGEEarth.ImageLayerSplit(earth.viewer3D, layerL, Cesium.SplitDirection.LEFT);
            } else {
                this.leftLayer = null;
            }
        },
        setRightLayer(layerName) {
            if (splitControlR) {
                splitControlR.destroy();
                splitControlR = undefined;
            }
            if (layerName) {
                let layerR = this.layerMap.get(layerName);

                let group = this.layersData.find(item => item.group === this.selGroup);
                if (group.legend) {
                    this.$store.commit('setLegendCurrent', { title: group.group, list: [], img: group.legend });
                }

                splitControlR = new VGEEarth.ImageLayerSplit(earth.viewer3D, layerR, Cesium.SplitDirection.RIGHT);
            } else {
                this.rightLayer = null;
            }
        },

        // 退出卷帘分析
        exit() {
            this.closeSplit();
            this.layers = [];
            this.layerMap.clear();
            this.selGroup = '';
            this.$store.commit('setVGEEarthComAction', { name: 'ImageLayerSplitMana', on_off: 2 });
        }
    },
    computed: {
        groupList() {
            return this.layersData.map(item => item.group);
        }
    },
    watch: {
        selGroup() {
            this.closeSplit();
            this.loadAllLayer();
        }
    },
    async mounted() {
        await this.getSHBLayers();
    },
    unmounted() {
        this.closeSplit();
    }
};
</script>

<style scoped>
#ImageLayerSplitMana {
    position: absolute;
    background-color: rgba(33, 45, 33, 0.8);
    width: 461px;
    top: 110px;
    left: 515px;
    right: 0;
    color: #00E3FF;
    font-size: 14px;
    font-weight: 500;
    padding: 8px;
    border-radius: 3px;
}

#ImageLayerSplitMana i {
    line-height: 28px;
    font-size: 22px;
    padding-left: 5px;
}

.image-ctr {
    color: white;
    float: right
}

.image-ctr:hover {
    color: #00E3FF;
}

</style>
