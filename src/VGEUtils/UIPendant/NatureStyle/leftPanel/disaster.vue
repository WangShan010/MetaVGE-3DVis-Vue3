<template>
    <div class="left-panel">
        <div class="panel-header">各地降水量&受灾人口</div>
        <div class="panel-body">
            <div class="disaster-info">
                <div>
                    <div>受灾人员</div>
                    <div>232,425</div>
                </div>
                <div>
                    <div>被困人员</div>
                    <div>1,282</div>
                </div>
                <div>
                    <div>伤亡/失踪人员</div>
                    <div>33/8</div>
                </div>
            </div>
            <div class="disaster-table">
                <table>
                    <tr>
                        <th>驻马店</th>
                        <th>郑州</th>
                        <th>开封</th>
                        <th>洛阳</th>
                        <th>商丘</th>
                        <th>焦作</th>
                    </tr>
                    <tr>
                        <td>795,49</td>
                        <td>141.27</td>
                        <td>141.27</td>
                        <td>141.27</td>
                        <td>141.27</td>
                        <td>141.27</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'disaster'
};
</script>

<style lang='less' scoped>
@import "../assets/css/common-theme.less";
@import "../assets/css/green-theme.less";
@import "../assets/css/yellow-theme.less";
</style>


