<template>
    <div class="toolRow">
        <div>
            <el-row class="form-item">
                <el-col :span="8">
                    <label class="label-container">省份</label>
                </el-col>
                <el-col :span="16">
                    <el-select v-model="provinceName" clearable placeholder="请选择" size="small">
                        <el-option v-for="item in proviceValue" :key="item.index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
        </div>
        <button class="btn btn-info btn-sm" style="margin-left: 50px" @click="start">特效演示</button>
        <button class="btn btn-info btn-sm" @click="reset">清空效果</button>
    </div>
</template>

<script>
let regionLabelArea = {};
export default {
    name: 'regionLabel',
    data() {
        return {
            provinceName: 'beijing',
            proviceValue: [
                { index: 0, value: 'beijing', label: '北京' },
                { index: 1, value: 'hubei', label: '湖北' }
            ],
            options: {
                backGround: './app/vge/regionLabel/beij.083ca80f.png', //周围行政区背景图
                wallgradients: './app/vge/regionLabel/wallgradients.png', //行政区边界墙体效果
                size: 0.5, //标签大小
                colorLine: [0.1, 0.1, 0.1], //周围行政区别界线颜色
                colorPolygon: [0.1, 0.15, 0.15] //周围行政区边境面颜色
            },
            regionJsonUrl: {
                beijing: {
                    regionArea: './app/vge/regionLabel/beijing_2.json',
                    proviceArea: './app/vge/regionLabel/beijing_3.json',
                    view: {
                        destination: {
                            x: -2285318.922205349,
                            y: 4561449.436806091,
                            z: 4046846.8682504706
                        },
                        orientation: {
                            heading: 6.174723072454894,
                            pitch: -0.71825433447645,
                            roll: 0.0000010271026651409443
                        },
                        duration: 2
                    }
                    // proviceContent: "./app/vge/regionLabel/beijing_2.json"
                },
                hubei: {
                    regionArea: './app/vge/regionLabel/region.json',
                    proviceArea: './app/vge/regionLabel/CHN_adm2.json',
                    // proviceContent: "./app/vge/regionLabel/region.json"
                    view: {
                        destination: {
                            x: -3036049.2049679733,
                            y: 6765587.416918585,
                            z: 3452995.864224429
                        },
                        orientation: {
                            heading: 5.889445354861434,
                            pitch: -1.2687745954690257,
                            roll: 0.00023910045793762436
                        },
                        duration: 2
                    }
                }
            },
            // regionLabel: {},
            regionJson: [],
            isStart: false
        };
    },
    methods: {
        async start() {
            earth.viewer3D.scene.globe.depthTestAgainstTerrain = false;
            let that = this;
            if (that.provinceName === '') {
                return;
            }
            that.reset();
            let promiseFetch = [
                fetch(that.regionJsonUrl[that.provinceName].regionArea),
                fetch(that.regionJsonUrl[that.provinceName].proviceArea)
                // fetch(that.regionJsonUrl[that.provinceName].proviceContent)
            ];
            that.regionJson = await Promise.all(promiseFetch)
                .then(res => {
                    return res.map(x => x.json());
                })
                .then(async res => {
                    const x = await Promise.all(res);
                    return x.map(res => res.features);
                });
            earth.viewer3D.scene.camera.setView(that.regionJsonUrl[that.provinceName].view);
            // console.log(that.regionJson);
            that.regionLabelArea = new VGEEarth.RegionLabel(
                earth.viewer3D,
                that.options,
                that.regionJson
            );

            that.isStart = true;
        },
        reset() {
            let that = this;
            if (this.isStart) {
                that.regionLabelArea.remove();
            }
            this.isStart = false;
        }
    },
    unmounted() {
        this.reset();
        earth.viewer3D.scene.globe.depthTestAgainstTerrain = true;
    }
};
</script>

<style lang="less" scoped>
.toolRow {
    text-align: center;
}

.toolRow button {
    margin-top: 10px;
    margin-right: 5px;
}

label {
    color: #009b94;
}

.el-input--mini .el-input__inner {
    height: 35px;
    line-height: 28px;
}
</style>
