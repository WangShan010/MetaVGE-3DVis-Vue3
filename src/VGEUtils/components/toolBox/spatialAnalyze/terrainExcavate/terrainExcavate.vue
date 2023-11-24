<template>
    <te-content v-if="show"></te-content>
</template>
<script>


import TeContent from './te-content.vue';

export default {
  name: 'terrainExcavate',
  components: {TeContent},
  computed: {
    show() {
      return this.$store.getters.comStatus('terrainExcavate');
    }
  }
};
</script>
