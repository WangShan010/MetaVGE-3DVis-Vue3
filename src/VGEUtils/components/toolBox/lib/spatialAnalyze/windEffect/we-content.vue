<template>
  <win-tabs :initCSS="{width: 320,height: 280,left:500,top:330}" @close="close">
    <tab-pane label="风力效应">
      <div style="margin-bottom: 10px">
        <div style="text-align: center;padding-top: 10px">
          <button class="btn btn-info btn-sm" @click="excavate">绘制区域</button>
<!--          <button class="btn btn-info btn-sm" slot="reference" @click="pickPoint">选取观察点</button>-->

          <button class="btn btn-warning btn-sm" @click="removeImage">重置</button>
<!--          <button class="btn btn-warning btn-sm" @click="downTif">导出</button>-->
          <button class="btn btn-warning btn-sm" @click="readingPixel()">取值</button>
        </div>
        <div style="text-align: center">
          <button class="btn btn-info btn-sm" @click="addResult(0)">风力效应</button>
          <button class="btn btn-warning btn-sm" @click="downTif(0)">导出</button>
          <!--          <button class="btn btn-warning btn-sm" @click="downTif(1)">移除</button>-->
        </div>
        <div style="text-align: center">
          <button class="btn btn-info btn-sm" @click="addResult(1)">影响气流高度</button>
          <button class="btn btn-warning btn-sm" @click="downTif(1)">导出</button>
          <!--          <button class="btn btn-warning btn-sm" @click="downTif(1)">移除</button>-->
        </div>
      </div>
    </tab-pane>
  </win-tabs>
</template>

<script>
import {tabPane, winTabs} from "@/VGEUtils/components/winTabs/index.js";
let tifImage;
let imageStores = {
  imageStore: []//添加的所有tif图层仓库
}
export default {
  name: "we-content.vue",
  components: {winTabs, tabPane},
  data:function (){
    return{
      postData:{
        'coordinates':this.coordinates,
        'params':{
          'radius':'',
          'ndirs' : ''
        },
      },
      downLoad : ['windEffect.tif', 'windEffectAFH.tif']
    }
  },
  methods:{
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
          this.postData['coordinates'] = this.coordinates
          that.coordinatePost();
        }
      });
    },
    //传参数(坐标值)给后端
    coordinatePost() {
      let that = this
      axios.post(`http://8.146.208.114:9001/windEffect`, this.postData).then(res => {
        console.log("添加数据返回结果为：", res)
        this.downLoad = res.data;
        console.log(this.downLoad[0])
        let geoTiff = res.data;//返回的的结果ID
        that.addResult(0);//添加计算结果
      });
    },
    downTif(num) {
      window.open(`http://8.146.208.114:9001/static/tempoutput/${this.downLoad[num]}`);
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
              fileName: 'clipDEM_windEffect.tif'
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
    close() {
      this.$store.commit('setVGEEarthComAction', {name: 'windEffect', on_off: 2});
    },
    //清空图像
    removeImage() {
      imageStores.imageStore.forEach(item => {
        window.earth.viewer3D.imageryLayers.remove(item);
      })
      imageStores.imageStore = [];
    },
    mapValuesTo01Range(arr) {
      let min = 0
      let max = 0
      for(let i = 0 ;i < arr.length;i++){
        min = min < arr[i] ? min : arr[i]
        max = max > arr[i] ? max : arr[i]
      }
      let mappedArray = arr.map(value => {
        let normalizedValue = (value - min) / (max - min);
        return parseInt(normalizedValue * 255);
      });
      return mappedArray;
    },
    //添加到球上
    async addResult(num) {
      //获取tif
      const response = await fetch(`http://8.146.208.114:9001/static/tempoutput/${this.downLoad[num]}`);
      // const response = await fetch(`http://localhost:3000/Resources/tempoutput/viewshed.tif`);
      // const response = await fetch(`./static/slope.tif`);
      //通过geotiff.js解析tif
      const arrayBuffer = await response.arrayBuffer();
      const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
      let image = await tiff.getImage();
      console.log("image",image)
      let [west, south, east, north] = [,,,];
      [west, south, east, north] = image.getBoundingBox();
      //获取UTM坐标
      let a = image.geoKeys.GTCitationGeoKey;
      // console.log("epsg:",a);
      // await axios.post(`http://127.0.0.1:5007/UTMtoWGS84`, [a,west,south]).then(res => {
      //   console.log("坐标转换结果为：", res.data[1])
      //   this.w = res.data[0];
      //   this.s = res.data[1];
      // })
      // await axios.post(`http://127.0.0.1:5007/UTMtoWGS84`, [a,east,north]).then(res => {
      //   console.log("坐标转换结果为：", res.data[1])
      //   this.e = res.data[0];
      //   this.n = res.data[1];
      // });
      // console.log(image.getBoundingBox())
      // 读取像素信息
      let [red = [], green = red, blue = red] = await image.readRasters();
      // 将像素信息写入canvas
      const canvas = document.createElement("canvas");
      let width = image.getWidth();
      let height = image.getHeight();
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext("2d");
      let imageData = ctx.createImageData(width, height);
      console.log(red,green,blue)
      red = this.mapValuesTo01Range(red)
      green = this.mapValuesTo01Range(green)
      blue = this.mapValuesTo01Range(blue)
      console.log(red,green,blue)
      // for (let i = 0; i < imageData.data.length / 4; i += 1) {
      //   imageData.data[i * 4] = parseInt(red[i] * 255) ;
      //   imageData.data[i * 4 + 1] = parseInt(green[i] *255)|| 0;
      //   imageData.data[i * 4 + 2] = parseInt(blue[i]*255) || 0;
      //   imageData.data[i * 4 + 3] = red[i] === 0 ? 0 : 255;
      // }
      for (let i = 0; i < imageData.data.length / 4; i += 1) {
        imageData.data[i * 4] = red[i];
        imageData.data[i * 4 + 1] = green[i]|| 0;
        imageData.data[i * 4 + 2] = blue[i] || 0;
        imageData.data[i * 4 + 3] = red[i] === 0 ? 0 : 255;
      }
      ctx.putImageData(imageData, 0, 0);
      //图像边界
      console.log('test',this.e)
      let rectangle = Cesium.Rectangle.fromDegrees(this.w, this.s, this.e, this.n);
      console.log(rectangle)
      let du = canvas.toDataURL();
      console.log(du)
      //添加图层
      tifImage = earth.viewer3D.imageryLayers.addImageryProvider(
          new Cesium.SingleTileImageryProvider({
            url: du,
            rectangle : rectangle
          })
      );
      //把图层存储入数组
      imageStores.imageStore.push(tifImage);
      console.log(imageStores.imageStore);
    },
  }
}
</script>

<style scoped>

</style>
