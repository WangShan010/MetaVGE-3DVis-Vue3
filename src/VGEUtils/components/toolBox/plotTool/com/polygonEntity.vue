<template>
    <div>
        <div style="padding-top: 15px">
            材质：
            <el-select v-model="polygonMaterialIndex"
                       clearable
                       placeholder="请选择"
                       size="small"
                       style="width: 215px"
                       @change="changeSymbol">
                <el-option v-for="(item,index) in polygonMaterials"
                           :key="item.label"
                           :label="item.label"
                           :value="index">
                    <span style="float: left">{{ item.label }}</span>
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'polygonEntity',
    data: function () {
        return {
            polygonMaterialIndex: 0,
            polygonMaterials: [
                { label: '普通', type: 'normal' }
            ]
        };
    },
    methods: {
        async changeSymbol() {
            let pointItem = this.polygonMaterials[this.polygonMaterialIndex];
            if (pointItem) {
                this.$emit('setDrawObj',
                    {
                        image: pointItem.url,
                        name: pointItem.label,
                        label: pointItem.label,
                        type: 'polygonEntity'
                    }
                );
            }
        }
    },
    mounted() {
        this.changeSymbol();
    }
};
</script>

<style lang="less" scoped>

</style>
