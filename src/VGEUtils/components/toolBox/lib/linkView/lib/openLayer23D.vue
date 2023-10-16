<template>
    <div class="toolRow">
        <button class="btn btn-info btn-sm" @click="start">打开</button>
        <button class="btn btn-info btn-sm" @click="toggle">切换</button>
        <button class="btn btn-info btn-sm" @click="destroy">移除</button>
    </div>
</template>

<script>
export default {
    name: 'openLayer23D',
    data() {
        return {
            isStart: false
        }
    },
    methods:{
        start(){
            if(!this.isStart){
                earth.openOLMapLink23d()
                this.isStart = true
            }
        },
        toggle(){
            earth.toggleOLMapLink23d()
            this.isStart = !this.isStart
        },
        destroy(){
            if(this.isStart){
                earth.closeOLMapLink23d()
                this.isStart = false
            }
        }
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
.toolRow button {
    margin-right: 5px;
    margin-top: 5px;
}
</style>
