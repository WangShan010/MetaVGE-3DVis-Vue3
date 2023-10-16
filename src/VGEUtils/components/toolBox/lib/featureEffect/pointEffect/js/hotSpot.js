export default function (position, dom, data) {
    hotSpot(position, dom, data)
}

//热点面板文本点
function hotSpot(position, dom, data) {
    window.earth.viewer3D.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(108.9605, 34.2193, 1000),
    });

    dom.innerHTML = '<div style="color:#FFFFFF; text-align: center">热点面板</div>';
    dom.style.width = '200px';
    dom.style.height = '100px';

    data.point4 = new VGEEarth.SuperiorEntity.HotSpotBoardPoint(
        earth.viewer3D,
        {
            longitude: position[0],
            latitude: position[1]
        },
        dom
    );
    data.point4.init();
}