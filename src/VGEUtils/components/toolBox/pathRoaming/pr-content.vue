<template>
    <win-tabs :initCSS="{width: 300,height: 280,left:350,top:380}" class="move_box" @close="close">
        <tab-pane label="路径漫游">

            <div style="margin-bottom: 5px">
                <el-row>
                    <el-col :span="6">
                        <label class="label-container">漫游方式</label>
                    </el-col>
                    <el-col :span="14">
                        <el-select v-model="roamingType" placeholder="请选择漫游方式" size="small" @change="setRoamingType">
                            <el-option
                                v-for="item in pathRoamList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </div>


            <div v-if="roamingType==='飞行漫游'" style="margin-bottom: 5px">
                <el-row>
                    <el-col :span="6">
                        <label class="label-container">离地高度</label>
                    </el-col>
                    <el-col :span="14">
                        <el-input v-model.number="pathRoamHeight" size="small"></el-input>
                    </el-col>
                </el-row>
            </div>


            <div style="margin-bottom: 5px">
                <el-row>
                    <el-col :span="6">
                        <label class="label-container">显示路径</label>
                    </el-col>
                    <el-col :span="14">
                        <el-switch v-model="showPath"></el-switch>
                    </el-col>
                </el-row>
            </div>

            <div style="margin-bottom: 5px">
                <el-row>
                    <el-col :span="6">
                        <label class="label-container">路径设定</label>
                    </el-col>
                    <el-col :span="14">
                        <button :disabled="drawLineDone" class="btn btn-sm btn-success" style="margin-right: 5px" @click="drawLine">画线</button>
                        <button :disabled="!drawLineDone" class="btn btn-sm btn-warning" @click="stop">清除</button>
                    </el-col>
                </el-row>
            </div>


            <div style="margin-bottom: 5px">
                <el-row>
                    <el-col :span="6">
                        <label class="label-container">控制</label>
                    </el-col>
                    <el-col :span="18">
                        <button :disabled="!drawLineDone" class="btn btn-info btn-sm" style="margin-right: 3px" @click="start">开始</button>
                        <button :disabled="!drawLineDone" class="btn btn-info btn-sm" style="margin-right: 3px" @click="pause">暂停</button>
                        <button :disabled="!drawLineDone" class="btn btn-info btn-sm" style="margin-right: 3px" @click="accelerateUp">加速</button>
                        <button :disabled="!drawLineDone" class="btn btn-info btn-sm" @click="accelerateDown">减速</button>

                    </el-col>
                </el-row>
            </div>
        </tab-pane>
    </win-tabs>
</template>

<script>
import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';


let pathRoaming = null;

export default {
    name: 'pr-content',
    components: { winTabs, tabPane },
    data() {
        return {
            pathRoamList: [
                // '贴地漫游',
                '行人漫游',
                '车辆漫游',
                '飞行漫游'
            ],
            roamingType: '车辆漫游',
            pathRoamHeight: 0,
            showPath: true,
            drawLineDone: false
        };
    },
    watch: {
        showPath(newV) {
            pathRoaming.showPath = newV;
        }
    },
    methods: {
        async drawLine() {
            await pathRoaming.drawLine(this.pathRoamHeight);
            this.drawLineDone = true;
        },
        setRoamingType() {
            pathRoaming.setRoamingType(this.roamingType);
            console.log(this.roamingType);
        },
        start() {
            if (!pathRoaming || !this.drawLineDone) {
                return;
            }
            pathRoaming.startRoaming();
        },
        pause() {
            if (!pathRoaming || !this.drawLineDone) {
                return;
            }
            pathRoaming.pauseRoaming();
        },
        stop() {
            if (!pathRoaming || !this.drawLineDone) {
                return;
            }
            pathRoaming.stopRoaming();
            this.drawLineDone = false;
        },
        accelerateUp() {
            let speed = pathRoaming.getRoamingSpeed();
            console.log('speed:' + speed);
            pathRoaming.setRoamingSpeed(speed + 10);
        },
        accelerateDown() {
            let speed = pathRoaming.getRoamingSpeed();
            console.log('speed:' + speed);
            pathRoaming.setRoamingSpeed(speed - 10);
        },
        close() {
            this.$store.commit('setVGEEarthComAction', { name: 'pathRoaming', on_off: 2 });
        }
    },
    mounted() {
        pathRoaming = new VGEEarth.PathRoaming(VGEEarth.getMainViewer(), {
            speed: 10,
            roamingType: this.roamingType
        });
    },
    unmounted() {
        this.stop();
    }
};
</script>

<style lang="less" scoped>
label {
    color: #009b94;
}
</style>
