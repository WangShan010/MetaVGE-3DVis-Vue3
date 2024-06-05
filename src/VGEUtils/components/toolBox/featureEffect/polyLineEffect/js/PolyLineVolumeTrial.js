let polylineVolume;

function addVolumeTrialLines() {
    if (polylineVolume != null) {
        removeVolumeTrial();
    }
    addPolyline();
};

//加载线数据
function addPolyline() {
    let positions = [
        108.23763469744148, 32.52440280702285, 1500,
        108.2411189854394, 32.38674431239255, 1500,
        108.33331294312102, 32.410297698976315, 1500
    ];

    polylineVolume = earth.viewer3D.entities.add({
        polylineVolume: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions),
            shape: computeCircle(600.0),
            cornerType: Cesium.CornerType.MITERED,
            material: new VGEEarth.Material.Polyline.PolylineVolumeTrialMaterial({
                color: Cesium.Color.BLUE,
                duration: 5000,
                count: 15
                //url: "/static/images/polylinematerial/spriteline2.png"
            })
        }
    });
    earth.viewer3D.flyTo(polylineVolume);
    console.log('管线添加完毕');
};


function computeCircle(radius) {
    const positions = [];
    for (let i = 0; i < 360; i += 1) {
        const radians = Cesium.Math.toRadians(i);
        positions.push(
            new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians))
        );
    }
    return positions;
};

function removeVolumeTrial() {
    earth.viewer3D.entities.remove(polylineVolume);
};
export { addVolumeTrialLines, removeVolumeTrial };
