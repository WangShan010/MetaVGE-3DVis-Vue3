<template>
    <win-tabs style="width: 350px;left:auto;right: 200px" @close="close">
        <tab-pane label="水面波纹配置">
            <table>
                <tr>
                    <td>颜色 R：</td>
                    <td style="text-align: left">
                        <el-color-picker v-model="color" show-alpha size="small" @change="save"></el-color-picker>
                    </td>
                </tr>
                <tr>
                    <td>波纹频率：</td>
                    <td><input v-model="water_freq" max="200" min="0" step="1" type="range" @change="save"></td>
                </tr>
                <tr>
                    <td>波动速度：</td>
                    <td><input v-model="water_animationspeed" max="0.01" min="0.001" step="0.001" type="range" @change="save"></td>
                </tr>
                <tr>
                    <td>波动高度：</td>
                    <td><input v-model="water_amplitude" max="5" min="1" step="0.1" type="range" @change="save"></td>
                </tr>
                <tr>
                    <td>水体高度：</td>
                    <td>
                        <el-input v-model="height" size="small" @change="save"></el-input>
                    </td>
                </tr>
            </table>
            <br>
            <div style="text-align: center">
                <el-button size="small" style="margin-left: 10px" type="success" @click="save">保存</el-button>
                <el-button size="small" type="danger" @click="close">退出</el-button>
            </div>
        </tab-pane>
    </win-tabs>
</template>

<script>
import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';


export default {
    name: 'ws-content',
    components: { winTabs, tabPane },
    data() {
        return {
            color: 'rgba(0, 75.3, 53.2, 0.7)',
            color_r: 0.0, // 颜色R
            color_g: 0.2941177, // 颜色G
            color_b: 0.2078431, // 颜色B
            color_a: 1,// 透明度
            water_freq: 100.0, // 波纹频率
            water_animationspeed: 0.01, // 波动速度
            water_amplitude: 2.0,// 波动高度
            height: 1
        };
    },
    methods: {
        save() {
            let that = this;
            setTimeout(() => {
                let options = earth.viewer3DWorkSpace.waterMana.options;

                !isNaN(parseFloat(that.color_r)) && (options.red = parseFloat(that.color_r));
                !isNaN(parseFloat(that.color_g)) && (options.green = parseFloat(that.color_g));
                !isNaN(parseFloat(that.color_b)) && (options.blue = parseFloat(that.color_b));
                !isNaN(parseFloat(that.color_a)) && (options.alpha = parseFloat(that.color_a));
                !isNaN(parseFloat(that.water_freq)) && (options.frequency = parseFloat(that.water_freq));
                !isNaN(parseFloat(that.water_animationspeed)) && (options.animationSpeed = parseFloat(that.water_animationspeed));
                !isNaN(parseFloat(that.water_amplitude)) && (options.amplitude = parseFloat(that.water_amplitude));
                !isNaN(parseFloat(that.height)) && (options.height = parseFloat(that.height));

                earth.viewer3DWorkSpace.waterMana.reLoad();
            }, 100);
        },
        close() {
            this.$store.commit('setVGEEarthComAction', { name: 'waterSpecial', on_off: 2 });
            this.$emit('setVGE');
        }
    },
    watch: {
        color(newV, oldV) {
            let colorArr = newV.replace('rgba(', '').replace(')', '').replaceAll(' ', '').split(',');
            this.color_r = colorArr[0] / 256;
            this.color_g = colorArr[1] / 256;
            this.color_b = colorArr[2] / 256;
            this.color_a = colorArr[3];
        }
    }
};
</script>

<style lang="less" scoped>
table {
    color: #009b94;
    font-size: 14px;

    tr {
        height: 35px;
    }
}
</style>
