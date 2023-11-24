<template>
    <div>
        <div style="padding-top: 15px">
            分组：
            <el-cascader v-model="selGroup" :options="groupList"
                         :props="{ value: 'groupName', label: 'groupName', children: 'childrens' }" @change="changeGroup"
                         clearable
                         size="small" style="width: 200px">
            </el-cascader>
        </div>
        <div style="padding-top: 15px">
            符号：
            <el-select v-model="selPlotCode" size="small" @change="changePlot">
                <el-option v-for="item in plotList" :key="item.code" :label="item.name" :value="item.code" clearable>
                </el-option>
            </el-select>
        </div>

        <div v-if="selPlot">
            <div v-for="item in selPlot.paramList">
                <div style="padding-top: 10px">
                    {{ item.name }}：
                    <el-select v-if="item.select instanceof Array" v-model="item.value" size="small">
                        <el-option v-for="item2 in item.select" :key="item2.key" :label="item2.label" :value="item2.value"
                                   clearable>
                        </el-option>
                    </el-select>
                    <el-input size="small" v-else v-model="item.value" style="width: 200px" :placeholder="item.placeholder || ''" @input="setOption(item)">
                    </el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'customEntity',
    data() {
        return {
            selGroup: '信息弹框',
            groupList: [],
            plotList: [],
            selPlotCode: null,
            selPlot: null

        };
    },
    computed: {
        selPlotStr() {
            return JSON.stringify(this.selPlot || {});
        }
    },
    watch: {
        selPlotStr() {
            this.$emit('setDrawObj', JSON.parse(this.selPlotStr));
        }
    },
    methods: {
        getPlotByCode(code) {
            let plot = null;
            this.groupList.forEach(({plotList}) => {
                plot = plot || plotList.find(plotItem => plotItem.code === code);
            });
            return plot;
        },
        // 为实体添加文字标注
        setOption(e) {
            if (e.defaultLabel) {
                this.selPlot.name = e.value;
            }
        },

        // 切换标绘组
        changeGroup(groupArr) {
            this.selPlotCode = null;
            this.selPlot = null;
            this.plotList = [];

            let groupList = this.groupList;
            groupArr = JSON.parse(JSON.stringify(groupArr));
            while (groupArr.length) {
                let groupName = groupArr.shift();
                groupList = groupList.find(item => item.groupName === groupName);
                if (groupList && groupArr.length === 0) {
                    this.plotList = groupList.plotList;
                    this.changePlot(this.plotList[0].code);
                }
            }
        },

        // 切换标绘项
        changePlot(selPlotCode) {
            if (selPlotCode === undefined) return;
            let selPlotObj = this.getPlotByCode(selPlotCode);
            if (!selPlotObj) return;

            this.selPlotCode = selPlotCode;
            this.selPlot = JSON.parse(JSON.stringify(selPlotObj));
            this.selPlot.paramList = this.selPlot.paramList || [];
            this.selPlot.paramList.forEach(item => {
                if (item.defaultLabel) {
                    this.selPlot.name = item.value || this.selPlot.name;
                }
            });

            this.$emit('setDrawObj', selPlotObj);
        }
    },
    async mounted() {
        // let {data} = await axios.get('http://localhost:3000/Resources/PlotManager/plotList/list.json');
        // this.groupList = data.nodes;

        let {data: customPlotList} = await axios.get(new URL('/VGEEarth/Config/plotTool/custom/plotList.json', import.meta.url).href);
        this.groupList = customPlotList;
        this.$emit('setDrawObj', null);
        this.changeGroup(['信息弹框']);
    }
};
</script>

<style lang="less" scoped>
</style>
