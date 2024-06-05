/****************************************************************************
名称：工具-场景特效模块
功能：雨雪雾只能显示一个，其它可以叠加显示
最后修改日期：2022-04-16
****************************************************************************/

<template>
    <win-tabs v-if="show" :initCSS="{width: 310,height: 380,left:300,top:120}" @close="close">
        <tab-pane label="后期特效处理">
            <SpecialEffectContent :toggleEffect="toggleEffect" :tool="postEffect"></SpecialEffectContent>
        </tab-pane>
        <tab-pane label="天气特效">
            <SpecialEffectContent :toggleEffect="toggleEffect" :tool="weatherEffect"></SpecialEffectContent>
        </tab-pane>
    </win-tabs>
</template>
<script>

import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';

import SpecialEffect from './specialEffect.js';
import SpecialEffectContent from './specialEffectContent.vue';

let specialEffect = new SpecialEffect();

export default {
    name: 'specialEffect',
    data() {
        return {
            showTool: 0,
            postEffect: [
                { value: { a: true }, name: '深度检测', class: 'depthTestAgainstTerrain', status: 0, iconUrl: new URL('./img/tool-specialEffect-5.png', import.meta.url).href },
                { value: { a: false }, name: '显示帧率', class: 'FramesPerSecond', status: 0, iconUrl: new URL('./img/tool-specialEffect-5.png', import.meta.url).href },
                { value: { a: false }, name: '视锥体', class: 'FrustumPlanes', status: 0, iconUrl: new URL('./img/tool-specialEffect-5.png', import.meta.url).href },
                { value: { a: false }, name: '泛光', class: 'light', status: 0, iconUrl: new URL('./img/tool-specialEffect-5.png', import.meta.url).href },
                { value: { a: false }, name: '阴影', class: 'shade', status: 0, iconUrl: new URL('./img/tool-specialEffect-6.png', import.meta.url).href },
                { value: { a: false }, name: '黑白', class: 'blackWhite', status: 0, iconUrl: new URL('./img/tool-specialEffect-7.png', import.meta.url).href },
                { value: { a: false }, name: '夜视', class: 'nightVision', status: 0, iconUrl: new URL('./img/tool-specialEffect-8.png', import.meta.url).href },
                { value: { a: false }, name: '亮度', class: 'brightness', status: 0, iconUrl: new URL('./img/tool-specialEffect-9.png', import.meta.url).href },
                // {value: {a: false}, name: '镜头耀斑', class: 'lenFlare', status: 0, iconUrl: new URL('./img/tool-specialEffect-10.png', import.meta.url).href},
                { value: { a: false }, name: '强制光照', class: 'forceLight', status: 0, iconUrl: new URL('./img/tool-specialEffect-11.png', import.meta.url).href },
                // { value: {a:false}, name: '环境遮蔽', class: 'ambientOcclusion', status: 0, iconUrl: new URL('./img/tool-specialEffect-12.png') },
                { value: { a: false }, name: '轮廓', class: 'outline', status: 0, iconUrl: new URL('./img/tool-specialEffect-13.png', import.meta.url).href },
                { value: { a: false }, name: '景深', class: 'depthField', status: 0, iconUrl: new URL('./img/tool-specialEffect-14.png', import.meta.url).href },
                { value: { a: false }, name: '地形三角网', class: 'dxsjw', status: 0, iconUrl: new URL('./img/tool-specialEffect-14.png', import.meta.url).href },
                { value: { a: false }, name: '地表透明', class: 'dbtm', status: 0, iconUrl: new URL('./img/tool-specialEffect-14.png', import.meta.url).href }
            ],
            weatherEffect: [
                { value: { a: true }, name: '太阳', class: 'sun', status: 1, iconUrl: new URL('./img/tool-specialEffect-15.png', import.meta.url).href },
                { value: { a: true }, name: '月亮', class: 'moon', status: 1, iconUrl: new URL('./img/tool-specialEffect-16.png', import.meta.url).href },
                { value: { a: true }, name: '星空', class: 'star', status: 1, iconUrl: new URL('./img/tool-specialEffect-17.png', import.meta.url).href },
                { value: { a: true }, name: '地面大气', class: 'groundAir', status: 0, iconUrl: new URL('./img/tool-specialEffect-18.png', import.meta.url).href },
                { value: { a: false }, name: '下雪', class: 'snow', status: 0, iconUrl: new URL('./img/tool-specialEffect-19.png', import.meta.url).href },
                { value: { a: false }, name: '下雨', class: 'rain', status: 0, iconUrl: new URL('./img/tool-specialEffect-20.png', import.meta.url).href },
                { value: { a: false }, name: '雾天', class: 'fog', status: 0, iconUrl: new URL('./img/tool-specialEffect-21.png', import.meta.url).href }
            ]
        };
    },
    components: {
        SpecialEffectContent,
        winTabs,
        tabPane
    },
    created() {

    },
    methods: {
        close() {
            this.$store.commit('setVGEEarthComAction', { name: 'specialEffect', on_off: 2 });
        },
        toggleEffect(className, status) {
            //控制只有一个开关为开
            if (status === 0) {
                if (className === 'blackWhite' || className === 'nightVision') {
                    for (let i = 2; i < 4; i++) {
                        if (this.postEffect[i].status === 1) {
                            this.postEffect[i].status = 0;
                            this.postEffect[i].value.a = false;
                            specialEffect.endEffect(this.postEffect[i].class);
                        }
                    }
                }
                if (className === 'snow' || className === 'rain' || className === 'fog') {
                    for (let i = this.weatherEffect.length - 3; i < this.weatherEffect.length; i++) {
                        if (this.weatherEffect[i].status === 1) {
                            this.weatherEffect[i].status = 0;
                            this.weatherEffect[i].value.a = false;
                            specialEffect.endEffect(this.weatherEffect[i].class);
                        }
                    }
                }
                status = 1;
                specialEffect.openEffect(className);
            } else {
                status = 0;
                specialEffect.endEffect(className);
            }
            return status;
        }
    },
    computed: {
        show() {
            let s = this.$store.getters.comStatus('specialEffect');

            if (s) {
                earth.viewer3D.camera.flyTo({
                    'destination': {
                        'x': -2895596.962457116,
                        'y': 4717490.945820842,
                        'z': 3158425.3777735666
                    },
                    'orientation': {
                        'heading': 3.8736780571268605,
                        'pitch': -0.13964038346926966,
                        'roll': 6.283183317671659
                    }
                });
            }

            return s;
        }
    }
};
</script>

<style lang="less" scoped>
.titleColorElse {
    color: white
}
</style>

