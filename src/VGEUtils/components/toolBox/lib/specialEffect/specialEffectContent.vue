<template>
  <div class="tool-effect-menu">
    <div v-for="item in tool" style="height:25px;" class="liBox">
      <div>
        <img :src="item.iconUrl" :alt="item.name">
        <label class="label-container" style="color:white;">{{ item.name }}</label>
      </div>
      <el-slider class="slider-value"
                 v-model="dbtmValue"
                 v-if="item.class == 'dbtm'"
                 :show-tooltip="true"
                 @input="valueChange1"
                 :step="0.1"
                 :min="0"
                 :max="1"
      ></el-slider>
      <el-slider class="slider-value"
                 v-model="dxkzValue"
                 v-if="item.class == 'dxkz'"
                 :show-tooltip="true"
                 @input="valueChange"
                 :step="1"
                 :min="0"
                 :max="5"
      ></el-slider>
      <el-switch v-model=item.value.a v-else active-color="#13ce66" inactive-color="#929090"
                 @change="item.status = toggleEffect(item.class, item.status)">
      </el-switch>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpecialEffectContent',
  data() {
    return {
      dxkzValue: 1,
      dbtmValue: 0.8,
    };
  },
  props: ['tool', 'toggleEffect'],
  methods: {
    valueChange() {
      earth.viewer3D.scene.globe.terrainExaggeration = this.dxkzValue;
    },
    valueChange1() {
      earth.viewer3D.scene.globe.translucency.frontFaceAlpha = this.dbtmValue;
    },
  }
};
</script>

<style scoped>
.tool-effect-menu {
  border-bottom: 1px solid rgba(185, 197, 185, 0.2);
}

.liBox {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}

::v-deep( .el-switch .el-switch__core) {
  width: 30px !important;
  height: 15px;
}

::v-deep(.el-switch  .el-switch__core::after) {
  width: 14px;
  height: 14px;
  margin-top: -1px;
  margin-bottom: 2px;
}

.el-slider {
  width: 70px;
}

</style>
