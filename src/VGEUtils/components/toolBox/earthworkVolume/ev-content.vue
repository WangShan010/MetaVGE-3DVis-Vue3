<template>
  <win-tabs :initCSS="{width: 450,height: 400,left:400,top:300}" @close="close">
    <tab-pane label="土方量计算">
      <div @mousedown.stop>
        <div>
          数据集：
          <el-select v-model.number="tifData" placeholder="请选择" size="small">
            <el-option
                v-for="item in tifGroup"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div v-if="tifInfo" style="margin: 10px 0">
          数据集基本信息：
          <div class="dataGroupInfo">
            {{ tifInfo.dataText }}
          </div>
        </div>
        <div v-if="earthworkVolumeData">
          土方量计算结果：
          <div class="resContent">
            <div class="dataFields" v-for="item in earthworkVolumeData.fields">
              {{ item.alias }}：{{ earthworkVolumeData.data[item.name] }}
            </div>
            <hr>
            <div class="dataText">
              {{ earthworkVolumeData.dataText }}
            </div>
          </div>
        </div>
        <div class="ctrBtns">
          <button type="button" class="btn btn-sm btn-success" :disabled="!tifData" @click="selPolygon">框选范围
          </button>
          <button type="button" class="btn btn-sm btn-warning" @click="clearRes">重置</button>
        </div>
      </div>
    </tab-pane>
  </win-tabs>
</template>

<script>

import {tabPane, winTabs} from "@/VGEUtils/components/winTabs/index.js";

let fakeTifInfo = {
  "fields": [
    {"name": "east", "alias": "影像最东边经度"},
    {"name": "west", "alias": "影像最西边经度"},
    {"name": "north", "alias": "影像最北边纬度"},
    {"name": "south", "alias": "影像最南边纬度"},
    {"name": "tif1Address", "alias": "影像1地址"},
    {"name": "tif2Address", "alias": "影像2地址"}
  ],
  "data": {
    "east": 117,
    "west": 116,
    "north": 40,
    "south": 39,
    "tif1Address": "tif/tif1.tif",
    "tif2Address": "tif/tif2.tif"
  },
  "dataText": "所查询的影像组经纬度范围：116 117 39 40 文件路径：tif/tif1.tif,tif/tif2.tif",
  "msg": "数据返回成功"
};

let earthworkVolumeFakeData = {
  "fields": [
    {
      "name": "reNum",
      "alias": "影像高程变低的像元数"
    },
    {
      "name": "reSoil",
      "alias": "减少的土方量"
    },
    {
      "name": "upNum",
      "alias": "影像高程变高的像元数"
    },
    {
      "name": "upSoil",
      "alias": "增加的土方量"
    },
    {
      "name": "calRes",
      "alias": "土方量变化"
    }
  ],
  "data": {
    "reNum": 0,
    "reSoil": 0,
    "upNum": 4374,
    "upSoil": 60695681.6262207,
    "calRes": 60695681.6262207
  },
  "dataText": "土方量计算结果为：共有0个像元变低。该部分像元共减少了0.000000立方米的土。共有4374个像元变高。该部分像元共增加了60695681.626221立方米的土。该部分像元土方量变化值为60695681.626221立方米。当前Tif影像边界为：116 117 39 40",
  "msg": "数据返回成功"
};

let redRectangle = null;

export default {
  name: "ev-content",
  components: {winTabs, tabPane},
  data() {
    return {
      tifGroup: [
        {id: 1, name: "测试数据集"}
      ],
      tifData: null,
      tifInfo: null,
      earthworkVolumeData: null,
    };
  },
  methods: {
    async loadTifDataGroup() {
      this.tifInfo = fakeTifInfo;
      this.addTifRectangle();
    },
    async selPolygon() {
      let that = this;
      earth.drawShape.drawPolygon({
        coordinateType: "cartographicPoiArr",
        endCallback: (positions) => {
          that.getEarthworkVolume(positions);
        }
      });
    },
    async getEarthworkVolume(positions) {
      let positionText = JSON.stringify(positions);

      this.earthworkVolumeData = earthworkVolumeFakeData;
    },
    addTifRectangle() {
      earth.viewer3D.entities.remove(redRectangle);
      redRectangle = earth.viewer3D.entities.add({
        name: "Red translucent rectangle",
        rectangle: {
          coordinates: Cesium.Rectangle.fromDegrees(
              this.tifInfo.data.west,
              this.tifInfo.data.south,
              this.tifInfo.data.east,
              this.tifInfo.data.north
          ),
          material: Cesium.Color.RED.withAlpha(0.2),
          outline: true,
          outlineColor: Cesium.Color.YELLOW,
        },
      });

      earth.viewer3D.zoomTo(redRectangle);
    },

    clearRes() {
      this.tifData = null;
      this.tifInfo = null;
      this.earthworkVolumeData = null;

      earth.viewer3D.entities.remove(redRectangle);
    },
    close() {
      this.$store.commit("setVGEEarthComAction", {name: "earthworkVolume", on_off: 2});
    }
  },
  watch: {
    tifData(newV, oldV) {
      if (newV) {
        this.loadTifDataGroup();
        this.addTifRectangle();
      }
    }
  },
  mounted() {
  },
  unmounted() {
    this.clearRes();
  }
};
</script>

<style lang="less" scoped>
.dataGroupInfo {
  padding: 10px;
  color: #f9fbd7;
}

.resContent {
  padding: 10px;
  color: #f9fbd7;
  overflow: auto;
}

.dataFields {
  padding: 3px;
}

.dataText {
  padding: 5px;
}


.ctrBtns {
  text-align: center;

  button {
    margin: 10px;
  }
}
</style>