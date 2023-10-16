<template>
  <div id="tool" class="tool" v-if="show">
    <div :class="{ 'tool-btn': true, 'tool-double': toolList.length > 6 }"
         :style="{ width: toolList.length > 11 ? '220px' : '120px' }">
      <div v-for="item in toolList" :style="item.comName ? '' : 'cursor:not-allowed;'"
           style="padding:0 10px;margin: 1px" :class="{ 'tool-selected': selItem === item.name }"
           @click="toggleActive(item)">
        <img v-if="item.config.iconUrl" :src="item.config.iconUrl">
        <b v-if="item.config.iconClass" :class="'iconfont icon-' + item.config.iconClass" style="color: white"></b>
        <span style="display:inline-block;width:56px;text-align: left">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toolBox',
  data() {
    return {
      toolList: [],
      selItem: '图上量算'
    };
  },
  methods: {
    toggleActive(ToolBoxItem) {
      // 验证是否为点击事件，是则继续执行click事件，否则不执行
      let isClick = document
          .getElementById('tool')
          .getAttribute('data-flag');


      if (isClick !== 'false') {
        switch (ToolBoxItem.type) {
          case 'ToolBoxItem':
            this.toolList.forEach(element => {
              if (element.comName === ToolBoxItem.comName) {
                this.$store.commit('setVGEEarthComAction', {name: ToolBoxItem.comName, on_off: 3});
              } else if (element.comName) {
                this.$store.commit('setVGEEarthComAction', {name: element.comName, on_off: 2});
              }
            });
            break;
          case 'ZhiBei':
            this.$store.commit('setZhiBeiComAction', {name: ToolBoxItem.comName, on_off: 3});
            break;
        }
      }

      this.selItem = ToolBoxItem.name;
    }
  },
  computed: {
    show: function () {
      return this.$store.getters.comStatus('toolBox');
    },
    comActions() {
      return this.$store.state.VGEEarthStore.comActions.filter(item =>
          item.type === 'ToolBoxItem' && item.config.inToolBox === true
      );
    }
  },
  // mounted(){
  //   // 读取历史更改的插件
  //   let VGEConfig = localStorage.getItem('VGEConfig');
  //   VGEConfig = VGEConfig ? JSON.parse(VGEConfig) : null;
  //   if (VGEConfig && VGEConfig.Version === VGEEarth.ConfigTool.config.Version) {
  //       this.$store.commit("readCom", VGEConfig.comActions)
  //   }
  // },
  watch: {
    comActions: {
      handler(val) {
        this.toolList = val;
      },
      deep: true,
      immediate: true
    }
  }
};
</script>


<style scoped lang='less'>
@import "../../assets/css/common-theme.less";
@import "../../assets/css/green-theme.less";
@import "../../assets/css/yellow-theme.less";
</style>

<style scoped>
.tool-double {
  width: 220px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>

