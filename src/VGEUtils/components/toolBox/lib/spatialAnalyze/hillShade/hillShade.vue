<template>
  <transition name="fade">
    <hi-content v-if="show"></hi-content>
  </transition>
</template>

<script>
import hiContent from "@/VGEUtils/components/toolBox/lib/spatialAnalyze/hillShade/hi-content.vue";

export default {
  name: "hillShade",
  components: { hiContent },
  computed: {
    show() {
      return this.$store.getters.comStatus('hillShade');
    }
  }
}
</script>
