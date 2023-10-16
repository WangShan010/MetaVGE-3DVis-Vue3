/****************************************************************************
名称：地形剖面 显隐控制器
最后修改日期：2022-04-20
****************************************************************************/

<template>
    <gs-content v-if="show"></gs-content>
</template>

<script>
import GsContent from './gs-content.vue';

export default {
  name: 'geologicalSection',
  components: {GsContent},
  computed: {
    show() {
      return this.$store.getters.comStatus("geologicalSection")
    }
  }
};
</script>
