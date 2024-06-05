<template>
    <div v-if="show" class="layer">
        <div class="tool-title">
            <div>
                <img alt="" src="./img/layer.png">
                <span>地图数据</span>
            </div>
            <img alt="" class="close-btn" src="./img/close.png" @click="close">
        </div>
        <div class="layer-tree">
            <!-- 加载数据图层 -->
            <div id="treeDom" class="ztree" style="padding: 5px 10px"></div>
            <div id="ctrlTree">
                <div class="btn-group btn-group-xs" role="group">
                    <button class="btn btn-default" type="button">
                        <span aria-hidden="true" class="glyphicon glyphicon-plus"></span>
                    </button>
                    <button class="btn btn-default" type="button">
                        <span aria-hidden="true" class="glyphicon glyphicon-menu-hamburger"></span>
                    </button>
                    <button class="btn btn-default" type="button">
                        <span aria-hidden="true" class="glyphicon glyphicon-wrench"></span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'resourceTree',
    methods: {
        toggleActive(comName) {
            this.$store.commit('setVGEEarthComAction', { name: comName, on_off: 3 });
        },
        close() {
            this.$store.commit('setVGEEarthComAction', { name: 'resourceTree', on_off: 2 });
        }
    },
    computed: {
        show() {
            let s = this.$store.getters.comStatus('resourceTree');
            this.$nextTick(() => {
                if (s) {
                    let t = new VGEEarth.TreeMana.ZTreeMana(earth.viewer3D,
                        VGEEarth.EventMana.ScopeType.Viewer3D,
                        { font: { 'color': 'white' } }
                    );
                }
            });

            return s;
        }
    }
};
</script>


<style lang='less' scoped>
.layer {
    background: rgba(33, 45, 33, 0.8);
    position: absolute;
    min-width: 200px;
    border-radius: 5px;
    z-index: 100;
    top: calc(17vh + 20px);
    left: 38px;

    .layer-tree {
        width: 100%;
        height: 40vh;
        overflow: auto;
        padding-bottom: 50px;
        margin-top: 5px;
        margin-bottom: 5px;
    }
}

.tool-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    font-size: 16px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 35px;
    border-bottom: 1px solid rgba(185, 197, 185, 0.2);

    img:first-child {
        margin-right: 0.5vw;
    }

    .close-btn {
        text-align: right;
        width: 20px;
        height: 20px;
        color: #fff;
        cursor: pointer;
    }
}

.node_name {
    color: white !important;
}

#ctrlTree {
    background: #293424;
    border-radius: 0 0 5px 5px;
    padding: 4px 15px;
    text-align: center;
    border-top: 1px solid rgba(185, 197, 185, 0.2);
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>
