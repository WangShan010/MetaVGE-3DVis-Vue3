<template>
	<div style="padding-top: 15px">
		材质：
		<el-select
			v-model="pointMaterialIndex"
			clearable
			placeholder="请选择"
			size="small"
			style="width: 215px"
			@change="changeSymbol">
			<el-option v-for="(item,index) in pointMaterials"
					   :key="item.label"
					   :label="item.label"
					   :value="index">
				<span style="float: left">{{ item.label }}</span>
				<span style="float: right;">
            <img :src="item.symbolUrl" alt="符号" height="24" width="24"/>
          </span>
			</el-option>

			<template #label="{ label }">
				<img :src="getSymbolImg()" alt="符号" height="20" width="20" style="margin-right: 8px"/>
				<span>{{ label }}: </span>
			</template>
		</el-select>
	</div>
</template>

<script>
export default {
	name: 'pointEntity',
	data: function () {
		return {
			pointMaterialIndex: 0,
			pointMaterials: []
		};
	},
	methods: {
		getSymbolImg() {
			let pointItem = this.pointMaterials[this.pointMaterialIndex];
			return pointItem?.symbolUrl;
		},
		async changeSymbol() {
			let pointItem = this.pointMaterials[this.pointMaterialIndex];
			if (pointItem) {
				this.$emit('setDrawObj',
					{
						type: 'pointEntity',
						name: pointItem.label,
						label: pointItem.label,
						symbolUrl: pointItem.symbolUrl
					}
				);
			}
		}
	},
	async mounted() {
		let {data: plotList} = await axios.get('./VGEEarth/Config/plotTool/pointEntity/plotList.json');
		this.pointMaterials = plotList;
		await this.changeSymbol();
	}
};
</script>

<style lang="less" scoped>

</style>
