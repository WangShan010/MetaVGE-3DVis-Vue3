export default function (position, data) {
    dynamicDivLabel(position, data);
}

//动态文本标记
function dynamicDivLabel(position, data) {
    window.earth.viewer3D.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(108.9598, 34.2185, 1000)
    });
    data.point10 = new VGEEarth.SuperiorEntity.DynamicDivLabel(earth.viewer3D, {
        longitude: position[0],
        latitude: position[1]
    }, '动态文本');
    data.point10.init();
}
