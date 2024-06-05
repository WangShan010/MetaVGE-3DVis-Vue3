let domData = {
    dom1: document.createElement('div'),
    dom2: document.createElement('div'),
    dom3: document.createElement('div'),
    dom4: document.createElement('div'),
    dom5: document.createElement('div'),
    dom8: document.createElement('div'),

    //div文本点
    pos1: [108.9585, 34.2191],

    //简单标注点
    pos2: [108.96, 34.22],

    //竖立文本标注点
    pos3: [108.959, 34.2197],

    //热点面板文本点
    pos4: [108.9605, 34.2193],

    //简单渐变标注
    pos5: [108.9595, 34.2205],

    //hls视频窗口点
    pos6: [108.9588, 34.2189],

    //图标+文字
    pos7: Cesium.Cartesian3.fromDegrees(108.9595, 34.2198),

    //水球图
    pos8: [108.9605, 34.2195],

    //浮动点
    pos9: [108.9605, 34.219],

    //动态
    pos10: [108.9598, 34.2185]
};

//弹跳点
let bMarkers = [];
let point1, point2, point3, point4, point5, point7, point8, point9, point10, hls = {};
let pointData = {
    hls, bMarkers, point1, point2, point3, point4, point5, point7, point8, point9, point10
};
export { domData, pointData };

