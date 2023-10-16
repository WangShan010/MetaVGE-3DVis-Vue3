<template>
    <ds-content v-if="show"></ds-content>
</template>

<script>
import dsContent from './ds-content.vue';

export default {
  name: 'dataSetting',
  components: {dsContent},
  computed: {
    show() {
      return this.$store.getters.comStatus("dataSetting")
    }
  }
};
</script>
