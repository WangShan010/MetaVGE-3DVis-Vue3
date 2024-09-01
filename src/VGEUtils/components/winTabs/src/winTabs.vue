<template>
	<Vue3DraggableResizable
		v-show="ready"
		ref="tab"
		v-model:active="active"
		v-model:h="h"
		v-model:parent="parent"
		v-model:w="w"
		v-model:x="x"
		v-model:y="y"
		:draggable="true"
		:initH="250"
		:initW="300"
		:minH="123"
		:minW="300"
		:resizable="resizable"
		class="winTabs"
		classNameActive="classNameActive"
		@activated="print('activated')"
		@deactivated="print('deactivated')"
		@dragging="print('dragging')"
		@resizing="print('resizing')"
		@drag-start="print('drag-start')"
		@resize-start="print('resize-start')"
		@drag-end="print('drag-end')"
		@resize-end="print('resize-end')"
	>
		<div ref="content" class="content">
			<div class="iconBtnGroup">
                <span v-if="changeSizeAble" class="iconBtn noDrag iconfont icon-esgcc-fuzhi" style="right: 20px"
					  @click="changeSize"></span>
				<span v-if="maxAble" class="iconBtn noDrag iconfont icon-esgcc--zuidahua" style="right: 40px"
					  @click="zoomSize"></span>
				<span class="iconBtn noDrag iconfont icon-esgcc-tishi" title="帮助教程" @click="openHelp"></span>
				<span class="iconBtn noDrag iconfont icon-esgcc-guanbi" style="right: 0" title="关闭"
					  @click="close"></span>
			</div>

			<div v-if="false" class="help-block-win">
                <span>
                       📋您第一次使用该模块，可以点击此处观看使用视频教程：
                </span>
				<div>
					<el-button type="success">打开教程</el-button>
					<el-button type="primary" @click="firstGuide=false">跳过</el-button>
				</div>
			</div>
			<el-tabs style="height: 100%;border-radius: 3px;padding:0 10px 5px 10px;">
				<div @mousedown.stop @touchstart.stop style="height: 100%">
					<slot></slot>
				</div>
			</el-tabs>
		</div>
	</Vue3DraggableResizable>
</template>

<script>
import Vue3DraggableResizable from 'vue3-draggable-resizable';
import { ElTabs } from 'element-plus';
import tabsStyle from './tabsStyle.json';

export default {
	name: 'winTabs',
	data() {
		return {
			ready: false,
			x: 100,
			y: 100,
			h: 250,
			w: 300,
			active: false,
			parent: true,
			resizable: false,

			oldSize: {
				x: 100,
				y: 100,
				h: 250,
				w: 300
			},
			winSize: 'min',
			fontColor: '#009c95',
			border: '1px solid #526f82',
			outBackgroundColor: 'rgba(38, 38, 38, 0.75)',
			inBackgroundColor: '#242524'
		};
	},
	props: ['initCSS', 'maxAble', 'changeSizeAble', 'firstGuide'],
	components: {
		Vue3DraggableResizable,
		ElTabs
	},
	methods: {
		print(val) {
			if (val === 'resize-end') {
				this.resizable = false;
			}
		},
		changeSize() {
			this.resizable = !this.resizable;
		},
		zoomSize() {
			this.winSize = this.winSize === 'min' ? 'max' : 'min';

			if (this.winSize === 'min') {
				this.h = this.oldSize.h;
				this.w = this.oldSize.w;
				this.$nextTick(() => {
					this.x = this.oldSize.x;
					this.y = this.oldSize.y;
				});
			} else {
				this.oldSize.x = this.x;
				this.oldSize.y = this.y;
				this.oldSize.h = this.h;
				this.oldSize.w = this.w;
				this.x = 0;
				this.y = 0;
				this.h = document.documentElement.clientHeight;
				this.w = document.documentElement.clientWidth;
			}

		},
		openHelp() {
			this.$emit('openHelp');
		},
		close() {
			this.$emit('close');
		}
	},
	async mounted() {
		this.fontColor = tabsStyle.fontColor;
		this.border = tabsStyle.border;
		this.outBackgroundColor = tabsStyle.outBackgroundColor;
		this.inBackgroundColor = tabsStyle.inBackgroundColor;

		let styleCss = this.initCSS;
		for (const key in styleCss) {
			if (key === 'height') {
				this.h = styleCss[key];
			} else if (key === 'width') {
				this.w = styleCss[key];
			} else if (key === 'left') {
				this.x = styleCss[key];
			} else if (key === 'top') {
				this.y = styleCss[key];
			}
		}

		this.$refs.content.style.borderStyle = tabsStyle.border;
		this.$refs.content.style.backgroundColor = tabsStyle.outBackgroundColor;
		this.$refs.content.getElementsByClassName('el-tabs__content')[0].style.backgroundColor = tabsStyle.inBackgroundColor;

		this.ready = true;
	}
};
</script>

<style lang="less" scoped>
@import "./iconBtn.css";

.winTabs {
	z-index: 100;
	height: 100%;
	width: 100%;
}

.content {
	height: 100%;
	width: 100%;
	position: relative;
	border: 1px solid #526f82;
	border-radius: 5px;
}

.help-block-win {
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 5;
	background-color: rgba(33, 45, 33, 0.9);
	color: #fad9a4;
	padding: 50px 20px 20px 20px;
	font-size: 16px;
	border-radius: 5px;
	display: flex;
	flex-direction: column;

	div {
		padding-top: 20px;
		text-align: center;
	}
}

.classNameActive {
	border-color: #526f82;
	border-radius: 5px;
}

:deep( .el-tabs__item) {
	color: #c9c9c9;
}

:deep( .el-tabs__item.is-active ) {
	color: #009c95;
}

:deep( .el-tabs__nav-wrap::after) {
	background-color: #2b2d2b;
}

:deep( .el-tabs__active-bar ) {
	background-color: #009c95;
}

:deep(.el-tabs__content ) {
	height: calc(100% - 65px);
	padding: 10px;
	color: #009c95;
	overflow: auto;

	input[type=text] {
		color: black;
	}

	select {
		color: black;
	}
}
</style>
