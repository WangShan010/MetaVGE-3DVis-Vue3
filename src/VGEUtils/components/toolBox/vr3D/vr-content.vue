<template>
    <win-tabs :initCSS="{width: 350,height: 350,left:400,top:300}" @close="close">
        <tab-pane label="VR立体屏幕" style="height: 100%">
            <div style="height: 100%" @mousedown.stop>

                <div>
                    <el-row>
                        <el-col :span="4">眼距:</el-col>
                        <el-col :span="12">
                            <div class="grid-content ep-bg-purple-light"/>
                            <el-slider :min="eyeSeparationRange*-1" :max="eyeSeparationRange*1"
                                       class="m-12"
                                       v-model="eyeSeparation"
                                       @input="setEyeSeparation(eyeSeparation)"/>
                        </el-col>
                        <el-col :span="2">&nbsp;</el-col>
                        <el-col :span="6">
                            <div class="grid-content ep-bg-purple"/>
                            <el-select v-model.number="eyeSeparationRange" class="m-2"
                                       style="width: 70px;" placeholder="Select" size="small">
                                <el-option v-for="item in eyeSeparationRangeArr" :label="String(item)" :value="item"/>
                            </el-select>
                        </el-col>
                    </el-row>
                </div>

                <div style="margin:  30px 0">
                    <span>默认场景：</span>
                    <el-select v-model="selScene" class="m-2" placeholder="Select" size="small" clearable>
                        <el-option
                                v-for="item in sceneList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        />
                    </el-select>
                </div>

                <div style="padding: 10px;text-align: center">
                    <button type="button" class="btn btn-default" @click="turnOn">切换VR模式</button>
                </div>

            </div>
        </tab-pane>
    </win-tabs>
</template>


<script>
import {tabPane, winTabs} from "@/VGEUtils/components/winTabs/index.js";

export default {
    name: "vr-content",
    components: {winTabs, tabPane},
    data: function () {
        return {
            open: false,

            eyeSeparationRangeArr: [10, 50, 200, 500, 2000, 5000],
            eyeSeparationRange: 300,

            focalLengthRangeArr: [10, 50, 200, 500, 2000, 5000],
            focalLengthRange: 10,


            eyeSeparation: 0,
            focalLength: 0,

            selScene: "Option1",
            sceneList: [
                {
                    value: "Option1",
                    label: "居民楼-小尺度",
                },
                {
                    value: "Option2",
                    label: "居民楼-大尺度",
                },
                {
                    value: "Option3",
                    label: "山脉-大尺度",
                }
            ]
        };
    },
    methods: {
        turnOn() {
            if (this.open) {
                this.closeVR3d();
                this.open = false;
            } else {
                this.openVR3d();
                this.open = true;
            }
        },
        openVR3d() {
            earth.viewer3D.scene.useWebVR = true;
            earth.viewer3D.scene._cameraVR.frustum.far = 8.0;
        },
        closeVR3d() {
            earth.viewer3D.scene.useWebVR = false;
        },
        // 焦距
        setFocalLength(focalLengthValue) {
            earth.viewer3D.scene.useWebVR = true;
            earth.viewer3D.scene.focalLength = focalLengthValue * 1;
            // earth.viewer3D.scene.eyeSeparation = focalLengthValue / 30.0;
        },
        // 眼距
        setEyeSeparation(eyeSeparation) {
            earth.viewer3D.scene.useWebVR = true;
            earth.viewer3D.scene.eyeSeparation = eyeSeparation * 1;
        },

        close() {
            this.$store.commit("setVGEEarthComAction", {name: "vr3d", on_off: 2});
        }
    }
};
</script>

<style scoped>

</style>
