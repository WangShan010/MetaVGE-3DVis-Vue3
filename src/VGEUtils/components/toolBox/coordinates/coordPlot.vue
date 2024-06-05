<template>
    <div class="co-btn">
        <el-button size="small" type="primary" @click="addMarkLabel">标注</el-button>
        <el-button size="small" type="success" @click="exportMarkers">导出</el-button>
        <el-button size="small" type="warning" @click="removeMarkLabel">重置</el-button>
    </div>
</template>


<script>
async function dynamicDivLabel(lon, lat, height) {
    let dom = document.createElement('div');
    dom.innerHTML = `<div style="text-align: left">
                      <div>经度：${lon}</div>
                      <div>纬度：${lat}</div>
                      <div>高程：${height}</div>
                  </div>`;
    let dynamicDivLabel = new VGEEarth.SuperiorEntity.GradientLabelPoint(earth.viewer3D, {
        longitude: lon,
        latitude: lat
    }, dom);


    await dynamicDivLabel.init();
    return dynamicDivLabel;
}

function saveShareContent(content, fileName) {
    let downLink = document.createElement('a');
    downLink.download = fileName;
    //字符内容转换为blod地址
    let blob = new Blob([content]);
    downLink.href = URL.createObjectURL(blob);
    // 链接插入到页面
    document.body.appendChild(downLink);
    downLink.click();
    // 移除下载链接
    document.body.removeChild(downLink);
}

let dynamicLabelList = [];
let pointList = [];


export default {
    name: 'coordPlot',
    methods: {
        async addMarkLabel() {
            earth.drawShape.drawPoint({
                endCallback: async function (positions) {
                    let position = VGEEarth.CartographicTool.formCartesian3(positions[0]);
                    let [cartesianHasHeight] = await VGEEarth.getMostDetailedHeight([{
                        longitude: position.longitude,
                        latitude: position.latitude,
                        height: 0
                    }]);

                    let height = cartesianHasHeight.height;


                    let lon = position.longitude;
                    let lat = position.latitude;

                    let dom = document.createElement('div');
                    dom.innerHTML = `<div style="text-align: left">
                      <div>经度：${lon.toFixed(5)}°</div>
                      <div>纬度：${lat.toFixed(5)}°</div>
                      <div>高程：${height.toFixed(4)}</div>
                  </div>`;


                    console.log({ lon: lon, lat: lat, height: height });
                    let point = new VGEEarth.SuperiorEntity.GradientLabelPoint(
                        earth.viewer3D, {
                            longitude: lon,
                            latitude: lat,
                            height: height
                        }, dom
                    );

                    point.init();
                    dynamicLabelList.push(point);
                    pointList.push({ lon: lon, lat: lat, height: height });
                }
            });
        },
        exportMarkers() {
            saveShareContent(JSON.stringify(pointList, null, 2), '坐标标注.json');
        },
        removeMarkLabel() {
            dynamicLabelList.forEach(e => {
                e.remove();
            });
            dynamicLabelList = [];
            pointList = [];
        }
    },
    mounted() {
        dynamicLabelList = [];
        pointList = [];
    },
    unmounted() {
        this.removeMarkLabel();
    }
};
</script>

<style lang="less" scoped>

.co-btn {
    margin-top: 20px;
    display: flex;
}
</style>