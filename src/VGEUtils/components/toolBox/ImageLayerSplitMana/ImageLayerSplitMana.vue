<template>
    <ISContent v-if="show"></ISContent>
</template>

<script>
import ISContent from "./is-content.vue";

export default {
    name: "ImageLayerSplitMana",
    components: {
        ISContent
    },
    computed: {
        show() {
            return this.$store.getters.comStatus("ImageLayerSplitMana");
        }
    }
};
</script>
