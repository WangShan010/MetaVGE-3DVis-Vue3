<template>
  <win-tabs :initCSS="{width: 450,height: 400,left:400,top:300}" @close="close">
    <tab-pane label="土方量计算">
      <div @mousedown.stop>
        <div>
          <span style="display:inline-block;width: 110px">原数据集：</span>
          <el-select v-model="selBackgroundDataId" placeholder="请选择" size="small" clearable @change="selTifDataGroup">
            <el-option
                v-for="item in tifGroup"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
          <template v-if="selBackgroundDataId">
            <el-popconfirm title="确认从服务器上永久删除该 Tif 文件?" @confirm="delTif(selBackgroundDataId)">
              <template #reference>
                <el-button size="small" type="danger" style="margin-left:10px">删除</el-button>
              </template>
            </el-popconfirm>
            <el-button size="small" type="success" @click="downloadTif(selBackgroundDataId)">下载</el-button>
          </template>
        </div>
        <div style="padding: 10px 0">
          <span style="display:inline-block;width: 110px">滑坡后数据集：</span>
          <el-select v-model="selLandslideDataId" placeholder="请选择" size="small" clearable @change="selTifDataGroup">
            <el-option
                v-for="item in tifGroup"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
          <template v-if="selLandslideDataId">
            <el-button size="small" type="danger" style="margin-left:10px" @click="delTif(selLandslideDataId)">删除</el-button>
            <el-button size="small" type="success" @click="downloadTif(selLandslideDataId)">下载</el-button>
          </template>
        </div>
        <div>
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

          <el-button size="small" type="primary" :disabled="!(selBackgroundDataId&&selLandslideDataId)" @click="selPolygon">框选范围</el-button>
          <el-button size="small" type="warning" @click="clearRes">重置</el-button>
        </div>
      </div>
    </tab-pane>
    <tab-pane label="上传文件">
      <!--      <el-button size="small" type="success">新上传 Tif 数据</el-button>-->
      <el-upload
          ref="upload"
          action="http://39.107.89.250:8485/uploadTif"
          :on-success="uploadSuccess"
          :limit="1"
      >
        <template #trigger>
          <el-button type="primary">新上传 Tif 数据</el-button>
        </template>
        <template #tip>
          <div class="el-upload__tip text-red">
            单次限制上传一个文件，选取新文件后会覆盖原文件
          </div>
        </template>
      </el-upload>
    </tab-pane>
  </win-tabs>
</template>

<script>
import {tabPane, winTabs} from '@/VGEUtils/components/winTabs/index.js';

let redRectangle = [null, null];
let polygonEntity = null;
export default {
  name: 'ev-content',
  components: {winTabs, tabPane},
  data() {
    return {
      tifGroup: [],
      tifInfo: null,

      backgroundData: null,
      landslideData: null,
      selBackgroundDataId: null,
      selLandslideDataId: null,

      earthworkVolumeData: null,
      fields: []
    };
  },
  methods: {
    // 载入 Tif 数据集
    async loadTifDataGroup() {
      const {data} = await axios.get('http://39.107.89.250:8485/get_tif_info');
      this.fields = data.tif_fields;
      this.tifGroup = [];

      for (const dataKey in data) {
        if (dataKey === 'tif_fields') {
          this.fields = data[dataKey];
        } else {
          data[dataKey].id = dataKey;
          this.tifGroup.push(data[dataKey]);
        }
      }
    },
    selTifDataGroup() {
      this.backgroundData = this.tifGroup.find(item => item.id === this.selBackgroundDataId);
      this.landslideData = this.tifGroup.find(item => item.id === this.selLandslideDataId);

      this.addTifRectangle(this.backgroundData, 0);
      this.addTifRectangle(this.landslideData, 1);
    },

    async selPolygon() {
      let that = this;
      earth.drawShape.drawPolygon({
        coordinateType: 'cartographicPoiArr',
        endCallback: (positions) => {
          that.getEarthworkVolume(positions);
        }
      });
    },
    async getEarthworkVolume(positions) {
      let newPosition = positions.map(item => [item[0], item[1]]);

       polygonEntity = earth.viewer3D.entities.add({
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArray(newPosition.flat()),
          material: Cesium.Color.GREEN.withAlpha(0.2),
          outline: true,
          outlineColor: Cesium.Color.RED
        }
      });

      let positionText = JSON.stringify(newPosition);

      let {data} = await axios.get(`http://39.107.89.250:8485/cal/${this.selBackgroundDataId}/${this.selLandslideDataId}/${positionText}`);

      this.earthworkVolumeData = data;
    },
    addTifRectangle(tifInfo, index = 0) {
      earth.viewer3D.entities.remove(redRectangle[index]);
      if (!tifInfo) return;
      redRectangle[index] = earth.viewer3D.entities.add({
        name: 'Red translucent rectangle',
        rectangle: {
          coordinates: Cesium.Rectangle.fromDegrees(
              tifInfo.geographic_extent.left,
              tifInfo.geographic_extent.bottom,
              tifInfo.geographic_extent.right,
              tifInfo.geographic_extent.top
          ),
          material: Cesium.Color.RED.withAlpha(0.2),
          outline: true,
          outlineColor: Cesium.Color.YELLOW
        }
      });

      earth.viewer3D.zoomTo(redRectangle[index]);
    },

    downloadTif(tifId) {
      if (!tifId) return;

      let a = document.createElement('a');
      a.style = 'display: none'; // 创建一个隐藏的a标签
      a.download = tifId;
      a.href = `http://39.107.89.250:8485/downloadTif/${tifId}`;
      document.body.appendChild(a);
      a.click(); // 触发a标签的click事件
      document.body.removeChild(a);
    },
    delTif(tifId) {
      axios.post('http://39.107.89.250:8485/deleteTif/' + tifId).then(() => {
        this.clearRes();
        this.loadTifDataGroup();
        this.$message({
          message: '删除 Tif 文件成功',
          type: 'warning'
        });
      });
    },

    uploadSuccess() {
      this.$message({
        message: '上传成功',
        type: 'success'
      });
      this.loadTifDataGroup();
    },

    clearRes() {
      this.selBackgroundDataId = null;
      this.selLandslideDataId = null;
      this.backgroundData = null;
      this.landslideData = null;
      this.earthworkVolumeData = null;

      if (polygonEntity) {
        earth.viewer3D.entities.remove(polygonEntity);
      }
      earth.viewer3D.entities.remove(redRectangle[0]);
      earth.viewer3D.entities.remove(redRectangle[1]);
    },
    close() {
      this.$store.commit('setVGEEarthComAction', {name: 'earthworkVolume', on_off: 2});
    }
  },
  mounted() {
    this.loadTifDataGroup();
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