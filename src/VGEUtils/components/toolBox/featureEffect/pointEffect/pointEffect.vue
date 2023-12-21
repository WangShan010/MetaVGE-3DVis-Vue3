<template>
    <div>
        <ul>
            <li v-for="item in pointList" :key="item.id" class="liBox">
                <label class="label-container" style="color:white;">{{
                        item.name
                    }}</label>
                <el-switch
                    v-model="item.open" active-color="#13ce66"
                    inactive-color="#929090"
                    @change="change(item)">
                </el-switch>
            </li>
        </ul>
    </div>
</template>

<script>

import { domData, pointData } from './js/data.js';
import bouncePoint from './js/bouncePoint.js';
import divPoint from './js/divPoint.js';
import simpleLabel from './js/simpleLabel.js';
import erectLabelPoint from './js/erectLabelPoint.js';
import hotSpot from './js/hotSpot.js';
import gradientLabelPoint from './js/gradientLabelPoint.js';
import hlsVideo from './js/hlsVideo.js';
import primitiveLabelCol from './js/primitiveLabelCol.js';
import liquidFill from './js/liquidFill.js';
import floatMarker from './js/floatMarker.js';
import dynamicDivLabel from './js/dynamicDivLabel.js';

export default {
    name: 'pointEffect',
    data() {
        return {
            ...domData,
            pointList: []
        };
    },
    methods: {
        change(item) {
            if (item.name == '所有特效点') {
                this.allChange(item);
                this.setView();
            } else {
                this.singleChange(item);
            }
        },
        singleChange(item) {
            if (item.open) {
                this.start(item);
            } else {
                this.destroy(item);
            }
        },
        allChange(item) {
            if (item.open) {
                for (let i = 1; i < this.pointList.length; i++) {
                    if (!this.pointList[i].open) {
                        this.pointList[i].open = true;
                        this.start(this.pointList[i]);
                    }
                }
            } else {
                for (let i = 1; i < this.pointList.length; i++) {
                    if (this.pointList[i].open) {
                        this.pointList[i].open = false;
                        this.destroy(this.pointList[i]);
                    }
                }
            }
        },
        start(item) {
            if (item.name == '弹跳点') {
                item.start(pointData, earth.viewer3D);
            } else {
                item.start(...item.params, pointData);
            }
        },
        destroy(item) {
            if (item.name == '弹跳点') {
                pointData.bMarkers.forEach(item => {
                    item.remove();
                });
            } else {
                pointData[item.destroy[0]][item.destroy[1]]();
            }
        },
        setView() {
            earth.viewer3D.camera.flyTo({
                'destination': {
                    'x': -1715500.8002105777,
                    'y': 4993703.81513576,
                    'z': 3566670.885312287
                },
                'cartographic': {
                    'longitude': 108.95927,
                    'latitude': 34.2172,
                    'height': 490.55209
                },
                'orientation': {
                    'heading': 0.06817250192194901,
                    'pitch': -0.4024205713517768,
                    'roll': 6.283137603009188
                },
                duration: 1.5
            });
        }
    },
    mounted() {
        this.setView();
        this.pointList = [
            {
                id: 0,
                name: '所有特效点',
                start: this.start,
                params: [this.pos1, this.dom1],
                destroy: ['point1', 'remove'],
                open: false
            },
            {
                id: 1,
                name: 'div文本点',
                start: divPoint,
                params: [this.pos1, this.dom1],
                destroy: ['point1', 'remove'],
                open: false
            },
            {
                id: 2,
                name: '简单标注点',
                start: simpleLabel,
                params: [this.pos2, this.dom2],
                destroy: ['point2', 'destroyWindow'],
                open: false
            },
            {
                id: 3,
                name: '竖立文本标注点',
                start: erectLabelPoint,
                params: [this.pos3, this.dom3],
                destroy: ['point3', 'remove'],
                open: false
            },
            {
                id: 4,
                name: '热点面板文本点',
                start: hotSpot,
                params: [this.pos4, this.dom4],
                destroy: ['point4', 'remove'],
                open: false
            },
            {
                id: 5,
                name: '简单渐变标注',
                start: gradientLabelPoint,
                params: [this.pos5, this.dom5],
                destroy: ['point5', 'remove'],
                open: false
            },
            {
                id: 6,
                name: 'hls视频窗口点',
                start: hlsVideo,
                params: [this.pos6],
                destroy: ['hls', 'destroy'],
                open: false
            },
            {
                id: 7,
                name: '图标+文字',
                start: primitiveLabelCol,
                params: [this.pos7],
                destroy: ['point7', 'remove'],
                open: false
            },
            {
                id: 8,
                name: '水球图',
                start: liquidFill,
                params: [this.pos8, this.dom8],
                destroy: ['point8', 'remove'],
                open: false
            },
            {
                id: 9,
                name: '浮动点',
                start: floatMarker,
                params: [this.pos9],
                destroy: ['point9', 'remove'],
                open: false
            },
            {
                id: 10,
                name: '动态文本标记点',
                start: dynamicDivLabel,
                params: [this.pos10],
                destroy: ['point10', 'remove'],
                open: false
            },
            {
                id: 11,
                name: '弹跳点',
                start: bouncePoint,
                params: [],
                destroy: [],
                open: false
            }
        ];
    },
    unmounted() {
        this.pointList[0].open = false;
        this.allChange(this.pointList[0]);
    }
};
</script>

<style lang="less" scoped>
.liBox {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
}

::v-deep(.el-switch .el-switch__core) {
    width: 30px !important;
    height: 15px;
}

::v-deep(.el-switch .el-switch__core::after ) {
    width: 14px;
    height: 14px;
    margin-top: -1px;
    margin-bottom: 2px;
}
</style>
