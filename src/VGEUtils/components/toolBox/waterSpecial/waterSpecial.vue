<template>
  <ws-content v-if="show"></ws-content>
</template>

<script>
import WsContent from './ws-content.vue';

export default {
  name: 'waterSpecial',
  components: {WsContent},
  computed: {
    show() {
      return this.$store.getters.comStatus('waterSpecial');
    }
  }
};
</script>

<style scoped>

</style>
