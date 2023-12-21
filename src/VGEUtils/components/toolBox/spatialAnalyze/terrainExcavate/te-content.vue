/****************************************************************************
名称：地表开挖的逻辑 的逻辑处理
最后修改日期：2022-04-28
****************************************************************************/

<template>
    <win-tabs :initCSS="{width: 530,height: 220,left:350,top:380}" @close="close">
        <tab-pane label="地表开挖分析">
            <div @mousedown.stop>
                <div style="margin-bottom: 5px">
                    <el-row>
                        <el-col :span="4"><label class="label-container">开挖深度:</label></el-col>
                        <el-col :span="16">
                            <el-input v-model.number="excavateDepth" size="small"></el-input>
                        </el-col>
                        <el-col :span="3" style="text-align: center"><label class="label-container">米</label></el-col>
                    </el-row>
                </div>

                <div style="margin-bottom: 5px">
                    <el-row>
                        <el-col :span="4"><label class="label-container">底部素材:</label></el-col>
                        <el-col :span="20">
                            <el-input v-model="bottomImage" size="small"></el-input>
                        </el-col>
                    </el-row>
                </div>


                <div style="margin-bottom: 5px">
                    <el-row>
                        <el-col :span="4"><label class="label-container">侧面素材:</label></el-col>
                        <el-col :span="20">
                            <el-input v-model="sideImage" size="small"></el-input>
                        </el-col>
                    </el-row>
                </div>

                <div style="text-align: center;padding-top: 10px">
                    <button class="btn btn-info btn-sm" @click="excavate" style="margin-right: 10px;">绘制开挖区域</button>
                    <button class="btn btn-warning btn-sm" @click="reset">重置</button>
                </div>
            </div>
        </tab-pane>
    </win-tabs>
</template>

<script>
import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';


let excavator = null;
export default {
    name: 'te-content',
    data: function () {
        return {
            excavateDepth: 100,
            bottomImage: './VGEEarth/Src/LTS-Master/img/excavate/excavate_bottom_min.jpg',
            sideImage: './VGEEarth/Src/LTS-Master/img/excavate/excavate_side_min.jpg'
        };
    },
    components: {winTabs, tabPane},
    methods: {
        close() {
            this.$store.commit('setVGEEarthComAction', {name: 'terrainExcavate', on_off: 2});
        },
        excavate() {
            let that = this;
            this.reset();
            // let drawer = new VGEEarth.DrawShape(VGEEarth.getMainViewer());
            earth.drawShape.drawPolygon({
                coordinateType: 'cartographicPoiArr', endCallback: (e) => {
                    excavator = new VGEEarth.SurfaceExcavate(VGEEarth.getMainViewer());
                    let postionArr = [];
                    //剪掉最后一个闭环坐标
                    for (let i = 0; i < e.length - 1; i++) {
                        postionArr.push(e[i][0]);
                        postionArr.push(e[i][1]);
                        postionArr.push(e[i][2]);
                    }
                    let postions = Cesium.Cartesian3.fromDegreesArrayHeights(postionArr);
                    let option = {
                        excavateDepth: that.excavateDepth,
                        bottomImage: that.bottomImage,
                        sideImage: that.sideImage
                    };

                    earth.viewer3D.scene.globe.depthTestAgainstTerrain = true;
                    excavator.add(postions, option);
                }
            });
        },
        reset() {
            if (excavator) {
                excavator.clear();
            }
        }
    },
    mounted() {
        earth.viewer3D.scene.globe.depthTestAgainstTerrain = true;
    },
    unmounted() {
        this.reset();
        earth.drawShape.callStop();
    }
};
</script>

<style scoped>
label {
    color: #009b94;
}

.center {
    text-align: center
}

.roadTable {
    border: 1px solid;
    margin-top: 10px;
    color: white;
}
</style>
