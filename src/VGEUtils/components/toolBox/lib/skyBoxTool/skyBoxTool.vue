/****************************************************************************
名称：天空盒 显隐控制器
作者：冯功耀
最后修改日期：2022-04-20
****************************************************************************/

<template>

    <SBContent  v-if="show"></SBContent>

</template>

<script>
import SBContent from './sb-content.vue';

export default {
  name: 'skyBoxTool',
  components: {SBContent},
  computed: {
    show() {
      return this.$store.getters.comStatus("skyBoxTool")
    }
  }
};
</script>
