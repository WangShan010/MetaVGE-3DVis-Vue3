export default function (position, data) {
    primitiveLabelCol(position, data)
}


//图标+文字
function primitiveLabelCol(position, data) {
    window.earth.viewer3D.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(108.9595,  34.2198, 1000),
    });
    data.point7 = new VGEEarth.SuperiorEntity.PrimitiveLabelCol(earth.viewer3D);
    data.point7._add(position, "大雁塔", new URL('../img/mark3.png', import.meta.url).href);
}
