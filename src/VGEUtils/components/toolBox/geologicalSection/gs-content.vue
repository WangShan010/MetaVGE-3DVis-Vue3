/****************************************************************************
名称：地质剖面线
作者：冯功耀
功能描述：
使用方式：
可能存在的BUG或注意事项：
最后修改日期：2022-04-20
****************************************************************************/

<template>
    <win-tabs :initCSS="{width: 650,height: 400,left:400,top:300}" @close="close">
        <tab-pane label="地形剖面">
            <div id="msPane">
                <div>
                    操作：
                    <button class="btn btn-sm btn-success" style="width: 100px;"
                            type="button"
                            @click="surfaceArea">绘制剖面线
                    </button>
                    <button class="btn btn-sm btn-warning" type="button" @click="clearChart">重置</button>
                </div>
                <div v-if="startPoint">起始点：{{ startPoint.longitude }}°{{ startPoint.latitude }}°</div>
                <div v-if="endPoint">终止点：{{ endPoint.longitude }}°{{ endPoint.latitude }}°</div>
            </div>
            <div ref="chart" class="chart"></div>
        </tab-pane>
    </win-tabs>
</template>

<script>
import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';

let myChart = null;
let redLine = null;
let ChartResize = null;
export default {
    name: 'ms-content',
    data() {
        return {
            startPoint: null,
            endPoint: null
        };
    },
    components: { winTabs, tabPane },
    methods: {
        // 绘制剖面线
        async drawLine() {
            return new Promise((resolve, reject) => {
                earth.drawShape.drawLine((
                    {
                        coordinateType: 'cartographicObj',
                        endCallback: (e) => resolve(e)
                    }
                ));
            });
        },
        // 生成剖面线
        async surfaceArea() {
            let l = await this.drawLine();
            if (l) {
                this.startPoint = l[0];
                this.endPoint = l[1];
            }
            let pointArr = [];
            for (let i = 0; i < 100; i++) {
                let lon = l[0].longitude - (l[0].longitude - l[1].longitude) / 100 * i;
                let lat = l[0].latitude - (l[0].latitude - l[1].latitude) / 100 * i;
                pointArr.push({ longitude: lon, latitude: lat, height: 0 });
            }
            pointArr = await VGEEarth.getMostDetailedHeight(pointArr);

            this.drawChart(pointArr);

            redLine && earth.viewer3D.entities.remove(redLine);
            redLine = null;
            redLine = earth.viewer3D.entities.add({
                name: 'Red line on terrain',
                polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArray([
                        l[0].longitude,
                        l[0].latitude,
                        l[1].longitude,
                        l[1].latitude
                    ]),
                    width: 5,
                    material: Cesium.Color.RED,
                    clampToGround: true
                }
            });
        },
        // 绘制剖面线 echarts
        drawChart(pointArr) {
            let el = this.$refs.chart;

            let heightArr = pointArr.map(p => p.height);
            let lonlatArr = pointArr.map((p, index) => index);

            // 指定图表的配置项和数据
            let option = {
                title: {
                    text: '地质剖面图',
                    textStyle: {
                        color: '#2e7d6a'
                    },
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        params = params[0];
                        let index = params.dataIndex;
                        let p = pointArr[index];
                        return `位置：${p.longitude},${p.latitude}<br/>高程：${p.height}`;
                    },
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '60px',
                    bottom: '3%',
                    containLabel: true
                },

                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: lonlatArr,
                        name: '位置'
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '高程(m)'
                    }
                ],
                series: [
                    {
                        name: '高程',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: heightArr
                    }
                ]
            };
            myChart = echarts.init(el);
            myChart.setOption(option);
            if (!ChartResize) {
                ChartResize = () => myChart.resize();
                window.addEventListener('resize', ChartResize);
            }
        },
        // 清除剖面线 echarts
        clearChart() {
            if (myChart) {
                myChart.clear();
                myChart.dispose();
                window.removeEventListener('resize', ChartResize);
                ChartResize = null;
                myChart = null;

                redLine && earth.viewer3D.entities.remove(redLine);
                redLine = null;

                this.startPoint = null;
                this.endPoint = null;
            }
        },
        close() {
            this.$store.commit('setVGEEarthComAction', { name: 'geologicalSection', on_off: 2 });
        }
    },
    mounted() {
    },
    unmounted() {
        this.clearChart();
    }
};
</script>

<style lang="less" scoped>
#msPane {
    button {
        margin: 5px 2px;
    }
}


.chart {
    display: inline-block;
    width: 100%;
    height: 200px;
    margin-top: 20px;
}
</style>
