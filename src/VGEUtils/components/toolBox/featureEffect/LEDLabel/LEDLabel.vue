<template>
    <div class="toolRow">
        <button class="btn btn-info btn-sm" style="margin-right: 5px" @click="start">特效演示</button>
        <button class="btn btn-info btn-sm" @click="reset">清空效果</button>
    </div>
</template>

<script>
export default {
    name: 'LEDLabel',
    data() {
        return {
            options: {
                backGround: new URL('/app/vge/regionLabel/beij.083ca80f.png', import.meta.url).href,                  //周围行政区背景图
                wallgradients: new URL('/app/vge/regionLabel/wallgradients.png', import.meta.url).href,                //行政区边界墙体效果
                size: 0.5,                                              //标签大小
                colorLine: [.10, .10, .10],                               //周围行政区别界线颜色
                colorPolygon: [.10, .15, .15]                             //周围行政区边境面颜色
            },
            regionLabel: null,
            LEDLabel: []
        };
    },
    methods: {
        start() {
            let regionJson = [];
            regionJson.push(fetch('./app/vge/regionLabel/beijing_2.json').then(res => {
                return res.json();
            }).then(res => {
                return res.features;
            }));
            regionJson.push(fetch('./app/vge/regionLabel/beijing_3.json').then(res => {
                return res.json();
            }).then(res => {
                return res.features;
            }));
            regionJson.push(fetch('./app/vge/regionLabel/beijing_2.json').then(res => {
                return res.json();
            }).then(res => {
                return res.features;
            }));
            this.regionLabel = new VGEEarth.RegionLabel(
                earth.viewer3D, this.options, regionJson
            );
            fetch('./app/vge/regionLabel/beijing_3point.json')
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    res.features.map(feature => {
                        let coordinates = feature.geometry.coordinates;
                        let c = Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1], 15010);
                        this.LEDLabel.push(new VGEEarth.SuperiorEntity.LEDLabel(earth.viewer3D, c, 3000 + Math.floor(Math.random() * 100)));
                    });
                });
        },
        //清除
        reset() {
            this.regionLabel?.remove();
            if (this.LEDLabel.length == 0) {
                return 0;
            }
            for (let i = 0; i < this.LEDLabel.length; i++) {
                this.LEDLabel[i].remove();
            }
            this.LEDLabel = [];
        }
    },
    unmounted() {
        this.reset();
    },
    mounted() {
        earth.viewer3D.scene.camera.setView({
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
        });
    }
};
</script>

<style lang="less" scoped>
.toolRow {
    text-align: center;
}
</style>
