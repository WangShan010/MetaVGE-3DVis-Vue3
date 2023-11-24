/****************************************************************************
名称：地区导航
描述：地区导航功能，视角可以飞行到省，市，区

最后修改日期：2021-04-24
****************************************************************************/


<template>
  <win-tabs :initCSS="{width: 300,height: 530,left:500,top:140}" v-if="show" @close="close">
    <tab-pane label="地区导航">
      <areaNavigationContent></areaNavigationContent>
    </tab-pane>
  </win-tabs>
</template>
<script>
import areaNavigationContent from './areaNavigationContent.vue';
import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';

export default {
  name: 'areaNavigation',
  components: {
    areaNavigationContent,
    winTabs,
    tabPane
  },
  methods: {
    /**
     * 关闭事件 移除所有entity
     */
    close() {
      this.$store.commit('setVGEEarthComAction', {name: 'areaNavigation', on_off: 2});
      window.earth.viewer3D.entities.removeById('areaPolygon');
    },
  },
  computed: {
    show() {
      return this.$store.getters.comStatus('areaNavigation');
    },
  },
};
</script>
<style scoped>
</style>

