<template>
  <ev-content v-if="show"></ev-content>
</template>

<script>
import EvContent from "./ev-content.vue";

export default {
  name: "earthworkVolume",
  components: {EvContent},
  computed: {
    show() {
      return this.$store.getters.comStatus("earthworkVolume");
    }
  }
};
</script>

<style scoped>

</style>