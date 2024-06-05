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
            <img :src="item.symbolUrl" alt="符号" height="26" width="26"/>
          </span>
            </el-option>
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
        let { data: plotList } = await axios.get(new URL('/VGEEarth/Config/plotTool/pointEntity/plotList.json', import.meta.url).href);
        this.pointMaterials = plotList;
        await this.changeSymbol();
    }
};
</script>

<style lang="less" scoped>

</style>
