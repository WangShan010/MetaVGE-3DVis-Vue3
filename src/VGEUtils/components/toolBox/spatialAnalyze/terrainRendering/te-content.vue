<template>
  <win-tabs :initCSS="{width: 340,height: 330,left:350,top:380}" @close="close" v-loading="loading"  element-loading-text="拼命加载中">
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
        <button circle class="btn btn-info btn-xs" @click="addList()">+</button>
        <button circle class="btn btn-info btn-xs" @click="subList(i)" v-if="i>0">-</button>
      </div>
      <div>
        <label style="margin-right: 10px">自动配色:</label>
        <el-switch v-model="openState" active-color="#13ce66"></el-switch>
      </div>
      <div>
        <div style="text-align: center" class="te-content">
            <div class="mes" :class="{mes_red:area>1500}">
                <span v-if="area">提示：您已框选 {{ area }} 平方千米。</span>
                <span v-if="area>1500 && tifId===''">面积数值过大，可能会导致计算时间较长！</span>
            </div>
          <button class="btn btn-info btn-sm" @click="excavate">绘制区域</button>
          <button class="btn btn-warning btn-sm" @click="removeImage">重置</button>
          <button class="btn btn-warning btn-sm" @click="downTif">导出</button>
          <button class="btn btn-warning btn-sm" @click="readingPixel">取值</button>
          <button class="btn btn-warning btn-sm" @click="help">帮助</button>
        </div>
        <br>
        <div id="helpInfo" v-show="helpShow">
          地貌渲染功能,自定义高度分级(米)和颜色后,绘制矩形区域生成地貌高度分类图
        </div>
      </div>
    </tab-pane>
  </win-tabs>
</template>

<script>
import {tabPane, winTabs} from "@/VGEUtils/components/winTabs/index.js";
/**引入地图导航组件--飞行行政区并添加矢量边界函数**/
import flyTaiwan from '../../areaNavigation/areaNavigationContent.vue';

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
        { min: 0, max: 1000, color: '#006400' },
        { min: 1000, max: 2000, color: '#00FF00' },
        { min: 2000, max: 3000, color: '#FFFF00' },
        { min: 3000, max: 4000, color: '#FFA500' },
        { min: 4000, max: 9000, color: '#FF0000' } ,
      ],
      openState: false,//自动配色开关
      colors: '',
      rgbColors: '',
      area:0,
      legendArr :  [],
      helpShow:false
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

      //添加矩形线
      addPolygon(arr){
          window.earth.viewer3D.entities.add({
              id: 'areaPolygon',
              name: 'areaPolygon',
              polyline: {
                  id: 'glowingLine',
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
          window.earth.viewer3D.entities.removeById('areaPolygon');
      },

      //绘制
    excavate() {
      this.removeImage();
      let that = this;

      //绘制矩形
      let drawer = new VGEEarth.DrawShape(VGEEarth.getMainViewer());
      drawer.drawRectangle({
        coordinateType: 'cartographicPoiArr',
        moveCallback: (e) => {
              const area = turf.area(turf.polygon([e]));
              this.area = Math.floor(area / 1000 / 1000);

              if (area > 5_0000_0000) {
                  console.log('面积过大，超过 1500 平方千米');
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
          this.coordinates = [postionArr[0] + "," + postionArr[3] + "," + postionArr[1] + "," + postionArr[10] + "[EPSG:4326]"]
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
      this.loading = true
      let that = this
      this.rgbColors = ''
      if (this.openState === false) {
        //颜色参数转换
        for (let i = 0; i < this.studentList.length; i++) {
          this.colors = this.colorRgb(this.studentList[i].color)
          // console.log(this.colors)
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
      let that = this;
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
      // console.log('R',red)
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
        this.delPolygon();
      // 遍历 studentList，将其转化为所需的格式并存储在 legendArr 中
      this.legendArr = this.studentList.map(item => {
        const text = `${item.min}-${item.max}米`;
        // 将颜色转换为 rgba 格式
        const color = that.hexToRgba(item.color);
        return { text, color };
      });

      if (that.openState === false) {
        //打开图例
        this.$store.commit('setLegendCurrent', {
          title: '坡度分析', list: that.legendArr, img: null
        });
      } else {
        return
      }
    },



    hexToRgba(hex) {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgba(${r}, ${g}, ${b}, 1)`;
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
          }
        })
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
        this.area = 0;
      imageStores.imageStore.forEach(item => {
        // global.item = item;
        earth.viewer3D.imageryLayers.remove(item);
      })
      imageStores.imageStore = [];
      window.earth.viewer3D.entities.removeAll();

      //关闭图例
      this.$store.commit('setLegendCurrent', {
        title: null, list: [], img: null
      });
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

button {
  margin-right: 5px;
}
.te-content {
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
</style>
