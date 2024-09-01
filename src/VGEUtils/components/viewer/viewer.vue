<template>
    <div v-loading="loading" style="overflow:hidden;height: 100%">
        <div id="MapContainer"></div>
    </div>
</template>

<script>

export default {
    name: 'viewer',
    data() {
        return {
            loading: false
        };
    },
    methods: {
        initEarth() {
            earth.createNavigation();
            // earth.openDeBug();
            earth.viewer3D.scene.globe.depthTestAgainstTerrain = true;

            earth.thenLoadComplete().then(() => {
                this.loading = false;
            });
        }
    },
    mounted: function () {
        // 创建viewer对象
        const earth = new VGEEarth.Earth('MapContainer', {
            infoBox: true,
            selectionIndicator: false,
            vrButton: true,
            geocoder: true // 是否显示地名查找控件
        });
        this.initEarth();
    }
};
</script>


<style>
.el-loading-mask {
    background-color: rgba(255, 255, 255, 0.15) !important;
    z-index: 10;
}

.distance-legend {
    bottom: 50px;
}

.cesium-performanceDisplay-defaultContainer {
    top: auto !important;
    bottom: 50px !important;
    left: 20px !important;
    right: auto !important;
}

.cesium-viewer-toolbar {
    top: auto !important;
    bottom: 50px;
    right: 180px !important;
}

</style>
