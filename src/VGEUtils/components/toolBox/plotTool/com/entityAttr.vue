<template>
    <div>
        <div class="entity_arr">
			<div>
				<div v-for="item in TableData">
					{{item}}
				</div>
			</div>
            <ul id="GeoJsonTree" class="ztree"></ul>
        </div>
        <div style="text-align: center;padding: 10px">
            <el-button :size="'small'" :type="'success'" @click="flyToEntity">
                飞向实体
            </el-button>
            <el-button v-if="false" :size="'small'" :type="'primary'">
                编辑属性
            </el-button>
            <el-button v-if="false" :size="'small'" :type="'warning'">
                删除实体
            </el-button>
        </div>
        <div v-if="false" style="height:300px;overflow: auto; border: black 1px dashed">
            <table class="table table-bordered table-hover">
                <thead>
                <th>属性</th>
                <th>值</th>
                <th></th>
                </thead>
                <tbody>
                <tr v-for="row in TableData">
                    <td
                        onclick="this.children[1].style.display='inline';this.children[1].focus(); "
                        style="max-width: 75px"
                    >
                        <div>{{ row.key }}</div>
                        <input
                            v-model="row.key"
                            class="form-control"
                            onfocusout="this.style.display='none'"
                            style="margin-top: 5px;display: none"
                            type="text"
                        />
                    </td>
                    <td
                        onclick="this.children[1].style.display='inline';this.children[1].focus(); "
                        style="text-align: center;max-width: 200px"
                    >
                        <div>{{ row.value }}</div>
                        <input
                            v-model="row.value"
                            class="form-control"
                            onfocusout="this.style.display='none'"
                            style="margin-top: 5px;display: none"
                            type="text"
                        />
                    </td>
                    <td style="width: 25px">
                        <button @click="delPro(row.key)">
                            <span class="glyphicon glyphicon-floppy-remove"></span>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            <div style="text-align: center;padding-bottom: 10px">
                <button class="btn btn-info" @click="addPro">
                    <span class="glyphicon glyphicon-plus"></span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>

let timer = null;
export default {
    name: 'entityAttr',
    data() {
        return {
            entityLength: 0,
            TreeData: [],
            TreeNode: null,
            TableData: []
        };
    },
    computed: {
        TableDataStr: function () {
            return JSON.stringify(this.TableData).length;
        }
    },
    methods: {
        refreshStatus() {
            let geoJson = earth.plotTool.GeoJson;
            if (this.entityLength === geoJson.features.length) {
                return;
            } else {
                this.entityLength = geoJson.features.length;
            }

            let TreeData = [];

            geoJson.features.forEach(feature => {
                TreeData.push({
                    id: feature.properties.id,
                    name: feature.properties.name
                });
            });

            this.TreeData = TreeData;
            this.initGeoJsonTree();
            console.log('刷新状态');
        },
        initGeoJsonTree() {
            let zTreeObj;
            // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
            let setting = {
                callback: {
                    onClick: (e, treeId, treeNode) => {
                        earth.plotTool.GeoJson.features.forEach(feature => {
                            if (feature.properties.id === treeNode.id) {
                                let newTable = [];
                                for (const key in feature) {
                                    newTable.push({
                                        key,
                                        value: feature.properties[key]
                                    });
                                }
                                this.TableData = newTable;
                                this.TreeNode = treeNode;
                            }
                        });
                    }
                }
            };
            // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
            let zNodes = this.TreeData;

            zTreeObj = $.fn.zTree.init($('#GeoJsonTree'), setting, zNodes);
            $('.ztree li a').css('color', 'white');
        },

        flyToEntity() {
            if (this.TreeNode) {
                let entity = earth.plotTool.dataSourceToo._entityCollection.getById(this.TreeNode.id);
                console.log(entity);
                earth.viewer3D.flyTo(entity);

            }
        },
        delPro(key) {
            let that = this;
            // 删除树节点上的数据
            delete this.TreeNode.properties[key];
            // 把节点上的数据
            // that.TableData = [];
            // for (let key in this.TreeNode.properties) {
            //     let value = this.TreeNode.properties[key];
            //     that.TableData.push({
            //         key: key,
            //         value: value
            //     });
            // }
            // this.TreeNode.properties = newProps;
        },
        addPro() {
            let that = this;

            // 删除树节点上的数据
            this.TreeNode.properties['new'] = '';
            // 把节点上的数据
            // that.TableData = [];
            // for (let key in this.TreeNode.properties) {
            //     let value = this.TreeNode.properties[key];
            //     that.TableData.push({
            //         key: key,
            //         value: value
            //     });
            // }

            // this.TreeNode.properties = newProps;
        }
    },
    watch: {
        // 监听 Table 中的数据有没有变化
        TableDataStr: function (newV) {
            return;
            let obj = {};
            for (let i = 0; i < this.TableData.length; i++) {
                obj[this.TableData[i].key] = this.TableData[i].value;
            }
            this.TreeNode.properties = obj;

            // 修改 GeoJson 数据
            if (earth.plotTool.GeoJson.features) {
                earth.plotTool.GeoJson.features[this.TreeNode.id].properties = obj;
            }

            // 从内存地址中更新  GeoJson，以便触发 Vue
            // earth.plotTool.GeoJson = JSON.parse(JSON.stringify(earth.plotTool.GeoJson));
        }
    },
    mounted() {
        this.initGeoJsonTree();

        window.clearInterval(timer);
        timer = setInterval(() => {
            this.refreshStatus();
        }, 100);
    },
    unmounted() {
        window.clearInterval(timer);
    }
};
</script>

<style lang="less" scoped>
.entity_arr {
    padding: 15px;
    height: 350px;
    overflow: auto;
    border: #949393 1px dashed
}

</style>
