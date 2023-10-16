<template>
  <div class="header">
    <div v-show="isShowMenu" class="btns btn-left">
      <div class="title-btn">视频数据</div>
      <div class="title-btn">场景模拟</div>
    </div>
    <div class="title" style="width: 35%;text-align: center">{{ appName }}</div>
    <div v-show="isShowMenu" class="btns btn-right">
      <div class="title-btn">标绘工具</div>
      <div class="title-btn">大数据分析</div>
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
