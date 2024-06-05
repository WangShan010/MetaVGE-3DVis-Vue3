export default function (position, dom, data) {
    gradientLabelPoint(position, dom, data);
}

//简单渐变标注
function gradientLabelPoint(position, dom, data) {
    window.earth.viewer3D.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(108.9595, 34.2205, 1000)
    });

    dom.innerHTML = '<div>渐变标注</div>';

    data.point5 = new VGEEarth.SuperiorEntity.GradientLabelPoint(
        earth.viewer3D,
        {
            longitude: position[0],
            latitude: position[1]
        },
        dom
    );
    data.point5.init();
}