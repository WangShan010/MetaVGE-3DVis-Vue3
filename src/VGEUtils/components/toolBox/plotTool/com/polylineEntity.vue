<template>
    <div>
        <div style="padding-top: 15px">
            材质：
            <el-select v-model="lineMaterialIndex"
                       @change="changeSymbol"
                       placeholder="请选择"
                       size="small"
                       clearable
                       style="width: 215px">
                <el-option v-for="(item,index) in lineMaterials"
                           :label="item.label"
                           :value="index"
                           :key="index">
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right;" v-if="item.url">
            <img width="100" height="10" :src="item.url"/>
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
        let {data: plotList} = await axios.get(new URL('/VGEEarth/Config/plotTool/lineEntity/plotList.json', import.meta.url).href);
        this.lineMaterials = plotList;
        console.log(plotList);
        await this.changeSymbol();
    }
};
</script>

<style scoped>

</style>
