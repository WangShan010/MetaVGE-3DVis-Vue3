/****************************************************************************
名称：视觉书签项
最后修改日期：2022-04-28
****************************************************************************/


<template>
  <win-tabs :initCSS="{width: 440,height: 400,left:580,top:330}" @close="close">
    <tab-pane label="视觉标签">
      <div>
        <input type="file" style="display:none" id="choseFile"/>
        <div>
          <div class="sm-function-module-sub-section" style="margin-bottom: 5px">
            <el-row>
              <el-col :span="3">
                <label class="label-container" style="line-height: 28px;">名称</label>
              </el-col>
              <el-col :span="11">
                <input class="sm-input-long" type="text" style="float: none;width: 100%;height:30px" min="0"
                       v-model="name"/>
              </el-col>
              <el-col :span="10" style="text-align: center">
                <div class="btn-group" role="group">
                  <button class="btn btn-primary btn-sm" type="button" @click="takeVisualMarker"
                          style="margin-right: 5px">添加
                  </button>
                  <button class="btn btn-success btn-sm" type="button" @click="importMarkers" v-if="canImport"
                          style="margin-right: 5px">导入
                  </button>
                  <button class="btn btn-warning btn-sm" type="button" @click="exportMarkers" v-if="canExport">导出
                  </button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div id="container">
          <div id="markerContent">
            <div v-for="mark in markers" class="mark" style="margin-bottom: 5px">
              <el-row>

                <el-col :span="12">
                  <img v-bind:src="mark.img" @click="flyTo(mark.cameraView)" :style="{width:imageWidth+'px'}"/>

                </el-col>


                <el-col :span="10" style="margin-left: 10px">

                  <div style="margin-top: 5px">
                    <label class="label-container">名称: </label>{{ mark.name }}
                  </div>
                  <div style="margin-top: 5px">
                    <label class="label-container">位置:</label>
                    {{
                      Cartesian3_to_WGS84(mark.cameraView.destination).lng
                    }},{{ Cartesian3_to_WGS84(mark.cameraView.destination).lat }}
                  </div>
                  <div style="margin-top: 5px">
                    <label class="label-container">高度:</label>{{
                      Cartesian3_to_WGS84(mark.cameraView.destination).alt
                    }}
                    米
                  </div>
                  <div style="margin-top: 5px">
                    <button class="btn btn-danger btn-sm" style="float: left" type="button"
                            @click="removeMark(mark.id)">删除
                    </button>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </tab-pane>
  </win-tabs>
</template>

<script>
import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';

import bookMarkManagerData from './lib/data.js';
import defaultVM from './default.json';

let container = null;
export default {
  name: 'vm-content',
  components: {winTabs, tabPane},
  data: function () {
    return {
      tip: '请输入标签名称',
      name: '未命名书签',
      markers: [],
      imgWidth: 0
    };
  },
  methods: {
    takeVisualMarker() {
      container = document.getElementById('markerContent');
      let w = container.offsetWidth - 8;
      let h = w * 0.75;
      w = w * 0.5;
      h = h * 0.5;
      this.imgWidth = w;
      bookMarkManagerData.bookMarkManager.createBookmark(this.$data.name, h, w).then(res => {
        bookMarkManagerData.bookMarkManager.add(res);
      });
    },
    removeMark(bookMarkId) {
      bookMarkManagerData.bookMarkManager.removeBookmark(bookMarkId);
    },
    importMarkers() {
      bookMarkManagerData.bookMarkManager.loadMark();
    },
    exportMarkers() {
      bookMarkManagerData.bookMarkManager.saveMark('marks');
    },
    flyTo(cameraView) {
      VGEEarth.getMainViewer().scene.camera.flyTo(cameraView);
    },
    close() {
      this.$store.commit('setVGEEarthComAction', {name: 'visualMarker', on_off: 2});
    },
    Cartesian3_to_WGS84(point) {
      let cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z);
      let cartographic = Cesium.Cartographic.fromCartesian(cartesian33);
      let lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(3);
      let lng = Cesium.Math.toDegrees(cartographic.longitude).toFixed(3);
      let alt = cartographic.height.toFixed(3);
      return {lng: lng, lat: lat, alt: alt};
    }
  },
  mounted() {
    container = document.getElementById('markerContent');
    this.imgWidth = 172;
    bookMarkManagerData.bookMarkManager = new VGEEarth.BookmarkManager(VGEEarth.getMainViewer(), this.markers);
    let that = this;
    for (let i = 0; i < defaultVM.markList.length; i++) {
      that.markers.push(defaultVM.markList[i]);
    }
  },
  computed: {
    canExport() {
      return this.markers.length > 0;
    },
    canImport() {
      return true;
    },
    imageWidth() {
      //container = document.getElementById("markerContent");
      //let w = container.offsetWidth - 8;
      //return w*0.5;
      return this.imgWidth;
    },
    imageHeight() {
      return this.imageWidth() * 0.75;
    }
  }
};
</script>

<style scoped>
label {
  color: #009b94;
}

.center {
  text-align: center
}

.roadTable {
  border: 1px solid;
  margin-top: 10px;
  color: white;
}

.footer {
  position: absolute;
  bottom: 20px;
  width: 100%;
}

#container {
  max-height: 250px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.marker {
  margin-top: 5px;
}
</style>
