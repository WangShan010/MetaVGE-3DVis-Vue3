/****************************************************************************
名称：天空盒 的逻辑处理
作者：冯功耀
最后修改日期：2022-04-20
****************************************************************************/

<template>
  <win-tabs :initCSS="{width: 310,height: 190,left:400,top:120}" @close="close">
    <tab-pane label="天空盒">
      <div>
        <div>
          <el-row class="form-item">
            <el-col :span="8">
              <label class="label-container">远景天空盒</label>
            </el-col>
            <el-col :span="16">
              <el-select v-model="farSkyBox"
                         placeholder="请选择" @change="setFarSkyBox"
                         size="small" clearable>
                <el-option
                    v-for="item in farSkyBoxInfoList"
                    :key="item.index"
                    :label="item.name"
                    :value="item.index">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="form-item">
            <el-col :span="8">
              <label class="label-container">地面天空盒</label>
            </el-col>
            <el-col :span="16">
              <el-select v-model="groundSkyBox"
                         placeholder="请选择" @change="setGroundSkyBox" size="small" clearable>
                <el-option
                    v-for="item in groundSkyBoxInfoList"
                    :key="item.index"
                    :label="item.name"
                    :value="item.index">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <div style="text-align: center;padding-top: 10px">
            <button class="btn btn-primary btn-sm" @click="flyToFar" style="margin-right: 5px;margin-left: 80px">远景</button>
            <button class="btn btn-success btn-sm" @click="flyToGround" style="margin-right: 5px">近景</button>
            <button class="btn btn-warning btn-sm" @click="reset" style="margin-right: 5px">重置</button>
          </div>
        </div>
      </div>
    </tab-pane>
  </win-tabs>
</template>

<script>

import {tabPane, winTabs} from "@/VGEUtils/components/winTabs/index.js";

let SkyBox;
let measureTool;
export default {
  name: 'sb-content',
  components: {winTabs, tabPane},
  data() {
    return {
      farSkyBox: 0,
      farSkyBoxInfoList: [],
      groundSkyBox: 0,
      groundSkyBoxInfoList: []
    };
  },
  methods: {
    async loadConfig() {
      let {data: skybox} = await axios.get( new URL('/VGEEarth/Config/skybox/skybox.json', import.meta.url).href);
      let baseUrl = skybox.baseUrl;

      let farSkyBoxList = [];
      for (let i = 0; i < skybox.farSkyBoxList.length; i++) {
        this.farSkyBoxInfoList.push({
          index: i,
          name: skybox.farSkyBoxList[i].name
        });
        farSkyBoxList.push(new Cesium.SkyBox({
          sources: {
            positiveX: baseUrl + skybox.farSkyBoxList[i].sources.positiveX,
            negativeX: baseUrl + skybox.farSkyBoxList[i].sources.negativeX,
            positiveY: baseUrl + skybox.farSkyBoxList[i].sources.positiveY,
            negativeY: baseUrl + skybox.farSkyBoxList[i].sources.negativeY,
            positiveZ: baseUrl + skybox.farSkyBoxList[i].sources.positiveZ,
            negativeZ: baseUrl + skybox.farSkyBoxList[i].sources.negativeZ
          }
        }));
      }
      SkyBox.farSkyBox = farSkyBoxList[0];
      SkyBox.farSkyBoxList = farSkyBoxList;

      let groundSkyBoxList = [];
      for (let i = 0; i < skybox.groundSkyBoxList.length; i++) {
        this.groundSkyBoxInfoList.push({
          index: i,
          name: skybox.groundSkyBoxList[i].name
        });
        groundSkyBoxList.push(new Cesium.GroundSkyBox({
          sources: {
            positiveX: baseUrl + skybox.groundSkyBoxList[i].sources.positiveX,
            negativeX: baseUrl + skybox.groundSkyBoxList[i].sources.negativeX,
            positiveY: baseUrl + skybox.groundSkyBoxList[i].sources.positiveY,
            negativeY: baseUrl + skybox.groundSkyBoxList[i].sources.negativeY,
            positiveZ: baseUrl + skybox.groundSkyBoxList[i].sources.positiveZ,
            negativeZ: baseUrl + skybox.groundSkyBoxList[i].sources.negativeZ
          }
        }));
      }
      SkyBox.groundSkyBox = groundSkyBoxList[0];
      SkyBox.groundSkyBoxList = groundSkyBoxList;
    },
    flyToGround() {
      let s = VGEEarth.ConfigTool.getSourcesItemByPid('80f3778c-c8dc-481b-2122-b90e04fd3104');
      earth.viewer3DWorkSpace.addData(s);

      earth.viewer3D.camera.flyTo({
        'destination': {
          'x': -2895596.962457116,
          'y': 4717490.945820842,
          'z': 3158425.3777735666
        },
        'orientation': {
          'heading': 3.8736780571268605,
          'pitch': -0.13964038346926966,
          'roll': 6.283183317671659
        }
      });
    },
    flyToFar() {
      earth.viewer3D.camera.flyHome();
    },
    setFarSkyBox(index = 0) {
      SkyBox.setFarSkyBox(index);
    },
    setGroundSkyBox(index = 0) {
      SkyBox.setGroundSkyBox(index);
    },
    reset() {
      SkyBox.reset();
      this.farSkyBox = 0;
      this.setFarSkyBox();
      this.groundSkyBox = 0;
      this.setGroundSkyBox();
    },
    close() {
      this.$store.commit('setVGEEarthComAction', {name: 'skyBoxTool', on_off: 2});
    }
  },
  async mounted() {
    SkyBox = new VGEEarth.SkyBoxOnGround(earth.viewer3D);
    await this.loadConfig();
  },
  unmounted() {
    SkyBox.destroy();
  }
};
</script>


<style scoped>
label {
  color: #009b94;
}

.form-item {
  margin-bottom: 5px;
}
</style>
