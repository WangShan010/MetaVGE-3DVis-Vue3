<template>
    <div id="export-plot">
        <table class="table table-bordered table-hover">
            <thead>
            <tr>
                <th style="padding: 8px">属性</th>
                <th style="padding: 8px">值</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>要素</td>
                <td>{{ featureCount }}个</td>
            </tr>
            </tbody>
        </table>
        <div style="text-align: center">
            <button class="btn btn-primary" style="margin-right: 5px" @click="SaveAsKML">
                导出为 XML
            </button>
            <button class="btn btn-primary" @click="SaveAsGeoJson">
                导出为 GeoJson
            </button>
        </div>
    </div>
</template>

<script>


import notify from '../lib/notify.js';

let plotTool;
let t = null;
export default {
    name: 'exportPlot',
    data: function () {
        return {
            featureCount: 0
        };
    },
    methods: {
        SaveAsGeoJson() {
            plotTool.SaveAsGeoJson(function (msg) {
                notify({ message: msg, status: 'success' });
            });
        },
        SaveAsKML() {
            plotTool.SaveAsKML(function (msg) {
                notify({ message: msg, status: 'success' });
            });
        }
    },
    mounted() {
        plotTool = earth.plotTool;
        t = setInterval(() => {
            this.featureCount = earth.plotTool.GeoJson.features.length;
        }, 200);
    },
    unmounted() {
        clearInterval(t);
    }
};
</script>

<style lang="less" scoped>
#export-plot {
    padding: 15px;
    height: 100%;
    overflow: auto;
    border: black 1px dashed
}
</style>
