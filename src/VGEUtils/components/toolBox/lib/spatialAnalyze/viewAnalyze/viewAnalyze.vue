<template>
  <transition name="fade">
    <vi-content v-if="show"></vi-content>
  </transition>
</template>

<script>
import ViContent from "@/VGEUtils/components/toolBox/lib/spatialAnalyze/viewAnalyze/vi-content.vue";
export default {
  name: "viewAnalyze",
  components:{ViContent},
  computed: {
    show() {
      return this.$store.getters.comStatus('viewAnalyze');
    }
  }
}
</script>
