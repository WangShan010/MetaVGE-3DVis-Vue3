<template>
    <div class="toolRow">
        <button class="btn btn-info btn-sm" @click="start" style="margin-right: 5px">特效演示</button>
        <button class="btn btn-info btn-sm" @click="destroy">清空效果</button>
    </div>
</template>

<script>
let pointcluster
export default {
    name: 'PointCluster',
    data() {
        return {
            isPlaying: false,
        }
    },
    methods: {
        start() {
            if (this.isPlaying) {
                return
            }
            this.isPlaying = true
            pointcluster.init()
            pointcluster.DataLoadedEvent.addEventListener((dataSource) => {
                window.earth.viewer3D.flyTo(dataSource.entities.values);
            })
        },
        destroy() {
            if (this.isPlaying) {
                pointcluster.destroy()
            }
            this.isPlaying = false
        }
    },
    mounted() {
        pointcluster = new VGEEarth.SuperiorEntity.PointCluster1(
            earth.viewer3D,
            "http://211.149.185.229:8081/data/cluserPoint.json",
            { isExample: true }
        )
    },
    unmounted(){
        this.destroy()
    }
}
</script>

<style scoped>
.toolRow {
    text-align: center;
}
</style>
