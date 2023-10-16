<template>
    <win-tabs style="left:800px;top: 140px;width:400px" @close="close">
        <tab-pane label="Cesium联动视图">
            <cesium23D></cesium23D>
        </tab-pane>
        <tab-pane label="Openlayer联动视图">
            <openLayer23D></openLayer23D>
        </tab-pane>
        <tab-pane label="鹰眼视图">
            <overViewMap></overViewMap>
        </tab-pane>
    </win-tabs>
</template>

<script>
import {tabPane, winTabs} from "@/VGEUtils/components/winTabs/index.js";

import cesium23D from './lib/cesium23D.vue';
import openLayer23D from './lib/openLayer23D.vue';
import overViewMap from './lib/overViewMap.vue';
export default {
    name: 'lv-content',
    components: { winTabs, tabPane, cesium23D, openLayer23D, overViewMap },
    methods: {
        close() {
            this.$store.commit('setVGEEarthComAction', { name: 'linkView', on_off: 2 });
        }
    }
}
</script>
