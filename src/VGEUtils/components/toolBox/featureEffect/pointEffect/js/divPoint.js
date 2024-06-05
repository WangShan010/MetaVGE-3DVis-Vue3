export default function (position, dom, data) {
    divText(position, dom, data);
}

//div文本
function divText(position, dom, data) {
    dom.innerHTML = '<div style="color:#FFFFFF; text-align: center">DIV文本</div>';
    dom.style.width = '200px';
    dom.style.height = '100px';

    data.point1 = new VGEEarth.SuperiorEntity.DivPoint(earth.viewer3D, {
        longitude: position[0],
        latitude: position[1]
    }, dom);
    window.earth.viewer3D.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(108.9585, 34.2191, 2000)
    });
    data.point1.init();
}