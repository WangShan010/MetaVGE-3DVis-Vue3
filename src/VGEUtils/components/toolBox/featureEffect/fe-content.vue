/****************************************************************************
名称：几何特效
最后修改日期：2022-07-10
****************************************************************************/

<template>
  <win-tabs :initCSS="{width: 500,height: 280,left:350,top:380}" @close="close" class="move_box">
    <tab-pane label="点特效">
      <pointEffect></pointEffect>
    </tab-pane>
    <tab-pane label="点聚合">
      <PointCluster></PointCluster>
    </tab-pane>
    <tab-pane label="线特效">
      <poly-line-effect></poly-line-effect>
    </tab-pane>
    <tab-pane label="面特效">
      <polygon-effect></polygon-effect>
    </tab-pane>
    <tab-pane label="行政区标注">
      <region-label></region-label>
    </tab-pane>
    <tab-pane label="LED文本">
      <LEDLabel></LEDLabel>
    </tab-pane>
  </win-tabs>
</template>

<script>
import {tabPane, winTabs} from "@/VGEUtils/components/winTabs/index.js";

import PolygonEffect from './polygonEffect/polygonEffect.vue';
import PointCluster from './pointCluster/pointCluster.vue';
import pointEffect from './pointEffect/pointEffect.vue';
import PolyLineEffect from './polyLineEffect/polyLineEffect.vue';
import regionLabel from './regionLabel/regionLabel.vue';
import LEDLabel from './LEDLabel/LEDLabel.vue';

export default {
  name: 'fe-content',
  components: {
    PolyLineEffect,
    pointEffect,
    PolygonEffect,
    winTabs,
    tabPane,
    PointCluster,
    regionLabel,
    LEDLabel
  },

  methods: {
    close() {
      this.$store.commit('setVGEEarthComAction', {name: 'featureEffect', on_off: 2});
    }
  }
};
</script>
