<template>
	<div class="info-section">
		<ul style="width: 100%;max-width: 1800px">
			<!--			<li style="overflow: hidden;width: 350px">-->
			<!--				<p>-->
			<!--					鼠标灵敏度：-->
			<!--					<input id="range" type="range" value="5">-->
			<!--				</p>-->
			<!--			</li>-->
			<li style="overflow: hidden;width: 350px">
				<p>
					场景清晰度：
					<el-button style="margin-right:4px" @click="updateQuality(32)"
							   :class="viewerQuality===32?'sel-active':''">
						<span>普通</span>
					</el-button>
					<el-button style="margin-right:4px" @click="updateQuality(8)"
							   :class="viewerQuality===8?'sel-active':''"
					><span>高清</span></el-button>
					<el-button style="margin-right:4px" @click="updateQuality(1)"
							   :class="viewerQuality===1?'sel-active':''"
					><span>超清</span></el-button>
				</p>
			</li>
			<li style="overflow: hidden;min-width: 350px">
				<p>
					<span class="text-ellipsis label-div">同步数据时间：{{ timeLabel }}</span>
				</p>
				<el-button style="margin-right:4px" @click="update"><span>刷新</span></el-button>
			</li>
			<li class="text-ellipsis" style="text-align: right;width: 600px">
				<p>
					<span class="label-div">经度:</span>
					<span class="content">{{ position.lon }}</span>
				</p>
				<p>
					<span class="label-div">纬度:</span>
					<span class="content">{{ position.lat }}</span>
				</p>
				<p>
					<span class="label-div">高程:</span>
					<span class="content">{{ position.height }}</span>
				</p>
				<p>
					<span class="label-div">相机高度:</span>
					<span class="content">{{ position.cameraHeight }}</span>
				</p>
				<p>
					<span class="label-div">帧率:</span>
					<span class="content">{{ FPS }}(FPS)</span>
				</p>
				<el-button @click="reload"><span>重置</span></el-button>
			</li>
		</ul>
	</div>
</template>

<script>

export default {
	name: 'infoPage',
	data() {
		return {
			timeLabel: '2024年1月22日 10时43分15秒88毫秒',
			FPS: 0,
			viewerQuality: 8,
			position: {
				lon: 0,
				lat: 0,
				height: 0,
				cameraHeight: 0
			}
		};
	},
	methods: {
		init() {
			let that = this;
			// 初始化显示经纬度的标签
			earth.initMonitorCoordinates(earth.viewer3D, function (log, lat, height, cameraHeight) {
					that.position.lon = `${log.toFixed(5)}  °`;
					that.position.lat = `${lat.toFixed(5)}  °`;
					that.position.height = `${height.toFixed(2)} m`;
					that.position.cameraHeight = `${cameraHeight.toFixed(2)} m`;
				}
			);
			setInterval(() => {
				that.FPS = earth.getFPS();
			}, 20);
		},
		update() {
			let now = new Date();
			this.timeLabel = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ` + now.toLocaleTimeString();
		},
		updateQuality(quality) {
			this.viewerQuality = quality;
			earth.viewer3DWorkSpace._3DTileMana.sourcesItems.forEach(item => {
				const instance = earth.viewer3DWorkSpace._3DTileMana.getInstancesByPid(item.pid);
				instance.maximumScreenSpaceError = quality;
			});
		},
		reload() {
			location.reload();
		}
	},
	mounted() {
		let init = false;
		earth.thenLoadComplete().then(() => {
			if (!init) {
				this.init();
				init = true;
			}
			// 2024年1月22日 10时43分15秒88毫秒
			let now = new Date();
			this.timeLabel = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ` + now.toLocaleTimeString();
		});

	}
};
</script>
<style lang='less' scoped>

.text-ellipsis {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	-o-text-overflow: ellipsis;
}

.info-section {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 35px;
	min-height: 30px;
	background: #03313D;
	display: flex;
	justify-content: right;
	align-items: center;

	ul {
		display: flex;
		justify-content: right;
		margin: 0 !important;

		li {
			display: flex;
			height: 100%;
			padding: 0 6px;
			border-right: 1px solid #00FFDE;
			color: #D1D1D1;
			justify-content: right;
			align-items: center;

			span {
				font-size: 12px;
				letter-spacing: 1px;
				font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
			}


			p {
				margin: 0 5px 0 0 !important;
			}


			&:last-child {
				border-right: none;
			}
		}

		.el-button {
			margin-left: 8px;
			width: calc((41 / 1920) * 100vw);
			height: 20px;
			background: linear-gradient(to bottom, #307C8A, #088C87);
			border-radius: 3px;
			border: 0;

			span {
				font-size: 11px;
				line-height: 20px;
				background: linear-gradient(to bottom, #99FEFF 0%, #FFFFFF 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}

			&:hover {
				background: linear-gradient(to bottom, #ffc23a 20%, #e39c01 100%);

				span {
					background: linear-gradient(to bottom, #ffc23a 0%, #fff 0%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}
		}


		.sel-active {
			background: linear-gradient(to bottom, #ffc23a 20%, #e39c01 100%);

			span {
				background: linear-gradient(to bottom, #ffc23a 0%, #fff 0%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
		}

	}
}
</style>
