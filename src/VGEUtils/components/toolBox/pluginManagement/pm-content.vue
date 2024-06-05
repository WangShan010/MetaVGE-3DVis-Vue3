<template>
    <win-tabs :initCSS="{width: 150,height: 500,left:900,top:30}" @close="close">
        <tab-pane label="插件管理">
            <ul>
                <li v-for="item in tool" :key="item.id" :style=hideSelf(item) class="liBox">
                    <label class="label-container" style="color:white;">{{
                        item.name
                        }}</label>
                    <el-switch v-model="item.config.inToolBox" active-color="#13ce66" inactive-color="#929090" @change="
                        change({
                            comName: item.comName,
                            show: item.config.inToolBox
                        })
                    "></el-switch>
                </li>
            </ul>
        </tab-pane>
    </win-tabs>
</template>
<script>
import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';


export default {
    name: 'PmContent',
    data() {
        return {
            tool: []
        };
    },
    components: { winTabs, tabPane },
    methods: {
        change({ comName, show }) {
            this.$store.commit('setItemInTool', {
                comName,
                show
            });
        },
        close() {
            this.$store.commit('setVGEEarthComAction', { name: 'PluginManagement', on_off: 2 });
        },
        hideSelf(item) {
            if (item.comName === 'PluginManagement') {
                return { display: 'none' };
            } else {
                return {};
            }
        }
    },
    computed: {
        comActions() {
            return this.$store.state.VGEEarthStore.comActions.filter(item =>
                item.type === 'ToolBoxItem'
            );
        }
    },
    watch: {
        comActions: {
            handler(val) {
                this.tool = val;
            },
            deep: true,
            immediate: true
        }
    }
};
</script>
<style lang="less" scoped>
.liBox {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
}

::v-deep(.el-switch  .el-switch__core) {
    width: 30px !important;
    height: 15px;
}

::v-deep(.el-switch .el-switch__core::after) {
    width: 14px;
    height: 14px;
    margin-top: -1px;
    margin-bottom: 2px;
}
</style>
