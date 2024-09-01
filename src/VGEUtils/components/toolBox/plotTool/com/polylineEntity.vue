<template>
	<div>
		<div style="padding-top: 15px">
			材质：
			<el-select v-model="lineMaterialIndex"
					   clearable
					   placeholder="请选择"
					   size="small"
					   style="width: 215px"
					   @change="changeSymbol">
				<el-option v-for="(item,index) in lineMaterials"
						   :key="index"
						   :label="item.label"
						   :value="index">
					<span style="float: left">{{ item.label }}</span>
					<span v-if="item.url" style="float: right;">
            <img :src="item.url" height="10" width="100"/>
          </span>
				</el-option>
			</el-select>
		</div>

		<div style="padding-top: 15px">
			线宽：
			<el-input v-model.number="lineMaterialWidth" size="small" style="width: 80px"></el-input>
		</div>

	</div>
</template>

<script>
export default {
	name: 'polylineEntity',
	data: function () {
		return {
			lineMaterialIndex: 0,
			lineMaterialWidth: 12,
			lineMaterials: []
		};
	},
	methods: {
		async changeSymbol() {
			let polylineItem = this.lineMaterials[this.lineMaterialIndex];
			if (polylineItem) {
				this.$emit('setDrawObj',
					{
						type: 'polylineEntity',
						params: {
							material: polylineItem.type,
							width: this.lineMaterialWidth,
							type: '线要数'
						}
					}
				);
			}
		}
	},
	async mounted() {
		let {data: plotList} = await axios.get('./VGEEarth/Config/plotTool/lineEntity/plotList.json');
		this.lineMaterials = plotList;
		await this.changeSymbol();
	}
};
</script>

<style lang="less" scoped>

</style>
