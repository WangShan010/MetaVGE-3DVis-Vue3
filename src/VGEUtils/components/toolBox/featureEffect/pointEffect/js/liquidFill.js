export default function (position, dom, data) {
    liquidFill(position, dom, data);
}

//水球图
function liquidFill(position, dom, data) {
    window.earth.viewer3D.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(108.9605, 34.2195, 1000)
    });
    dom.innerHTML = '<div>水球图</div>';
    dom.style.width = '200px';
    dom.style.height = '100px';

    data.point8 = new VGEEarth.SuperiorEntity.Liquidfill(earth.viewer3D,
        {
            longitude: position[0],
            latitude: position[1]
        },
        dom
    );
    data.point8.init();
}