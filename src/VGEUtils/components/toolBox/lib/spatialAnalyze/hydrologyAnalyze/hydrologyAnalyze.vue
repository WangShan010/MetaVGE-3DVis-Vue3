<template>
    <transition name="fade">
        <ha-content v-if="show"></ha-content>
    </transition>
</template>

<script>
import HaContent from "@/VGEUtils/components/toolBox/lib/spatialAnalyze/hydrologyAnalyze/ha-content.vue";

export default {
    name: "hydrologyAnalyze",
    components: { HaContent },
    computed: {
        show() {
            return this.$store.getters.comStatus('hydrologyAnalyze');
        }
    }
}
</script>
