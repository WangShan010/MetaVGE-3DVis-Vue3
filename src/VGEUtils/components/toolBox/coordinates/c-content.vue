<template>
    <win-tabs :initCSS="{width: 320,height: 310,left:450,top:330}"
              @close="close"
              @openHelp="openHelp"
              :firstGuide="firstGuide">
        <tab-pane label="坐标定位">
            <div class="centerXY" @mousedown.stop>
                <!--radio选择框-->
                <div>
                    <div class="radio radio-info radio-inline">
                        <input type="radio" id="rdoType1" name="rdoType" v-model="pccradio" value="1">
                        <label for="rdoType1">十进制</label>
                    </div>
                    <div class="radio radio-info radio-inline">
                        <input type="radio" id="rdoType2" name="rdoType" v-model="pccradio" value="2">
                        <label for="rdoType2">度分秒</label>
                    </div>
                    <div class="radio radio-info radio-inline">
                        <input type="radio" id="rdoType3" name="rdoType" v-model="pccradio" value="3">
                        <label for="rdoType3">平面坐标</label>
                    </div>
                </div>
                <!--表单内容区-->
                <form name="navText" class="form-horizontal" autocomplete="off"
                      v-if="pccradio === '1'">
                    <div class="viewTen">
                        <div>
                            <label>坐标系：</label>
                            <select v-model="coordinateSystem" style="width:160px;margin-top:10px" clearable>
                                <option
                                    v-for="item in coordinateSystemFormList"
                                    :key="item.index"
                                    :label="item.name"
                                    :value="item.index">
                                </option>
                            </select>
                        </div>
                        <div v-if="coordinateSystem === 0">
                            <div title="请输入-180至180之间的数字">
                                <label>经度：</label>
                                <input type="text" id="txtLngTen" ref="watchCoordinate"
                                       onkeyup="this.value=this.value.replace(/[^\-?\d.]/g,'')"
                                       v-model="degrees.longitude" style="width:160px;margin-top:10px;"
                                >
                            </div>
                            <div title="请输入-90至90之间的数字">
                                <label>纬度：</label>
                                <input type="text" id="txtLatTen" ref="watchCoordinate2"
                                       onkeyup="this.value=this.value.replace(/[^\-?\d.]/g,'')"
                                       v-model="degrees.latitude" style="width:160px;margin-top:10px;"
                                >
                            </div>
                        </div>
                        <div v-if="coordinateSystem === 1">
                            <div title="请输入-180至180之间的数字">
                                <label>经度：</label>
                                <input type="text" id="txtLngTen1" ref="watchCoordinate"
                                       onkeyup="this.value=this.value.replace(/[^\-?\d.]/g,'')"
                                       v-model="gcj02.lon" style="width:160px;margin-top:10px;"
                                >
                            </div>
                            <div title="请输入-90至90之间的数字">
                                <label>纬度：</label>
                                <input type="text" id="txtLatTen1" ref="watchCoordinate2"
                                       onkeyup="this.value=this.value.replace(/[^\-?\d.]/g,'')"
                                       v-model="gcj02.lat" style="width:160px;margin-top:10px;"
                                >
                            </div>
                        </div>
                        <div v-if="coordinateSystem === 2">
                            <div title="请输入-180至180之间的数字">
                                <label>经度：</label>
                                <input type="text" id="txtLngTen2" ref="watchCoordinate"
                                       onkeyup="this.value=this.value.replace(/[^\-?\d.]/g,'')"
                                       v-model="bd09.lon" style="width:160px;margin-top:10px;"
                                >
                            </div>
                            <div title="请输入-90至90之间的数字">
                                <label>纬度：</label>
                                <input type="text" id="txtLatTen2" ref="watchCoordinate2"
                                       onkeyup="this.value=this.value.replace(/[^\-?\d.]/g,'')"
                                       v-model="bd09.lat" style="width:160px;margin-top:10px;"
                                >
                            </div>
                        </div>
                        <div>
                            <label>高程：</label>
                            <input type="text" id="txtLatAlt"
                                   v-model="degrees.height" style="width:160px;margin-top:10px;">
                        </div>
                    </div>
                </form>
                <form name="navText" id="coordinateForm" class="form-horizontal" autocomplete="off" v-if="pccradio == 2">
                    <div class="viewDms">
                        <div>
                            <label>坐标系：</label>
                            <select v-model="coordinateSystem" style="width:160px;margin-top:10px" clearable>
                                <option
                                    v-for="item in coordinateSystemFormList"
                                    :key="item.index"
                                    :label="item.name"
                                    :value="item.index">
                                </option>
                            </select>
                        </div>
                        <div>
                            <label>经度：</label>
                            <input type="text" style="width:60px;margin-top:10px" id="txtLngDegree"
                                   onkeyup="this.value=this.value.replace(/[^\-?\d.]/g,'')"
                                   v-model="alert.b1">
                            <label>&nbsp;°</label>
                            <input type="text" style="width:50px;margin-top:10px" id="txtLngMinute"
                                   onkeyup="this.value=this.value.replace(/[^\-?\d.]/g,'')"
                                   v-model="alert.b2">
                            <label>&nbsp;′</label>
                            <input type="text" style="width:50px;margin-top:10px" id="txtLngSecond"
                                   onkeyup="this.value=this.value.replace(/[^\-?\d.]/g,'')"
                                   v-model="alert.b3">
                            <label>&nbsp;″</label>
                        </div>
                        <div>
                            <label>纬度：</label>
                            <input type="text" style="width:60px;margin-top:10px;"
                                   onkeyup="this.value=this.value.replace(/[^\-?\d.]/g,'')"
                                   id="txtLatDegree" v-model="alert.v1">
                            <label>&nbsp;°</label>
                            <input type="text" style="width:50px;margin-top:10px;"
                                   onkeyup="this.value=this.value.replace(/[^\-?\d.]/g,'')"
                                   id="txtLatMinute" v-model="alert.v2">
                            <label>&nbsp;′</label>
                            <input type="text" style="width:50px;margin-top:10px;"
                                   onkeyup="this.value=this.value.replace(/[^\-?\d.]/g,'')"
                                   id="txtLatSecond" v-model="alert.v3">
                            <label>&nbsp;″</label>
                        </div>
                        <div>
                            <label>高程：</label>
                            <input type="text" name="txtDmsAlt" v-model="degrees.height"
                                   style="width:100px;margin-top:10px" id="txtDmsAlt" step="0.1">
                        </div>
                    </div>
                </form>
                <form name="navText" id="xyForm" class="form-horizontal" autocomplete="off" v-if="pccradio == 3">
                    <div class="viewGk">
                        <div>
                            <label>坐标系：</label>
                            <select id="System1" v-model="system"
                                    style="width:160px;margin-top:10px" clearable>
                                <option
                                    v-for="item in coordinateFormList"
                                    :key="item.index"
                                    :label="item.name"
                                    :value="item.index">
                                </option>
                            </select>
                        </div>
                        <div v-if="system === 0">
                            <div>
                                <label>纵坐标：</label>
                                <input type="text" id="txtGk3X" v-model="cartesian3.y"
                                       onkeyup="this.value=this.value.replace(/[^\-?\d.]/g,'')"
                                       style="width:160px;margin-top:10px">
                            </div>
                            <div>
                                <label>横坐标：</label>
                                <input type="text" id="txtGk3Y" v-model="cartesian3.x"
                                       onkeyup="this.value=this.value.replace(/[^\-?\d.]/g,'')"
                                       style="width:160px;margin-top:10px">
                            </div>
                        </div>
                        <div v-if="system === 1">
                            <div>
                                <label>纵坐标：</label>
                                <input type="text" id="txtGk3X1" v-model="EPSG3857.y"
                                       style="width:160px;margin-top:10px">
                            </div>
                            <div>
                                <label>横坐标：</label>
                                <input type="text" id="txtGk3Y1" v-model="EPSG3857.x"
                                       style="width:160px;margin-top:10px">
                            </div>
                        </div>
                        <div v-if="system === 2">
                            <div>
                                <label>纵坐标：</label>
                                <input type="text" id="txtGk3X2" v-model="mercator.y"
                                       onkeyup="this.value=this.value.replace(/[^\-?\d.]/g,'')"
                                       style="width:160px;margin-top:10px">
                            </div>
                            <div>
                                <label>横坐标：</label>
                                <input type="text" id="txtGk3Y2" v-model="mercator.x"
                                       onkeyup="this.value=this.value.replace(/[^\-?\d.]/g,'')"
                                       style="width:160px;margin-top:10px">
                            </div>
                        </div>
                        <div>
                            <label>高程值：</label>
                            <input type="text" id="txtGk3Alt" v-model="degrees.height"
                                   style="width:160px;margin-top:10px" step="0.1">
                        </div>
                    </div>
                </form>
                <!--按钮功能区-->
                <div class="co-btn">
                    <el-button size="small" type="success" @click="pickPoint">图上拾取</el-button>
                    <el-button size="small" type="primary" @click="coordinate">坐标定位</el-button>
                    <el-button size="small" type="warning">复制到粘贴板</el-button>
                </div>
            </div>
        </tab-pane>
        <tab-pane label="坐标标注">
            <coord-plot>

            </coord-plot>
        </tab-pane>
    </win-tabs>
</template>
<script>
import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';

import coordinateOffset from './img/CoordinateOffset.js';
import CoordPlot from './coordPlot.vue';

export default {
    name: 'c-content',
    components: {CoordPlot, winTabs, tabPane},
    data() {
        return {
            firstGuide: true,
            coordinateSystem: 0,//弧度下拉窗显隐
            system: 0,//平面坐标下拉窗显隐
            coordinateSystemFormList: [
                {index: 0, name: 'WGS-84'},
                {index: 1, name: 'GCJ-02'},
                {index: 2, name: 'BD09'}
                // {index: 3, name: '北京54'},
            ],
            coordinateFormList: [
                {index: 0, name: 'WGS-84'},
                {index: 1, name: 'EPSG:3857'},
                {index: 2, name: 'Web mercator'}
                // {index: 3, name: '北京54'},
            ],
            pccradio: '1',
            lat: 0,
            lng: 0,
            cartesian3: {
                x: 0,
                y: 0,
                z: 0
            },
            degrees: {
                longitude: 0,
                latitude: 0,
                height: 0
            },
            alert: {
                v1: 0,
                v2: 0,
                v3: 0,
                b1: 0,
                b2: 0,
                b3: 0
            },
            alert10: {
                lon: 0,
                lat: 0
            },
            C3toDu: {
                lon: 0,
                lat: 0,
                alt: 0
            },
            gcto84: {
                lon: 0,
                lat: 0
            },
            bdto84: {
                lon: 0,
                lat: 0
            },
            mctTo84: {
                lon: 0,
                lat: 0
            },
            EPSG3857: {
                x: 0,
                y: 0
            },
            EPSG4326: {
                x: 0,
                y: 0
            },
            gcj02: {
                lat: 0,
                lon: 0
            },
            bd09: {
                lat: 0,
                lon: 0
            },
            mercator: {
                y: 0,
                x: 0
            }
        };
    },
    watch: {
        degrees: {
            handler: function () {
            },
            deep: true
        },
        alert: {
            handler: function () {
                this.changeDuLon(this.alert.b1, this.alert.b2, this.alert.b3);
                this.changeDuLat(this.alert.v1, this.alert.v2, this.alert.v3);
            },
            deep: true
        },
        pccradio: {
            handler: function () {
            },
            deep: true
        },
        cartesian3: {
            handler: function () {
                this.c3toDu(this.cartesian3.x, this.cartesian3.y, this.cartesian3.z);
            },
            deep: true
        },
        gcj02: {
            handler: function () {
                this.gcj02towgs84(this.gcj02.lat, this.gcj02.lon);
            },
            deep: true
        },
        bd09: {
            handler: function () {
                this.bd09towgs84(this.bd09.lat, this.bd09.lon);
            },
            deep: true
        },
        mercator: {
            handler: function () {
                this.mercatorToWgs84(this.mercator.y, this.mercator.x);
            },
            deep: true
        }
    },
    methods: {
        /**
         * 添加点entity
         */
        addMarkEntity(lon, lat, height) {
            window.earth.viewer3D.entities.removeAll();//第二次定位的时候移除上次的点
            let point = window.earth.viewer3D.entities.add({//创建定位点
                id: 'coordinatePonint',
                name: 'coordinates',
                position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
                billboard: {
                    image: new URL('./img/coordinates.png', import.meta.url).href,//定位的图片样式
                    width: 15,
                    height: 21,
                    scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                }
            });
        },
        /**
         * 获取坐标 高程 画点
         */
        pickPoint() {
            let that = this;
            this.remove();
            this.addImage();
            let drawShape = new VGEEarth.DrawShape(VGEEarth.getMainViewer());
            drawShape.drawPoint({
                coordinateType: 'cartographicObj',
                endCallback: function (ps) {
                    //经纬度
                    let lon = Math.floor(ps[0].longitude * 1000000) / 1000000;
                    let lat = Math.floor(ps[0].latitude * 1000000) / 1000000;
                    that.degrees.latitude = ps[0].latitude;
                    that.degrees.longitude = ps[0].longitude;
                    that.degrees.height = ps[0].height;
                    //cartesian3
                    let ellipsoid = earth.viewer3D.scene.globe.ellipsoid;
                    let cartographic = Cesium.Cartographic.fromDegrees(ps[0].longitude, ps[0].latitude);
                    let cartesian3 = ellipsoid.cartographicToCartesian(cartographic);
                    that.cartesian3.x = cartesian3.x;
                    that.cartesian3.y = cartesian3.y;
                    that.cartesian3.z = cartesian3.z;
                    //EPSG:3857
                    let a = proj4('EPSG:4326', 'EPSG:3857', {x: cartographic.latitude, y: cartographic.longitude});
                    that.EPSG3857.x = a.x;
                    that.EPSG3857.y = a.y;

                    that.wgs84togcj02(ps[0].latitude, ps[0].longitude);
                    that.gcj02tobd09();
                    that.wgs84tomercator(ps[0].latitude, ps[0].longitude);
                    that.formatDegree(ps[0].latitude, ps[0].longitude);//度转度分秒
                    that.addMarkEntity(ps[0].longitude, ps[0].latitude, ps[0].height);
                    that.remove();
                },
                errCallback: function () {
                    that.remove();
                }
            });
        },
        /**
         * 世界坐标转经纬度
         */
        c3toDu(x, y, z) {
            let ellipsoid = earth.viewer3D.scene.globe.ellipsoid;
            let cartesian3 = new Cesium.Cartesian3(x, y, z);
            let cartographic = ellipsoid.cartesianToCartographic(cartesian3);
            this.C3toDu.lat = Cesium.Math.toDegrees(cartographic.latitude);
            this.C3toDu.lon = Cesium.Math.toDegrees(cartographic.longitude);
            this.C3toDu.alt = cartographic.height;
        },
        /**
         * 墨卡托转WGS84
         */
        mercatorToWgs84(y, x) {
            let resultmercatorToWgs84 = coordinateOffset.mercator_decrypt(y, x);
            this.mctTo84.lat = resultmercatorToWgs84.lat;
            this.mctTo84.lon = resultmercatorToWgs84.lon;
        },
        /**
         * 百度坐标转WGS-84
         */
        bd09towgs84(lat, lon) {
            let resultbdtogc = coordinateOffset.bd_decrypt(lat, lon);
            let resultgctogc = coordinateOffset.gcj_decrypt(resultbdtogc.lat, resultbdtogc.lon);
            this.bdto84.lat = resultgctogc.lat;
            this.bdto84.lon = resultgctogc.lon;
        },
        /**
         * 国测局坐标转WGS-84
         */
        gcj02towgs84(lat, lon) {
            let result84 = coordinateOffset.gcj_decrypt(lat, lon);
            this.gcto84.lat = result84.lat;
            this.gcto84.lon = result84.lon;
        },
        /**
         * wgs84转gcj02
         */
        wgs84togcj02(lng, lat) {
            let resultgc = coordinateOffset.gcj_encrypt(lng, lat);
            this.gcj02.lat = resultgc.lat;
            this.gcj02.lon = resultgc.lon;
        },
        /**
         * gcj02转bd09
         */
        gcj02tobd09() {
            let resultbd = coordinateOffset.bd_encrypt(this.gcj02.lat, this.gcj02.lon);
            this.bd09.lat = resultbd.lat;
            this.bd09.lon = resultbd.lon;
        },
        /**
         * wgs84转Web mercator
         */
        wgs84tomercator(lng, lat) {
            let resultmt = coordinateOffset.mercator_encrypt(lng, lat);
            this.mercator.y = resultmt.lat;
            this.mercator.x = resultmt.lon;
        },
        /**
         * 关闭按钮 移除点
         */
        close() {
            this.remove();
            this.$store.commit('setVGEEarthComAction', {name: 'coordinates', on_off: 2});
            window.earth.viewer3D.entities.removeAll();
        },
        openHelp() {
            console.log('帮助教程');
        },
        /**
         * 度转度分秒
         * @param latitude 经度
         * @param longitude 纬度
         */
        formatDegree(latitude, longitude) {
            if (latitude != null && latitude != '') {
                latitude = Math.abs(latitude);  //返回数的绝对值
                this.alert.v1 = Math.floor(latitude);//度   //对数进行下舍入
                this.alert.v2 = Math.floor((latitude - this.alert.v1) * 60);//分
                this.alert.v3 = Math.round((latitude - this.alert.v3) * 3600 % 60);//秒  //把数四舍五入为最接近的整数
            }
            if (longitude != null && longitude != '') {
                longitude = Math.abs(longitude);  //返回数的绝对值
                this.alert.b1 = Math.floor(longitude);//度   //对数进行下舍入
                this.alert.b2 = Math.floor((longitude - this.alert.b1) * 60);//分
                this.alert.b3 = Math.round((longitude - this.alert.b3) * 3600 % 60);//秒  //把数四舍五入为最接近的整数
            }
        },
        /**
         * 度分秒转度
         * @param du
         * @param fen
         * @param miao
         */
        changeDuLon(du, fen, miao) {
            let mFen = 0;
            if (miao != null && miao != '') {
                mFen = Number(miao / 60);
            }
            let fDu = 0;
            if (fen != null && fen != '') {
                fDu = (Number(fen) + mFen) / 60;
            } else {
                fDu = mFen;
            }
            let lDu = 0;
            if (du != null && du != '') {
                lDu = (Number(du) + fDu).toFixed(6);
            } else {
                lDu = fDu.toFixed(6);
            }
            this.alert10.lon = lDu;
        },
        changeDuLat(du, fen, miao) {
            let mFen = 0;
            if (miao != null && miao != '') {
                mFen = Number(miao / 60);
            }
            let fDu = 0;
            if (fen != null && fen != '') {
                fDu = (Number(fen) + mFen) / 60;
            } else {
                fDu = mFen;
            }
            let lDu = 0;
            if (du != null && du != '') {
                lDu = (Number(du) + fDu).toFixed(6);
            } else {
                lDu = fDu.toFixed(6);
            }
            this.alert10.lat = lDu;
        },

        /**
         * 添加跟随鼠标的图标
         */
        addImage() {
            let mv = document.createElement('img');
            this.mv = mv;
            mv.src = new URL('./img/coordinates.png', import.meta.url).href;
            mv.style.position = 'absolute';
            mv.style.left = '-100px';
            mv.style.top = '-100px';
            document.body.append(mv);

            document.onmousemove = function (e) {
                e = e || window.event;
                mv.style.left = e.clientX - mv.width / 2 + 'px';
                mv.style.top = e.clientY - mv.height + 'px';
            };
        },
        /**
         * 移除跟随鼠标的点图标
         */
        remove() {
            document.onmousemove = null;
            if (this.mv) {
                this.mv.remove();
            }
        },
        /**
         * 视角飞行 高度3000
         */
        coordinatePoint(lon, lat) {
            window.earth.viewer3D.entities.removeAll();
            this.addMarkEntity(lon, lat, this.degrees.height);
            window.earth.viewer3D.camera.flyTo({//定位过去
                destination: Cesium.Cartesian3.fromDegrees(lon, lat, 3000)
            });
        },
        /**
         * 坐标定位
         */
        coordinate() {
            this.remove();
            if (this.pccradio == 1) {
                if (this.coordinateSystem === 0) {
                    this.coordinatePoint(this.$refs.watchCoordinate.value, this.$refs.watchCoordinate2.value);
                } else if (this.coordinateSystem === 1) {
                    this.coordinatePoint(this.gcto84.lon, this.gcto84.lat);
                } else if (this.coordinateSystem === 2) {
                    this.coordinatePoint(this.bdto84.lon, this.bdto84.lat);
                }
            } else if (this.pccradio == 2) {
                this.coordinatePoint(this.alert10.lon, this.alert10.lat);
            } else if (this.pccradio == 3) {
                if (this.system === 0) {
                    this.coordinatePoint(this.C3toDu.lon, this.C3toDu.lat);
                } else if (this.system === 1) {
                    this.coordinatePoint(this.$refs.watchCoordinate.value, this.$refs.watchCoordinate2.value);
                } else if (this.system === 2) {
                    this.coordinatePoint(this.mctTo84.lon, this.mctTo84.lat);
                }
            }
        }
    },
    computed: {
        show() {
            return this.$store.state.VGEEarthStore.comActions.coordinates;
        }
    },
    beforeDestroy() {
        document.onmousemove = null;
    },
    mounted() {
        const firstGuide = localStorage.getItem('firstGuide');
        if (firstGuide) {
            this.firstGuide = false;
        } else {
            this.firstGuide = true;
            localStorage.setItem('firstGuide', 'true');
        }
    }
};
</script>

<style lang="less" scoped>

.radio.radio-inline {
    margin-top: 0;
}

.radio label {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    padding-left: 5px;
}


.radio label::before {
    content: "";
    display: inline-block;
    position: absolute;
    width: 17px;
    height: 17px;
    left: 0;
    margin-left: -20px;
    border: 1px solid #cccccc;
    border-radius: 50%;
    background-color: #fff;
    transition: border 0.15s ease-in-out;
}

.radio-info input[type="radio"]:checked + label::after {
    background-color: #009b94;
}


.radio label::after {
    display: inline-block;
    position: absolute;
    content: " ";
    width: 11px;
    height: 11px;
    left: 3px;
    top: 3px;
    margin-left: -20px;
    border-radius: 50%;
    transition: transform 0.1s cubic-bezier(0.8, -0.33, 0.2, 1.33);
}

label {
    color: #009b94;
}

.co-btn {
    margin-top: 20px;
    display: flex;
}
</style>
