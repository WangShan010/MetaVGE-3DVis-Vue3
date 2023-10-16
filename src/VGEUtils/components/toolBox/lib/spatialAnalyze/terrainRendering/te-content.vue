<template>
  <win-tabs :initCSS="{width: 320,height: 280,left:500,top:330}" @close="close" v-loading="loading"  element-loading-text="拼命加载中">
    <tab-pane label="地貌渲染">
      <div>
        <label>颜色分级:</label>
      </div>
      <div v-for="(item,i) in studentList">
        <el-input v-model="studentList[i].min" clearable placeholder="下界" style="width: 80px; margin-right: 5px"
                  size="small"></el-input>
        <el-input v-model="studentList[i].max" clearable placeholder="上界" style="width: 80px; margin-right: 5px"
                  size="small"></el-input>
        <el-input type="color" v-model="studentList[i].color" clearable placeholder="颜色"
                  style="height: 21px;width:45px; margin-right: 5px"></el-input>
        <button circle class="btn btn-info btn-sm" @click="addList()"></button>
        <button circle class="btn btn-info btn-sm" @click="subList(i)" v-if="i>0"></button>
      </div>
      <div>
        <label style="margin-right: 10px">自动配色:</label>
        <el-switch v-model="openState" active-color="#13ce66"></el-switch>
      </div>
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
  imageStore: [],//添加的所有tif图层仓库
};
export default {
  name: 'te-content',
  components: {winTabs, tabPane},
  data: function () {
    return {
        loading: false,
      coordinates: [],
      tifId: '',
      pixelValue: 0,
      height: 0,
      studentList: [
        {min: '', max: '', color: ''}
      ],
      openState: true,//自动配色开关
      colors: '',
      rgbColors: '',
    }
  },
  mounted() {
    flyTaiwan.methods.flyTaiwan(710000);//飞到台湾，并绘制矢量边界
  },
  methods: {
    close() {
      this.$store.commit('setVGEEarthComAction', {name: 'terrainRendering', on_off: 2});
      this.removeImage();
    },
    //十六进制转换为RGB
    colorRgb(color) {
      let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      let sColor = color.toLowerCase();
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          let sColorNew = "#";
          for (let i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
        }
        //处理六位的颜色值
        let sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return "rgba(" + sColorChange.join(",") + ")";
      } else {
        return sColor;
      }
    },
    //加行
    addList() {
      this.studentList.push({min: '', max: '', color: ''})
    },
    //减行
    subList(index) {
      this.studentList.splice(index, 1)
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
          that.coordinatePost();
        }
      });
    },
    //传参数(坐标值)给后端
    coordinatePost() {
      this.loading = true
      let that = this
      this.rgbColors = ''
      if (this.openState === false) {
        //颜色参数转换
        for (let i = 0; i < this.studentList.length; i++) {
          this.colors = this.colorRgb(this.studentList[i].color)
          this.rgbColors = this.rgbColors + this.studentList[i].min + ',' + this.studentList[i].max + ',' + this.colors + ';'
        }
        this.rgbColors = this.rgbColors.replaceAll('rgba(', '');
        this.rgbColors = this.rgbColors.replaceAll(')', '');
        //console.log(this.rgbColors);//rgb参数字符串
        let renderParm = {
          color: this.rgbColors,
          coordinates: this.coordinates
        }
        axios.post(`http://8.146.208.114:9001/terrainRender`, renderParm).then(res => {
          console.log("添加数据返回结果为：", res)
          this.tifId = res.data;
          let geoTiff = res.data;//返回的的结果ID
          that.addResult(geoTiff);//添加计算结果
        });
      } else {
        let renderParm = {
          color: 'null',
          coordinates: this.coordinates
        }
        axios.post(`http://8.146.208.114:9001/terrainRender`, renderParm).then(res => {
          console.log("添加数据返回结果为：")
          this.tifId = res.data;
          let geoTiff = res.data;//返回的的结果ID
          // console.log(geoTiff)
          // console.log(res)
          that.addResult(geoTiff);//添加计算结果
        });
      }
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
      // console.log(imageStores.imageStore);
      this.loading = false
    },
    //查询一点像素值
    readingPixel() {
      if (imageStores.imageStore.length === 0) {
        alert('请绘制后查询')
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
              fileName: 'relief.tif'
            }

            axios.post(`http://8.146.208.114:9001/readingPixel`, store).then(res => {
              console.log("添加数据返回结果为：", res)
              that.pixelValue = res.data;//返回的像素值
              // console.log(that.pixelValue)
              that.simpleLabel(lonlat, that.pixelValue, height)
              // that.addPoint(lon, lat, height,that.pixelValue)
            });
          },
          errCallback: function () {
          }
        })
      }
    },
    //添加的信息窗口
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
            latitude: lonlat[1]
          },
      )
      point.initWindow();
      imageStores.points.push(point)//
      console.log(imageStores.points)
    },
    addPoint(lon, lat, height, pixelValue) {
      let dom = document.createElement('div');
      dom.innerHTML =
          '<div style="text-align:left">属性信息<br/>'
          + '<div>像素值:' + pixelValue + '</div>'
          + '<div>高程值:' + height.toFixed(2) + '</div>'
          + '</div>';
      dom.style.width = '300px';
      dom.style.height = '100px';

      let pinBuilder = new Cesium.PinBuilder();
      window.questionPin = earth.viewer3D.entities.add({
        name: 'Question mark',
        position: new Cesium.Cartesian3.fromDegrees(lon, lat, height),
        billboard: {
          image: pinBuilder.fromUrl('static/VGEEarth/Config/plotTool/custom/云信.png', Cesium.Color.GREEN, 48),
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM
        }
      });
      questionPin.D = new VGEEarth.SuperiorEntity.SimpleLabelDecorator(questionPin, dom);
    },
    //导出tif
    downTif() {
      window.open(`http://8.146.208.114:9001/static/tempoutput/${this.tifId}`);
    },
    //清空
    removeImage() {
      imageStores.imageStore.forEach(item => {
        // global.item = item;
        earth.viewer3D.imageryLayers.remove(item);
      })
      imageStores.imageStore = [];
      window.earth.viewer3D.entities.removeAll();
    },
  },
  unmounted() {
    this.removeImage();
  }
};
</script>

<style scoped>
label {
  color: #009b94;
}

.el-switch >>> .el-switch__core {
  width: 30px !important;
  height: 15px;
}

.el-switch >>> .el-switch__core::after {
  width: 14px;
  height: 14px;
  margin-top: -1px;
  margin-bottom: 2px;
}

.btn button {
  margin-right: 5px;
}
</style>
