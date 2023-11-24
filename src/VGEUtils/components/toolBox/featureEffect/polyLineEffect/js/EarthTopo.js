let lines = [], line;
let myLabels = [], myLabel;
let taiYuanP = Cesium.Cartesian3.fromDegrees(112.549717, 37.87046, 100);
let wuHanP = Cesium.Cartesian3.fromDegrees(114.305215, 30.592935, 100);
let nanJingP = Cesium.Cartesian3.fromDegrees(118.772601, 31.963382, 100);
let huaiHuaP = Cesium.Cartesian3.fromDegrees(110.001705, 27.569679, 100);
let xiangGangP = Cesium.Cartesian3.fromDegrees(114.171202, 22.277469, 100);
let fuZhouP = Cesium.Cartesian3.fromDegrees(119.296389, 26.074268, 100);

function addEarthTopo() {
    if (lines.length != 0) {
        removeEarthTope();
    }

    addPolylines();
    addNetwork();
    setView();
};

function addPolylines() {
    //空间站 129.577679,45.070432
    //福州 119.296389,26.074268
    //武汉 114.305215,30.592935
    //南京 118.772601,31.963382
    let kjzP = Cesium.Cartesian3.fromDegrees(129.577679, 45.070432, 1000000);
    let dmzPs = [
        Cesium.Cartesian3.fromDegrees(119.296389, 26.074268, 100),
        Cesium.Cartesian3.fromDegrees(114.305215, 30.592935, 100),
        Cesium.Cartesian3.fromDegrees(118.772601, 31.963382, 100)
    ];

    dmzPs.forEach(item => {
        line = earth.viewer3D.entities.add({
            polyline: {
                positions: [kjzP, item],
                width: 2,
                material: new VGEEarth.Material.Polyline.PolylineLinkPulseMaterial({
                    color: Cesium.Color.CYAN, //颜色
                    duration: 5000 //时间 控制速度
                    //url: "/static/images/polylinematerial/LinkPulse.png", //材质图片
                })
            }
        });
        lines.push(line);
    });

    line = earth.viewer3D.entities.add({
        position: kjzP,
        label: {
            text: 'internet',
            fillColor: Cesium.Color.WHITE,
            scale: 0.5,
            font: 'normal 84px MicroSoft YaHei',
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 25000000),
            scaleByDistance: new Cesium.NearFarScalar(50000, 1, 500000, 0.5),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -10),
            outlineWidth: 20,
            outlineColor: Cesium.Color.BLACK
        }
    });
    lines.push(line);
};

function addNetwork() {

    addTaiYuan();
    addWuHan();
    addHuaiHua();
    addNanJing();
    addFuZhou();

    myLabel = earth.viewer3D.entities.add({
        position: xiangGangP,
        label: {
            text: '香港',
            fillColor: Cesium.Color.WHITE,
            scale: 0.5,
            font: 'normal 84px MicroSoft YaHei',
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 25000000),
            scaleByDistance: new Cesium.NearFarScalar(50000, 1, 500000, 0.5),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -10),
            outlineWidth: 20,
            outlineColor: Cesium.Color.BLACK
        }
    });
    myLabels.push(myLabel);
};

//太原
function addTaiYuan() {
    let endPs = [
        wuHanP,
        nanJingP,
        fuZhouP,
        xiangGangP
    ];

    endPs.forEach(item => {
        line = earth.viewer3D.entities.add({
            polyline: {
                positions: [taiYuanP, item],
                width: 2,
                material: new VGEEarth.Material.Polyline.PolylineLinkPulseMaterial({
                    color: Cesium.Color.CYAN, //颜色
                    duration: 5000 //时间 控制速度
                    //url: "/static/images/polylinematerial/LinkPulse.png", //材质图片
                })
            }
        });
        lines.push(line);
    });

    myLabel = earth.viewer3D.entities.add({
        position: taiYuanP,
        label: {
            text: '太原',
            fillColor: Cesium.Color.WHITE,
            scale: 0.5,
            font: 'normal 84px MicroSoft YaHei',
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 25000000),
            scaleByDistance: new Cesium.NearFarScalar(50000, 1, 500000, 0.5),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -10),
            outlineWidth: 20,
            outlineColor: Cesium.Color.BLACK
        }
    });
    myLabels.push(myLabel);
};

//武汉
function addWuHan() {
    let endPs = [
        huaiHuaP,
        nanJingP,
        fuZhouP,
        xiangGangP
    ];

    endPs.forEach(item => {
        line = earth.viewer3D.entities.add({
            polyline: {
                positions: [wuHanP, item],
                width: 2,
                material: new VGEEarth.Material.Polyline.PolylineLinkPulseMaterial({
                    color: Cesium.Color.CYAN, //颜色
                    duration: 5000 //时间 控制速度
                    //url: "/static/images/polylinematerial/LinkPulse.png", //材质图片
                })
            }
        });
        lines.push(line);
    });

    myLabel = earth.viewer3D.entities.add({
        position: wuHanP,
        label: {
            text: '武汉',
            fillColor: Cesium.Color.WHITE,
            scale: 0.5,
            font: 'normal 84px MicroSoft YaHei',
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 25000000),
            scaleByDistance: new Cesium.NearFarScalar(50000, 1, 500000, 0.5),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -10),
            outlineWidth: 20,
            outlineColor: Cesium.Color.BLACK
        }
    });
    myLabels.push(myLabel);
};

//怀化
function addHuaiHua() {
    let endPs = [
        wuHanP,
        nanJingP,
        fuZhouP
    ];

    endPs.forEach(item => {
        line = earth.viewer3D.entities.add({
            polyline: {
                positions: [huaiHuaP, item],
                width: 2,
                material: new VGEEarth.Material.Polyline.PolylineLinkPulseMaterial({
                    color: Cesium.Color.CYAN, //颜色
                    duration: 5000 //时间 控制速度
                    //url: "/static/images/polylinematerial/LinkPulse.png", //材质图片
                })
            }
        });
        lines.push(line);
    });

    myLabel = earth.viewer3D.entities.add({
        position: huaiHuaP,
        label: {
            text: '怀化',
            fillColor: Cesium.Color.WHITE,
            scale: 0.5,
            font: 'normal 84px MicroSoft YaHei',
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 25000000),
            scaleByDistance: new Cesium.NearFarScalar(50000, 1, 500000, 0.5),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -10),
            outlineWidth: 20,
            outlineColor: Cesium.Color.BLACK
        }
    });
    myLabels.push(myLabel);
};

//南京
function addNanJing() {
    let endPs = [
        wuHanP,
        huaiHuaP,
        fuZhouP
    ];

    endPs.forEach(item => {
        line = earth.viewer3D.entities.add({
            polyline: {
                positions: [nanJingP, item],
                width: 2,
                material: new VGEEarth.Material.Polyline.PolylineLinkPulseMaterial({
                    color: Cesium.Color.CYAN, //颜色
                    duration: 5000 //时间 控制速度
                    //url: "/static/images/polylinematerial/LinkPulse.png", //材质图片
                })
            }
        });
        lines.push(line);
    });

    myLabel = earth.viewer3D.entities.add({
        position: nanJingP,
        label: {
            text: '南京',
            fillColor: Cesium.Color.WHITE,
            scale: 0.5,
            font: 'normal 84px MicroSoft YaHei',
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 25000000),
            scaleByDistance: new Cesium.NearFarScalar(50000, 1, 500000, 0.5),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -10),
            outlineWidth: 20,
            outlineColor: Cesium.Color.BLACK
        }
    });
    myLabels.push(myLabel);
};

//福州
function addFuZhou() {
    let endPs = [
        wuHanP,
        huaiHuaP,
        nanJingP
    ];

    endPs.forEach(item => {
        line = earth.viewer3D.entities.add({
            polyline: {
                positions: [fuZhouP, item],
                width: 2,
                material: new VGEEarth.Material.Polyline.PolylineLinkPulseMaterial({
                    color: Cesium.Color.CYAN, //颜色
                    duration: 5000 //时间 控制速度
                    //url: "/static/images/polylinematerial/LinkPulse.png", //材质图片
                })
            }
        });
        lines.push(line);
    });

    myLabel = earth.viewer3D.entities.add({
        position: fuZhouP,
        label: {
            text: '福州',
            fillColor: Cesium.Color.WHITE,
            scale: 0.5,
            font: 'normal 84px MicroSoft YaHei',
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 25000000),
            scaleByDistance: new Cesium.NearFarScalar(50000, 1, 500000, 0.5),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -10),
            outlineWidth: 20,
            outlineColor: Cesium.Color.BLACK
        }
    });
    myLabels.push(myLabel);
};

function setView() {
    let flyToOpts = {
        destination: {
            x: -5138527.387065904,
            y: 12707573.111384086,
            z: 5127296.438906498
        },
        orientation: {
            heading: 6.237472281578625,
            pitch: -1.3908744159112634,
            roll: 6.2830068206666105
        },
        duration: 2
    };
    earth.viewer3D.scene.camera.flyTo(flyToOpts);
};

function removeEarthTope() {
    for (let i = 0; i < myLabels.length; i++) {
        earth.viewer3D.entities.remove(myLabels[i]);
    }
    for (let i = 0; i < lines.length; i++) {
        earth.viewer3D.entities.remove(lines[i]);
    }
}

export {addEarthTopo, removeEarthTope};
