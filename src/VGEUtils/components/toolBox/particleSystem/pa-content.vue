<template>
  <win-tabs :initCSS="{width: 300,height: 290,left:350,top:380}" @close="close" >
    <tab-pane label="粒子系统">
      <div style="text-align: center">
        <div class="toolRow">
          <button type="button" class="btn btn-sm btn-success" @click="toggleActive('firePlot')" style="margin-right: 10px;" >火焰粒子</button>
          <button type="button" class="btn btn-sm btn-success" @click="toggleActive('fountainPlot')" style="margin-right: 10px;">喷泉粒子</button>
          <button type="button" class="btn btn-sm btn-success" @click="toggleActive('smokePlot')">烟雾粒子</button>
        </div>
      </div>
    </tab-pane>
  </win-tabs>
</template>

<script>
import {tabPane, winTabs} from "@/VGEUtils/components/winTabs/index.js";


export default {
  name: 'pa-content',
  components: {winTabs, tabPane},
  data() {
    return {};
  },
  methods: {
    toggleActive(comName) {
      this.$store.commit('setVGEEarthComAction', {name: comName, on_off: 3});
    },
    close() {
      this.$store.commit('setVGEEarthComAction', {name: 'particleSystem', on_off: 2});
    },
  }
};
</script>

<style scoped>
.toolRow {
  text-align: center;
  margin-bottom: 5px;
}
</style>




