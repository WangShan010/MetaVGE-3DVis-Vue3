<template>
    <div id="loadBar" v-if="loadList.length">
        <template>
            <div v-for="item in loadList" :key="item.id">
                <span v-if="item.numberOfTilesProcessing>1">
                {{ item.name }}载入， 需要加载瓦片数据包: {{ item.numberOfTilesProcessing }} 个
                </span>
            </div>
        </template>
    </div>
</template>
<script>

export default {
    name: 'LoadBar',
    data() {
        return {
            loadList: []
        };
    },
    mounted() {
        earth.thenLoadComplete().then(() => {
            earth.viewer3DWorkSpace._3DTileMana.loadTileCallFunMap.set('LoadBarVue', (s, numberOfPendingRequests, numberOfTilesProcessing) => {
                this.loadList = this.loadList.filter(item => item.id !== s.pid);
                this.loadList.push({id: s.pid, name: s.name, numberOfPendingRequests, numberOfTilesProcessing}
                );
            });
        });
    }
};
</script>


<style scoped>

#loadBar {
    position: absolute;
    bottom: 10px;
    padding: 5px;
    left: 30px;
    border-radius: 5px;
    border: rgba(245, 222, 179, 0.4) 1px solid;
    background-color: rgba(33, 45, 33, 0.4);
    color: sandybrown;
    display: flex;
    flex-direction: column;
    font-size: 18px;
}

</style>