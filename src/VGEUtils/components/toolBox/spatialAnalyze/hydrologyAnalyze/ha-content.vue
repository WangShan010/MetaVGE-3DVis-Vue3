<template>
    <win-tabs :initCSS="{width: 350,height: 220,left:500,top:330}" @close="close" v-loading="loading"
              element-loading-text="后台服务计算中...">
        <tab-pane label="水文分析">
            <div @mousedown.stop>
                <div style="">
                    <div style="text-align: center">
                        <el-select v-model="analyze" placeholder="请选择" style="width: 150px; margin-right: 10px"
                                   @change="remove">
                            <el-option
                                    v-for="item in analyzes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div>
                    <div style="text-align: center" class="ha-content">
                        <div class="mes" :class="{mes_red:area>100}">
                            <span v-if="area">提示：您已框选 {{ area }} 平方千米。</span>
                            <span v-if="area>100 && coordinates===''">面积数值过大，可能会导致计算时间较长！</span>
                        </div>
                        <button class="btn btn-info btn-sm" :disabled="!analyze" @click="excavate">绘制区域</button>
                        <button class="btn btn-warning btn-sm" @click="reset">重置</button>
                        <button class="btn btn-warning btn-sm" :disabled="!coordinates.length" @click="download">导出
                        </button>
                        <button class="btn btn-warning btn-sm" :disabled="!coordinates.length" @click="readingPixel">
                            取值
                        </button>
                        <button class="btn btn-warning btn-sm" @click="helpShow=!helpShow">帮助</button>
                    </div>
                </div>
                <div id="helpInfo" v-show="helpShow" style="margin: 10px">
                    {{ analyzes.find(entity => entity.value === analyze).intro }}
                </div>
            </div>
        </tab-pane>
    </win-tabs>
</template>

<script>
import {tabPane, winTabs} from '@/VGEUtils/components/winTabs/index.js';
import flyTaiwan from '../../areaNavigation/areaNavigationContent.vue';


let imageStores = {
    imageStore: [],
    geoJsonStore: []
};

let entities = [];

export default {
    name: 'ha-content',
    components: {winTabs, tabPane},
    data() {
        return {
            area: 0,
            params: {
                minslope: 0.5,
                threhold: 5,
                direction: 0
            },
            loading: false,
            helpShow: false,
            coordinates: '',
            w: 0,
            s: 0,
            e: 0,
            n: 0,
            result: [],
            analyze: 'fillSink',
            analyzes: [{
                value: 'fillSink',
                label: '填洼',
                intro: '填洼功能，绘制矩形区域后自动生成修正的高程数据',
                unity: '米'
            }, {
                value: 'drainageExtract',
                label: '河网提取',
                intro: '河网提取功能，绘制矩形区域后自动生成河流与流域矢量数据',
                entity: [
                    {text: '河流', color: 'rgb(255, 255, 0, 1)', isLine: true},
                    {text: '流域', color: 'rgb(255, 255, 0, 0.6)', isLine: false}
                ]
            }, {
                value: 'strahlerOrder',
                label: '河网等级',
                intro: '计算河网等级，绘制矩形区域后自动生成河网等级栅格',
                unity: '河网等级'
            }, {
                value: 'flowPath',
                label: '流路长度',
                intro: '计算流路长度，绘制矩形区域后自动生成流路长度栅格',
                unity: '米'
            }, {
                value: 'maxFlowPath',
                label: '最大流路长度',
                intro: '计算最大流路长度，绘制矩形区域后自动生成最大流路长度栅格',
                unity: '米'
            }, {
                value: 'verticalDistance',
                label: '河网垂直距离',
                intro: '计算河网垂直距离，绘制矩形区域后自动生成河网垂直距离栅格',
                unity: '米'
            }, {
                value: 'wetnessIndex',
                label: '湿度指数',
                intro: '计算湿度指数，绘制矩形区域后自动生成湿度指数栅格',
                unity: '湿度指数'
            }]
        };
    },
    mounted() {
        flyTaiwan.methods.flyTaiwan(710000);//飞到台湾，并绘制矢量边界
    },
    methods: {
        close() {
            this.$store.commit('setVGEEarthComAction', {name: 'hydrologyAnalyze', on_off: 2});
            this.remove();
            this.delPolygon();
        },
        //添加矩形线
        addPolygon(arr) {
            window.earth.viewer3D.entities.add({
                id: 'tempPolygon_p',
                polyline: {
                    id: 'glowingLine_p',
                    width: 12,
                    positions: Cesium.Cartesian3.fromDegreesArray(arr),
                    material: new VGEEarth.Material.Polyline.PolylineLinkPulseMaterial({
                        color: Cesium.Color.AQUA,
                        duration: 5000,
                    }),
                    clampToGround: true
                }
            });
        },
        //删除矩形线
        delPolygon() {
            window.earth.viewer3D.entities.removeById('areaPolygon');
            window.earth.viewer3D.entities.removeById('tempPolygon_p');
        },
        excavate() {
            entities.forEach(entity => {
                entity.destroyWindow();
            });
            imageStores.imageStore.forEach(item => {
                earth.viewer3D.imageryLayers.remove(item);
            });
            imageStores.geoJsonStore.forEach(item => {
                earth.viewer3D.dataSources.remove(item);
            });
            imageStores.imageStore = [];
            imageStores.geoJsonStore = [];
            // let drawer = new VGEEarth.DrawShape(VGEEarth.getMainViewer());
            earth.drawShape.drawRectangle({
                coordinateType: 'cartographicPoiArr',
                moveCallback: (e) => {
                    const area = turf.area(turf.polygon([e]));
                    this.area = Math.floor(area / 1000 / 1000);

                    if (area > 100_000) {
                        console.log('面积过大，超过 100 平方千米');
                    }
                },
                endCallback: (e) => {
                    let postionArr = [];
                    for (let i = 0; i < e.length - 1; i++) {
                        postionArr.push(e[i][0]);
                        postionArr.push(e[i][1]);
                        postionArr.push(e[i][2]);
                    }
                    this.coordinates = postionArr[0] + ',' + postionArr[3] + ',' + postionArr[1] + ',' + postionArr[10] + '[EPSG:4326]';
                    this.w = postionArr[0];
                    this.s = postionArr[10];
                    this.e = postionArr[3];
                    this.n = postionArr[1];
                    let arr = [e[0][0], e[0][1],
                        e[1][0], e[1][1],
                        e[2][0], e[2][1],
                        e[3][0], e[3][1],
                        e[0][0], e[0][1]]
                    this.addPolygon(arr);
                    this.addResult();
                }
            });
        },
        async addResult() {
            if (this.coordinates) {
                this.remove();
                this.loading = true
                this.result = (await axios.post(window.GISResourcesUrl + `/${this.analyze}`, {
                    coordinates: this.coordinates,
                    params: this.params
                })).data;
                for (const value of this.result) {
                    const file = window.GISResourcesUrl + `/static/tempoutput/${value}`;
                    if (value.split('.')[1] === 'tif') {
                        const response = await fetch(file);
                        // 解析tif
                        const arrayBuffer = await response.arrayBuffer();
                        const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
                        let image = await tiff.getImage();
                        let [west, south, east, north] = image.getBoundingBox();
                        // 读取像素
                        let [red = [], green = red, blue = red] = await image.readRasters();

                        let _this = this;

                        function mapValuesTo01Range(arr) {
                            let min = Number.MAX_VALUE;
                            let max = Number.MIN_VALUE;
                            for (let i = 0; i < arr.length; i++) {
                                if (isNaN(arr[i])) continue
                                min = min < arr[i] ? min : arr[i];
                                max = max > arr[i] ? max : arr[i];
                            }
                            if (_this.analyze === value.split('.')[0] || _this.analyze === 'fillSink') _this.setLegend(min, max);
                            return arr.map(value => {
                                let normalizedValue = (value - min) / (max - min);
                                return parseInt(normalizedValue * 255);
                            });
                        }

                        red = mapValuesTo01Range(red);
                        green = mapValuesTo01Range(green);
                        blue = mapValuesTo01Range(blue);
                        // 写入像素
                        const canvas = document.createElement('canvas');
                        let width = image.getWidth();
                        let height = image.getHeight();
                        canvas.width = width;
                        canvas.height = height;
                        let ctx = canvas.getContext('2d');
                        let imageData = ctx.createImageData(width, height);
                        for (let i = 0; i < imageData.data.length / 4; i += 1) {
                            imageData.data[i * 4] = red[i];
                            imageData.data[i * 4 + 1] = green[i] || 0;
                            imageData.data[i * 4 + 2] = blue[i] || 0;
                            imageData.data[i * 4 + 3] = red[i] === 0 ? 0 : 255;
                        }
                        ctx.putImageData(imageData, 0, 0);
                        // 添加图层
                        let tifImage = earth.viewer3D.imageryLayers.addImageryProvider(
                            new Cesium.SingleTileImageryProvider({
                                url: canvas.toDataURL(),
                                rectangle: Cesium.Rectangle.fromDegrees(west, south, east, north),
                            })
                        );
                        imageStores.imageStore.push(tifImage);
                    } else if (value.split('.')[1] === 'json') {
                        const dataSource = await Cesium.GeoJsonDataSource.load(file, {clampToGround: true});
                        earth.viewer3D.dataSources.add(dataSource);
                        imageStores.geoJsonStore.push(dataSource);
                        this.setLegend(Number.MIN_VALUE, Number.MAX_VALUE);
                    }
                }

                this.delPolygon();
                this.loading = false;

            } else window.alert('请绘制区域!');
        },
        setLegend(min, max) {
            let entity = this.analyzes.find(entity => entity.value === this.analyze)
            if (min === Number.MIN_VALUE && max === Number.MAX_VALUE) this.$store.commit('setLegendCurrent', {
                title: entity.label, list: entity.entity
            });
            else this.$store.commit('setLegendCurrent', {
                title: entity.label, list: {flag: true, min, max, unity: entity.unity}
            });
        },
        remove() {
            this.helpShow = false;
            this.reset();
        },
        reset() {
            this.area = 0;
            entities.forEach(entity => {
                entity.destroyWindow();
            });
            imageStores.imageStore.forEach(item => {
                earth.viewer3D.imageryLayers.remove(item);
            });
            imageStores.geoJsonStore.forEach(item => {
                earth.viewer3D.dataSources.remove(item);
            });

            imageStores.imageStore = [];
            imageStores.geoJsonStore = [];
            this.area = 0

            //关闭图例
            this.$store.commit('setLegendCurrent', {
                title: null, list: [], img: null
            });
        },
        download() {
            for (const value of this.result) {
                window.open(window.GISResourcesUrl + `/static/tempoutput/${value}`);
            }
        },
        readingPixel() {
            // let drawer = new VGEEarth.DrawShape(VGEEarth.getMainViewer());
            earth.drawShape.drawPoint({
                coordinateType: 'cartographicObj', endCallback: async (e) => {
                    const {data: pixelValue} = await axios.post(window.GISResourcesUrl + `/readingPixel`, {
                        lonlat: [e[0].longitude, e[0].latitude],
                        fileName: `${this.analyze}.tif`
                    });
                    let infoDisplay = document.createElement('div');
                    infoDisplay.style.width = '200px';
                    infoDisplay.style.height = '100px';
                    infoDisplay.innerHTML =
                        '<div style="text-align:left">属性信息<br/>'
                        + '<div>像素值:' + pixelValue + '</div>'
                        + '<div>高程值:' + e[0].height.toFixed(2) + '</div>'
                        + '</div>';
                    let entity = new VGEEarth.SuperiorEntity.SimpleLabel(earth.viewer3D, infoDisplay, {
                        longitude: e[0].longitude,
                        latitude: e[0].latitude,
                    });
                    entity.initWindow();
                    entities.push(entity);
                }
            });
        }
    },
    beforeUnmount() {
        this.remove();
        earth.drawShape.callStop();
    }
};
</script>

<style lang="less" scoped>
.ha-content {
  text-align: left;

  .mes {
    color: #009b94;
    margin-left: 7px;
    margin-bottom: 8px;
  }

  .mes_red {
    color: #be9125;
  }
}

button {
  margin-right: 5px;
  margin-left: 5px;
}

label {
  color: #009b94;
}
</style>
