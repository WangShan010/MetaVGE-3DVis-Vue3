<template>
    <div class="main">
        <VGEUtils></VGEUtils>
    </div>
</template>

<script>
import VGEUtils from '@/VGEUtils/components/VGEUtils.vue';

let handleKeyDown;
let eyeSeparation = 0;
export default {
    name: 'index',
    components: { VGEUtils },
    mounted() {
        const VRScreenData = JSON.parse(localStorage.getItem('VRScreenData') || "{}");

        earth.thenLoadComplete().then(async () => {
            window.earth.viewer3D.camera.flyTo(VRScreenData.cameraInfo);

            // earth.viewer3DWorkSpace.flyToDataByPid('d76023df-981d-d4d5-5f46-21864b706b0e');

            function setEyeSeparation() {

                earth.viewer3D.scene.useWebVR = true;
                earth.viewer3D.scene.eyeSeparation = eyeSeparation * 1;
            }

            earth.viewer3D.scene.useWebVR = true;
            earth.viewer3D.scene.eyeSeparation = eyeSeparation * 1;
            handleKeyDown = (keyboardEvent) => {
                if (keyboardEvent.code === 'ArrowRight') {
                    eyeSeparation++;
                } else if (keyboardEvent.code === 'ArrowLeft') {
                    eyeSeparation--;
                } else if (keyboardEvent.code === 'NumpadAdd') {
                    eyeSeparation++;
                } else if (keyboardEvent.code === 'NumpadSubtract') {
                    eyeSeparation--;
                }

                setEyeSeparation(eyeSeparation);
            };
            window.addEventListener('keydown', handleKeyDown);
        });


        // this.$store.commit('setVGEEarthComAction', {name: 'vr3d', on_off: 2});
    }
};
</script>


<style scoped lang="less">
.main {
    height: 100%;
    width: 100%;
}

</style>
<style>

.cesium-widget-cesiumNavigationContainer, .cesium-viewer-toolbar {
    display: none;
}
</style>