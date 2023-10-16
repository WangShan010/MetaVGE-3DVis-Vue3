<template>
  <transition name="fade">
    <te-content v-if="show"></te-content>
  </transition>
</template>
<script>


import TeContent from './te-content.vue';

export default {
  name: 'terrainRendering',
  components: {TeContent},
  computed: {
    show() {
      return this.$store.getters.comStatus('terrainRendering');
    }
  }
};
</script>
