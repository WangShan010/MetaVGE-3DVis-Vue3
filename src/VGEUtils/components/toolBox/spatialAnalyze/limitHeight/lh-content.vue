<template>
  <win-tabs :initCSS="{width: 320,height: 180,left:500,top:330}" @close="close" :draggable="isDragging">
    <tab-pane label="限高分析">
      <div @mousedown.stop>
        <div style="margin-bottom: 5px">
          <el-row>
            <el-col :span="8"><label class="label-container">高度</label></el-col>
            <el-col :span="13">
              <el-slider
                  input-size="small"
                  @mousedown="handleMouseDown"
                  @mouseup="handleMouseUp"
                  v-model="height"
                  :min="minHeight"
                  :max="maxHeight"
                  :step="1"
                  @input="setHeight"
              ></el-slider>
            </el-col>
          </el-row>
        </div>

        <div style="text-align: center;padding-top: 10px">
          <button class="btn btn-info btn-sm" @click="setPolygon()" style="margin-right: 10px;margin-left: 50px">添加限高面</button>
          <button class="btn btn-warning btn-sm" @click="removeAll()">重置</button>
        </div>
      </div>
    </tab-pane>
  </win-tabs>
</template>

<script>
import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';


let limitHeight;
export default {
  name: 'lh-content',
  components: {winTabs, tabPane},
  data: function () {
    return {
      minHeight: 0,
      maxHeight: 0,
      height: 38,
      isDragging: true
    };
  },
  methods: {
    handleMouseDown() {
      this.isDragging = false; // 鼠标按下时设置 isDragging 为 true
    },

    handleMouseUp() {
      this.isDragging = true; // 鼠标松开时设置 isDragging 为 false
    },
    setPolygon() {
      let that = this;
      that.removeAll();
      earth.drawShape.drawPolygon({
        coordinateType: 'cartographicObj',
        endCallback: function (points) {
          let degreesArray = [];
          points.forEach((item, index) => {
            // 因为 polygon 是闭合多边形
            if (index < points.length - 1) {
              degreesArray.push(item.longitude);
              degreesArray.push(item.latitude);
              that.minHeight = Math.ceil(item.height - 20);
              that.maxHeight = Math.ceil(item.height + 20);
            }
          });
          limitHeight = new VGEEarth.LimitHeight(earth.viewer3D, degreesArray, 200);
        }
      });
    },
    setHeight() {
      limitHeight && limitHeight.setHeight(this.height);
    },
    removeAll() {
      limitHeight && limitHeight.remove();
    },
    close() {
      this.$store.commit('setVGEEarthComAction', {name: 'limitHeight', on_off: 2});
    }
  },
  mounted() {
    earth.viewer3D.scene.camera.flyTo({
      "destination": {
        "x": -2896007.698942079,
        "y": 4718005.022260547,
        "z": 3157850.6972098127
      },
      "cartographic": {
        "longitude": 121.54245,
        "latitude": 29.86759,
        "height": 393.80544
      },
      "orientation": {
        "heading": 5.230354012872745,
        "pitch": -0.6630332728828456,
        "roll": 0.000029945313731793988
      }
    });
  },
  unmounted() {
    this.removeAll();
  }
};
</script>


<style scoped>
label {
  color: #009b94;
}
</style>
