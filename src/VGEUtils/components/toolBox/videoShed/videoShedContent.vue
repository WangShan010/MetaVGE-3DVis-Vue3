/****************************************************************************
名称：视频融合
最后修改日期：2022-07-13
****************************************************************************/

<template>
    <win-tabs :initCSS="{width: 295,height: 190,left:450,top:120}" @close="close">
        <tab-pane label="视频融合">
            <div>
                <div>
                    <el-form ref="form" :model="form" label-position="left" label-width="60px" size="default">
                        <el-form-item label="投影">
                            <el-switch
                                v-model="visible"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                            ></el-switch>
                        </el-form-item>
                        <el-form-item label="翻转">
                            <el-slider v-model="form.rotation.x"
                                       :max="180"
                                       :min="-180"
                                       :show-tooltip="true"
                                       class="slider-value"
                                       @input="valueChange"
                            ></el-slider>
                        </el-form-item>
                        <el-form-item label="旋转">
                            <el-slider v-model="form.rotation.y"
                                       :max="360"
                                       :min="-360"
                                       :show-tooltip="true"
                                       class="slider-value"
                                       @input="valueChange"
                            ></el-slider>
                        </el-form-item>
                        <el-form-item label="夹角">
                            <el-slider v-model="form.fov"
                                       :max="90"
                                       :min="0"
                                       :show-tooltip="true"
                                       class="slider-value"
                                       @input="valueChange"
                            ></el-slider>
                        </el-form-item>
                        <el-form-item label="透明">
                            <el-slider v-model="form.alpha"
                                       :max="1"
                                       :min="0"
                                       :show-tooltip="true"
                                       :step="0.1"
                                       class="slider-value"
                                       @input="valueChange"
                            ></el-slider>
                        </el-form-item>
                        <el-form-item label="投影线">
                            <el-switch
                                v-model="form.debugFrustum"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="setFrustumVisible"
                            ></el-switch>
                        </el-form-item>
                    </el-form>
                    <video id="testVideo"
                           autoplay="autoplay"
                           controls
                           src="https://vge-webgl.oss-cn-beijing.aliyuncs.com/MetaVGE-3DVis-Vue3/Video/lukou.mp4"
                           style="height:150px;width:250px;"
                    ></video>
                </div>
            </div>
        </tab-pane>
    </win-tabs>
</template>

<script>

import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';

import VideoShed from './VideoShed.js';

let videoShed;
let newLoadTileSet = false;
export default {
    name: 'videoShedContent',
    components: {
        winTabs, tabPane
    },
    data() {
        return {
            title: '视频融合',
            visible: false,
            number: 1,
            form: {
                rotation: {}
            },
            headers: [
                { id: 1, text: '视频融合', check: true }
            ]
        };
    },
    created() {
    },
    methods: {
        async flyTo() {
            let s = VGEEarth.ConfigTool.getResourcesByPid('80f3778c-c8dc-481b-2122-b90e04fd3104');
            let tileSet = await earth.viewer3DWorkSpace.addData(s);
            newLoadTileSet = !!tileSet;
            let flyToOpts = {
                destination: {
                    x: -2895429.8939341973, y: 4717770.941850088, z: 3158085.71284576
                },
                orientation: {
                    heading: 4.917487317285504,
                    pitch: -0.6280151824043467,
                    roll: 0.0000033167192423633196
                }
            };
            earth.viewer3D.scene.camera.setView(flyToOpts);
        },
        valueChange() {
            if (this.visible === false) {
                return;
            }
            videoShed.upData(this.form);
        },
        close() {
            videoShed.destroy();
            if (newLoadTileSet) {
                earth.viewer3DWorkSpace.removeDataByPid('80f3778c-c8dc-481b-2122-b90e04fd3104');
                newLoadTileSet = false;
            }

            this.$store.commit('setVGEEarthComAction', { name: 'videoShed', on_off: 2 });
        },
        setFrustumVisible() {
            if (this.visible === false) {
                return;
            }
            videoShed.openLine(this.form.debugFrustum);
        }
    },
    watch: {
        visible(val) {
            if (val === true) {
                videoShed.init();
                this.form = videoShed.getStyle();
            } else {
                videoShed.destroy();
            }
        }
    },
    async mounted() {
        videoShed = new VideoShed();
        await this.flyTo();
        this.visible = true;
    },
    unmounted() {
        this.close();
    }

};
</script>

<style>
label.el-form-item__label {
    color: #009b94;
}

el-slider {
    position: absolute;
    width: 100px;
    margin-top: 30px;
}

.slider-value {
    margin-top: -5px;
}
</style>
