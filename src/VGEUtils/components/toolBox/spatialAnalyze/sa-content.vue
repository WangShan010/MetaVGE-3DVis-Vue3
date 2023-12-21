/****************************************************************************
名称：空间分析模块
最后修改日期：2021-04-23
****************************************************************************/

<template>
  <win-tabs :initCSS="{width: 300,height: 220,left:350,top:140}" @close="close">
    <tab-pane label="空间分析">
      <div style="text-align: center">
        <div class="toolRow">
          <!-- <button type="button" class="btn btn-sm btn-success" @click="toggleActive('viewShedStage')">可视域分析</button> -->
          <button type="button" class="btn btn-sm btn-success" @click="toggleActive('terrainExcavate')">地形开挖</button>
          <button type="button" class="btn btn-sm btn-success" @click="toggleActive('limitHeight')">限高分析</button>
          <button type="button" class="btn btn-sm btn-success" @click="toggleActive('slopeAnalyze')">坡度计算</button>
          <button type="button" class="btn btn-sm btn-success" @click="toggleActive('aspectAnalyze')">坡向计算</button>
          <!-- <button type="button" class="btn btn-sm btn-success" @click="notUse">模型剖切</button>-->
          <!-- <button type="button" class="btn btn-sm btn-success" @click="notUse">模型压平</button>-->
          <button type="button" class="btn btn-sm btn-success" @click="toggleActive('terrainRendering')">地貌渲染</button>
          <!-- <button type="button" class="btn btn-sm btn-success" @click="notUse">方量分析</button>-->
          <button type="button" class="btn btn-sm btn-success" @click="toggleActive('hydrologyAnalyze')">水文分析</button>
          <button type="button" class="btn btn-sm btn-success" @click="toggleActive('sunlightAnalyze')">日照分析</button>
          <button type="button" class="btn btn-sm btn-success" @click="toggleActive('windEffect')">风力效应</button>
          <button type="button" class="btn btn-sm btn-success" @click="toggleActive('viewAnalyze')">视域分析</button>
          <button type="button" class="btn btn-sm btn-success" @click="toggleActive('hillShade')" v-if="false">山体阴影</button>
        </div>
      </div>
    </tab-pane>
  </win-tabs>
</template>

<script>
import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';


export default {
  name: 'sa-content',
  components: { winTabs, tabPane },
  data() {
    return {};
  },
  methods: {
    toggleActive(comName) {
      this.$store.commit('setVGEEarthComAction', { name: comName, on_off: 3 });
    },
    notUse() {
      this.$message({
        message: '数据缺失，该功能模块暂时无法使用',
        type: 'warning'
      });
    },
    close() {
      this.$store.commit('setVGEEarthComAction', { name: 'spatialAnalyze', on_off: 2 });
    }
  }
};
</script>


<style scoped>
.toolRow {
  text-align: center;
}

.toolRow button {
  margin-right: 5px;
  margin-bottom: 8px;
}
</style>




