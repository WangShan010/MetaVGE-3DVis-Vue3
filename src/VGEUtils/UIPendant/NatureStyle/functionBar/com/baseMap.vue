<template>
    <div v-if="show" class="base-map">
        <div class="tool-title">
            <div>
                <img alt="" src="../../assets/img/base-map.png">
                <span>底图</span>
            </div>
            <img alt="" class="close-btn" src="../../assets/img/close.png" @click="close">
        </div>
        <div class="tool-body">
            <div class="maps">
                <div class='map-selected'>
                    <div><img alt="" src="../../assets/img/map-gothe.png"></div>
                    <div>高德影像</div>
                </div>
                <div>
                    <div><img alt="" src="../../assets/img/map-OSM.png"></div>
                    <div>OSM影像</div>
                </div>
                <div>
                    <div>
                        <img alt="" src="../../assets/img/map-gothe.png">
                    </div>
                    <div>天地图影像</div>
                </div>
                <div>
                    <div><img alt="" src="../../assets/img/map-tencent.png"></div>
                    <div>腾讯影像</div>
                </div>
                <div>
                    <div><img alt="" src="../../assets/img/map-gothe.png"></div>
                    <div>高德影像</div>
                </div>
                <div>
                    <div><img alt="" src="../../assets/img/map-OSM.png"></div>
                    <div>OSM影像</div>
                </div>
                <div>
                    <div><img alt="" src="../../assets/img/map-gothe.png"></div>
                    <div>天地图影像</div>
                </div>
                <div>
                    <div><img alt="" src="../../assets/img/map-tencent.png"></div>
                    <div>腾讯影像</div>
                </div>
                <div>
                    <div><img alt="" src="../../assets/img/map-gothe.png"></div>
                    <div>高德影像</div>
                </div>
                <div>
                    <div><img alt="" src="../../assets/img/map-OSM.png"></div>
                    <div>OSM影像</div>
                </div>
                <div>
                    <div><img alt="" src="../../assets/img/map-gothe.png"></div>
                    <div>天地图影像</div>
                </div>
                <div>
                    <div><img alt="" src="../../assets/img/map-tencent.png"></div>
                    <div>腾讯影像</div>
                </div>
                <div>
                    <div><img alt="" src="../../assets/img/map-gothe.png"></div>
                    <div>高德影像</div>
                </div>
                <div>
                    <div><img alt="" src="../../assets/img/map-OSM.png"></div>
                    <div>OSM影像</div>
                </div>
                <div>
                    <div><img alt="" src="../../assets/img/map-gothe.png"></div>
                    <div>天地图影像</div>
                </div>
                <div>
                    <div><img alt="" src="../../assets/img/map-gothe.png"></div>
                    <div>天地图影像</div>
                </div>
            </div>
            <div class="show-terrain">
                <a-checkbox>
                    显示地形
                </a-checkbox>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'baseMap',
    methods: {
        close() {
        }
    },
    computed: {
        show() {
            return false;
        }
    }
};
</script>


<style lang='less' scoped>
@import "../../assets/css/common-theme.less";
@import "../../assets/css/green-theme.less";
@import "../../assets/css/yellow-theme.less";
</style>

