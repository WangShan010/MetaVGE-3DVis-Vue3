<template>
    <div id="positionLabel">
        <span style="width: 120px;">经度：{{ position.lon }}</span>
        <span style="width: 120px;">纬度：{{ position.lat }}</span>
        <span style="width: 120px;">高程：{{ position.height }}</span>
        <span style="width: 120px;">相机高度：{{ position.cameraHeight }}</span>
        <span style="width: 120px;">帧率：{{ FPS }}(FPS)</span>
    </div>
</template>

<script>
export default {
    name: 'positionLabel',
    data() {
        return {
            FPS: 0,
            position: {
                lon: 0,
                lat: 0,
                height: 0,
                cameraHeight: 0
            }
        };
    },
    methods: {
        init() {
            let that = this;
            // 初始化显示经纬度的标签
            earth.initMonitorCoordinates(earth.viewer3D, function (log, lat, height, cameraHeight) {
                    that.position.lon = `${log.toFixed(5)}  °`;
                    that.position.lat = `${lat.toFixed(5)}  °`;
                    that.position.height = `${height.toFixed(2)} m`;
                    that.position.cameraHeight = `${cameraHeight.toFixed(2)} m`;
                }
            );
            setInterval(() => {
                that.FPS = earth.getFPS();
            }, 20);
        }
    },
    mounted() {
        earth.thenLoadComplete().then(() => {
            this.init();
        });
    }
};
</script>

<style lang="less">
#positionLabel {
    span {
        padding: 0 2px;
    }
}
</style>