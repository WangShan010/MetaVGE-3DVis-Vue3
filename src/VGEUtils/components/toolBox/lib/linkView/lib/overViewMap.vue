<template>
    <div class="toolRow">
        <button class="btn btn-info btn-sm" @click="start">打开</button>
        <button class="btn btn-info btn-sm" @click="destroy">移除</button>
    </div>
</template>

<script>
export default {
    name: 'OverViewMap',
    data() {
        return {
            isStart: false
        }
    },
    methods: {
        start() {
            if (!this.isStart) {
                earth.openOverviewMap()
                this.isStart = true
            }
        },
        destroy() {
            if (this.isStart) {
                earth.closeOverviewMap()
                this.isStart = false
            }
        }
    },
    unmounted() {
        this.destroy()
    }
}
</script>
<style scoped>
.toolRow {
    text-align: center;
}
.toolRow button {
    margin-right: 5px;
    margin-top: 5px;
}
</style>
