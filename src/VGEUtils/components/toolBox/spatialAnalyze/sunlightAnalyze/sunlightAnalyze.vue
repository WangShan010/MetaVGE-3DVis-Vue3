<template>
    <transition name="fade">
        <sl-content v-if="show"></sl-content>
    </transition>
</template>

<script>
import SlContent from "./sl-content.vue";

export default {
    name: "sunlightAnalyze",
    components: { SlContent },
    computed: {
        show() {
            return this.$store.getters.comStatus('sunlightAnalyze');
        }
    }
}
</script>
