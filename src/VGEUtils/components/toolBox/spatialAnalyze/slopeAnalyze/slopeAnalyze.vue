<template>
  <transition name="fade">
    <sp-content v-if="show"></sp-content>
  </transition>
</template>
<script>


import SpContent from './sp-content.vue';

export default {
  name: 'aspectAnalyze',
  components: {SpContent},
  computed: {
    show() {
      return this.$store.getters.comStatus('slopeAnalyze');
    }
  }
};
</script>
