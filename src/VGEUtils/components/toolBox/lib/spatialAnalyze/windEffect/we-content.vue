<template>
  <win-tabs :initCSS="{width: 320,height: 280,left:500,top:330}" @close="close" v-loading="loading" element-loading-text="拼命加载中" >
    <tab-pane label="风力效应">
      <div class="we-content">
        <div>
            <div class="mes" :class="{mes_red:area>1000}">
                <span v-if="area">提示：您已框选 {{ area }} 平方千米。</span>
                <span v-if="area>1000 && geoTiff===''">面积数值过大，可能会导致计算时间较长！</span>
            </div>
          <div style="text-align: center;margin-bottom: 10px">
            <el-select v-model="analyze" placeholder="请选择" style="width: 150px; margin-right: 10px"
                       @change="change">
              <el-option
                  v-for="item in analyzes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
          <button class="btn btn-info btn-sm" @click="excavate">绘制区域</button>
          <button class="btn btn-warning btn-sm" @click="removeImage">重置</button>
          <!--          <button class="btn btn-warning btn-sm" @click="downTif">导出</button>-->
          <button class="btn btn-warning btn-sm" @click="downTif()">导出</button>
          <button class="btn btn-warning btn-sm" @click="readingPixel()">取值</button>
          <button class="btn btn-warning btn-sm" @click="help">帮助</button>
          <br>
          <div id="helpInfo" v-show="helpShow">
            计算风力影响功能,绘制矩形区域后生成风力效应和影响气流高度图
          </div>
        </div>
      </div>
    </tab-pane>
  </win-tabs>
</template>

<script>
import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';

let tifImage;
let imageStores = {
  imageStore: []//添加的所有tif图层仓库
};
export default {
  name: 'we-content.vue',
  components: {winTabs, tabPane},
  data: function () {
    return {
        loading:false,
      area:0,
        geoTiff:'',
      postData: {
        'coordinates': this.coordinates,
        'params': {
          'radius': '',
          'ndirs': ''
        },
      },
      downLoad: ['windEffect.tif', 'windEffectAFH.tif'],
      analyze: '',
      analyzes: [{
        value:  'windEffect.tif',
        label: '风力效应'
      }, {
        value: 'windEffectAFH.tif',
        label: '影响气流高度'
      }],
      helpShow:false,
      comSign:false
    };
  },
  methods: {
    help(){
      if (this.helpShow){
        this.helpShow = false
      }else {
        this.helpShow = true
      }
    },
    change(){
      this.removeImage()
      if(this.comSign){
        this.addResult()
      }
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
    //绘制
    excavate() {
      this.removeImage();
      if(this.analyze == ""){
        this.$message({
          message: '请选择分析类型',
          type: 'warning'
        });
      }
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
          this.postData['coordinates'] = this.coordinates;
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
        this.loading=true;
      let that = this;
      axios.post(window.GISResourcesUrl + `/windEffect`, this.postData).then(res => {
        console.log('添加数据返回结果为：', res);
        this.downLoad = res.data;
        console.log(this.downLoad[0]);
        this.geoTiff = res.data;//返回的的结果ID
        that.addResult(0);//添加计算结果
      });
    },
    downTif() {
      window.open(window.GISResourcesUrl + `/static/tempoutput/` + this.analyze);
    },
    //查询tif像素值
    readingPixel() {
      if (imageStores.imageStore.length == 0) {
        alert('请绘制后查询！');
      } else {
        let that = this;
        // let drawShape = new VGEEarth.DrawShape(VGEEarth.getMainViewer());
          earth.drawShape.drawPoint({
          coordinateType: 'cartographicObj',
          endCallback: function (ps) {
            let lon = ps[0].longitude;
            let lat = ps[0].latitude;
            let height = ps[0].height;
            let lonlat = [lon, lat];
            let store = {
              lonlat: lonlat,
              fileName: 'clipDEM_windEffect.tif'
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
    close() {
      this.$store.commit('setVGEEarthComAction', {name: 'windEffect', on_off: 2});
    },
    //清空图像
    removeImage() {
      this.area = 0;
      imageStores.imageStore.forEach(item => {
        window.earth.viewer3D.imageryLayers.remove(item);
      });
      imageStores.imageStore = [];
    },
    mapValuesTo01Range(arr) {
      let min = 0;
      let max = 0;
      for (let i = 0; i < arr.length; i++) {
        min = min < arr[i] ? min : arr[i];
        max = max > arr[i] ? max : arr[i];
      }
      let mappedArray = arr.map(value => {
        let normalizedValue = (value - min) / (max - min);
        return parseInt(normalizedValue * 255);
      });
      return mappedArray;
    },
    //添加到球上
    async addResult() {
      //获取tif
      const response = await fetch(window.GISResourcesUrl + `/static/tempoutput/` + this.analyze);
      // const response = await fetch(`http://localhost:3000/Resources/tempoutput/viewshed.tif`);
      // const response = await fetch(`./static/slope.tif`);
      //通过geotiff.js解析tif
      const arrayBuffer = await response.arrayBuffer();
      const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
      let image = await tiff.getImage();
      // console.log('image', image);
      let [west, south, east, north] = [, , ,];
      [west, south, east, north] = image.getBoundingBox();
      //获取UTM坐标
      let a = image.geoKeys.GTCitationGeoKey;
      let [red = [], green = red, blue = red] = await image.readRasters();
      // 将像素信息写入canvas
      const canvas = document.createElement('canvas');
      let width = image.getWidth();
      let height = image.getHeight();
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext('2d');
      let imageData = ctx.createImageData(width, height);
      // console.log(red, green, blue);
      red = this.mapValuesTo01Range(red);
      green = this.mapValuesTo01Range(green);
      blue = this.mapValuesTo01Range(blue);
      console.log(red, green, blue);
      if (this.analyze == "windEffect.tif"){
        this.$store.commit('setLegendCurrent', {
          title: '风力效应', list: [
            {text: '0°-30°', color: 'rgb(255, 255, 255 , 255)'},
            {text: '30°-60', color: 'rgb(188 , 188, 188, 255)'},
            {text: '60°-90', color: 'rgb(81, 80, 80 , 255)'},
          ], img: null
        });
      }
      else {
        this.$store.commit('setLegendCurrent', {
          title: '影响气流高度', list: [
            {text: '0°-30°', color: 'rgb(255, 255, 255 , 255)'},
            {text: '30°-60', color: 'rgb(188 , 188, 188, 255)'},
            {text: '60°-90', color: 'rgb(81, 80, 80 , 255)'},
          ], img: null
        });
      }
      for (let i = 0; i < imageData.data.length / 4; i += 1) {
        imageData.data[i * 4] = red[i];
        imageData.data[i * 4 + 1] = green[i] || 0;
        imageData.data[i * 4 + 2] = blue[i] || 0;
        imageData.data[i * 4 + 3] = red[i] === 0 ? 0 : 255;
      }
      ctx.putImageData(imageData, 0, 0);
      //图像边界
      console.log('test', this.e);
      let rectangle = Cesium.Rectangle.fromDegrees(this.w, this.s, this.e, this.n);
      // console.log(rectangle);
      let du = canvas.toDataURL();
      // console.log(du);
      //添加图层
      tifImage = earth.viewer3D.imageryLayers.addImageryProvider(
          new Cesium.SingleTileImageryProvider({
            url: du,
            rectangle: rectangle
          })
      );
      //把图层存储入数组
      imageStores.imageStore.push(tifImage);
      console.log(imageStores.imageStore);
      this.loading=false;
      this.comSign = true
    },
  },
  unmounted() {
    this.removeImage();
    earth.drawShape.callStop();
  }
};
</script>

<style scoped>
.we-content {
  text-align: center;
  .mes {
        color: #009b94;
        margin-left: 7px;
        margin-bottom: 8px;
  }

  .mes_red {
        color: #be9125;
  }
  .btn {
    margin: 4px 5px;
  }
}
</style>
