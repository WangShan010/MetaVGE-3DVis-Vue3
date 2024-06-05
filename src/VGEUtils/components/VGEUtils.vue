<template>
    <div class="vge-utils">
        <viewer></viewer>
        <toolBox></toolBox>
        <load-bar></load-bar>
    </div>
</template>

<script>
import Viewer from './viewer/viewer.vue';
import toolBox from './toolBox/index.vue';
import { useStore } from 'vuex';
import LoadBar from './viewer/LoadBar/index.vue';


export default {
    name: 'VGEUtils',
    components: {
        LoadBar,
        Viewer,
        toolBox
    },
    created() {
        const store = useStore();
        store.commit('loadUIConfig', window.UIConfig);
    }
};
</script>

<style lang="less" scoped>
.vge-utils {
    height: 100%;
    position: relative;
}
</style>
