var Lines2 = [];

function addSuperLines(){
  if (Lines2.length != 0){
    removeSuperLines();
  }
  addPolylines2();
};
function addPolylines2() {
  let startPoint = [107.49513624186937,32.49553275545226];

  let endPoint = [107.30935689944125,32.54472678880789];
  let positions = parabola(startPoint, endPoint, 10000);
  Lines2.push(addPolyline2(positions.reverse(), Cesium.Color.LIME));

  endPoint = [107.46416226494048,32.67147714786316];
  positions = parabola(startPoint, endPoint, 10000);
  Lines2.push(addPolyline2(positions.reverse(), Cesium.Color.AQUA, 2));


  endPoint = [107.64211725637196,32.514206122678985];
  positions = parabola(startPoint, endPoint, 10000);
  Lines2.push(addPolyline2(positions.reverse(), Cesium.Color.RED));

  endPoint = [107.4979523604535,32.294999534056544];
  positions = parabola(startPoint, endPoint, 10000);
  Lines2.push(addPolyline2(positions.reverse(), Cesium.Color.YELLOW, 2));
};

function addPolyline2(positions, color, count) {
  let line2 =earth.viewer3D.entities.add({
    polyline: {
      positions: positions,
      width: 15,
      material: new VGEEarth.Material.Polyline.PolylineSuperMaterial({
        color: color,
        duration: 2000,
        count: count || 1,
        url: "./超级线材质02.png"
      }),
    }
  });
  return line2;
};

function removeSuperLines() {
  for (let i = 0;i < Lines2.length;i++){
    earth.viewer3D.entities.remove(Lines2[i]);
  };
};
//=================贝塞尔曲线开始===============

// 贝塞尔曲线二维转三维  返回一个三维点数组
// 参数： x1,y1,x2,y2,h 两点经纬度坐标和飞线高度
function parabola(startPoint, endPoint, height, count) {
  let points = getBSRPoints(startPoint[0], startPoint[1], endPoint[0], endPoint[1], height, count);
  let degreesArrayHeights = [];
  for (let i in points) {
    degreesArrayHeights.push(points[i][0]);
    degreesArrayHeights.push(points[i][1]);
    degreesArrayHeights.push(points[i][2]);
  }
  return Cesium.Cartesian3.fromDegreesArrayHeights(degreesArrayHeights);
}

function getBSRPoints(x1, y1, x2, y2, h, count) {
  let point1 = [y1, 0];
  let point2 = [(y2 + y1) / 2, h];
  let point3 = [y2, 0];
  let arr = getBSR(point1, point2, point3, count);
  let arr3d = [];
  for (let i in arr) {
    let x = (x2 - x1) * (arr[i][0] - y1) / (y2 - y1) + x1;
    arr3d.push([x, arr[i][0], (arr[i][1]+1500)]);   //调整超级线的高度 +10000
  }
  return arr3d;
}


// 生成贝塞尔曲线
function getBSR(point1, point2, point3, count) {
  var ps = [{x: point1[0], y: point1[1]}, {x: point2[0], y: point2[1]}, {x: point3[0], y: point3[1]}];
  let guijipoints = CreateBezierPoints(ps, count || 100);
  return guijipoints;
}


// 贝赛尔曲线算法
// 参数：
// anchorpoints: [{ x: 116.30, y: 39.60 }, { x: 37.50, y: 40.25 }, { x: 39.51, y: 36.25 }]
function CreateBezierPoints(anchorpoints, pointsAmount) {
  var points = [];
  for (var i = 0; i < pointsAmount; i++) {
    var point = MultiPointBezier(anchorpoints, i / pointsAmount);
    points.push([point.x, point.y]);
  }
  return points;
}

function MultiPointBezier(points, t) {
  var len = points.length;
  var x = 0,
    y = 0;
  var erxiangshi = function (start, end) {
    var cs = 1,
      bcs = 1;
    while (end > 0) {
      cs *= start;
      bcs *= end;
      start--;
      end--;
    }
    return (cs / bcs);
  };
  for (var i = 0; i < len; i++) {
    var point = points[i];
    x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (erxiangshi(len - 1, i));
    y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (erxiangshi(len - 1, i));
  }
  return {x: x, y: y};
}
export {addSuperLines,removeSuperLines};
