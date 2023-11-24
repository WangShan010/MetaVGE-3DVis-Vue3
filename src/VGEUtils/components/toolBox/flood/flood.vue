<template>
  <flood-primitive v-if="show"></flood-primitive>
</template>

<script>

import FloodPrimitive from './flood-primitive.vue';

export default {
  name: 'flood',
  components: {FloodPrimitive},
  computed: {
    show() {
      return this.$store.getters.comStatus('flood');
    }
  }
};

</script>

<style scoped>

</style>
