/****************************************************************************
名称：可视域 显隐控制器
最后修改日期：2022-04-20
****************************************************************************/

<template>

    <LHContent v-if="show"></LHContent>

</template>

<script>
import LHContent from './lh-content.vue';

export default {
  name: 'limitHeight',
  components: {LHContent},
  computed: {
    show() {
      return this.$store.getters.comStatus('limitHeight');
    }
  }
};
</script>
