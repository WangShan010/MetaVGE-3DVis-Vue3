<template>
  <win-tabs :initCSS="{width: 300,height: 310,left:500,top:330}" @close="close" :draggable="isDragging">
    <tab-pane label="洪水模拟">

      <el-row>
        <el-col :span="7">
          <label class="label-container" style="line-height: 28px;">演进速度</label>
        </el-col>
        <el-col :span="7">
          <input class="sm-input-long" style="float: none;width: 100px;height:30px" min="0" v-model="intervalDuration"/>
        </el-col>
      </el-row>
      <el-row style="padding-top: 15px">
        <el-col :span="7">
          <label class="label-container" style="line-height: 28px;">洪水区域</label>
        </el-col>
        <el-col :span="7">
          <el-select v-model="floodDataSourceIndex" placeholder="请选择" size="small" style="width: 100px"
                     @change="handleOptionChange">
            <el-option v-for="(item,index) in floodLocation" :key="item.label" :label="item.label" :value="index">
              <span style="float: left">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <!--      <div>-->
      <!--        <label v-show="isAnxianJh">原始数据版:</label>-->
      <!--        <button class="btn btn-primary btn-sm" type="button" @click="loadData" v-if="isDataReady">载入数据</button>-->
      <!--        <button class="btn btn-primary btn-sm" type="button" @click="startFlood" v-if="isStartUseble">开 始</button>-->
      <!--        <button class="btn btn-primary btn-sm" type="button" @click="pauseFlood" v-if="isPauseseble">暂 停</button>-->
      <!--        <button class="btn btn-primary btn-sm" type="button" @click="stopFlood" v-if="isStopble">结 束</button>-->
      <!--        <label class="label-container" style="line-height: 28px;" v-if="isDownload">{{ progress }}</label>-->
      <!--      </div>-->

      <!--简化版安县洪水-->
      <div v-show="isAnxianJh">
        <br/>
        <input
            type="range"
            v-model="progressValue"
            :min="0"
            :max="100"
            @input="handleProgressChange"
            @mousedown="handleMouseDown"
            @mouseup="handleMouseUp"
        />
        <label>简化数据版:</label>
        <button class="btn btn-primary btn-sm" type="button" @click="togglePlay">{{
            isPlaying ? '暂停' : '播放'
          }}
        </button>
        <button class="btn btn-primary btn-sm" type="button" @click="removeFlood" style="margin: 20px">重置</button>
      </div>

    </tab-pane>
  </win-tabs>
</template>

<script>
import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';

let maxFrame = 0;
let frameStep = 0;
let currentFrame = 0;
let currentPlayingFrame = 0;
let geojsonFloodCollections = new Cesium.PrimitiveCollection();
let geojsonFloodPrimitives = null;
let floodFrameCache = [];
let floodf = null;
let inter = null;
let pc = 0;
let allFlood = [];

let floods = []; //洪水geoJson文件在场景上的数量
export default {
  name: 'flood-primitive',
  components: {winTabs, tabPane},
  data: function () {
    return {
      /**洪水原始版参数**/
      speed: 100,
      status: 0,//0 未开始下载;1下载中;2下载完成;3预构建;4开始模拟;5模拟暂停;6模拟完成
      downloadedFilesCount: 0,
      progress: '1/148',
      floodDataSourceIndex: 0,
      floodLocation: [
        {
          label: '安县',
          vispoint: Cesium.Cartesian3.fromDegrees(104.353923555223318, 31.600620919559553, 3000),
          maxFrame: 2170,
          step: 10
        },
        // {label: 'Austin', vispoint: Cesium.Cartesian3.fromDegrees(-97.719295, 30.243846, 3000), maxFrame: 735, step: 5},
        //{label: '江山'},
        //{label: '浑河'},
      ],

      /**洪水简化版参数**/
      fileDirectory: 'https://vge-webgl.oss-cn-beijing.aliyuncs.com/floods/lod4404/',//vge-阿里云oss
      // fileDirectory: 'https://floodsimulation.oss-rg-china-mainland.aliyuncs.com/flood4404/',//g-阿里云oss
      fileCount: 217,
      progressValue: 0,
      isPlaying: false,
      intervalId: null,
      intervalDuration: 130, // 毫秒,洪水简化版数据加载间隔
      isAnxianJh: true,
      isDragging: true,
      stopExecution: false,
    };
  },
  mounted() {
    // for (let i = 0; i <= 217; i++) {
    //   fetch(this.fileDirectory + `${i}0.geojson`) //提前缓存洪水数据
    //   console.log(i);
    // }
    window.earth.viewer3D.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(104.35556649960914, 31.605304431049152, 20600),
      // destination: Cesium.Cartesian3.fromDegrees(115.88359,22.034817, 20600),
    });
  },
  methods: {
    requestGeojsonFloodData(url, floodFrame, max, step) {
      let that = this;
      axios.get(url + floodFrame + '.geojson')
          .then(function (response) {
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
    addGeojsonData() {
      let floodFrame = null;

      if (geojsonFloodPrimitives == null) {
        geojsonFloodPrimitives = VGEEarth.getMainViewer().scene.primitives.add(geojsonFloodCollections);
      }

      if (currentFrame < (maxFrame / frameStep)) {
        this.progress = '正在预构建:' + currentFrame + '/' + (maxFrame / frameStep);
        floodFrame = floodFrameCache[currentFrame];
        currentFrame++;
      } else {
        this.status = 3;
        this.progress = '构建结束';
        currentFrame = 0;
        clearInterval(inter);
        return;
      }
      let promise = Cesium.GeoJsonDataSource.load(floodFrame);
      //数据加载后渲染
      promise.then((ds) => {
        let instances = [];
        let entitys = ds.entities.values;
        entitys.forEach((e) => {
          console.log(e);
          let geometry = new Cesium.GeometryInstance({
            geometry: new Cesium.PolygonGeometry({
              polygonHierarchy: new Cesium.PolygonHierarchy(
                  e.polygon.hierarchy.getValue().positions
              ),
              extrudedHeight: 0,
              height: 0,
              vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
            }),
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                  Cesium.Color.fromRandom({
                    alpha: 0.5,
                  })
              ),
            },
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
                  specularIntensity: 0.6, // 控制镜面反射强度的数字。
                },
              },
            }),
          }),
        });
        let p = geojsonFloodPrimitives.add(floodPrimitive);
        allFlood.push(p);
      });
    },
    loadData() {
      let visPoint = this.floodLocation[this.floodDataSourceIndex].vispoint;
      let max = this.floodLocation[this.floodDataSourceIndex].maxFrame;
      maxFrame = max;
      let step = this.floodLocation[this.floodDataSourceIndex].step;
      frameStep = step;
      VGEEarth.getMainViewer().scene.camera.flyTo({'destination': visPoint});
      if (this.floodDataSourceIndex == 0) {
        let url = 'https://vge-webgl.oss-cn-beijing.aliyuncs.com/floods/austin/';
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
      if (this.status != 5) {
        for (let i = 0; i < floodFrameCache.length; i++) {
          this.addGeojsonData();
        }
      }
      let that = this;
      inter = setInterval(function () {
        for (let i = 0; i < allFlood.length; i++) {
          allFlood[i].show = false;
        }
        that.status = 4;
        that.progress = '播放:' + currentPlayingFrame + '/' + allFlood.length;
        allFlood[currentPlayingFrame].show = true;
        currentPlayingFrame++;

        if (currentPlayingFrame > allFlood.length - 1) {
          that.status = 6;
          that.downloadedFilesCount = 0;
          currentPlayingFrame = 0;
          clearInterval(inter);
          floodFrameCache.length = 0;
          allFlood.length = 0;
          geojsonFloodCollections.removeAll();
          /*
          for(let i=0;i<allFlood.length;i++){
            let p = allFlood[i];

          }
           */
        }
      }, this.speed);
    },
    pauseFlood() {
      this.status = 5;
      clearInterval(inter);
    },
    stopFlood() {
      ////0 未开始下载;1下载中;2下载完成;3预构建;4开始模拟;5模拟暂停;6模拟完成
      this.status = 6;
      clearInterval(inter);
      this.downloadedFilesCount = 0;
      allFlood.length = 0;
      floodFrameCache.length = 0;
      currentPlayingFrame = 0;
      this.downloadedFilesCount = 0;
      geojsonFloodCollections.removeAll();
    },

    /**安县洪水简化版,加载洪水数据**/
    loadAndRenderGeoJSON(fileIndex) {
      let that = this;
      // if (this.stopExecution) {
      //   return
      // } // 检查标志，停止执行
      const floodUrl = this.fileDirectory;
      fetch(floodUrl + `${fileIndex}0.geojson`)
          .then((response) => response.json())
          .then((geoJsonData) => {
            const instances = [];

            const features = geoJsonData.features;
            features.forEach((feature) => {
              const coordinates = feature.g.c;
              let color = that.calculateColor1(feature.g.d);
              let arr = [];
              coordinates[0].forEach((coord) => {
                const cartesian = Cesium.Cartesian3.fromDegrees(
                    coord[0],
                    coord[1],
                    coord[2]
                );
                arr.push(cartesian);
              });
              arr.push(arr[0]);

              let geometry = new Cesium.GeometryInstance({
                geometry: new Cesium.PolygonGeometry({
                  polygonHierarchy: new Cesium.PolygonHierarchy(arr),
                  perPositionHeight: true,
                  vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
                }),
                attributes: {
                  color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                      new Cesium.Color(color.r / 255, color.g / 255, color.b / 255, 1, 1)
                  ),
                },
              });
              instances.push(geometry);
            });

            let primitive = new Cesium.Primitive({
              geometryInstances: instances,
              appearance: new Cesium.PerInstanceColorAppearance({
                aboveGround: true,
                flat: true,
              }),
            });

            if (that.stopExecution) {
              return;
            } // 检查标志，停止执行

            earth.viewer3D.scene.primitives.add(primitive);

            if (floods.length > 3) {
              let a = floods.shift();
              earth.viewer3D.scene.primitives.remove(a);
            }
            floods.push(primitive);
          });
      return 'finish';
    },
    /**控制暂停/播放洪水过程-->play()/pause()**/
    togglePlay() {
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        this.play();
      } else {
        this.pause();
      }
    },
    /**播放洪水过程**/
    play() {
      this.stopExecution = false;
      this.intervalId = setInterval(() => {
        if (!this.isMaxIndex) {
          this.progressValue = (this.currentIndex + 1) / (this.fileCount - 1) * 100;
          this.loadAndRenderGeoJSON(this.currentIndex);
        } else {
          this.pause();
        }
      }, this.intervalDuration);
    },
    /**暂停洪水过程**/
    pause() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    },
    /**处理进度条的变化，包括清除当前渲染的数据，加载新的数据，并决定是否继续播放**/
    handleProgressChange() {
      this.pause();

      //清除所有
      floods.forEach((item) => {
        earth.viewer3D.scene.primitives.remove(item);
      });


      // 更新进度条，并加载新数据
      this.loadAndRenderGeoJSON(this.currentIndex);

      if (this.isPlaying) {
        this.play();
      }
    },
    /**控制安县简化版本窗口显隐**/
    handleOptionChange() {
      if (this.floodDataSourceIndex === 1) {
        this.isAnxianJh = true;
        // earth.openDeBug();
        // window.earth.viewer3D.camera.flyTo({
        //   destination: Cesium.Cartesian3.fromDegrees(104.35556649960914, 31.605304431049152, 20600),
        //   // destination: Cesium.Cartesian3.fromDegrees(115.88359,22.034817, 20600),
        // });
      } else {
        this.isAnxianJh = false;
      }
    },
    /**移除**/
    removeFlood() {
      this.stopExecution = true; //添加洪水的函数退出执行
      this.currentIndex = 0;
      this.progressValue = 0;
      this.isPlaying = false;
      this.pause();
      floods.forEach((item) => {
        earth.viewer3D.scene.primitives.remove(item);
      });
      floods.length = 0;
      // this.stopExecution = false; //恢复添加洪水的函数执行
    },
    /**根据水深计算颜色
     * @param depth 水的深度
     * **/
    calculateColor1(depth) {
      let max_depth = 30;
      let min_depth = 0;
      let min_color = [8, 48, 107];
      let max_color = [33, 113, 181];
      let colors = {
        r: 0,
        g: 0,
        b: 0
      };
      if (depth >= 30) {
        colors.r = 8;
        colors.g = 48;
        colors.b = 107;
        return colors;
      } else {
        let depth_ratio = (depth - min_depth) / (max_depth - min_depth);
        let color_ratio = 1 - depth_ratio;
        colors.r = parseInt(min_color[0] * depth_ratio + max_color[0] * color_ratio);
        colors.g = parseInt(min_color[1] * depth_ratio + max_color[1] * color_ratio);
        colors.b = parseInt(min_color[2] * depth_ratio + max_color[2] * color_ratio);
        return colors;
      }
    },
    /**鼠标按下时窗口不可被拖动**/
    handleMouseDown() {
      this.isDragging = false;
    },
    /**鼠标松开恢复**/
    handleMouseUp() {
      this.isDragging = true;
    },
    /**关闭窗口**/
    close() {
      this.$store.commit('setVGEEarthComAction', {name: 'flood', on_off: 2});
      this.removeFlood();
    },
  },
  computed: {
    isDataReady() {
      return this.status == 0 || this.status == 6;
    },
    isDownload() {
      return this.status > 0 && this.status != 6;
    },
    isStartUseble() {
      return this.status == 2 || this.status == 5;
    },
    isPauseseble() {
      return this.status == 4;
    },
    isStopble() {
      return this.status == 4;
    },

    /**安县洪水简化版--播放进度条监听**/
    currentIndex() {
      return Math.round(
          (this.progressValue / 100) * (this.fileCount - 1)
      );
    },
    isMaxIndex() {
      return this.currentIndex === this.fileCount - 1;
    },
  },
  unmounted() {
    clearInterval(inter);
    this.stopExecution = true;
    this.removeFlood();
  }
};
</script>

<style scoped>
label {
  color: #009b94;
}
</style>
