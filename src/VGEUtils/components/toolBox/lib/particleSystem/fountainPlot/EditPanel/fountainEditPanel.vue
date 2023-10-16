<template>
  <div class="attr-panel">
    <div class="attr-panel-header">
      <!--      <span class="attr-panel-header-title">属性编辑</span>-->
    </div>
    <div class="attr-panel-body" @mousedown.stop>
      <el-form ref="form" label-width="100px" size="small">
        <el-form-item label="粒子数量">
          <el-slider
            @change="updateStyle"
            :min="0"
            :max="1000"
            v-model="emissionRate"
          ></el-slider>
        </el-form-item>

        <el-form-item label="粒子大小">
          <el-slider
            @change="updateStyle"
            :min="0"
            :max="60.0"
            :step="1"
            v-model="particleSize"
          ></el-slider>
        </el-form-item>

        <el-form-item label="最小生命周期">
          <el-slider
            @change="updateStyle"
            :min="0.1"
            :max="5.0"
            :step="0.2"
            v-model="minimumParticleLife"
          ></el-slider>
        </el-form-item>

        <el-form-item label="最大生命周期">
          <el-slider
            @change="updateStyle"
            :min="0.1"
            :max="5.0"
            :step="0.2"
            v-model="maximumParticleLife"
          ></el-slider>
        </el-form-item>

        <el-form-item label="最小速度">
          <el-slider
            @change="updateStyle"
            :min="0.0"
            :max="30.0"
            :step="1"
            v-model="minimumSpeed"
          ></el-slider>
        </el-form-item>

        <el-form-item label="最大速度">
          <el-slider
            @change="updateStyle"
            :min="0.0"
            :max="30.0"
            :step="1"
            v-model="maximumSpeed"
          ></el-slider>
        </el-form-item>

        <el-form-item label="初始比例">
          <el-slider
            @change="updateStyle"
            :min="0.0"
            :max="10.0"
            :step="1"
            v-model="startScale"
          ></el-slider>
        </el-form-item>

        <el-form-item label="终止比例">
          <el-slider
            @change="updateStyle"
            :min="0.0"
            :max="10.0"
            :step="1"
            v-model="endScale"
          ></el-slider>
        </el-form-item>

        <el-form-item label="重力">
          <el-slider
            @change="updateStyle"
            :min="-20"
            :max="20"
            :step="0.1"
            v-model="gravity"
          ></el-slider>
        </el-form-item>

        <el-form-item>
          <!--          <div style=" text-align: right">-->
          <!--            <el-button type="danger" @click="delClickEvent">删除粒子</el-button>-->
          <!--          </div>-->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {tabPane, winTabs} from "@/VGEUtils/components/winTabs/index.js";

import particleStore from "./particleStore.js"

export default {
  name: 'fountainEditPanel',
  components: {winTabs, tabPane},
  data() {
    return {
      endScale: 0,
      emissionRate: 0,
      particleSize: 0,
      minimumParticleLife: 0,
      maximumParticleLife: 0,
      minimumSpeed: 0,
      maximumSpeed: 0,
      startScale: 0,
      gravity: 0
    }
  },
  mounted() {
    this.emissionRate = particleStore.selectedPlot.style.emissionRate
    this.particleSize = particleStore.selectedPlot.style.particleSize
    this.minimumParticleLife = particleStore.selectedPlot.style.minimumParticleLife
    this.maximumParticleLife = particleStore.selectedPlot.style.maximumParticleLife
    this.minimumSpeed = particleStore.selectedPlot.style.minimumSpeed
    this.maximumSpeed = particleStore.selectedPlot.style.maximumSpeed
    this.startScale = particleStore.selectedPlot.style.startScale
    this.endScale = particleStore.selectedPlot.style.endScale
    this.gravity = particleStore.selectedPlot.style.gravity
  },
  methods: {
    updateStyle() {
      this.updateValue();
      particleStore.selectedPlot.updateStyle(particleStore.selectedPlot.style);//更新粒子参数
    },
    //改变粒子参数
    updateValue() {
      particleStore.selectedPlot.style.emissionRate = this.emissionRate
      particleStore.selectedPlot.style.particleSize = this.particleSize
      particleStore.selectedPlot.style.minimumParticleLife = this.minimumParticleLife
      particleStore.selectedPlot.style.maximumParticleLife = this.maximumParticleLife
      particleStore.selectedPlot.style.minimumSpeed = this.minimumSpeed
      particleStore.selectedPlot.style.maximumSpeed = this.maximumSpeed
      particleStore.selectedPlot.style.startScale = this.startScale
      particleStore.selectedPlot.style.endScale = this.endScale
      particleStore.selectedPlot.style.gravity = this.gravity
    },
    //根据plotCode删除单个粒子
    // delClickEvent() {
    //   this.$emit("delClickEvent", this.plot.properties.plotCode);
    // }
  },
};
</script>

<style scoped>
.attr-panel-body :deep( .el-form-item--mini.el-form-item),
.attr-panel-body :deep( .el-form-item--small.el-form-item) {
  margin-bottom: 0;
}
</style>
