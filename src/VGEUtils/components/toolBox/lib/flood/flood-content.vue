<template>
  <win-tabs :initCSS="{width: 300,height: 250,left:500,top:330}" @close="close">
    <tab-pane label="洪水模拟">

      <el-row>
        <el-col :span="7">
          <label class="label-container" style="line-height: 28px;">演进速度</label>
        </el-col>
        <el-col :span="7">
          <input class="sm-input-long" style="float: none;width: 100px;height:30px" min="0" type="text" v-model="speed"/>
        </el-col>
      </el-row>
      <el-row style="padding-top: 15px">

        <el-col :span="7">
          <label class="label-container" style="line-height: 28px;">洪水区域</label>
        </el-col>

        <el-col :span="7">
          <el-select v-model="floodDataSourceIndex" placeholder="请选择" size="small" style="width: 100px">
            <el-option v-for="(item,index) in floodLocation" :key="item.label" :label="item.label" :value="index">
              <span style="float: left">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-col>

      </el-row>
      <el-row>
        <button class="btn btn-primary btn-sm" type="button" @click="loadData" v-if="isDataReady">载入数据</button>
        <button class="btn btn-primary btn-sm" type="button" @click="startFlood" v-if="isStartUseble">开 始</button>
        <button class="btn btn-primary btn-sm" type="button" @click="pauseFlood" v-if="isPauseseble">暂 停</button>
        <button class="btn btn-primary btn-sm" type="button" @click="stopFlood" v-if="isStopble">结 束</button>
        <label class="label-container" style="line-height: 28px;" v-if="isDownload">{{ progress }}</label>
      </el-row>
    </tab-pane>
  </win-tabs>
</template>

<script>
import {tabPane, winTabs} from "@/VGEUtils/components/winTabs/index.js";

//Global
let maxFrame = 0;
let frameStep = 0;
//point style flood
let pointCollections = new Cesium.PointPrimitiveCollection();
let pointPrimitives = null;
let floodFrameCache = [];
let currentFrame = 0;
let anxian = 0;
let inter = null;
//geoJson style flood
let geojsonFloodCollections = new Cesium.PrimitiveCollection();
let geojsonFloodPrimitives = null;
let forcerefresh = 0;
let testCollection = new Cesium.PrimitiveCollection();
let testFloodPrimitives = null;
let floodf = null;
let pc = 0;
/////
let allFlood = [];

function testPri() {
  //绘制多个图形
  /*
  testCollection.removeAll();
  if (testFloodPrimitives==null) {
    testFloodPrimitives = VGEEarth.getMainViewer().scene.primitives.add(testCollection);
  }
   */

  var scene = VGEEarth.getMainViewer().scene;
  var instances = [];
  scene.primitives.removeAll();
  if (floodf != null) {
    //scene.primitives.remove(floodf);
  }
  pc = 0;
  for (var lon = 104.27; lon < 104.41; lon += 0.001) {
    for (var lat = 31.58; lat < 31.65; lat += 0.0005) {
      pc++;
      instances.push(new Cesium.GeometryInstance({
        geometry: new Cesium.RectangleGeometry({
          show: false,
          rectangle: Cesium.Rectangle.fromDegrees(lon, lat, lon + 0.001, lat + 0.0005),
          height: 1000,
          vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
        }),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({alpha: 0.5}))
        }
      }));
    }
  }
  console.log(pc);


  /*
  floodf = new Cesium.Primitive({
    geometryInstances : instances,
    appearance : new Cesium.PerInstanceColorAppearance()
  });
  */
  floodf = new Cesium.GroundPrimitive({
    geometryInstances: instances,
    appearance: new Cesium.PerInstanceColorAppearance()
  });
  scene.primitives.add(floodf);
}

function addGeoJson(geojsonData, color, width) {
  let res = Cesium.GeoJsonDataSource.load(geojsonData, {
    clampToGround: true,
    stroke: color,
    fill: Cesium.Color.BLUE.withAlpha(0.3), //注意：颜色必须大写，即不能为blue
    strokeWidth: width
  });
  VGEEarth.getMainViewer().dataSources.add(res);
}

//https://www.jianshu.com/p/13285bcacfa6
//https://www.jianshu.com/p/8714a0c2c211
export default {
  name: 'flood-content',
  components: {winTabs, tabPane},
  data: function () {
    return {
      speed: 500,
      status: 0,//0 未开始下载;1下载中;2下载完成;3开始模拟;4模拟暂停;5模拟完成
      downloadedFilesCount: 0,
      progress: '1/148',
      floodDataSourceIndex: 0,
      floodLocation: [
        {label: 'Austin', vispoint: Cesium.Cartesian3.fromDegrees(-97.719295, 30.243846, 3000), maxFrame: 735, step: 5},
        {label: '安县', vispoint: Cesium.Cartesian3.fromDegrees(104.353923555223318, 31.600620919559553, 3000), maxFrame: 2170, step: 10}
        //{label: '江山'},
        //{label: '浑河'},
      ]
    };
  },
  methods: {
    requestAllFloodData(floodFrame, max, step) {
      let that = this;
      axios.get('https://vge-webgl.oss-cn-beijing.aliyuncs.com/floods/austin/' + floodFrame + '.geojson')
          .then(function (response) {
            let floodData = response.data.data;
            floodFrameCache.push(floodData);
            let finishedfile = that.downloadedFilesCount++;
            that.progress = '正在加载: ' + (finishedfile) + '/' + max / step;
            if (floodFrame < max) {
              that.status = 1;
              //5 735
              that.requestAllFloodData(floodFrame + step, max, step);
            } else {
              that.progress = '全部数据已加载';
              that.status = 2;
              console.log('all data is ready');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    requestGeojsonFloodData(url, floodFrame, max, step) {
      let that = this;
      axios.get(url + floodFrame + '.geojson')
          .then(function (response) {
            //console.log(response);
            let floodData = response.data;
            floodFrameCache.push(floodData);
            let finishedfile = that.downloadedFilesCount++;
            that.progress = '正在加载: ' + (finishedfile) + '/' + max / step;
            if (floodFrame < max) {
              that.status = 1;
              that.requestGeojsonFloodData(url, floodFrame + step, max, step);
            } else {
              that.progress = '全部数据已加载';
              that.status = 2;
              console.log('all data is ready');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    addFloodPoints() {
      this.status = 3;
      var center = Cesium.Cartesian3.fromDegrees(-97.719295, 30.243846, 0);
      var visPoint = Cesium.Cartesian3.fromDegrees(-97.719295, 30.243846, 30000);
      pointCollections.removeAll();
      if (pointPrimitives == null) {
        pointPrimitives = VGEEarth.getMainViewer().scene.primitives.add(pointCollections);
        pointPrimitives.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);
        VGEEarth.getMainViewer().scene.camera.flyTo({'destination': visPoint});
      }
      let floodPoints = null;
      if (currentFrame < 148) {
        //console.log("current:"+currentFrame);
        this.progress = '正在播放： ' + currentFrame + '/148';
        floodPoints = floodFrameCache[currentFrame];
        currentFrame++;
      } else {
        this.status = 5;
        this.progress = '模拟结束';
        currentFrame = 0;
        clearInterval(inter);
      }
      for (let i = 0; i < floodPoints.length; i++) {
        let floodpoint = floodPoints[i];
        let x = floodpoint[0];
        let y = floodpoint[1];
        let depth = floodpoint[2];
        let ele = floodpoint[3];
        pointPrimitives.add({
          //color : new Cesium.Color(0.28, 0.44, 0.33, depth),
          color: new Cesium.Color(0.0, 0.0, 1.0, depth),
          pixelSize: 10,
          outlineWidth: 0,
          position: new Cesium.Cartesian3(x, y, ele), // center
          scaleByDistance: new Cesium.NearFarScalar(150, 2, 5.0e4, 0.7)
        });

      }
    },
    addGeojsonData() {
      this.status = 3;
      let floodFrame = floodFrameCache[currentFrame];
      currentFrame++;
      let promise = Cesium.GeoJsonDataSource.load(floodFrame);
      //数据加载后渲染
      promise.then((ds) => {
        let instances = [];
        let entitys = ds.entities.values;
        entitys.forEach((e) => {
          let geometry = new Cesium.GeometryInstance({
            geometry: new Cesium.PolygonGeometry({
              polygonHierarchy: new Cesium.PolygonHierarchy(
                  e.polygon.hierarchy.getValue().positions
              ),
              extrudedHeight: 0,
              height: 0,
              vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
            }),
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                  Cesium.Color.fromRandom({
                    alpha: 0.5
                  })
              )
            }
          });
          instances.push(geometry);
        });
        let floodPrimitive = new Cesium.GroundPrimitive({
          show: false,
          geometryInstances: instances, //合并
          //某些外观允许每个几何图形实例分别指定某个属性
          appearance: new Cesium.EllipsoidSurfaceAppearance({
            aboveGround: true, //在椭球面上
            material: new Cesium.Material({
              fabric: {
                type: 'Water',
                uniforms: {
                  //baseWaterColor : new Cesium.Color(0.82, 0.79, 0.78, 0.8),
                  normalMap: 'https://vge-webgl.oss-cn-beijing.aliyuncs.com/floods/waterNormals.jpg',
                  frequency: 8000.0, // 控制波数的数字。
                  animationSpeed: 0.02, // 控制水的动画速度的数字。
                  amplitude: 3.0, // 控制水波振幅的数字。
                  specularIntensity: 0.6 // 控制镜面反射强度的数字。
                }
              }
            })
          })
        });
        let p = geojsonFloodPrimitives.add(floodPrimitive);
        allFlood.push(p);
        //VGEEarth.getMainViewer().scene.primitives.add(anxianPrimitive);
        //VGEEarth.getMainViewer().zoomTo(anxianPrimitive);
      });
    },
    loadData() {
      let visPoint = this.floodLocation[this.floodDataSourceIndex].vispoint;
      let max = this.floodLocation[this.floodDataSourceIndex].maxFrame;
      let step = this.floodLocation[this.floodDataSourceIndex].step;
      VGEEarth.getMainViewer().scene.camera.flyTo({'destination': visPoint});
      if (this.floodDataSourceIndex == 0) {
        addGeoJson('https://vge-webgl.oss-cn-beijing.aliyuncs.com/floods/austin/drainage.geojson', Cesium.Color.BLUE, 2);
        addGeoJson('https://vge-webgl.oss-cn-beijing.aliyuncs.com/floods/austin/subwatershed.geojson', Cesium.Color.RED, 1);

        let url = 'https://vge-webgl.oss-cn-beijing.aliyuncs.com/floods/austinv2/';
        this.requestGeojsonFloodData(url, 0, max, step);
      } else if (this.floodDataSourceIndex == 1) {
        let url = 'https://vge-webgl.oss-cn-beijing.aliyuncs.com/floods/anxian/';
        this.requestGeojsonFloodData(url, 0, max, step);
      } else {
        alert('正在开发中...');
        return;
      }

    },
    startFlood() {
      clearInterval(inter);
      if (this.floodDataSourceIndex == 0) {
        //inter = setInterval(this.addFloodPoints,this.speed);
        for (let i = 0; i < floodFrameCache.length; i++) {
          this.addGeojsonData();
        }

        let index = 0;
        setInterval(function () {
          for (let i = 0; i < allFlood.length; i++) {
            allFlood[i].show = false;
          }
          console.log('Index:' + index + '/' + allFlood.length);

          allFlood[index].show = true;
          index++;

          if (index > allFlood.length - 1) {
            index = 0;
          }
        }, 100);
      } else {
        //inter = setInterval(this.addGeojsonData,this.speed);
        for (let i = 0; i < floodFrameCache.length; i++) {
          this.addGeojsonData();
        }

        let index = 0;
        setInterval(function () {
          for (let i = 0; i < allFlood.length; i++) {
            allFlood[i].show = false;
          }
          console.log('Index:' + index + '/' + allFlood.length);

          allFlood[index].show = true;
          index++;

          if (index > allFlood.length - 1) {
            index = 0;
          }
        }, 100);
      }
    },
    pauseFlood() {
      clearInterval(inter);
    },
    resumeFlood() {
      inter = setInterval(this.addFloodPoints, this.speed);
    },
    stopFlood() {
      clearInterval(inter);
      this.status = 5;
      currentFrame = 0;
      floodFrameCache = [];
      pointCollections.removeAll();
      geojsonFloodCollections.removeAll();
    },
    close() {
      this.$store.commit('setVGEEarthComAction', {name: 'flood', on_off: 2});
    }
  },
  computed: {
    isDataReady() {
      return this.status == 0 || this.status == 5;
    },
    isDownload() {
      return this.status > 0 && this.status != 5;
    },
    isStartUseble() {
      return this.status > 1 && this.status != 5;
    },
    isPauseseble() {
      return this.status == 3;
    },
    isStopble() {
      return this.status == 3;
    }
  },
  mounted() {
    //VGEEarth.getMainViewer()
    //addAllPoints();
    //createREC();
    //requestAllFloodData(0);
  }
};
</script>

<style scoped>
label {
  color: #009b94;
}
</style>
