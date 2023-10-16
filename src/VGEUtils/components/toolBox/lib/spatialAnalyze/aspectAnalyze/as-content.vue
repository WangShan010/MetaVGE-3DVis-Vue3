<template>
  <win-tabs :initCSS="{width: 320,height: 280,left:500,top:330}" @close="close" v-loading="loading"  element-loading-text="拼命加载中">
    <tab-pane label="坡向分析">
      <div>
        <div style="text-align: center" class="btn">
          <button class="btn btn-info btn-sm" @click="excavate">绘制区域</button>
          <button class="btn btn-warning btn-sm" @click="removeImage">重置</button>
          <button class="btn btn-warning btn-sm" @click="downTif">导出</button>
          <button class="btn btn-warning btn-sm" @click="readingPixel">取值</button>
        </div>
      </div>
    </tab-pane>
  </win-tabs>
</template>

<script>
import {tabPane, winTabs} from "@/VGEUtils/components/winTabs/index.js";
/**引入地图导航组件--飞行行政区并添加矢量边界函数**/
import flyTaiwan from "@/VGEUtils/components/toolBox/lib/areaNavigation/areaNavigationContent.vue";

let tifImage;
let imageStores = {
  imageStore: []//添加的所有tif图层仓库
}
export default {
  name: 'as-content',
  components: {winTabs, tabPane},
  data: function () {
    return {
      loading:false,
      coordinates: [],
      z: 0,
      w: 0,
      s: 0,
      e: 0,
      n: 0,
      tifId: ''
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
    //绘制
    excavate() {
      let that = this;
      //绘制矩形
      let drawer = new VGEEarth.DrawShape(VGEEarth.getMainViewer());
      drawer.drawRectangle({
        coordinateType: 'cartographicPoiArr', endCallback: (e) => {
          let postionArr = [];
          //剪掉最后一个闭环坐标
          for (let i = 0; i < e.length - 1; i++) {
            postionArr.push(e[i][0]);
            postionArr.push(e[i][1]);
            postionArr.push(e[i][2]);
          }
          this.coordinates = [postionArr[0] + "," + postionArr[3] + "," + postionArr[1] + "," + postionArr[10] + "[EPSG:4326]"]
          this.w = postionArr[0]
          this.s = postionArr[10]
          this.e = postionArr[3]
          this.n = postionArr[1]
          that.coordinatePost();
        }
      });
    },
    //传参数(坐标值)给后端
    coordinatePost() {
        this.loading = true
      let that = this
      axios.post(`http://8.146.208.114:9001/aspectAnalyze`, this.coordinates).then(res => {
        console.log("添加数据返回结果为：", res)
        this.tifId = res.data;
        let geoTiff = res.data;//返回的的结果ID
        that.addResult(geoTiff);//添加计算结果
      });
    },
    //添加到球上
    async addResult(geoTiff) {
      //获取tif
      const response = await fetch(`http://8.146.208.114:9001/static/tempoutput/${geoTiff}`);
      //通过geotiff.js解析tif
      const arrayBuffer = await response.arrayBuffer();
      const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
      let image = await tiff.getImage();
      let [west, south, east, north] = image.getBoundingBox();
      // 读取像素信息
      const [red = [], green = [], blue = []] = await image.readRasters();
      // 将像素信息写入canvas
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
        this.loading = false
    },
    //查询tif像素值
    readingPixel() {
      if (imageStores.imageStore.length == 0) {
        alert('请绘制后查询！')
      } else {
        let that = this;
        let drawShape = new VGEEarth.DrawShape(VGEEarth.getMainViewer());
        drawShape.drawPoint({
          coordinateType: 'cartographicObj',
          endCallback: function (ps) {
            let lon = ps[0].longitude
            let lat = ps[0].latitude
            let height = ps[0].height
            let lonlat = [lon, lat];
            let store = {
              lonlat: lonlat,
              fileName: 'aspect.tif'
            }
            axios.post(`http://8.146.208.114:9001/readingPixel`, store).then(res => {
              console.log("添加数据返回结果为：", res)
              that.pixelValue = res.data;//返回的的结果ID
              that.simpleLabel(lonlat, that.pixelValue, height)
            });
          },
          errCallback: function () {
          }
        })
      }
    },
    //添加信息窗口
    simpleLabel(lonlat, pixelValue, height) {
      let dom = document.createElement('div')
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
      )
      point.initWindow();
    },
    //导出tif
    downTif() {
      window.open(`http://8.146.208.114:9001/tempoutput/${this.tifId}`);
    },
    //清空图像
    removeImage() {
      imageStores.imageStore.forEach(item => {
        // global.item = item;
        earth.viewer3D.imageryLayers.remove(item);
      })
      imageStores.imageStore = [];
      earth.viewer3D.entities.removeAll();
    },
  },
  unmounted() {
    this.removeImage();
  }
};
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
