<template>
    <win-tabs style="left:auto;right: 200px" @close="close">
        <tab-pane label="数据参数">
            <div>
                <div style="margin-bottom: 5px">
                    <el-row>
                        <el-col :span="8"><label class="label-container">模型</label></el-col>
                        <el-col :span="16">
                            <el-select v-model="selTileSetPid" placeholder="请选择" size="small">
                                <el-option
                                    v-for="item in tileSetList"
                                    :key="item.pid"
                                    :label="item.name"
                                    :value="item.pid">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </div>
                <div style="margin-bottom: 5px">
                    <el-row>
                        <el-col :span="8"><label class="label-container">比例：</label></el-col>
                        <el-col :span="16">
                            <input
                                v-model.number="opts.scale"
                                :max="100"
                                :min="0.1"
                                :step="0.1"
                                type="number"
                                @input="update3DTilesMatrix()"
                            />
                        </el-col>
                    </el-row>
                </div>
                <div style="margin-bottom: 5px">
                    <el-row>
                        <el-col :span="8"><label class="label-container">经度：</label></el-col>
                        <el-col :span="16">
                            <input
                                v-model.number="opts.longitude"
                                :step="0.001"
                                type="number"
                                @input="update3DTilesMatrix()"
                            />
                        </el-col>
                    </el-row>
                </div>
                <div style="margin-bottom: 5px">
                    <el-row>
                        <el-col :span="8"><label class="label-container">纬度：</label></el-col>
                        <el-col :span="16">
                            <input
                                v-model.number="opts.latitude"
                                :step="0.001"
                                type="number"
                                @input="update3DTilesMatrix()"
                            />
                        </el-col>
                    </el-row>
                </div>
                <div style="margin-bottom: 5px">
                    <el-row>
                        <el-col :span="8"><label class="label-container">高度：</label></el-col>
                        <el-col :span="16">
                            <el-slider v-model="opts.height" :max="1000" :min="-100" @input="update3DTilesMatrix"></el-slider>
                        </el-col>
                    </el-row>
                </div>
                <div style="margin-bottom: 5px">
                    <el-row>
                        <el-col :span="8"><label class="label-container">以x轴旋转</label></el-col>
                        <el-col :span="16">
                            <el-slider v-model="opts.rx" :max="100" :min="-100" @input="update3DTilesMatrix"></el-slider>
                        </el-col>
                    </el-row>
                </div>
                <div style="margin-bottom: 5px">
                    <el-row>
                        <el-col :span="8"><label class="label-container">以y轴旋转</label></el-col>
                        <el-col :span="16">
                            <el-slider v-model="opts.ry" :max="100" :min="-100" @input="update3DTilesMatrix"></el-slider>
                        </el-col>
                    </el-row>
                </div>
                <div style="margin-bottom: 5px">
                    <el-row>
                        <el-col :span="8"><label class="label-container">以z轴旋转</label></el-col>
                        <el-col :span="16">
                            <el-slider v-model="opts.rz" :max="100" :min="-100" @input="update3DTilesMatrix"></el-slider>
                        </el-col>
                    </el-row>
                </div>

                <div style="text-align: center;padding-top: 10px">
                    <button class="btn btn-info btn-sm">定位</button>
                    <button class="btn btn-info btn-sm" @click="saveOpts()">保存参数</button>
                </div>
            </div>
        </tab-pane>
    </win-tabs>
</template>

<script>
import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';


export default {
    name: 'st-content',
    data() {
        return {
            selTileSetPid: null,
            tileSetList: [],

            opts: {
                scale: 1.0,
                longitude: 0,
                latitude: 0,
                height: 0, //修改高度
                rx: 0,
                ry: 0,
                rz: 0 //修改旋转
            }
        };
    },
    components: { winTabs, tabPane },
    methods: {
        update3DTilesMatrix() {
            let tileSet = earth.viewer3DWorkSpace._3DTileMana.getByPid(this.selTileSetPid);
            if (tileSet) {
                let tileSetEditor = new VGEEarth.TileSetPlugin.PositionEditor(earth.viewer3D, tileSet);
                this.opts = tileSetEditor.getParams();
            }
        },

        saveOpts() {
            console.log(cesiumInit.tilesetEditor.getOpts());
            this.$message({
                message: cesiumInit.tilesetEditor.getOpts(),
                type: 'success'
            });
        },
        close() {
            this.$store.commit('setVGEEarthComAction', { name: 'dataSetting', on_off: 2 });
        }
    },
    mounted() {
        this.tileSetList = earth.viewer3DWorkSpace.nodes.filter(item => item.dataType === '3DTiles');
    }
};
</script>
<style lang="less" scoped>
label {
    color: #009b94;
}
</style>
