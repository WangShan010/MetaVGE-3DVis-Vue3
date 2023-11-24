/****************************************************************************
名称：量测工具 显隐控制器
作者：冯功耀
最后修改日期：2022-04-20
****************************************************************************/

<template>
  <uvaContent v-if="show"></uvaContent>
</template>

<script>
import uvaContent from './uva-content.vue';

export default {
  name: 'measureTool',
  components: {uvaContent},
  computed: {
    show() {
      return this.$store.getters.comStatus('uvaTool');
    }
  }
};
</script>
