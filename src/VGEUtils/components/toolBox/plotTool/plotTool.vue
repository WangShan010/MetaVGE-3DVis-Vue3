/****************************************************************************
名称：标绘工具
作者：冯功耀
最后修改日期：2022-05-28
****************************************************************************/


<template>
    <win-tabs v-if="show" :initCSS="{width: 340,height: 480,left:500,top:140}" @close="close">
        <tab-pane label="标绘工具">
            <ed-content></ed-content>
        </tab-pane>
        <tab-pane :lazy="true" label="实体管理">
            <EntityAttr></EntityAttr>
        </tab-pane>
        <!--        <tab-pane label="实体列表">-->
        <!--            <EntityList></EntityList>-->
        <!--        </tab-pane>-->
        <tab-pane :lazy="true" label="导出">
            <export-plot></export-plot>
        </tab-pane>
    </win-tabs>
</template>

<script>
import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';

import EdContent from './EdContent.vue';
import ExportPlot from './com/exportPlot.vue';
import EntityAttr from './com/entityAttr.vue';
import EntityList from './EntityList.vue';

export default {
    name: 'plotTool',
    components: { EntityList, EdContent, EntityAttr, ExportPlot, winTabs, tabPane },
    computed: {
        show() {
            return this.$store.getters.comStatus('plotTool');
        }
    },
    methods: {
        close() {
            this.$store.commit('setVGEEarthComAction', { name: 'plotTool', on_off: 2 });
        }
    }
};
</script>
