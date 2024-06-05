export default function (position, data) {
    hlsVideo(position, data);
}

//hls视频窗口点
function hlsVideo(position, data) {
    window.earth.viewer3D.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(108.9588, 34.2189, 1000)
    });
    let monitor = {
        id: '51616161',
        name: 'Hls监控1',
        url: 'http://220.161.87.62:8800/hls/0/index.m3u8',
        position: {
            longitude: position[0],
            latitude: position[1]
        }
    };
    data.hls = new VGEEarth.SuperiorEntity.HlsVideoWindow(earth.viewer3D, monitor);
    data.hls.init();

}