/****************************************************************************
名称：无人机直播的逻辑处理
最后修改日期：2022-04-20
****************************************************************************/

<template>
    <win-tabs :initCSS="{width: 400,height: 350,left:400,top:300}" @close="close">
        <tab-pane label="无人机直播">
            <div @mousedown.stop>
                <div style="width: 100%;">
                    <video
                        id="mmiid"
                        class="video-js vjs-big-play-centered vjs-fluid"
                        controls
                        preload="auto"
                        src="http://1011.hlsplay.aodianyun.com/demo/game.flv"
                        style="height: 200px"
                        width="100%"
                    >
                    </video>
                </div>
                <div style="margin-top: 20px;text-align: center">
                    <el-button type="primary">实时视频</el-button>
                    <el-button type="warning">重置</el-button>
                </div>
            </div>
        </tab-pane>
    </win-tabs>
</template>

<script>
import flvjs from 'flv.js';
import { tabPane, winTabs } from '@/VGEUtils/components/winTabs/index.js';


export default {
    name: 'uva-content',
    components: { winTabs, tabPane },
    methods: {
        initUVAEntity() {
            fetch('http://39.105.28.200:8088/model/getModels?limit=1000&page=1&timestamp=1685085420949')
                .then(e => e.json())
                .then(({ data }) => {


                    const start = Cesium.JulianDate.fromDate(new Date(new Date(Number(data[0].timestamp))));
                    const stop = Cesium.JulianDate.addSeconds(start, 360, new Cesium.JulianDate());

                    earth.viewer3D.clock.startTime = start.clone();
                    earth.viewer3D.clock.stopTime = stop.clone();
                    earth.viewer3D.clock.currentTime = start.clone();
                    earth.viewer3D.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
                    earth.viewer3D.clock.multiplier = 10;
                    // earth.viewer3D.timeline.zoomTo(start, stop);

                    const obj = {
                        'id': 1243,
                        'attitudeHead': '5.5',
                        'attitudePitch': '-0.70000000000000007',
                        'attitudeRoll': '5.4',
                        'elevation': '123.4',
                        'height': '135.21660842895508',
                        'heightLimit': '500',
                        'homeDistance': '0.022483861073851585',
                        'horizontalSpeed': '0',
                        'latitude': '30.983170850067282',
                        'longitude': '120.77264738597148',
                        'timestamp': '1685085624961',
                        'datetime': '2023-05-26 03:20:24'
                    };

                    console.log('获取模型数据', data);
                    const positionProperty = new Cesium.SampledPositionProperty();
                    const headProperty = new Cesium.SampledProperty(Number);
                    const pitchProperty = new Cesium.SampledProperty(Number);
                    const rollProperty = new Cesium.SampledProperty(Number);
                    const orientationProperty = new Cesium.CallbackProperty((time, result) => {
                        const orientation = Cesium.Transforms.headingPitchRollQuaternion(
                            positionProperty.getValue(time),
                            new Cesium.HeadingPitchRoll(
                                headProperty.getValue(time),
                                pitchProperty.getValue(time),
                                rollProperty.getValue(time)
                            )
                        );
                        // console.log(orientation);
                        return orientation;
                    });

                    data.forEach(item => {
                        if (item.timestamp && item.longitude && item.latitude) {
                            const position = Cesium.Cartesian3.fromDegrees(
                                Number(item.longitude),
                                Number(item.latitude),
                                Number(item.height)
                            );
                            const julianDate = Cesium.JulianDate.fromDate(new Date(Number(item.timestamp)));

                            positionProperty.addSample(julianDate, position);
                            headProperty.addSample(julianDate, Number(item.attitudeHead) * (Math.PI / 180));
                            pitchProperty.addSample(julianDate, Number(item.attitudePitch) * (Math.PI / 180));
                            rollProperty.addSample(julianDate, Number(item.attitudeRoll) * (Math.PI / 180));
                        }
                    });

                    let entity = new Cesium.Entity({
                        id: 'vua-fly',
                        position: positionProperty,
                        orientation: orientationProperty,
                        model: new Cesium.ModelGraphics({
                            uri: 'https://vge-webgl.oss-cn-beijing.aliyuncs.com/MetaVGE-3DVis-Vue3/Model/%E5%A4%A7%E7%96%86%E6%97%A0%E4%BA%BA%E6%9C%BA/uva.gltf',
                            minimumPixelSize: 64,
                            maximumScale: 20000
                        })
                    });

                    earth.viewer3D.entities.add(entity);

                    earth.viewer3D.trackedEntity = entity;
                });
        },
        initVideo() {

            if (flvjs.isSupported()) {
                const videoElement = document.getElementById('mmiid');
                const flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    url: 'http://39.105.28.200:8081/live/livestream/1687676574238.flv' //你的url地址
                });
                flvPlayer.attachMediaElement(videoElement);
                flvPlayer.load();
                flvPlayer.play();
            }
        },
        // 重置
        removeAll() {
        },
        close() {
            this.$store.commit('setVGEEarthComAction', { name: 'uvaTool', on_off: 2 });
        }
    },
    mounted() {
        this.initUVAEntity();
        this.initVideo();
    },
    unmounted() {
        earth.viewer3D.entities.removeById('vua-fly');
    }
};
</script>

<style lang="less" scoped>
#measurePane {
    button {
        margin: 5px 2px;
        width: 70px;
    }
}
</style>
