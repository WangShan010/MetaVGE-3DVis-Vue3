export default function (position, dom, data) {
    erectLabelPoint(position, dom, data);
}

//竖立文本标注点
function erectLabelPoint(position, dom, data) {
    dom.innerHTML = '<div>竖立文本</div>';
    dom.style.width = '200px';
    dom.style.height = '100px';
    window.earth.viewer3D.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(108.959, 34.2197, 1000)
    });
    data.point3 = new VGEEarth.SuperiorEntity.ErectLabelPoint(
        earth.viewer3D,
        {
            longitude: position[0],
            latitude: position[1]
        },
        dom
    );
    data.point3.init();
}