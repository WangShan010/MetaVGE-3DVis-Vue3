<template>
  <prContent v-if="show"></prContent>
</template>

<script>

import prContent from './pr-content.vue';

export default {
  name: 'PathRoaming',
  components: {prContent},
  computed: {
    show() {
      return this.$store.getters.comStatus('pathRoaming');
    }
  }
};
</script>
