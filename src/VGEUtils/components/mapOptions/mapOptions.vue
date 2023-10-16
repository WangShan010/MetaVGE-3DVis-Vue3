<template>
  <div id="mapOptions" class="simpleCesium" v-if="show">
    <div class="MapContainer">
      <div class="sc-widgets">
        <div class="sc-widget-container">
          <div class="sc-widget sc-widget-mapOptions">
            <div class="sc-widget-title">地图选项
              <div class="sc-widget-bar"><span class="sc-widget-bar-close" @click="close">×</span></div>
            </div>
            <div class="sc-widget-content" @mousedown.stop>
              <div class="sc-widget-group"><span>视窗选项</span></div>
              <label class="sc-widget-item">
                <input type="checkbox" data-bind="checked: viewerShadows"><span>阴影效果</span>
              </label>
              <div class="sc-widget-group"><span>地球选项</span></div>
              <label class="sc-widget-item">
                <input type="checkbox" data-bind="checked: globeEnableLighting"><span>阳光效果</span>
              </label>
              <label class="sc-widget-item">
                <input type="checkbox" data-bind="checked: globeShowGroundAtmosphere"><span>地表大气</span>
              </label>
              <label class="sc-widget-item">
                <input type="checkbox" data-bind="checked: globeTranslucencyEnabled"><span>地表透明</span>
              </label>
              <label class="sc-widget-item">
                <input type="checkbox" data-bind="checked: globeShow"><span>显示地球</span></label>
              <label class="sc-widget-item">
                <input type="checkbox" data-bind="checked: globeDepthTestAgainstTerrain"><span>深度检测</span>
              </label>
              <label class="sc-widget-item">
                <input type="checkbox" data-bind="checked: globeWireFrame"><span>地形线框</span></label>
              <div class="sc-widget-group"><span>场景选项</span></div>
              <label class="sc-widget-item">
                <input type="checkbox" data-bind="checked: sceneSkyAtmosphereShow"><span>天空大气</span>
              </label>
              <label class="sc-widget-item">
                <input type="checkbox" data-bind="checked: sceneFogEnabled"><span>显示雾气</span>
              </label>
              <label class="sc-widget-item">
                <input type="checkbox" data-bind="checked: sceneRequestRenderMode"><span>主动渲染</span>
              </label>
              <label class="sc-widget-item">
                <input type="checkbox" data-bind="checked: sceneLogarithmicDepthBuffer"><span>对数深度</span>
              </label>
              <label class="sc-widget-item">
                <input type="checkbox" data-bind="checked: sceneDebugShowFramesPerSecond"><span>码率帧数</span>
              </label>
              <label class="sc-widget-item">
                <input type="checkbox" data-bind="checked: sceneDebugShowFrustumPlanes"><span>显示视锥</span>
              </label>
              <label class="sc-widget-item">
                <input type="checkbox" data-bind="checked: sceneEnableCollisionDetection"><span>地下模式</span>
              </label>
              <label class="sc-widget-item">
                <input type="checkbox" data-bind="checked: sceneBloomEnabled"><span>泛光效果</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import MapOptions from './MapOptions.js';


export default {
  name: 'mapOptions',
  methods: {
    close() {
      this.$store.commit('setVGEEarthComAction', {name: 'mapOptions', on_off: 2});
    }
  },
  computed: {
    show() {
      let s = store.state.VGEEarthStore.comActions.mapOptions;
      if (s) {
        new MapOptions(earth.viewer3D);
      }
      return true;
    }
  },
  mounted() {
  }
};
</script>


<style scoped>
.simpleCesium {
  position: absolute;
  left: calc(50vw);
  top: calc(40vh);
  color: #eee;
  font-family: sans-serif;
  font-size: 9pt;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.simpleCesium .sc-widgets {
  z-index: 1;
  pointer-events: none;
}

.simpleCesium .sc-widget-container {
  display: inline-block;
  vertical-align: top;
  width: 200px;
  padding: 2px;
  margin: 1px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  border: 1px solid #444444;
  pointer-events: auto;
  box-shadow: 0 0 8px 0 rgba(225, 225, 225, 0.6) inset;
}

.simpleCesium .sc-widget {
  width: 100%;
  height: 100%;
  transition: width ease-in-out 0.25s;
  display: inline-block;
  position: relative;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;
}

.simpleCesium .sc-widget input {
  vertical-align: middle;
  background: rgba(0, 0, 0, .2);
  color: inherit;
}

.simpleCesium .sc-widget input[type=text]:hover {
  box-shadow: 0 0 8px 0 rgba(225, 225, 225, 0.4) inset;
}

.simpleCesium .sc-widget input[type=checkbox]:hover {
  box-shadow: 0 0 8px rgb(255, 255, 255);
}

.simpleCesium .sc-widget button {
  vertical-align: middle;
  background: rgba(0, 0, 0, .2);
  color: inherit;
  cursor: pointer;
  font-size: inherit;
}

.simpleCesium .sc-widget button:hover {
  box-shadow: 0 0 8px rgb(255, 255, 255);
}

.simpleCesium .sc-widget .sc-widget-title {
  margin: 5px 5px 0 5px;
  height: 20px;
  border-bottom: 2px solid #eeeeee;
  font-size: small;
}

.simpleCesium .sc-widget .sc-widget-title .sc-widget-bar {
  position: absolute;
  top: 2px;
  right: 2px;
}

.simpleCesium .sc-widget .sc-widget-bar span {
  cursor: pointer;
  min-width: 16px;
  padding: 0 2px;
}

.simpleCesium .sc-widget .sc-widget-bar span:hover {
  box-shadow: 0 0 8px rgb(255, 255, 255);
}

.simpleCesium .sc-widget .sc-widget-content {
  padding: 5px;
  width: calc(100% - 10px);
  height: calc(100% - 20px);
}

.simpleCesium .sc-widget .sc-widget-group {
  display: flex;
  align-items: center;
  white-space: nowrap;
  height: 24px;
}

.simpleCesium .sc-widget .sc-widget-group span:after {
  content: '';
  width: 60%;
  position: absolute;
  border-top: 1px solid #c8c8c8;
  margin: 8px 4px;
}

.simpleCesium .sc-widget .sc-widget-item {
  display: flex;
  align-items: center;
  height: 25px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.simpleCesium .sc-widget .sc-widget-item span {
  white-space: nowrap;
}

.simpleCesium .sc-widget .sc-widget-item input {
  padding: 0;
}

.simpleCesium .sc-widget .sc-widget-item input[type=checkbox] {
  margin-left: 2px;
}

.simpleCesium .sc-widget .sc-widget-item input[type=range] {
  width: 100%;
  /*min-width: 76px;*/
}

.simpleCesium .sc-widget .sc-widget-tree {
  padding: 0;
  margin: 0;
}

.simpleCesium .sc-widget .sc-widget-tree dl {
  padding: 0;
  margin: 0;
}

.simpleCesium .sc-widget .sc-widget-tree dd {
  margin-left: 10px;
}

.simpleCesium .sc-widget .sc-widget-tree .sc-widget-item {
  white-space: nowrap;
}

.simpleCesium .sc-widget .sc-widget-treeNode {

}

.simpleCesium .sc-widget .sc-widget-treeNode:hover {
  box-shadow: 0 0 8px 0 rgba(225, 225, 225, 0.6) inset;
}

.simpleCesium .sc-widget-layerControl .sc-widget-group button {
  position: absolute;
  right: 5px;
}

.simpleCesium .sc-widget-layerControl .sc-widget-item label {
  text-overflow: ellipsis;
  overflow: hidden;
  min-width: 120px;
}

.simpleCesium .sc-widget-layerControl .sc-widget-tree dd {
  max-height: 150px;
  overflow: auto;
}

.simpleCesium .sc-widget-mapOptions .sc-widget-item {
  margin-left: 10px;
}
</style>
