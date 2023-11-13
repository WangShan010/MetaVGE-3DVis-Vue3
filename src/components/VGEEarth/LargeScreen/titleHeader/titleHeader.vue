<template>
  <div class="header">
    <div v-show="isShowMenu" class="btns btn-left">
      <div class="title-btn"><a href="http://8.146.208.114:8083/" target="_blank" style="color: whitesmoke">用户手册</a></div>
      <div class="title-btn"><a href="http://8.146.208.114:3000/VGEEarth-SDK-API/index.html" target="_blank" style="color: whitesmoke">API文档</a></div>
    </div>
    <div class="title" style="width: 35%;text-align: center">{{ appName }}</div>
    <div v-show="isShowMenu" class="btns btn-right">
      <div class="title-btn"><a href="http://8.146.208.114:3000/MetaVGE-3DVis-Vue3/index.html#/example" target="_blank" style="color: whitesmoke">代码示例</a></div>
      <div class="title-btn"><a style="color: whitesmoke" target="_blank">案例展示</a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tileHeader',
  data: function () {
    return {
      themeColor: 'green', // 支持换肤功能 green ：原始绿 yellow ：黄
      isShowMenu: true
    };
  },
  computed: {
    appName() {
      return VGEEarth.ConfigTool.config.appName;
    }
  },
  methods: {
    titleClickEvent() {
      const titleDoms = document.querySelectorAll('.title-btn');
      titleDoms.forEach(item => {
        item.addEventListener('click', function () {
          const preActive = document.querySelector('.active');
          if (preActive) {
            preActive.classList.remove('active');
          }
          item.classList.add('active');
        });
      });
    },
  },
  mounted() {
    let that = this;
    window.addEventListener('resize', function () {
      that.isShowMenu = innerWidth > 850;
    });
    this.titleClickEvent();

  }
};
</script>

<style scoped lang='less'>
@import "../assets/css/common-theme.less";
@import "../assets/css/green-theme.less";
@import "../assets/css/yellow-theme.less";
</style>
