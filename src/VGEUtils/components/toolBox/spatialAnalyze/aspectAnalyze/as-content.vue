<template>
  <win-tabs :initCSS="{width: 360,height: 210,left:350,top:380}" @close="close" v-loading="loading" element-loading-text="拼命加载中">
    <tab-pane label="坡向分析">
      <div @mousedown.stop>
        <div class="as-content">
          <div class="mes" :class="{mes_red:area>1000}">
            <span v-if="area">提示：您已框选 {{ area }} 平方千米。</span>
            <span v-if="area>1000 && tifId===''">面积数值过大，可能会导致计算时间较长！</span>
          </div>
          <button class="btn btn-info btn-sm" @click="excavate">绘制区域</button>
          <button class="btn btn-warning btn-sm" @click="removeImage">重置</button>
          <button class="btn btn-warning btn-sm" :disabled="!coordinates.length" @click="downTif">导出</button>
          <button class="btn btn-warning btn-sm" :disabled="!coordinates.length" @click="readingPixel">取值</button>
          <button class="btn btn-warning btn-sm" @click="help">帮助</button>
        </div>
        <br>
        <div id="helpInfo" v-show="helpShow">
          计算坡向功能,绘制矩形区域后自动生成坡向分类图
        </div>
      </div>
      <br>
    </tab-pane>
  </win-tabs>
</template>

<script>
import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';
/**引入地图导航组件--飞行行政区并添加矢量边界函数**/
import flyTaiwan from '../../areaNavigation/areaNavigationContent.vue';

let tifImage;
let imageStores = {
  imageStore: []//添加的所有tif图层仓库
};

const pointArr = [];
export default {
  name: 'as-content',
  components: {winTabs, tabPane},
  data: function () {
    return {
      area: 0,
      loading: false,
      coordinates: [],
      z: 0,
      w: 0,
      s: 0,
      e: 0,
      n: 0,
      tifId: '',
      helpShow:false
    };
  },
  mounted() {
    flyTaiwan.methods.flyTaiwan(710000);//飞到台湾，并绘制矢量边界
  },
  methods: {
    close() {
      this.$store.commit('setVGEEarthComAction', {name: 'aspectAnalyze', on_off: 2});
      this.removeImage();
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
      //删除矩形线
      delPolygon(){
          window.earth.viewer3D.entities.removeById('areaPolygon_p');
      },

    //绘制
    excavate() {
      this.removeImage();
      let that = this;
      //绘制矩形
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
          //剪掉最后一个闭环坐标
          for (let i = 0; i < e.length - 1; i++) {
            postionArr.push(e[i][0]);
            postionArr.push(e[i][1]);
            postionArr.push(e[i][2]);
          }
          this.coordinates = [postionArr[0] + ',' + postionArr[3] + ',' + postionArr[1] + ',' + postionArr[10] + '[EPSG:4326]'];
          this.w = postionArr[0];
          this.s = postionArr[10];
          this.e = postionArr[3];
          this.n = postionArr[1];
          that.coordinatePost();

          let arr = [e[0][0],e[0][1],
              e[1][0],e[1][1],
              e[2][0],e[2][1],
              e[3][0],e[3][1],
              e[0][0],e[0][1]]
          that.addPolygon(arr)
        }
      });
    },
    //传参数(坐标值)给后端
    coordinatePost() {
      this.loading = true;
      let that = this;
      axios.post(window.GISResourcesUrl + `/aspectAnalyze`, this.coordinates).then(res => {
        console.log('添加数据返回结果为：', res);
        this.tifId = res.data;
        let geoTiff = res.data;//返回的的结果ID
        that.addResult(geoTiff);//添加计算结果
      });
    },
    //添加到球上
    async addResult(geoTiff) {
      //获取tif
      const response = await fetch(window.GISResourcesUrl + `/static/tempoutput/${geoTiff}`);
      //通过geotiff.js解析tif
      const arrayBuffer = await response.arrayBuffer();
      const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
      let image = await tiff.getImage();
      let [west, south, east, north] = image.getBoundingBox();
      // 读取像素信息
      const [red = [], green = [], blue = []] = await image.readRasters();
      // 将像素信息写入canvas
      const canvas = document.createElement('canvas');
      let width = image.getWidth();
      let height = image.getHeight();
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext('2d');
      let imageData = ctx.createImageData(width, height);

      // 定义颜色映射函数
      function mapValueToColor(value) {
        if (value >= 0 && value < 45) {
          return [255, 191, 191, 255];
        } else if (value >= 45 && value < 90) {
          return [255, 128, 128, 255];
        } else if (value >= 90 && value <= 135) {
          return [255, 77, 77, 255];
        } else if (value >= 135 && value <= 180) {
          return [255, 51, 51, 255];
        } else if (value >= 180 && value <= 225) {
          return [255, 26, 26, 255];
        } else if (value >= 225 && value <= 270) {
          return [204, 0, 0, 255];
        } else if (value >= 315 && value <= 360) {
          return [153, 0, 0, 255];
        } else {
          return [0, 0, 0, 0]; // 透明
        }
      }

      for (let i = 0; i < imageData.data.length / 4; i += 1) {
        const value = red[i]; // 假设使用红色通道的值来映射颜色
        const color = mapValueToColor(value);
        imageData.data[i * 4] = color[0]; // 红色通道
        imageData.data[i * 4 + 1] = color[1]; // 绿色通道
        imageData.data[i * 4 + 2] = color[2]; // 蓝色通道
        imageData.data[i * 4 + 3] = color[3]; // 不透明度
        // imageData.data[i * 4] = red[i];
        // imageData.data[i * 4 + 1] = green[i] || 0;
        // imageData.data[i * 4 + 2] = blue[i] || 0;
        // imageData.data[i * 4 + 3] = red[i] === 0 ? 0 : 255;
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
        this.delPolygon();

      //打开图例
      this.$store.commit('setLegendCurrent', {
        title: '坡向分析', list: [
          {text: '北', color: 'rgb(255, 191, 191, 255)'},
          {text: '东北', color: 'rgb(255, 128, 128, 255)'},
          {text: '东', color: 'rgb(255, 77, 77, 255)'},
          {text: '东南', color: 'rgb(255, 51, 51, 255)'},
          {text: '南', color: 'rgb(255, 26, 26, 255)'},
          {text: '西南', color: 'rgb(255, 0, 0, 255)'},
          {text: '西', color: 'rgb(204, 0, 0, 255)'},
          {text: '西北', color: 'rgb(153, 0, 0, 255)'},
        ], img: null
      });
    },



      //查询tif像素值
    readingPixel() {
      if (imageStores.imageStore.length === 0) {
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
              fileName: 'aspect.tif'
            };
            axios.post(window.GISResourcesUrl + `/readingPixel`, store).then(res => {
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
    //帮助信息
    help(){
      if (this.helpShow){
        this.helpShow = false
      }else {
        this.helpShow = true
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
      pointArr.push(point);
    },
    //导出tif
    downTif() {
      window.open(window.GISResourcesUrl + `/tempoutput/${this.tifId}`);
    },
    //清空图像
    removeImage() {
      this.area = 0;
      imageStores.imageStore.forEach(item => {
        // global.item = item;
        earth.viewer3D.imageryLayers.remove(item);
      });
      imageStores.imageStore = [];
      earth.viewer3D.entities.removeAll();

      this.coordinates = [];

      for (let i = 0; i < pointArr.length; i++) {
        pointArr.pop().destroyWindow();
      }

      //关闭图例
      this.$store.commit('setLegendCurrent', {
        title: null, list: [], img: null
      });
    },
  },
  unmounted() {
    this.removeImage();
    earth.drawShape.callStop();
  },

};
</script>

<style scoped>
.as-content {
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

.legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 水平居中 */
}

.legend-item {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.color-box {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.direction-label {
  font-size: 14px;
}
</style>
