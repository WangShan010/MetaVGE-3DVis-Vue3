export default function (position, dom, data) {
    simpleLabel(position, dom, data)
}

//简单标注点
function simpleLabel(position, dom, data) {
    dom.innerHTML = '<div>简单标注</div>';
    dom.style.width = '200px';
    dom.style.height = '100px';


    data.point2 = new VGEEarth.SuperiorEntity.SimpleLabel(
        earth.viewer3D, dom,
        {
            longitude: position[0],
            latitude: position[1]
        },
    )
    data.point2.initWindow();
    window.earth.viewer3D.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(108.96, 34.22, 1000),
    });
}