<template>
    <div class="toolRow">
        <button class="btn btn-info btn-sm" style="margin-right: 5px" @click="start">特效演示</button>
        <button class="btn btn-info btn-sm" @click="destroy">清空效果</button>
    </div>
</template>

<script>
let pointcluster;
export default {
    name: 'PointCluster',
    data() {
        return {
            isPlaying: false
        };
    },
    methods: {
        start() {
            if (this.isPlaying) {
                return;
            }
            this.isPlaying = true;
            pointcluster.init();
            pointcluster.DataLoadedEvent.addEventListener((dataSource) => {
                window.earth.viewer3D.flyTo(dataSource.entities.values);
            });
        },
        destroy() {
            if (this.isPlaying) {
                pointcluster.destroy();
            }
            this.isPlaying = false;
        }
    },
    mounted() {
        pointcluster = new VGEEarth.SuperiorEntity.PointClusterGeoJson(
            earth.viewer3D,
            './app/vge/cluserPoint.json',
            { isExample: true }
        );
    },
    unmounted() {
        this.destroy();
    }
};
</script>

<style lang="less" scoped>
.toolRow {
    text-align: center;
}
</style>
