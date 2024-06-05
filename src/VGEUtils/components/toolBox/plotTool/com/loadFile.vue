<template>
    <div>
        <div class="padding-top">
            <span style="display:inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 180px">
              文件路径：{{ fileName }}</span>
            <button class="btn btn-success pull-right btn-xs" style="margin-top: -4px" @click="inputFileData"><i class="iconfont icon-wenjianjia"></i>导入
            </button>
        </div>
    </div>
</template>

<script>
import notify from '../lib/notify.js';

export default {
    name: 'loadFile',
    data: function () {
        return {
            fileName: ''
        };
    },
    methods: {
        // 导入 xml 或者 GeoJson。弹出文件选择窗口，并将选文件保存入 全局变量
        inputFileData() {
            let that = this;
            earth.plotTool.inputFileData({
                endFunc: msg => notify({ message: msg, status: 'success' }),
                errFunc: fileName => {
                    that.fileName = fileName;
                    notify({ message: '文件载入成功：' + fileName, status: 'warning' });
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>

</style>
