<template>
    <win-tabs :initCSS="{width: 320,height:300,left:500,top:330}" @close="close" v-loading="loading"
              element-loading-text="后台服务计算中...">
        <tab-pane label="日照分析">
            <div @mousedown.stop style="height: 100%;padding-top: 5px">
                <div style="text-align: center;margin-bottom: 10px">
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
                <transition name="fade">
                    <div style="margin-bottom: 10px" v-show="analyze==='hillShade'">
                        <div style="text-align: center; margin-bottom: 5px">
                            <span style="width: 25px; margin-right: 10px">Z-因子</span>
                            <el-input v-model.number="params.zfactor" size="small" style="width: 150px"></el-input>
                        </div>
                        <div style="text-align: center; margin-bottom: 5px">
                            <span style="width: 25px; margin-right: 10px">水平角</span>
                            <el-input v-model.number="params.azimuth" size="small" style="width: 150px"></el-input>
                        </div>
                        <div style="text-align: center">
                            <span style="width: 25px; margin-right: 10px">垂直角</span>
                            <el-input v-model.number="params.vangle" size="small" style="width: 150px"></el-input>
                        </div>
                    </div>
                </transition>
                <transition name="fade">
                    <div style="margin-bottom: 10px" v-show="analyze==='skyView'">
                        <div style="text-align: center; margin-bottom: 5px">
                            <span style="width: 25px; margin-right: 10px">搜索半径</span>
                            <el-input v-model.number="params.radius" size="small" style="width: 150px"></el-input>
                        </div>
                        <div style="text-align: center; margin-bottom: 5px">
                            <span style="width: 25px; margin-right: 10px">辐条数目</span>
                            <el-input v-model.number="params.ndirs" size="small" style="width: 150px"></el-input>
                        </div>
                    </div>
                </transition>

                <div style="margin-bottom: 10px" class="sl-content">
                    <div style="text-align: center">
                        <div class="mes" :class="{mes_red:area>1000}">
                            <span v-if="area">提示：您已框选 {{ area }} 平方千米。</span>
                            <span v-if="area>1000 && coordinates===''">面积数值过大，可能会导致计算时间较长！</span>
                        </div>
                        <button class="btn btn-info btn-sm" :disabled="!analyze" @click="excavate">绘制区域</button>
                        <button class="btn btn-warning btn-sm" @click="remove">重置</button>
                        <button class="btn btn-warning btn-sm" @click="download">导出</button>
                        <button class="btn btn-warning btn-sm" @click="readingPixel">取值</button>
                    </div>
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
    name: 'sl-content',
    components: {winTabs, tabPane},
    data() {
        return {
            area: 0,
            params: {
                zfactor: 1,
                azimuth: 300,
                vangle: 40,
                radius: 10000,
                ndirs: 8
            },
            loading: false,
            coordinates: '',
            w: 0,
            s: 0,
            e: 0,
            n: 0,
            result: [],
            analyze: 'hillShade',
            analyzes: [{
                value: 'hillShade',
                label: '山体阴影'
            }, {
                value: 'skyView',
                label: '天空视图'
            }]
        };
    },
    mounted() {
        flyTaiwan.methods.flyTaiwan(710000);//飞到台湾，并绘制矢量边界
    },
    methods: {
        close() {
            this.$store.commit('setVGEEarthComAction', {name: 'sunlightAnalyze', on_off: 2});
            this.remove();
            this.delPolygon();
        },

        //添加矩形线
        addPolygon(arr) {
            window.earth.viewer3D.entities.add({
                id: 'areaPolygon_p',
                name: 'areaPolygon_p',
                polyline: {
                    id: 'glowingLine_p' +
                        '',
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
            window.earth.viewer3D.entities.removeById('areaPolygon_p');
        },
        excavate() {
            // this.loading = true;
            let that = this;


            //清除之前的绘制结果
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

                    if (area > 1_000_000) {
                        console.log('面积过大，超过 1000 平方千米');
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
                    this.addResult()

                    let arr = [e[0][0],e[0][1],
                        e[1][0],e[1][1],
                        e[2][0],e[2][1],
                        e[3][0],e[3][1],
                        e[0][0],e[0][1]]
                    that.addPolygon(arr)
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

                        function mapValuesTo01Range(arr) {
                            let min = 0;
                            let max = 0;
                            for (let i = 0; i < arr.length; i++) {
                                if(isNaN(arr[i])) continue
                                min = min < arr[i] ? min : arr[i];
                                max = max > arr[i] ? max : arr[i];
                            }
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
                    }
                }
                this.delPolygon();
                this.loading = false
            } else window.alert('请绘制区域!');
        },
        remove() {
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
.sl-content {
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
