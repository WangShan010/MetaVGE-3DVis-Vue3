<template>
	<div v-if="show" class="layer">
		<div class="tool-title">
			<div>
				<img alt="" src="./img/layer.png">
				<span>地图数据</span>
			</div>
			<img alt="" class="close-btn" src="./img/close.png" @click="close">
		</div>
		<div class="layer-tree">
			<!-- 加载数据图层 -->
			<div id="treeDom" class="ztree" style="padding: 5px 10px"></div>
			<div id="ctrlTree" :class="{'openLoad':isReloadTree,'closeLoad':!isReloadTree}"
				 @click="toggleReload">
				<span style="padding-right: 10px">实时数据接入</span>
				<el-text v-if="isReloadTree" size="large" :type="isReloadTree?'success':'warning'"
						 style="font-size: 14px">◉ 开启中
				</el-text>
				<el-text v-if="!isReloadTree" size="large" :type="isReloadTree?'success':'warning'"
						 style="font-size: 14px">◉ 已关闭
				</el-text>
			</div>
		</div>
	</div>
</template>

<script>

let reloadTimer = null;
export default {
	name: 'resourceTree',
	data() {
		return {
			isReloadTree: false
		};
	},
	methods: {
		toggleReload() {
			this.isReloadTree = !this.isReloadTree;
			if (this.isReloadTree === false) {
				VGEEarth.ConfigTool.config.cesium3DTileSetList = VGEEarth.ConfigTool.config.cesium3DTileSetList.filter(item => {
					return item.properties.type !== 'realtime';
				});
				if (window.zTreeMana) {
					window.zTreeMana.upDateTreeNode();
				}
			} else {
				this.reloadTree();
			}
		},
		close() {
			this.$store.commit('setVGEEarthComAction', {name: 'resourceTree', on_off: 2});
		},
		async reloadTree() {
			if (this.isReloadTree === false) return;

			const realTimeData = await fetch('http://127.0.0.1:3000/TileServer/getTileSetList').then(res => res.json());
			const configTileSetList = VGEEarth.ConfigTool.config.cesium3DTileSetList;

			const newItems = realTimeData.filter(realTimeItem => configTileSetList.find(item => item.pid === realTimeItem.pid) === undefined);
			const removedItems = configTileSetList.filter(item => realTimeData.find(realTimeItem => realTimeItem.pid === item.pid) === undefined);

			for (let i = 0; i < newItems.length; i++) {
				const item = newItems[i];
				const tileSet3D = {
					pid: item.pid,
					name: item.name,
					catalog: '实时数据',
					dataType: 'Cesium3DTile',
					properties: {
						type: 'realtime',
						url: 'http://127.0.0.1:3000' + item.url
					}
				};
				VGEEarth.ConfigTool.addResourceItem(tileSet3D);
			}
			for (let j = 0; j < removedItems.length; j++) {
				const removedItem = removedItems[j];
				// 剔除掉
				VGEEarth.ConfigTool.config.cesium3DTileSetList = VGEEarth.ConfigTool.config.cesium3DTileSetList.filter(item => item.pid !== removedItem.pid);
				earth.viewer3DWorkSpace.removeDataByPid(removedItem.pid);
			}
		}
	},
	computed: {
		show() {
			let s = this.$store.getters.comStatus('resourceTree');
			this.$nextTick(() => {
				if (s) {
					let t = new VGEEarth.TreeMana.ZTreeMana(earth.viewer3D,
						VGEEarth.EventMana.ScopeType.Viewer3D,
						{font: {'color': 'white'}}
					);
					reloadTimer = setInterval(() => {
						this.reloadTree();
						t.upDateTreeNode();
					}, 2000);
				}
			});
			return s;
		}
	},
	unmounted() {
		clearInterval(reloadTimer);
	}
};
</script>


<style lang='less' scoped>
.layer {
	background: rgba(33, 45, 33, 0.8);
	position: absolute;
	min-width: 200px;
	border-radius: 5px;
	z-index: 100;
	top: calc(17vh + 20px);
	left: 38px;

	.layer-tree {
		width: 100%;
		height: 40vh;
		overflow: auto;
		padding-bottom: 50px;
		margin-top: 5px;
		margin-bottom: 5px;
	}
}

.tool-title {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 10px;
	font-size: 16px;
	font-weight: 400;
	color: #FFFFFF;
	line-height: 35px;
	border-bottom: 1px solid rgba(185, 197, 185, 0.2);

	img:first-child {
		margin-right: 0.5vw;
	}

	.close-btn {
		text-align: right;
		width: 20px;
		height: 20px;
		color: #fff;
		cursor: pointer;
	}
}

.node_name {
	color: white !important;
}

#ctrlTree {
	border-radius: 0 0 5px 5px;
	padding: 6px 15px;
	text-align: center;
	border-top: 1px solid rgba(185, 197, 185, 0.2);
	position: absolute;
	bottom: 0;
	width: 100%;
	color: whitesmoke;
	cursor: pointer;
}

.openLoad {
	background-color: rgba(168, 244, 103, 0.3)
}

.closeLoad {
	background-color: rgb(23, 30, 32);
}


/deep/ .el-text:hover {
	color: #66afe9;
}
</style>
