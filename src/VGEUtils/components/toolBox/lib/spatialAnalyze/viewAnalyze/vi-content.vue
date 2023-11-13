<template>
    <win-tabs :initCSS="{width: 320,height: 280,left:500,top:330}" @close="close" v-loading="loading" element-loading-text="后台服务计算中...">
        <tabPane label="视域分析">
            <div>
                <div style="margin-bottom: 5px">
                    <el-row>
                        <el-col :span="8"><label class="label-container">观察者高度</label></el-col>
                        <el-col :span="13">
                            <el-input v-model="WatcherHigh" size="small" placeholder="请输入观察者高度"></el-input>
                        </el-col>
                    </el-row>
                </div>

                <div style="margin-bottom: 5px">
                    <el-row>
                        <el-col :span="8"><label class="label-container">目标高度</label></el-col>
                        <el-col :span="13">
                            <el-input v-model="WatchHigh" size="small" placeholder="请输入目标高度"></el-input>
                        </el-col>
                    </el-row>
                </div>

                <div style="margin-bottom: 5px">
                    <el-row>
                        <el-col :span="8"><label class="label-container">可视最大距离</label></el-col>
                        <el-col :span="13">
                            <el-input v-model="VisualRange" size="small" placeholder="请输入可视最大距离"></el-input>
                        </el-col>
                    </el-row>
                </div>

                <div class="vi-ctr">
                    <div class="vi-content">
                        <div class="mes" :class="{mes_red:area>3000}">
                            <span v-if="area">提示：您已框选 {{ area }} 平方千米。</span>
                            <span v-if="area>3000 && tifId===''">面积数值过大，可能会导致计算时间较长！</span>
                        </div>
                        <button class="btn btn-info btn-sm" @click="excavate">绘制区域</button>
                        <button class="btn btn-info btn-sm" slot="reference" @click="pickPoint">选取观察点</button>
                    </div>

                    <div>
                        <button class="btn btn-warning btn-sm" @click="removeImage">重置</button>
                        <button class="btn btn-warning btn-sm" @click="downTif">导出</button>
                        <button class="btn btn-warning btn-sm" @click="readingPixel()">取值</button>
                        <button class="btn btn-warning btn-sm" @click="help">帮助</button>
                    </div>
                  <br>
                  <div id="helpInfo" v-show="helpShow">
                    计算可视范围,绘制矩形区域后根据所处位置计算可视域
                  </div>
                </div>
            </div>
        </tabPane>
    </win-tabs>
</template>

<script>
import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';

let tifImage;
let imageStores = {
    imageStore: []//添加的所有tif图层仓库
};

export default {
    name: 'vi-content',
    components: {winTabs, tabPane},
    data: function () {
        return {
            area:0,
            loading: false,
            tempPolygon: '',
            WatcherHigh: '10',  //观察者高度
            WatchHigh: '10',    //观察高度
            VisualRange: '100',  //可视距离
            coordinates: [],
            z: 0,
            w: 0,
            s: 0,
            e: 0,
            n: 0,
            tifId: '',
            cartesian3: {
                x: 0,
                y: 0,
                z: 0,
            },
            degrees: {
                longitude: 0,
                latitude: 0,
                height: 0,
            },
            point: [],
            visible: false
        };
    },
    methods: {
        change() {

            // this.visible = !this.visible
        },
        //查询tif像素值
        readingPixel() {
            if (0) {
                alert('请绘制后查询！');
            } else {
                let that = this;
                let drawShape = new VGEEarth.DrawShape(VGEEarth.getMainViewer());
                drawShape.drawPoint({
                    coordinateType: 'cartographicObj',
                    endCallback: function (ps) {
                        let lon = ps[0].longitude;
                        let lat = ps[0].latitude;
                        let height = ps[0].height;
                        let lonlat = [lon, lat];
                        let store = {
                            lonlat: lonlat,
                            fileName: 'viewshed.tif'
                        };
                        axios.post(`http://8.146.208.114:9001/readingPixel`, store).then(res => {
                            console.log('添加数据返回结果为：', res);
                            that.pixelValue = res.data;//返回的的结果ID
                            that.simpleLabel(lonlat, that.pixelValue, height);
                        });
                    },
                    errCallback: function () {
                    }
                });
            }
        },
        //添加信息窗口
        simpleLabel(lonlat, pixelValue, height) {
            let dom = document.createElement('div');
            dom.innerHTML =
                '<div style="text-align:left">属性信息<br/>'
                + '<div>像素值:' + pixelValue + '</div>'
                + '<div>高程值:' + height.toFixed(2) + '</div>'
                + '</div>';
            dom.style.width = '200px';
            dom.style.height = '100px';
            let point = new VGEEarth.SuperiorEntity.SimpleLabel(
                earth.viewer3D, dom,
                {
                    longitude: lonlat[0],
                    latitude: lonlat[1],
                },
            );
            point.initWindow();
        },
        //添加矩形线
        addPolygon(arr){
            window.earth.viewer3D.entities.add({
                id: 'areaPolygon_p',
                name: 'areaPolygon_p',
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
        excavate() {
            imageStores.imageStore.forEach(item => {
                window.earth.viewer3D.imageryLayers.remove(item);
            });
            imageStores.imageStore = [];
            let that = this;



            //绘制矩形
            let drawer = new VGEEarth.DrawShape(VGEEarth.getMainViewer());
            drawer.drawRectangle({
                coordinateType: 'cartographicPoiArr',
                moveCallback: (e) => {
                    const area = turf.area(turf.polygon([e]));
                    this.area = Math.floor(area / 1000 / 1000);

                    if (area > 3_000_000) {
                        console.log('面积过大，超过 3000 平方千米');
                    }
                },
                endCallback: (e) => {
                    let postionArr = [];
                    //剪掉最后一个闭环坐标
                    let temp = [];   //临时绘制矩形
                    for (let i = 0; i < e.length - 1; i++) {
                        postionArr.push(e[i][0]);
                        postionArr.push(e[i][1]);
                        postionArr.push(e[i][2]);
                        temp.push(e[i][0]);
                        temp.push(e[i][1]);
                    }

                    that.coordinates = [postionArr[0] + ',' + postionArr[3] + ',' + postionArr[1] + ',' + postionArr[10] + '[EPSG:4326]'];
                    that.w = postionArr[0];
                    that.s = postionArr[10];
                    that.e = postionArr[3];
                    that.n = postionArr[1];
                    let arr = [e[0][0],e[0][1],
                        e[1][0],e[1][1],
                        e[2][0],e[2][1],
                        e[3][0],e[3][1],
                        e[0][0],e[0][1]]
                    that.addPolygon(arr)
                    that.tempPolygon = window.earth.viewer3D.entities.add({
                        name: 'Blue translucent, rotated, and extruded ellipse with outline',
                        show: true,
                        selected: false,
                        polygon: {
                            hierarchy: Cesium.Cartesian3.fromDegreesArray(temp),
                            material: Cesium.Color.RED.withAlpha(0.5)

                        }
                    });
                }
            });
        },

        coordinatePost() {
            this.loading = true;
            let that = this;
            //http://122.227.134.126:98/QGIS/
            //http://127.0.0.1:5003/aspectAnalyze
            console.log([this.coordinates, that.point[0], that.point[1],
                that.WatcherHigh, that.WatchHigh, that.VisualRange]);
            //服务器地址
            axios.post(`http://8.146.208.114:9001/viewAnalyze`, [this.coordinates, that.point[0][0], that.point[0][1],
                that.WatcherHigh, that.WatchHigh, that.VisualRange]).then(res => {
                this.tifId = res.data;
                let geoTiff = res.data;//返回的的结果ID
                that.addResult(geoTiff);//添加计算结果
            });

        },
        //添加到球上
        async addResult(geoTiff) {
            //获取tif
            //http://122.227.134.126:98/Resources/gaozhiguo-data/tempoutput/
            //http://127.0.0.1:5003/static/tempoutput/${geoTiff}
            const response = await fetch(`http://8.146.208.114:9001/static/tempoutput/${geoTiff}`);
            // const response = await fetch(`http://localhost:3000/Resources/tempoutput/${geoTiff}`);
            console.log(response);
            //通过geotiff.js解析tif
            const arrayBuffer = await response.arrayBuffer();
            const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
            let image = await tiff.getImage();
            let [west, south, east, north] = [, , ,];
            [west, south, east, north] = image.getBoundingBox();
            // 读取像素信息
            let [red = [], green = [], blue = []] = await image.readRasters();
            // 将像素信息写入canvas
            const canvas = document.createElement('canvas');
            let width = image.getWidth();
            let height = image.getHeight();
            canvas.width = width;
            canvas.height = height;
            let ctx = canvas.getContext('2d');
            let imageData = ctx.createImageData(width, height);
            this.$store.commit('setLegendCurrent', {
              title: '视域分析', list: [
                {text: '不可见', color: 'rgb(34,34,34,20)'},
                {text: '可见', color: 'rgb(255, 0, 0, 255)'},
              ], img: null
            });
            console.log(red, green, blue);
            red = this.mapValuesTo01Range(red);
            // green = this.mapValuesTo01Range(green);
            // blue = this.mapValuesTo01Range(blue);
            console.log(red, green, blue);
            for (let i = 0; i < imageData.data.length / 4; i += 1) {
                imageData.data[i * 4] = red[i];
                imageData.data[i * 4 + 1] = green[i] || 0;
                imageData.data[i * 4 + 2] = blue[i] || 0;
                imageData.data[i * 4 + 3] = red[i] === 0 ? 0 : 255;
            }
            ctx.putImageData(imageData, 0, 0);
            //图像边界
            let rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);
            let du = canvas.toDataURL();
            //添加图层
            tifImage = earth.viewer3D.imageryLayers.addImageryProvider(
                new Cesium.SingleTileImageryProvider({
                    url: du,
                    rectangle,
                })
            );
            //把图层存储入数组
            imageStores.imageStore.push(tifImage);
            this.loading = false;
        },
        mapValuesTo01Range(arr) {
          let mappedArray = arr.map(value => {
            if(value == 0){
              return 25
            }else {
              return 255
            }
            // return parseInt(normalizedValue * 255);
          });
          return mappedArray;
        },
        pickPoint() {
            if (0) {
                console.log('1');
                this.$message.warning('请输入参数');
                // this.visible = true
                return 0;
            }
            if (0) {
                this.$message.warning('请绘制观测区域');
                return 0;
            }
            let that = this;
            this.remove();
            this.addImage();
            let drawShape = new VGEEarth.DrawShape(VGEEarth.getMainViewer());
            drawShape.drawPoint({
                coordinateType: 'cartographicPoiArr',
                endCallback: function (ps) {
                    //经纬度
                    console.log(ps);
                    that.point[0] = ps[0];
                    that.point[1] = ps[1];
                    that.coordinatePost();
                    // console.log(ps[0])
                    that.addMarkEntity(ps[0][0], ps[0][1], ps[0][2]);
                    window.earth.viewer3D.entities.remove(that.tempPolygon);
                    that.tempPolygon = [];
                    that.remove();
                },
                errCallback: function () {
                    that.remove();
                }
            });

        },
        //
        // /**
        //  * 添加跟随鼠标的图标
        //  */
        // addImage() {
        //     let mv = document.createElement('img');
        //     this.mv = mv;
        //     mv.onload = function () {
        //         // 图片加载完成后获取宽度和高度
        //         mv.width = 10;
        //         mv.height = 10;
        //         const width = mv.width;
        //         const height = mv.height;
        //
        //         // 计算位置
        //         mv.style.position = 'absolute';
        //         mv.style.left = '-100px';
        //         mv.style.top = '-100px';
        //         document.body.append(mv);
        //         document.onmousemove = function (e) {
        //             e = e || window.event;
        //             mv.style.left = e.clientX - width / 2 + 'px';
        //             mv.style.top = e.clientY - height + 'px';
        //         };
        //     };
        //     mv.src = 'src/VGEUtils/components/toolBox/lib/spatialAnalyze/viewAnalyze/img/coordinates.png';
        // },
        // /**
        //  * 移除跟随鼠标的点图标
        //  */
        // remove() {
        //     document.onmousemove = null;
        //     if (this.mv) {
        //         this.mv.remove();
        //     }
        //
        // },

        /**
         * 添加跟随鼠标的图标
         */
        addImage() {
            let mv = document.createElement('img');
            this.mv = mv;
            mv.src = new URL('./img/coordinates.png', import.meta.url).href;
            mv.style.position = 'absolute';
            mv.style.left = '-100px';
            mv.style.top = '-100px';
            document.body.append(mv);

            // document.onmousemove = function (e) {
            //     e = e || window.event;
            //     mv.style.left = e.clientX - mv.width / 2 + 'px';
            //     mv.style.top = e.clientY - mv.height + 'px';
            // };
        },
        /**
         * 移除跟随鼠标的点图标
         */
        remove() {
            // window.earth.viewer3D.entities.removeAll()
            document.onmousemove = null;
            if (this.mv) {
                this.mv.remove();
            }
        },

        addPoint() {
            let that = this;
            this.remove();
            this.addImage();
            let drawShape = new VGEEarth.DrawShape(VGEEarth.getMainViewer());
            drawShape.drawPoint({
                coordinateType: 'cartographicObj',
                endCallback: function (ps) {
                    that.addMarkEntity(ps[0].longitude, ps[0].latitude, ps[0].height);
                    that.remove();
                },
                errCallback: function () {
                    that.remove();
                }
            });
        },
        addMarkEntity(lon, lat, height) {
            window.earth.viewer3D.entities.removeAll();//第二次定位的时候移除上次的点
            let point = window.earth.viewer3D.entities.add({//创建定位点
                id: 'coordinatePonint',
                name: 'coordinates',
                position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
                billboard: {
                    image: new URL('./img/coordinates.png', import.meta.url).href,//定位的图片样式
                    width: 15,
                    height: 21,
                    scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                }
            });
        },

        downTif() {
            window.open(`http://localhost:3000/Resources/tempoutput/${this.tifId}`);
        },
        //清空图像
        removeImage() {
            this.area = 0;
            imageStores.imageStore.forEach(item => {
                window.earth.viewer3D.imageryLayers.remove(item);
            });
            imageStores.imageStore = [];
        },
        close() {
            this.$store.commit('setVGEEarthComAction', {name: 'viewAnalyze', on_off: 2});
            imageStores.imageStore.forEach(item => {
                window.earth.viewer3D.imageryLayers.remove(item);
            });
            imageStores.imageStore = [];
            window.earth.viewer3D.entities.removeAll();
        },
    }
};
</script>

<style lang="less" scoped>
.vi-content {
    text-align: center;

    .mes {
        color: #009b94;
        margin-left: 7px;
        margin-bottom: 8px;
    }

    .mes_red {
        color: #be9125;
    }
}
.vi-ctr {
  text-align: center;

  .btn {
    margin: 3px 5px;
  }
}
</style>
