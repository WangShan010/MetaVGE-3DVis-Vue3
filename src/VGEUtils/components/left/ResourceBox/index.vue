<template>
    <LeftBar ref="leftBar" :css_top="'15vh'" title="地图资源列表">
        <div class="left-bar-content">
            <div>
                <div class="maps">
                    <div v-for="item in layerList"
                         :class="{'map-box':true,'map-box-active':item.load,'map-selected':selItem===item.name}"
                         @click="toggleActive(item)">
                        <div
                            v-if="item.showInBox"
                            style="position: relative;text-align: center">
                            <img style="width: 79px;height: 79px" :src="item.iconSrc" alt="">
                            <span v-if="item.load"
                                  style="position: absolute;left: 20px;top: 30px;color: #a2f579">已加载</span>
                            <div class="box-name" @click.stop="flyToItem(item)">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="ctr-btns">
                <el-button size="small" type="primary" @click="hideBackBtn">
                    <el-icon>
                        <DArrowLeft/>
                    </el-icon>
                    收回面板
                </el-button>
                <el-button size="small" type="warning" @click="clearAllLayer">
                    <el-icon>
                        <RefreshLeft/>
                    </el-icon>
                    重置地图
                </el-button>
            </div>
        </div>
    </LeftBar>
</template>

<script>
import LeftBar from '../leftBar/template/leftBar.vue';


export default {
    name: 'ResourceBox',
    components: { LeftBar },
    data() {
        return {
            layerList: [
                {
                    pid: 'dd7813c4-dd2c-2ce4-7ff3-af62a8b97255',
                    showInBox: true,
                    name: '卫星影像',
                    iconSrc: new URL('./img/ImageryProviders/ArcGisMapServiceWorldImagery.png', import.meta.url).href,
                    load: true
                },
                {
                    pid: '5fab0a37-4a0f-cbdc-25b4-3847df3f78e5',
                    showInBox: true,
                    name: '正射影像',
                    iconSrc: new URL('./img/ImageryProviders/bingAerial.png', import.meta.url).href,
                    load: false
                },
                {
                    pid: '5019e495-328b-2adf-0988-b41b29b15718',
                    showInBox: true,
                    name: '地名标注', iconSrc: new URL('./img/地名标注.png', import.meta.url).href, load: true
                },
                {
                    pid: '36c78a25-4f50-476a-2535-36031977c837',
                    showInBox: false,
                    name: '国界省界', iconSrc: new URL('./img/地名标注.png', import.meta.url).href, load: true
                },
                {
                    pid: 'edaa73e0-e49b-f701-f212-2556bc279dbd',
                    showInBox: true,
                    name: '陆地地形',
                    iconSrc: new URL('./img/TerrainProviders/CesiumWorldTerrain.png', import.meta.url).href,
                    load: true
                }

            ],
            selItem: null
        };
    },
    methods: {
        close() {
            this.hideBackBtn();
        },
        toggleActive(item) {
            if (item.load === false && item.pid) {
                earth.viewer3DWorkSpace.addData(VGEEarth.ConfigTool.getResourcesByPid(item.pid)).then(e => {
                    // earth.viewer3DWorkSpace.flyToDataByPid(item.pid);
                });
                item.load = true;
                this.$message.success('加载成功');
            } else if (item.load === true && item.pid) {
                earth.viewer3DWorkSpace.removeDataByPid(item.pid);
                item.load = false;
                this.$message.warning('移除成功');
            } else {
                this.$message.success('载入成功');
            }

            this.selItem = item;
        },
        flyToItem(item){
            item.load = true;
            earth.viewer3DWorkSpace.addData(VGEEarth.ConfigTool.getResourcesByPid(item.pid)).then(e => {
                earth.viewer3DWorkSpace.flyToDataByPid(item.pid);
            });
        },
        async clearAllLayer() {
            this.selItem = '';
            for (let i = 0; i < this.layerList.length; i++) {
                const item = this.layerList[i];
                if (item.pid) {
                    const resourceItem = VGEEarth.ConfigTool.getResourcesByPid(item.pid);

                    item.load = false;
                    earth.viewer3DWorkSpace.removeDataByPid(resourceItem.pid);

                    if (resourceItem.defaultLoad) {
                        item.load = true;
                        await earth.viewer3DWorkSpace.addData(resourceItem);
                    }
                }
            }
        },
        hideBackBtn() {
            this.$refs.leftBar.hideBackBtn();
        }
    },
    computed: {
        show() {
            let show = this.$store.getters.comStatus('ResourceBoxShow');


            if (show) {
                this.$refs.leftBar?.showBackBtn();
            } else {
                this.$refs.leftBar?.hideBackBtn();
            }

            return show;
        }
    },
    mounted() {
        const sources = VGEEarth.ConfigTool.getAllSources().filter(item => item.resourceImg);
        sources.forEach(item => {
            const source = {
                pid: item.pid,
                name: item.name,
                showInBox: true,
                iconSrc: item.resourceImg,
                load: item.defaultLoad
            };
            this.layerList.push(source);
        });
    }
};
</script>

<style lang='less' scoped>
.left-bar-content {
    overflow: hidden;

}

.left-bar-content::-webkit-scrollbar {
    display: none
}


.maps {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 2px;
    height: 100%;

    .map-box:hover {
        box-shadow: 0 0 4px #00c4ff;
        color: #ffb485;
    }

    .map-box-active {
        box-shadow: 0 0 4px #e4a13c;
        color: #ffb485;

    }

    & > div {
        cursor: pointer;
        margin: 3px;

        img {
            height: 80px;
            width: 78px;
        }

    }

    .box-name {
        font-size: 12px;
        font-weight: 400;
        color: #FFFFFF;
        text-align: center;
    }

    .box-name:hover {
        color: #ffb485;
    }
}

.maps::-webkit-scrollbar {
    display: none
}

.ctr-btns {
    text-align: right;
    padding: 10px;
    border-top: solid 1px rgba(255, 255, 255, 0.4)
}

</style>
