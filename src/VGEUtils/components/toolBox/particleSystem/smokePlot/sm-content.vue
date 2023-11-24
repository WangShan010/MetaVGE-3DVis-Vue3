<template>
  <win-tabs :initCSS="{width: 300,height: 290,left:500,top:330}" @close="close">
    <tab-pane label="烟雾粒子">
      <div class="app-wrapp">
        <div class="symbol-item">
          <img class="symbol-img" :src="symbolList.symbolImage" alt="fountain"/>
          <span class="symbol-name">{{ symbolList.name }}</span>
        </div>
        <smokeEditPanel v-if="maximumSpeed!=null"/>
        <br/>
        <button @click="clear()" style="margin-right: 40px" class="btn btn-sm btn-success">清空</button>
        <!--<button @click="pickPoint()" class="btn btn-sm btn-success">保存</button>-->
        <button @click="pickPoint()" class="btn btn-sm btn-success">添加</button>
      </div>
    </tab-pane>
  </win-tabs>
</template>

<script>
import {tabPane, winTabs} from "@/VGEUtils/components/winTabs/index.js";

import smokeEditPanel from "./EditPanel/smokeEditPanel.vue";
import particleStore from "./EditPanel/particleStore.js"

let particlePlot;

export default {
  name: 'smoke-content',
  components: {winTabs, tabPane, smokeEditPanel},
  data: function () {
    return {
      maximumSpeed: null,//控制粒子参数显隐
      plotSelecteable: false,//默认元素不可选
      symbolList:
        {
          name: "烟雾",
          type: "fire",
          symbolImage: new URL("../img/smoke.jpg", import.meta.url).href,
        },
    };
  },

  methods: {
    pickPoint() {
      let that = this;
      let drawShape = new VGEEarth.DrawShape(VGEEarth.getMainViewer());
      drawShape.drawPoint({
        coordinateType: 'cartographicObj',
        endCallback: function (ps) {
          // particlePlot = new VGEEarth.SmokePlot(earth.viewer3D, ps[0].longitude, ps[0].latitude, ps[0].height, undefined)
          // particleStore.plots.push(particlePlot);
          // that.particleListener();//开启监听
          let entity = earth.viewer3D.entities.add({
            position: Cesium.Cartesian3.fromDegrees(ps[0].longitude, ps[0].latitude, ps[0].height)
          });
          particlePlot = new VGEEarth.SmokePlot(entity);
          particleStore.plots.push(particlePlot);
          that.particleListener();//开启监听
        },
        errCallback: function () {
          that.clear()
        }
      })
    },

    //监听点击粒子
    particleListener() {
      let that = this;
      VGEEarth.EventMana.screenEvent.addEventListener(
        VGEEarth.EventMana.ListenType.ScreenSpaceEventType.LEFT_CLICK,
        VGEEarth.EventMana.ScopeType.Viewer3D,
        function (e) {
          let pick = earth.viewer3D.scene.pick(e.position);
          if (!pick) {
            that.selectedEntityChanged(undefined);
            return;
          }
          //拾取到粒子系统对象
          if (pick.primitive && pick.collection) {
            that.selectedEntityChanged(pick);
          } else {
            that.selectedEntityChanged(undefined);
          }
        }
      );
    },

    //选中粒子，把该粒子存入particleStore
    selectedEntityChanged(selectedEntity) {
      let that = this;
      if (!selectedEntity) {
        that.clearSelectedPlot();
        return;
      }
      const plot = this.getPlotBy_textureAtlasGUID(selectedEntity.collection._textureAtlasGUID);
      if (!plot) {
        that.clearSelectedPlot();
        return;
      }
      particleStore.selectedPlot = plot;
      this.maximumSpeed = plot.style.maximumSpeed;
    },

    setPlotSelectable(selecteable) {
      this.plotSelecteable = selecteable;
    },

    //获取粒子对象
    getPlotBy_textureAtlasGUID(_textureAtlasGUID) {
      for (let i = 0; i < particleStore.plots.length; i++) {
        let plot = particleStore.plots[i];
        if (plot.particleSystem._billboardCollection._textureAtlasGUID == _textureAtlasGUID) {
          return plot;
        }
      }
    },

    //隐藏粒子信息
    clearSelectedPlot() {
      if (particleStore.selectedPlot) {
        this.maximumSpeed = undefined;
      }
    },

    //清空
    clear() {
      particleStore.plots.forEach(item => {
        item.remove();
      })
      particleStore.plots = [];
      this.maximumSpeed  = null
    },
    close() {
      this.clear();
      this.$store.commit('setVGEEarthComAction', {name: 'smokePlot', on_off: 2});
    }
  },
};
</script>

<style scoped>
label {
  color: #009b94;
}

.app-wrapp {
  text-align: center;
  margin-bottom: 5px;
}

.symbol-item {
  margin: 2px;
  height: 160px;
  width: 180px;
  display: inline-block;
  position: relative;
}

.symbol-img {
  height: 100%;
  width: 100%;
}

.symbol-name {
  display: inline-block;
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  text-align: center;
  background: #14549e;
  color: white;
}
</style>
