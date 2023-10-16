<template>
  <transition name="fade">
    <as-content v-if="show"></as-content>
  </transition>
</template>
<script>


import AsContent from './as-content.vue';

export default {
  name: 'aspectAnalyze',
  components: {AsContent},
  computed: {
    show() {
      return this.$store.getters.comStatus('aspectAnalyze');
    }
  }
};
</script>
