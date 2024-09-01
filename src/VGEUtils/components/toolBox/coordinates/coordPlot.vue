<template>
	<div>
		<div>
			<el-button size="small" :type="continuous?'success':''" @click="continuous=!continuous">连续标注</el-button>
			<el-text type="info" v-if="continuous===false" style="margin-left: 10px">：未开启</el-text>
			<el-text type="success" v-if="continuous===true" style="margin-left: 10px">：开启</el-text>
		</div>
		<div style="margin-top: 20px">
			<el-button size="small" type="primary" @click="addMarkLabel">标注</el-button>
			<el-button size="small" type="success" @click="exportMarkers">导出</el-button>
			<el-button size="small" type="warning" @click="removeMarkLabel">重置</el-button>
		</div>
	</div>
</template>


<script>

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
	data() {
		return {
			continuous: false
		};
	},
	methods: {
		async addMarkLabel() {
			earth.drawShape.drawPoint({
				endCallback: async (positions) => {
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
                      <div>高程：${height.toFixed(4)} m</div>
                  </div>`;

					let point = new VGEEarth.SuperiorEntity.GradientLabelPoint(
						earth.viewer3D, {
							longitude: lon,
							latitude: lat,
							height: height
						}, dom
					);

					point.init();
					dynamicLabelList.push(point);
					pointList.push({lon: lon, lat: lat, height: height});

					if (this.continuous) {
						await this.addMarkLabel();
					}
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

			this.continuous = false;
			earth.drawShape.callStop();
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

