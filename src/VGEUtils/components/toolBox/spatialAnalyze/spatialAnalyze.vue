<template>
    <sa-content v-if="show"></sa-content>
</template>

<script>
import SaContent from "./sa-content.vue";
export default {
  name: "spatialAnalyze",
  components: {SaContent},
  computed: {
    show() {
      return this.$store.getters.comStatus("spatialAnalyze")
    }
  }
}
</script>

<style scoped>

</style>
