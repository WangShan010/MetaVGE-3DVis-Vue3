/****************************************************************************
名称：量测工具的逻辑处理
最后修改日期：2022-04-20
****************************************************************************/

<template>
  <win-tabs :initCSS="{width: 350,height: 180,left:400,top:300}" @close="close">
    <tab-pane label="量测工具">
      <div id="measurePane" style="text-align: center" @mousedown.stop>
        <button type="button" class="btn btn-sm btn-success" @click="measureHeight">测高程</button>
        <button type="button" class="btn btn-sm btn-success" @click="verticalDistance">测高差</button>
        <button type="button" class="btn btn-sm btn-success" @click="spaceDistance">测距离</button>
        <button type="button" class="btn btn-sm btn-success" @click="surfaceArea">测面积</button>
        <button type="button" class="btn btn-sm btn-success" @click="measureTriangle">测角度</button>
        <button type="button" class="btn btn-sm btn-success" @click="perimeter">测周长</button>
        <button type="button" class="btn btn-sm btn-success" v-show="false" @click="surfaceArea">三角测量</button>
        <button type="button" class="btn btn-sm btn-danger"  @click="stopMeasure">结束绘制</button>
        <button type="button" class="btn btn-sm btn-warning" @click="removeAll">重置</button>
      </div>
    </tab-pane>
  </win-tabs>
</template>

<script>
import {tabPane, winTabs} from "@/VGEUtils/components/winTabs/index.js";


let measureTool;
export default {
  name: 'ms-content',
  components: {winTabs, tabPane},
  methods: {
    // 测高程
    measureHeight() {
      measureTool.measureHeight();
    },
    // 垂直距离
    verticalDistance() {
      measureTool.verticalDistance();
    },
    // 三角量距离
    CesiumTriangle() {

    },
    // 空间距离
    spaceDistance() {
      measureTool.spaceDistance();
    },
    // 空间面积
    surfaceArea() {
      measureTool.surfaceArea();
    },
    // 角度测量
    measureTriangle() {
      measureTool.measureTriangle();
    },
    // 周长测量
    perimeter() {
      measureTool.perimeter();
    },
    stopMeasure(){
      measureTool.stopMeasure();
    },
    // 重置
    removeAll() {
      measureTool.removeAll();
    },
    close() {
      this.$store.commit('setVGEEarthComAction', {name: 'measureTool', on_off: 2});
    }
  },
  mounted() {
    measureTool = earth.measureTool;
  },
  unmounted() {
    measureTool.removeAll();
  }
};
</script>

<style lang="less" scoped>
#measurePane {
  button {
    margin: 5px 2px;
    width: 70px;
  }
}
</style>
