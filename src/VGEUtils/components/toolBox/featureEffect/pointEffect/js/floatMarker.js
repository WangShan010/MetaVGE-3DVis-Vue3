export default function (position, data) {
    floatMarker(position, data)
}

//浮动点
function floatMarker(position, data) {
    window.earth.viewer3D.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(108.9605, 34.219, 1000),
    });
    data.point9 = new VGEEarth.SuperiorEntity.FloatMarker(
        earth.viewer3D,
        {
            longitude: position[0],
            latitude: position[1]
        }
    )
    data.point9.init()
}