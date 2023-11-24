/****************************************************************************
名称：可视域 显隐控制器
作者：冯功耀
最后修改日期：2022-04-20
****************************************************************************/

<template>

    <VSContent v-if="show"></VSContent>

</template>

<script>
import VSContent from './vs-content.vue';

export default {
  name: 'viewShedStage',
  components: {VSContent},
  computed: {
    show() {
      return this.$store.getters.comStatus('viewShedStage');
    }
  }
};
</script>
