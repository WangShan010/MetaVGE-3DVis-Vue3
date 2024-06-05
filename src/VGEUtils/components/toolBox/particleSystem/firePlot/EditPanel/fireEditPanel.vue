<template>
    <div class="attr-panel">
        <div class="attr-panel-header">
            <br/>
            <!--      <span class="attr-panel-header-title">属性编辑</span>-->
        </div>
        <div class="attr-panel-body">
            <el-form ref="form" label-width="100px" size="small">

                <el-form-item label="粒子数量">
                    <el-slider
                        v-model="emissionRate"
                        :max="201"
                        :min="0"
                        :step="1"
                        @input="updateStyle"
                        @mousedown="handleMouseDown"
                        @mouseup="handleMouseUp"
                    ></el-slider>
                </el-form-item>

                <el-form-item label="粒子大小">
                    <el-slider
                        v-model="particleSize"
                        :max="60.0"
                        :min="0"
                        :step="1"
                        @change="updateStyle"
                        @mousedown="handleMouseDown"
                        @mouseup="handleMouseUp"
                    ></el-slider>
                </el-form-item>

                <el-form-item label="最小生命周期">
                    <el-slider
                        v-model="minimumParticleLife"
                        :max="5.0"
                        :min="0.1"
                        :step="0.2"
                        @change="updateStyle"
                        @mousedown="handleMouseDown"
                        @mouseup="handleMouseUp"
                    ></el-slider>
                </el-form-item>

                <el-form-item label="最大生命周期">
                    <el-slider
                        v-model="maximumParticleLife"
                        :max="5.0"
                        :min="0.1"
                        :step="0.2"
                        @change="updateStyle"
                        @mousedown="handleMouseDown"
                        @mouseup="handleMouseUp"
                    ></el-slider>
                </el-form-item>

                <el-form-item label="最小速度">
                    <el-slider
                        v-model="minimumSpeed"
                        :max="30.0"
                        :min="0.0"
                        :step="1"
                        @change="updateStyle"
                        @mousedown="handleMouseDown"
                        @mouseup="handleMouseUp"
                    ></el-slider>
                </el-form-item>

                <el-form-item label="最大速度">
                    <el-slider
                        v-model="maximumSpeed"
                        :max="30.0"
                        :min="0.0"
                        :step="1"
                        @change="updateStyle"
                        @mousedown="handleMouseDown"
                        @mouseup="handleMouseUp"
                    ></el-slider>
                </el-form-item>

                <el-form-item label="初始比例">
                    <el-slider
                        v-model="startScale"
                        :max="5.0"
                        :min="0.0"
                        :step="0.5"
                        @input="updateStyle"
                        @mousedown="handleMouseDown"
                        @mouseup="handleMouseUp"
                    ></el-slider>
                </el-form-item>

                <el-form-item label="终止比例">
                    <el-slider
                        v-model="endScale"
                        :max="10.0"
                        :min="0.0"
                        :step="1"
                        @change="updateStyle"
                        @mousedown="handleMouseDown"
                        @mouseup="handleMouseUp"
                    ></el-slider>
                </el-form-item>

                <el-form-item>
                    <!--            <div style=" text-align: right">-->
                    <!--              <el-button type="danger" @click="delClickEvent">删除粒子</el-button>-->
                    <!--            </div>-->
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';
import particleStore from './particleStore.js';

export default {
    name: 'fireEditPanel',
    props: ['getKey'],
    components: { winTabs, tabPane },
    data() {
        return {
            endScale: 1.5,
            emissionRate: 200,
            particleSize: 2,
            minimumParticleLife: 1.5,
            maximumParticleLife: 1.8,
            minimumSpeed: 7,
            maximumSpeed: 9,
            startScale: 3
            // isDragging: false,
        };
    },
    mounted() {
        this.emissionRate = particleStore.selectedPlot.style.emissionRate;
        this.particleSize = particleStore.selectedPlot.style.particleSize;
        this.minimumParticleLife = particleStore.selectedPlot.style.minimumParticleLife;
        this.maximumParticleLife = particleStore.selectedPlot.style.maximumParticleLife;
        this.minimumSpeed = particleStore.selectedPlot.style.minimumSpeed;
        this.maximumSpeed = particleStore.selectedPlot.style.maximumSpeed;
        this.startScale = particleStore.selectedPlot.style.startScale;
        this.endScale = particleStore.selectedPlot.style.endScale;
    },
    methods: {
        updateStyle() {
            this.updateValue();
            // console.log(particleStore.selectedPlot.style)
            particleStore.selectedPlot.updateStyle(particleStore.selectedPlot.style);//更新粒子参数
            // console.log(particleStore.selectedPlot)
        },
        //改变粒子参数
        updateValue() {
            particleStore.selectedPlot.style.emissionRate = this.emissionRate;
            particleStore.selectedPlot.style.particleSize = this.particleSize;
            particleStore.selectedPlot.style.minimumParticleLife = this.minimumParticleLife;
            particleStore.selectedPlot.style.maximumParticleLife = this.maximumParticleLife;
            particleStore.selectedPlot.style.minimumSpeed = this.minimumSpeed;
            particleStore.selectedPlot.style.maximumSpeed = this.maximumSpeed;
            particleStore.selectedPlot.style.startScale = this.startScale;
            particleStore.selectedPlot.style.endScale = this.endScale;
        },
        /**鼠标按下时窗口不可被拖动**/
        handleMouseDown() {
            this.$emit('changeKey', false);
        },
        /**鼠标松开恢复**/
        handleMouseUp() {
            this.$emit('changeKey', true);
        }
        //根据plotCode删除单个粒子
        // delClickEvent() {
        //   this.$emit("delClickEvent", this.plot.properties.plotCode);
        // }
    }
};
</script>

<style lang="less" scoped>
.attr-panel-body :deep( .el-form-item--mini.el-form-item),
.attr-panel-body :deep( .el-form-item--small.el-form-item) {
    margin-bottom: 0;
}
</style>
