<template>

    <VideoShedContent v-if="show"></VideoShedContent>

</template>
<script>
import VideoShedContent from './videoShedContent.vue';

export default {
    name: 'videoShed',
    components: { VideoShedContent },
    computed: {
        show() {
            return this.$store.getters.comStatus('videoShed');
        }
    }
};
</script>
