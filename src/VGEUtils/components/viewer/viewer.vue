<template>
    <div style="overflow:hidden;height: 100%" v-loading="loading">
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
            earth.viewer3D.scene.globe.depthTestAgainstTerrain = true;

            let t = setInterval(() => {
                if (earth.loadComplete) {
                    this.loading = false;
                    window.clearInterval(t);
                }
            }, 100);
        }
    },
    mounted: function () {
        // 创建viewer对象
        const earth = new VGEEarth.Earth('MapContainer', {
            infoBox: false,
            selectionIndicator: false,
            vrButton: true
        });
        this.initEarth();
    }
};
</script>
<style>
.el-loading-mask {
    background-color: rgba(255, 255, 255, 0.1) !important;
    z-index: 10;
}

.distance-legend {
    bottom: 50px;
}
</style>


<style lang="less" scoped>
// 地球底部显示鼠标位置的经纬度
//#positionLabel {
//  position: absolute;
//  text-align: right;
//  bottom: 8px;
//  right: 180px;
//  z-index: 10;
//  font-size: 15px;
//  color: white;
//  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
//  height: 30px;
//  width: 680px
//}
</style>
