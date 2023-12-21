<template>
  <div style="overflow:hidden;height: 100%" v-loading="loading">
    <div id="MapContainer"></div>
  </div>
</template>

<script>

export default {
  name: 'viewer',
  data() {
    return {
      loading: false
    };
  },
  methods: {
    initEarth() {
      earth.createNavigation();
      earth.openDeBug();
      earth.viewer3D.scene.globe.depthTestAgainstTerrain = true;

      let t = setInterval(() => {
        if (earth.loadComplete) {
          this.loading = false;
          window.clearInterval(t);
        }
      }, 100);
    }
  },
  mounted: function () {
    // 创建viewer对象
    const earth = new VGEEarth.Earth('MapContainer', {
      infoBox: false,
      selectionIndicator: false,
      vrButton: true
    });
    this.initEarth();
  }
};
</script>


<style>
.el-loading-mask {
  background-color: rgba(255, 255, 255, 0.15) !important;
  z-index: 10;
}

.distance-legend {
  bottom: 50px;
}

.cesium-performanceDisplay-defaultContainer{
    top: auto !important;
    bottom: 10px !important;
    left: 20px !important;
    right: auto !important;
}
</style>
