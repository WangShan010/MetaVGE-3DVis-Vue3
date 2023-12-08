<template>
    <win-tabs :initCSS="{width: 400,height: 190,left:800,top:140}" @close="close">
        <tab-pane label="视图联动">
            <div style="display: flex;justify-content: space-between;">
                <label class="label-container">二三维联动（电子底图）：</label>
                <el-switch v-model="OLMapLink23dIsOpen" active-color="#13ce66" inactive-color="#929090"></el-switch>
            </div>
            <div style="display: flex;justify-content: space-between;">
                <label class="label-container">二三维联动（卫星底图）：</label>
                <el-switch v-model="CesiumMapLink23dIsOpen" active-color="#13ce66" inactive-color="#929090"></el-switch>
            </div>
            <div style="display: flex;justify-content: space-between;">
                <label class="label-container">鹰眼视图（电子底图）：</label>
                <el-switch v-model="overViewMapIsOpen" active-color="#13ce66" inactive-color="#929090"></el-switch>
            </div>
        </tab-pane>
    </win-tabs>
</template>

<script>
import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';

export default {
    name: 'lv-content',
    components: {winTabs, tabPane},
    data() {
        return {
            OLMapLink23dIsOpen: false,
            CesiumMapLink23dIsOpen: false,
            overViewMapIsOpen: false,
        };
    },
    watch: {
        OLMapLink23dIsOpen(val) {
            if (val) {
                earth.openOLMapLink23d();
            } else {
                earth.closeOLMapLink23d();
            }
            sessionStorage.setItem('OLMapLink23dIsOpen', val);
        },
        CesiumMapLink23dIsOpen(val) {
            if (val) {
                earth.openCesiumMapLink23d();
            } else {
                earth.closeCesiumMapLink23d();
            }
            sessionStorage.setItem('CesiumMapLink23dIsOpen', val);
        },
        overViewMapIsOpen(val) {
            if (val) {
                earth.openOverviewMap();
            } else {
                earth.closeOverviewMap();
            }
            sessionStorage.setItem('overViewMapIsOpen', val);
        }
    },
    methods: {
        close() {
            this.$store.commit('setVGEEarthComAction', {name: 'linkView', on_off: 2});
        }
    },
    mounted() {
        this.OLMapLink23dIsOpen = sessionStorage.getItem('OLMapLink23dIsOpen') === 'true';
        this.CesiumMapLink23dIsOpen = sessionStorage.getItem('CesiumMapLink23dIsOpen') === 'true';
        this.overViewMapIsOpen = sessionStorage.getItem('overViewMapIsOpen') === 'true';
    }
};
</script>
