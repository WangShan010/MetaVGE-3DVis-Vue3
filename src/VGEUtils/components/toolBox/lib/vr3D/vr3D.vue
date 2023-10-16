<template>
  <vr-content v-if="show"></vr-content>
</template>

<script>
import VrContent from '@/VGEUtils/components/toolBox/lib/vr3D/vr-content.vue';

export default {
  name: 'vr3D',
  components: {VrContent},
  computed: {
    show() {
      return this.$store.getters.comStatus("vr3d")
    }
  }
};
</script>

<style scoped>

</style>
