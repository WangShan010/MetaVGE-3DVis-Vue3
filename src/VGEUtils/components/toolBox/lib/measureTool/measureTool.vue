/****************************************************************************
名称：量测工具 显隐控制器
作者：冯功耀
最后修改日期：2022-04-20
****************************************************************************/

<template>
    <ms-content v-if="show"></ms-content>
</template>

<script>
import MsContent from './ms-content.vue';

export default {
  name: 'measureTool',
  components: {MsContent},
  computed: {
    show() {
      return this.$store.getters.comStatus("measureTool")
    }
  }
};
</script>
