/****************************************************************************
名称：路径规划 的逻辑处理
作者：冯功耀
最后修改日期：2022-08-19
****************************************************************************/

<template>
    <win-tabs :initCSS="{width: 300,height: 280,left:500,top:330}" @close="close">
        <tab-pane label="路径规划">
            <div>
                <div style="margin-bottom: 5px">
                    <el-row>
                        <el-col :span="5">
                            <label class="label-container">起点</label>
                        </el-col>
                        <el-col :span="14">
                            <input disabled style="float: none;width: 100%" min="0" v-model="startingPoint"/>
                        </el-col>
                        <el-col :span="5">
                            <button class="btn btn-default btn-xs" style="float: right" type="button" @click="takeStartingPoint">选点
                            </button>
                        </el-col>
                    </el-row>
                </div>

                <div style="margin-bottom: 5px">
                    <el-row>
                        <el-col :span="5">
                            <label class="label-container">终点</label>
                        </el-col>
                        <el-col :span="14">
                            <input disabled style="float: none;width: 100%" min="0" v-model="endPoint"/>
                        </el-col>
                        <el-col :span="5">
                            <button class="btn btn-default btn-xs" style="float: right" type="button" @click="takeEndPoint">选点
                            </button>
                        </el-col>
                    </el-row>
                </div>

                <div style="margin-bottom: 5px">
                    <el-row>
                        <el-col :span="5">
                            <label class="label-container">途经点</label>
                        </el-col>
                        <el-col :span="6">
                            <input style="float: none;width: 100%" min="0" disabled
                                   v-model="passPointArr.length"/>
                        </el-col>
                        <el-col :span="13">
                            <div class="btn-group" style="float: right">
                                <button class="btn btn-default btn-xs" type="button" @click="takePassPoint">添加</button>
                                <button class="btn btn-default btn-xs" type="button" @click="clearPassPoint">重置</button>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                <div style="margin-bottom: 5px">
                    <el-row>
                        <el-col :span="5">
                            <label class="label-container">避让区</label>
                        </el-col>
                        <el-col :span="6">
                            <input style="float: none;width: 100%" min="0" disabled
                                   v-model="avoidRanges.length"/>
                        </el-col>
                        <el-col :span="13">
                            <div class="btn-group" style="float: right">
                                <button class="btn btn-default btn-xs" type="button" @click="takeAvoidRange">添加</button>
                                <button class="btn btn-default btn-xs" type="button" @click="clearAvoidRanges">重置</button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="crlBtnGroup">
                    <button v-if="naviData" class="btn btn-primary btn-sm" @click="saveNaviData">导出</button>
                    <button class="btn btn-success btn-sm" @click="navigation">规划</button>
                    <button class="btn btn-warning btn-sm" @click="resetNavigation">清除</button>
                </div>
            </div>
            <div style="max-height: 500px;overflow: auto">
                <table class="roadTable" v-if="paths.length>0" @mousedown.stop>
                    <tr>
                        <td width="50" class="center">方案</td>
                        <td>推荐线路</td>
                    </tr>
                    <tr v-for="(p,i) in paths" @click="buildPathEntity(i)">
                        <td class="center">{{ p.id }}</td>
                        <td><p>{{ p.msg }}</p></td>
                    </tr>
                </table>
            </div>
        </tab-pane>
    </win-tabs>
</template>

<script>
import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';


let pathPlanning;
export default {
    name: 'pp-content',
    components: { winTabs, tabPane },
    data: function () {
        return {
            startingPoint: '',
            endPoint: '',
            passPointArr: [],
            avoidRanges: [],
            paths: [],
            naviData: null
        };
    },
    methods: {
        async initPathPlanning() {
            let { data: config } = await axios.get('./VGEEarth/Config/pathPlanning/init.json');
            this.routingServiceType = config.routingServiceType;

            pathPlanning = new VGEEarth.PathPlanning(earth.viewer3D, config.routingServiceType);
        },
        async takeStartingPoint() {
            await pathPlanning.takeStartingPoint();
            this.startingPoint = pathPlanning.startingPoint.longitude + ',' + pathPlanning.startingPoint.latitude;
        },
        async takeEndPoint() {
            await pathPlanning.takeEndPoint();
            this.endPoint = pathPlanning.endPoint.longitude + ',' + pathPlanning.endPoint.latitude;
        },
        async takePassPoint() {
            await pathPlanning.takePassPoint();
            this.passPointArr = pathPlanning.passPointArr;
            console.log(this.passPointArr);
        },
        async takeAvoidRange() {
            await pathPlanning.takeAvoidRange();
            this.avoidRanges = pathPlanning.avoidRanges;
        },
        async clearPassPoint() {
            pathPlanning.clearPassPoint();
            this.passPointArr = [];
        },
        async clearAvoidRanges() {
            pathPlanning.clearAvoidRanges();
            this.avoidRanges = [];
        },
        // 获取坐标采集工具
        async navigation() {
            let that = this;
            if (this.startingPoint === '' || this.endPoint === '') {
                that.$message({ type: 'warning', message: '请选择起点和终点' });
                return;
            }
            let naviData = await pathPlanning.runNavigation();
            if (naviData) {
                that.naviData = naviData;
                await that.buildTable(naviData);
                await that.buildPathEntity(0);
            }
        },
        async buildPathEntity(index) {
            await pathPlanning.buildPathEntity(index);
        },
        // 渲染表格
        async buildTable(naviData) {
            this.paths = [];
            if (this.routingServiceType === 0) {
                naviData.paths.forEach((p, index) => {
                    let pathStr = `${p.strategy}，全长：${(p.distance / 1000).toFixed(1)}公里。途径：`;
                    p.steps.forEach(step => {
                        pathStr += step.road ? (step.road + '、') : '';
                    });
                    this.paths.push({ id: index + 1, msg: pathStr });
                });
            } else if (this.routingServiceType === 1) {
                let index = 0;
                naviData.forEach(p => {
                    let pathStr = `全长：${(p.distance / 1000).toFixed(1)}公里。`;
                    p.instructions.forEach(instruction => {
                        pathStr += instruction.text + `行驶${(instruction.distance / 1000).toFixed(1)}公里(预计${(instruction.time / 60000).toFixed(1)}分钟)。  `;
                    });
                    this.paths.push({ id: index + 1, msg: pathStr });
                });
            }
        },
        async saveNaviData() {
            let that = this;
            if (that.naviData) {
                saveAs(new Blob([JSON.stringify(that.naviData)], { type: 'text/plain;charset=utf-8' }), '导航数据.json');
            }
        },
        async resetNavigation() {
            this.startingPoint = '';
            this.endPoint = '';
            this.passPointArr = [];
            this.avoidRanges = [];
            this.naviData = null;
            this.paths = [];
            this.routingServiceType = 0;
            pathPlanning.resetNavigation();
            pathPlanning.destroy();
            this.initPathPlanning();
        },
        close() {
            this.$store.commit('setVGEEarthComAction', { name: 'pathPlanning', on_off: 2 });
        }
    },
    mounted() {
        this.initPathPlanning();
    },
    unmounted() {
        this.resetNavigation();
        pathPlanning.destroy();
    }
};
</script>

<style lang="less" scoped>
@import "@/assets/global/css/crlBtnGroup.less";

label {
    color: #009b94;
}

input {
    color: #333;
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
