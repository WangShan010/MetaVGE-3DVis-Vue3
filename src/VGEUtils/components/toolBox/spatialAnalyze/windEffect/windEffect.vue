<template>
  <transition name="fade">
    <we-content v-if="show"></we-content>
  </transition>
</template>

<script>
import weContent from "./we-content.vue";

export default {
  name: "windEffect",
  components: { weContent },
  computed: {
    show() {
      return this.$store.getters.comStatus('windEffect');
    }
  }
}
</script>
