<template>
  <div style="padding: 10px 0">
    <button class="btn btn-info btn-sm" @click="createHeatMap" style="margin-right: 5px">渲染热力图</button>
    <button class="btn btn-info btn-sm" @click="removeHeatMap">销毁热力图</button>
  </div>
</template>

<script>
import heatData from './heatData.js';

let bbox = [106.4519988952, 29.5021084567, 106.4590407287, 29.5092024712];
let heatmap;
export default {
  name: 'heatMap',
  data: function () {
    return {};
  },
  methods: {
    createHeatMap() {
      // heatmap.destroy();
      // earth.viewer3DWorkSpace.flyToDataByPid('b0c24b7d-5970-f574-a7f2-5ef0851dfcc0');
      let targetPosition = Cesium.Cartesian3.fromDegrees(106.45551981195001, 29.49700,1500);
      earth.viewer3D.scene.camera.setView({
        destination: targetPosition,
        orientation: {
          heading: 6.2243565276080295,
          pitch: -0.9203738754493909,
          roll: 6.282874205266332
        },
        duration: 1
      });
      heatmap = new VGEEarth.TileSetPlugin.Heatmap(
          earth.viewer3D,
          {data: heatData},
          bbox
      );
    },
    removeHeatMap() {
      if (heatmap) {
        heatmap.destroy();
        earth.viewer3DWorkSpace.removeDataByPid('b0c24b7d-5970-f574-a7f2-5ef0851dfcc0');
      }
    }
  },
  unmounted() {
    if (heatmap) {
      heatmap.destroy();
    }
  }
};
</script>

<style scoped>

</style>
