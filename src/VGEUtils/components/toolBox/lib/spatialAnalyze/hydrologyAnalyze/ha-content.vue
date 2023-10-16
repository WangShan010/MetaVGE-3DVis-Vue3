<template>
    <win-tabs :initCSS="{width: 320,height: 280,left:500,top:330}" @close="close">
        <tab-pane label="水文分析">
            <div style="margin-bottom: 10px">
                <div style="text-align: center" class="btn">
                    <button class="btn btn-info btn-sm" @click="excavate">绘制区域</button>
                    <button class="btn btn-warning btn-sm" @click="remove">重置</button>
                    <button class="btn btn-warning btn-sm" @click="download">导出</button>
                    <button class="btn btn-warning btn-sm" @click="readingPixel">取值</button>
                </div>
            </div>
            <div style="margin-bottom: 10px">
                <div style="text-align: center">
                    <el-select v-model="analyze" placeholder="请选择" style="width: 150px; margin-right: 10px">
                        <el-option
                                v-for="item in analyzes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <button class="btn btn-info btn-sm" @click="addResult">确认</button>
                </div>
            </div>
        </tab-pane>
    </win-tabs>
</template>

<script>
import {tabPane, winTabs} from "@/VGEUtils/components/winTabs/index.js";

let imageStores = {
    imageStore: [],
    geoJsonStore: []
}

let entities = [];

export default {
    name: "ha-content",
    components: {winTabs, tabPane},
    data() {
        return {
            params: {
                minslope: 0.5,
                threhold: 5,
                direction: 0
            },
            coordinates: "",
            w: 0,
            s: 0,
            e: 0,
            n: 0,
            result: [],
            analyze: '',
            analyzes: [{
                value: 'fillSink',
                label: '填洼'
            }, {
                value: 'drainageExtract',
                label: '河网提取'
            }, {
                value: 'strahlerOrder',
                label: '河网等级'
            }, {
                value: 'flowPath',
                label: '流路长度'
            }, {
                value: 'maxFlowPath',
                label: '最大流路长度'
            }, {
                value: 'verticalDistance',
                label: '河网垂直距离'
            }, {
                value: 'wetnessIndex',
                label: '湿度指数'
            }]
        };
    },
    methods: {
        close() {
            this.$store.commit('setVGEEarthComAction', {name: 'hydrologyAnalyze', on_off: 2});
        },
        excavate() {
            let drawer = new VGEEarth.DrawShape(VGEEarth.getMainViewer());
            drawer.drawRectangle({
                coordinateType: 'cartographicPoiArr', endCallback: (e) => {
                    let postionArr = [];
                    for (let i = 0; i < e.length - 1; i++) {
                        postionArr.push(e[i][0]);
                        postionArr.push(e[i][1]);
                        postionArr.push(e[i][2]);
                    }
                    this.coordinates = postionArr[0] + "," + postionArr[3] + "," + postionArr[1] + "," + postionArr[10] + "[EPSG:4326]"
                    this.w = postionArr[0]
                    this.s = postionArr[10]
                    this.e = postionArr[3]
                    this.n = postionArr[1]
                }
            });
        },
        async addResult() {
            if (this.coordinates) {
                this.remove();
                this.result = (await axios.post(`http://8.141.168.107:9001/${this.analyze}`, {
                    coordinates: this.coordinates,
                    params: this.params
                })).data;
                for (const value of this.result) {
                    const file = `http://8.141.168.107:9001/static/tempoutput/${value}`;
                    if (value.split('.')[1] === 'tif') {
                        const response = await fetch(file);
                        // 解析tif
                        const arrayBuffer = await response.arrayBuffer();
                        const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
                        let image = await tiff.getImage();
                        let [west, south, east, north] = image.getBoundingBox();
                        // 读取像素
                        const [red = [], green = red, blue = red] = await image.readRasters();
                        // 写入像素
                        const canvas = document.createElement("canvas");
                        let width = image.getWidth();
                        let height = image.getHeight();
                        canvas.width = width;
                        canvas.height = height;
                        let ctx = canvas.getContext("2d");
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
                        const dataSource = await Cesium.GeoJsonDataSource.load(file, {clampToGround: true})
                        earth.viewer3D.dataSources.add(dataSource);
                        imageStores.geoJsonStore.push(dataSource)
                    }
                }
            } else window.alert('请绘制区域!')
        },
        remove() {
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
        },
        download() {
            for (const value of this.result) {
                window.open(`http://8.141.168.107:9001/static/tempoutput/${value}`)
            }
        },
        readingPixel() {
            let drawer = new VGEEarth.DrawShape(VGEEarth.getMainViewer());
            drawer.drawPoint({
                coordinateType: 'cartographicObj', endCallback: async (e) => {
                    const {data: pixelValue} = await axios.post(`http://8.141.168.107:9001/readingPixel`, {
                        lonlat: [e[0].longitude, e[0].latitude],
                        fileName: `${this.analyze}.tif`
                    })
                    let infoDisplay = document.createElement('div')
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
                    })
                    entity.initWindow();
                    entities.push(entity)
                }
            })
        }
    },
    beforeUnmount() {
        this.remove();
    }
}
</script>

<style scoped>
.btn button {
    margin-right: 5px;
    margin-left: 5px;
}
label {
    color: #009b94;
}
</style>