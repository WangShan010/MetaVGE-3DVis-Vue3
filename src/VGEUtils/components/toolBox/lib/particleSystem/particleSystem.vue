<template>

    <pa-content v-if="show"></pa-content>

</template>

<script>
import PaContent from './pa-content.vue';

export default {
  name: 'ParticleSystem',
  components: {PaContent},
  computed: {
    show() {
      return this.$store.getters.comStatus('particleSystem');
    }
  }
};
</script>

<style scoped>

</style>
