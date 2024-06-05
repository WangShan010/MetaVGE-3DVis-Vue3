<template>
    <div class="left-panel">
        <div class="panel-header">未来72小时气象预警信息</div>
        <div class="panel-body">
            <ul class="weather-btn">
                <!-- <template v-for="(item, key) in weatherBaseIcon">
                  <img @click="changeWeatherType(key)" :class="{'weather-btn-active':key === weatherBtnActiveKey}" :key = key :src="key === weatherBtnActiveKey ? weatherActiveIcon[key] : item" alt="">
                </template> -->
                <li v-for="(item, key) in iconWeathers" :key=key :class="{'weather-btn-active':key === weatherBtnActiveKey}"
                    @click="changeWeatherType(key)">
                    <svg aria-hidden="true" class="icon">
                        <use v-bind:xlink:href="`#${item}`"></use>
                    </svg>
                </li>
            </ul>
            <div class="weather-chart"></div>
        </div>
    </div>
</template>

<script>


const weatherIcons = {
    base: [],
    green: [],
    yellow: []
};
for (let i = 1; i < 10; i++) {
    weatherIcons.base.push(new URL(`../assets/img/icon-${i}.png`, import.meta.url).href);
    weatherIcons.green.push(new URL(`../assets/img/icon-${i}-green.png`, import.meta.url).href);
    weatherIcons.yellow.push(new URL(`../assets/img/icon-${i}-yellow.png`, import.meta.url).href);
}

export default {
    name: 'weather',
    data: function () {
        return {
            themeColor: 'green', // 支持换肤功能 green ：原始绿 yellow ：黄
            weatherBaseIcon: weatherIcons.base,
            weatherBtnActiveKey: 3,
            iconWeathers: [
                'icon-tianqi-1',
                'icon-tianqi-2',
                'icon-tianqi-3',
                'icon-tianqi-4',
                'icon-tianqi-5',
                'icon-tianqi-6',
                'icon-wenduxiajiang',
                'icon-tianqi-'
            ]
        };
    },
    methods: {

        changeWeatherType(key) {
            this.weatherBtnActiveKey = key;
        },
        drawWeatherChart() {
            const dom = document.querySelector('.weather-chart');
            this.myChart = echarts.init(dom);
            const [xData, yData] = [
                ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01', '07/01', '08/01', '09/01', '10/01', '11/01', '12/01'],
                [80, 65, 60, 85, 90, 65, 70, 75, 50, 70, 82, 65]
            ];
            const color = this.baseColor;
            this.option = {
                grid: {
                    left: '0',
                    right: '0',
                    top: '20%',
                    bottom: '10%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line',
                        lineStyle: {
                            color: color
                        }
                    }
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        color: '#A1A7B3'
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    data: xData
                }],
                yAxis: [
                    {
                        type: 'value',
                        name: '°C',
                        padding: 5,
                        // max: 1000,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(71, 76, 64, 0.6)',
                                type: 'dashed'
                            }
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            margin: 10,
                            textStyle: {
                                color: '#A1A7B3'

                            }
                        },
                        axisTick: {
                            show: false
                        }
                    }

                ],
                series: [
                    {
                        name: '今日',
                        type: 'line',
                        smooth: true,
                        stack: '总量',
                        symbolSize: 5,
                        showSymbol: false,
                        itemStyle: {
                            normal: {
                                color: color,
                                lineStyle: {
                                    color: color,
                                    width: 2
                                }
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: this.themeColor === 'yellow' ? 'rgba(244, 187, 66, 0.8)' : 'rgba(50, 216, 205, 0.8)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                ], false)
                            }
                        },
                        data: yData
                    }
                ]
            };
            this.myChart.setOption(this.option);
        }
    },
    computed: {
        weatherActiveIcon() {
            return this.themeColor === 'yellow' ? weatherIcons.yellow : weatherIcons.green;
        },
        baseColor() {
            return this.themeColor === 'yellow' ? '#F4BB42' : '#23D0C4';
        }
    },
    mounted() {
        let that = this;
        this.$nextTick(() => {
            this.drawWeatherChart();
        });
        window.addEventListener('resize', function () {
            that.myChart.resize();
        });
    }
};
</script>


<style lang='less' scoped>
@import "../assets/css/common-theme.less";
@import "../assets/css/green-theme.less";
@import "../assets/css/yellow-theme.less";
</style>

