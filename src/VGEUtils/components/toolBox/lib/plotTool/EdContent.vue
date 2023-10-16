<template>
    <div class="tabbable">
        <ul class="nav nav-tabs">
            <li><a href="#tab2" data-toggle="tab" v-if="false">实体属性</a></li>
            <li><a href="#tab3" data-toggle="tab" id="a_tab3" v-show="SelEntityID !== ''">几何编辑</a></li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane active" id="tab1">
                <loadFile></loadFile>
                <div class="padding-top">
                    标绘：
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-sm" :class="{'btn-success':drawType==='point'}"
                                @click="drawType='point'">点
                        </button>
                        <button type="button" class="btn btn-sm" :class="{'btn-success':drawType==='polyline'}"
                                @click="drawType='polyline'">线
                        </button>
                        <button type="button" class="btn btn-sm" :class="{'btn-success':drawType==='polygon'}"
                                @click="drawType='polygon'">面
                        </button>
                        <button type="button" class="btn btn-sm" :class="{'btn-success':drawType==='custom'}"
                                @click="drawType='custom'">自定义
                        </button>
                    </div>
                </div>

                <div style="min-height: 200px">
                    <pointEntity v-if="drawType==='point'" @setDrawObj="setDrawObj"></pointEntity>
                    <polylineEntity v-if="drawType==='polyline'" @setDrawObj="setDrawObj"></polylineEntity>
                    <polygonEntity v-if="drawType==='polygon'" @setDrawObj="setDrawObj"></polygonEntity>
                    <customEntity v-if="drawType==='custom'" @setDrawObj="setDrawObj"></customEntity>
                    <div style="padding-top: 15px">
                        带高：
                        <el-switch
                            v-model="featureHasHeight"
                            size="small" style="width: 215px">
                        </el-switch>
                    </div>
                </div>

                <div class="padding-top">
                    海拔高度：
                    <label class="radio-inline">
                        <input
                            type="radio"
                            name="inlineRadioOptions"
                            v-model="clampToGround"
                            @change="setClampToGround(true)"
                            value="true"
                        />
                        贴近地表
                    </label>
                    <label class="radio-inline">
                        <input
                            type="radio"
                            name="inlineRadioOptions"
                            v-model="clampToGround"
                            @change="setClampToGround(false)"
                            value="false"
                        />
                        绝对高度
                    </label>
                </div>

                <div class="padding-top" id="ctrlBtn">
                    <button type="button" class="btn btn-primary btn-sm" @click="draw" :disabled="!drawObj">绘制</button>
                    <button type="button" class="btn btn-success btn-sm" @click="analyticGeometry">刷新</button>
                    <button type="button" class="btn btn-success btn-sm" @click="cancel">撤销</button>
                    <button type="button" class="btn btn-warning btn-sm" @click="removeAll">清空</button>
                </div>
            </div>
            <div class="tab-pane" id="tab3">
                <div style="padding: 15px">
                    编辑：
                    <button type="button" class="btn btn-info" @click="moveEntityNode">
                        移动端点
                    </button>
                    <button
                        type="button"
                        class="btn btn-success"
                        v-show="SelEntityType !== 'Point'"
                        @click="moveEntityAll"
                    >
                        平移整体
                    </button>
                </div>

                <div style="padding: 15px">
                    操作：
                    <button type="button" class="btn btn-danger" @click="delEntity">
                        删除
                    </button>
                    <button type="button" class="btn btn-danger" @click="unPick">
                        关闭
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import buildVirtualPoint from './lib/buildVirtualPoint.js';
import imgUrl2Base64 from './lib/imgUrl2Base64.js';
import notify from './lib/notify.js';
import ExportPlot from './com/exportPlot.vue';
import LoadFile from './com/loadFile.vue';
import PointEntity from './com/pointEntity.vue';
import PolylineEntity from './com/polylineEntity.vue';
import PolygonEntity from './com/polygonEntity.vue';
import CustomEntity from './com/customEntity.vue';

let plotTool;

export default {
    name: 'ed-content',
    components: {
        PointEntity,
        PolylineEntity,
        PolygonEntity,
        CustomEntity,
        LoadFile,
        ExportPlot
    },
    data() {
        return {
            // {
            //   code: '2803',
            //   name: '前进指挥所',
            //   type: '0,
            //   image: '指挥机构\\10-2803-0-前进指挥所.png',
            // }
            drawObj: null,
            drawType: 'point',
            // 生成的 GeoJson 是否需要带上高程，
            featureHasHeight: true,

            // 要素是否贴地
            clampToGround: false,
            // 标绘个数
            featureNum: 0,

            GeoJson: {},

            // 鼠标选中实体的ID
            SelEntityID: '',
            // 被选中的实体的源数据
            SelEntityGeoJson: {},
            SelEntityType: '',

            // 绘制【点线面】实体的样式
            DrawType: [
                {
                    fillColor: 'rgb(238, 204, 204)',
                    fillStyle: './icon/full.png',
                    borderColor: 'rgb(252, 220, 113)',
                    borderWidth: '5px',
                    borderStyle: 'solid',
                    opacity: '0.5'
                },
                {
                    fillColor: 'rgb(2,0,255)',
                    fillStyle: 'solid',
                    lineWidth: '5',
                    opacity: '0.5'
                },
                {}
            ]
        };
    },
    methods: {
        // 由子组件触发的设置绘制样式
        setDrawObj(drawObj) {
            this.drawObj = drawObj;
        },

        // 重新解析 GeoJson 几何，将点线面载入到地图
        analyticGeometry() {
            plotTool.analyticGeometry();
        },

        // 修改标绘的贴地模式
        setClampToGround(clampToGround) {
            plotTool.clampToGround = clampToGround;
            plotTool.analyticGeometry();
        },


        pick() {
            let that = this;
            let handler = new Cesium.ScreenSpaceEventHandler(earth.viewer3D.canvas);

            // 鼠标移动 图标变化
            handler.setInputAction(function (event) {
                let pickedFeature = earth.viewer3D.scene.pick(event.endPosition);
                if (pickedFeature && pickedFeature.id) {
                    parent.document.body.style.cursor = 'crosshair';
                } else {
                    parent.document.body.style.cursor = 'pointer';
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

            // 左键按下拾取坐标事件
            handler.setInputAction(function (event) {
                let earthPosition = earth.viewer3D.scene.pickPosition(event.position);

                if (Cesium.defined(earthPosition)) {
                    let pickedFeature = earth.viewer3D.scene.pick(event.position);
                    // 如果拾取的物体有ID，说明它是一个 entity
                    if (Cesium.defined(pickedFeature) && pickedFeature.id) {
                        // watching 监听

                        if (pickedFeature.id.id.substring(0, 5) === 'Point') {
                            that.SelEntityType = 'Point';
                        } else if (pickedFeature.id.id.substring(0, 4) === 'Line') {
                            that.SelEntityType = 'Line';
                        } else if (pickedFeature.id.id.substring(0, 7) === 'Polygon') {
                            that.SelEntityType = 'Polygon';
                        } else {
                            that.$nextTick(() => {
                                notify(
                                    {
                                        message: '未识别的 几何 类型：' + pickedFeature.id.id,
                                        width: 320
                                    },
                                    'error',
                                    2000
                                );
                            });
                            return;
                        }
                        that.$nextTick(() => {
                            notify({message: '选中实体成功', width: 320}, 'success', 2000);
                        });
                        that.SelEntityID = pickedFeature.id.id;
                        that.SelEntityChange();
                    }
                }
                parent.document.body.style.cursor = 'pointer';
                handler.destroy();
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

            // 左键弹起
            handler.setInputAction(function (event) {
                parent.document.body.style.cursor = 'pointer';
                handler.destroy();
            }, Cesium.ScreenSpaceEventType.LEFT_UP);
        },
        // 取消选中entity
        unPick() {
            let that = this;
            this.SelEntityID = '';
            this.SelEntityGeoJson = {};
            this.SelEntityChange();
            that.$nextTick(() => {
                notify({message: '取消选中实体', width: 320}, 'warning', 2000);
            });
        },
        SelEntityChange() {
            let that = this;
            // 清空全部的虚拟点
            plotTool.analyticGeometry();

            if (that.SelEntityID !== '') {
                $('#a_tab3').tab('show');

                turf.featureEach(that.GeoJson, function (currentFeature, featureIndex) {
                    if (currentFeature.properties.id === that.SelEntityID) {
                        that.SelEntityGeoJson = currentFeature;
                    }
                });

                turf.coordEach(that.SelEntityGeoJson, function (
                    currentCoord,
                    coordIndex
                ) {
                    // 因为面是首尾相连，最后一个点和第一个点相同，所以跳过第一个点
                    if (
                        turf.getType(that.SelEntityGeoJson) === 'Polygon' &&
                        coordIndex === 0
                    ) {
                        return;
                    }

                    // 如果选中的实体仅有【经度、纬度】，没有高程，则给它指定为 0 高程
                    currentCoord[2] = currentCoord[2] ? currentCoord[2] : 0;

                    let Cartesian3 = Cesium.Cartesian3.fromDegrees(
                        currentCoord[0],
                        currentCoord[1],
                        currentCoord[2]
                    );
                    dataSourceToo.entities.add(
                        buildVirtualPoint(Cartesian3, {id: '端点-' + coordIndex})
                    );
                });
            } else {
                $('#a_tab1').tab('show');
            }
        },

        // 刷新
        refresh() {
            this.featureNum = plotTool.GeoJson.features.length;
        },

        // 标绘新要素
        async draw() {
            let drawObj = JSON.parse(JSON.stringify(this.drawObj));

            switch (drawObj.type) {
                case 'pointEntity': {
                    drawObj['marker-symbol'] = await imgUrl2Base64(drawObj.symbolUrl);
                    plotTool.addPoint(drawObj);
                    break;
                }
                case 'polylineEntity': {
                    plotTool.addMultiLine(drawObj.params.material, drawObj.params.lineMaterialWidth, null);
                    break;
                }
                case 'polygonEntity': {
                    plotTool.addPolygon(this.featureHasHeight);
                    break;
                }
                case 'modelEntity': {
                    await plotTool.addModel(drawObj.modelUrl, 1, 20);
                    break;
                }
                case 'winInfo': {
                    drawObj.symbolUrl && (drawObj['marker-symbol'] = await imgUrl2Base64(drawObj.symbolUrl));
                    plotTool.addPoint(drawObj);
                    break;
                }
                case 'particleSystem': {
                    plotTool.addPoint(drawObj);
                    break;
                }
                default: {
                    notify({message: '当前版本为免费试用版 V0.14，暂时无法使用支持该类型的标绘~', status: 'warning'});
                }
            }
        },


        moveEntityNode() {
            let that = this;

            let handler = new Cesium.ScreenSpaceEventHandler(earth.viewer3D.canvas);
            let pickedFeature;
            //鼠标移动事件，遇到端点鼠标样式就变化
            handler.setInputAction(function (event) {
                if (that.SelEntityID === '') return;
                if (!event.endPosition) return;
                pickedFeature = earth.viewer3D.scene.pick(event.endPosition);
                if (
                    pickedFeature &&
                    pickedFeature.id &&
                    pickedFeature.id.id.substring(0, 3) === '端点-'
                ) {
                    parent.document.body.style.cursor = 'move';
                } else if (pickedFeature && pickedFeature.id) {
                    parent.document.body.style.cursor = 'no-drop';
                } else {
                    pickedFeature = null;
                    parent.document.body.style.cursor = 'pointer';
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

            //鼠标左点击，拾取结束
            handler.setInputAction(function (event) {
                parent.document.body.style.cursor = 'pointer';
                handler.destroy();
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

            dragEntity(viewer, function (data) {
                if (data.entityId.substring(0, 3) === '端点-') {
                    let positions = cartesianToCartographic([data.endPosition])[0];
                    let index = data.entityId.substring(3) * 1;
                    let type = turf.getType(that.SelEntityGeoJson);

                    console.log(type);
                    if (type === 'Point') {
                        that.addGeoJsonBackupBefore();
                        positions = cartesianToCartographic([data.endPosition]);
                        that.SelEntityGeoJson.geometry.coordinates = JSON.parse(
                            JSON.stringify(positions)
                        )[0];
                        that.addGeoJsonBackupAfter();
                    } else if (type === 'LineString') {
                        that.addGeoJsonBackupBefore();
                        that.SelEntityGeoJson.geometry.coordinates[index] = JSON.parse(
                            JSON.stringify(positions)
                        );
                        that.addGeoJsonBackupAfter();
                    } else if (type === 'Polygon') {
                        that.addGeoJsonBackupBefore();
                        that.SelEntityGeoJson.geometry.coordinates[0][index] = JSON.parse(
                            JSON.stringify(positions)
                        );

                        // 这是面的最后一个点，则它和第一个点相同
                        let length = that.SelEntityGeoJson.geometry.coordinates[0].length;
                        if (length === index + 1) {
                            console.log('这是最后一个点');
                            that.SelEntityGeoJson.geometry.coordinates[0][0] = JSON.parse(
                                JSON.stringify(positions)
                            );
                        }
                        that.addGeoJsonBackupAfter();
                    } else if (type === 'MultiPoint') {
                        console.log('暂不支持的类型', type);
                    } else if (type === 'MultiLineString') {
                        console.log('暂不支持的类型', type);
                    } else if (type === 'MultiPolygon') {
                        console.log('暂不支持的类型', type);
                    } else if (type === 'GeometryCollection') {
                        console.log('暂不支持的类型', type);
                    } else {
                        console.log('无法识别的类型', type);
                    }

                    that.$nextTick(() => {
                        notify({message: '移动实体成功', width: 320}, 'success', 2000);
                    });
                } else {
                    that.$nextTick(() => {
                        notify(
                            {message: '您移动的不是端点', width: 320},
                            'warning',
                            2000
                        );
                    });
                }
                that.unPick();
            });
        },
        moveEntityAll() {
            let that = this;

            let handler = new Cesium.ScreenSpaceEventHandler(earth.viewer3D.canvas);
            let pickedFeature;
            //鼠标移动事件，遇到端点鼠标样式就变化
            handler.setInputAction(function (event) {
                if (that.SelEntityID === '') return;
                if (!event.endPosition) return;
                pickedFeature = earth.viewer3D.scene.pick(event.endPosition);
                if (
                    pickedFeature &&
                    pickedFeature.id &&
                    pickedFeature.id.id.substring(0, 3) !== '端点-'
                ) {
                    parent.document.body.style.cursor = 'move';
                } else if (pickedFeature && pickedFeature.id) {
                    parent.document.body.style.cursor = 'no-drop';
                } else {
                    pickedFeature = null;
                    parent.document.body.style.cursor = 'pointer';
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

            //鼠标左点击，拾取结束
            handler.setInputAction(function (event) {
                parent.document.body.style.cursor = 'pointer';
                handler.destroy();
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

            dragEntity(viewer, function (data) {
                if (data.entityId.substring(0, 3) !== '端点-') {
                    let changeX = data.endPosition.x - data.startPosition.x;
                    let changeY = data.endPosition.y - data.startPosition.y;
                    let changeZ = data.endPosition.z - data.startPosition.z;

                    turf.coordEach(that.SelEntityGeoJson, function (
                        currentCoord,
                        coordIndex,
                        featureIndex,
                        multiFeatureIndex,
                        geometryIndex
                    ) {
                        let Cartesian3 = Cesium.Cartesian3.fromDegrees(
                            currentCoord[0],
                            currentCoord[1],
                            currentCoord[2]
                        );
                        Cartesian3.x += changeX;
                        Cartesian3.y += changeY;
                        Cartesian3.z += changeZ;

                        let ellipsoid = earth.viewer3D.scene.globe.ellipsoid;
                        let cartographic = ellipsoid.cartesianToCartographic(Cartesian3);

                        currentCoord[0] = Cesium.Math.toDegrees(cartographic.longitude);
                        currentCoord[1] = Cesium.Math.toDegrees(cartographic.latitude);
                    });

                    that.analyticGeometry();
                    that.$nextTick(() => {
                        notify({message: '移动实体成功', width: 320}, 'success', 2000);
                    });
                } else {
                    that.$nextTick(() => {
                        notify(
                            {message: '您移动的是端点，而不是几何体', width: 320},
                            'warning',
                            2000
                        );
                    });
                }
                that.unPick();
            });
        },

        delEntity() {
            let that = this;
            that.addGeoJsonBackupBefore();

            dataSourceToo.entities.removeById(that.SelEntityID);
            let geo = turf.featureCollection([]);
            turf.featureEach(that.GeoJson, function (currentFeature, featureIndex) {
                if (currentFeature.properties.id !== that.SelEntityID) {
                    geo.features.push(currentFeature);
                }
            });

            that.GeoJson = geo;

            that.addGeoJsonBackupAfter();
            that.$nextTick(() => {
                notify({message: '删除实体', width: 320}, 'success', 2000);
            });
        },

        // 撤销操作
        cancel() {
            plotTool.revoke();
            // this.unPick();
            notify({message: '撤销操作', status: 'warning'});
        },

        // 重置数据
        removeAll() {
            plotTool.removeAll();
        }
    },
    mounted() {
        plotTool = earth.plotTool;
        this.setClampToGround(this.clampToGround);

        let geoJson = localStorage.getItem('plotTool-geoJson');
        if (geoJson) {
            plotTool.GeoJson = JSON.parse(geoJson);
            plotTool.analyticGeometry();
        }
    },
    unmounted() {
        localStorage.setItem('plotTool-geoJson', JSON.stringify(plotTool.GeoJson));
        this.removeAll();
    }
};

</script>

<style lang="less" scoped>
.tabbable {
    text-align: left;
    min-width: 280px;
    min-height: 350px;
    border-radius: 5px;
    color: #009b94;

    a {
        color: #009b94;
    }

    .extend-close-btn {
        color: #009b94;
        font-size: 24px;
        padding-top: 7px;
        padding-right: 3px;
    }

    .icon-box {
        display: block;
        height: 100%;
        padding: 5px;
        border: silver dashed 1px;

        img {
            width: 28px;
            height: 28px;
            margin-top: 5px;
        }
    }

    .padding-top {
        padding-top: 15px;
    }
}

#tab1 {
    height: 100%;
    padding: 10px;
}

#ctrlBtn {
    text-align: center;

    button {
        margin: 0 2px;
    }
}

#tab3 {
    padding: 15px;
    height: 300px;
    overflow: auto;
    border: black 1px dashed
}
</style>
