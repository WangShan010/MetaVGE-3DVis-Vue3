<template>
  <div class="toolRow">
    <button class="btn btn-info btn-sm" @click="start">特效演示</button>
    <button class="btn btn-info btn-sm" @click="reset">清空效果</button>
    <br>
    <button class="btn btn-info btn-sm" @click="addEarthTopoLines">地球拓扑</button>
    <button class="btn btn-info btn-sm" @click="removeEarthTopoLines">清除地球拓扑</button>
  </div>
</template>

<script>

import geoJson from './line.json';
import {addMigrateLines,removeMigrateLines} from "./js/PolyLineMigrate.js";
import {addSuperLines,removeSuperLines} from "./js/PolyLineSuper.js";
import {addVolumeTrialLines,removeVolumeTrial} from "./js/PolyLineVolumeTrial.js";
import {addEarthTopo,removeEarthTope} from "./js/EarthTopo.js";

let plotDataSource;
export default {
  name: 'polyLineEffect',
  data() {
    return {
      isPlaying: false
    };
  },
  methods: {
    start() {
      addSuperLines();
      addMigrateLines();
      addVolumeTrialLines();
      this.isPlaying = true
      plotDataSource = new VGEEarth.PlotDataSource();
      plotDataSource.load(geoJson, {
        clampToGround: true
      });
      earth.viewer3D.dataSources.add(plotDataSource).then();
      earth.viewer3D.flyTo(plotDataSource);
    },
    reset() {
      removeSuperLines();
      removeMigrateLines();
      removeVolumeTrial();
      if (this.isPlaying) {
        plotDataSource.entities.removeAll();
        earth.viewer3D.dataSources.remove(plotDataSource);
      }
      this.isPlaying = false;
    },
    addEarthTopoLines(){
      addEarthTopo();
    },
    removeEarthTopoLines(){
      removeEarthTope();
    },
  },
  unmounted() {
    this.reset();
  },
};
</script>


<style scoped>
.toolRow {
  text-align: center;
}
.toolRow button {
    margin-right: 5px;
    margin-top: 5px;
}
</style>
