/****************************************************************************
名称：可视域分析 的逻辑处理
最后修改日期：2022-04-20
****************************************************************************/

<template>
  <win-tabs :initCSS="{width: 320,height: 280,left:350,top:380}" @close="close">
    <tab-pane label="可视域分析">
      <div>
        <div style="margin-bottom: 5px">
          <el-row>
            <el-col :span="8"><label class="label-container">视角水平张角</label></el-col>
            <el-col :span="13"><el-input v-model.number="horizontalAngleInput" size="small"></el-input></el-col>
          </el-row>
        </div>

        <div style="margin-bottom: 5px">
          <el-row>
            <el-col :span="8"><label class="label-container">视角垂直张角</label></el-col>
            <el-col :span="13"><el-input v-model.number="verticalAngleInput" size="small"></el-input></el-col>
          </el-row>
        </div>


        <div style="margin-bottom: 5px">
          <el-row>
            <el-col :span="8"><label class="label-container">阴影精度</label></el-col>
            <el-col :span="13"><el-input v-model.number="sizeInput" size="small"></el-input></el-col>
          </el-row>
        </div>

        <div style="margin-bottom: 5px">
          <el-row>
            <el-col :span="8"><label class="label-container">柔和阴影</label></el-col>
            <el-col :span="16"><input type="checkbox" v-model="shadowInput"><br/><br/></el-col>
          </el-row>
        </div>


        <div style="text-align: center;padding-top: 0px">
          <button class="btn btn-info btn-sm" @click="setViewShed()" style="margin-right: 10px;margin-left: 50px">添加可视域</button>
          <button class="btn btn-warning btn-sm" @click="clearViewShed()">重置</button>
        </div>
      </div>
    </tab-pane>
  </win-tabs>
</template>

<script>
import {tabPane, winTabs} from "@/VGEUtils/components/winTabs/index.js";


let viewShed;
export default {
  name: 'ms-content',
  components: {winTabs, tabPane},
  data:function (){
    return{
      horizontalAngleInput: 90,
      verticalAngleInput: 60,
      sizeInput: 1024,
      shadowInput: false,
    }
  },
  methods: {
    setViewShed() {
      let that = this;
      earth.drawShape.drawLine({
        endCallback: function (points) {
          let horizontal = that.horizontalAngleInput;
          let vertical = that.verticalAngleInput;
          let size = that.sizeInput;

          if (horizontal < 180 && vertical < 180 && 0 < size) {
            if (viewShed) viewShed.clear();
            viewShed = new VGEEarth.ViewShedStage(earth.viewer3D, {
              viewPosition: new Cesium.Cartesian3(points[0].x, points[0].y, points[0].z),
              viewPositionEnd: new Cesium.Cartesian3(points[1].x, points[1].y, points[1].z),
              horizontalViewAngle: horizontal,
              verticalViewAngle: vertical,
              size: size
            });
          }
        }
      });
    },
    clearViewShed() {
      viewShed && viewShed.clear();
    },
    close() {
      this.$store.commit('setVGEEarthComAction', {name: 'viewShedStage', on_off: 2});
    }
  },
  unmounted() {
    this.clearViewShed();
  }
};
</script>


<style scoped>
label {
  color: #009b94;
}
</style>
