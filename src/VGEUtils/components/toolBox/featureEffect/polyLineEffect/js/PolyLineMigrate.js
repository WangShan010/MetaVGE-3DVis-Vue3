var center = [108.46928783982952,32.70464826786063];
var lines= [];

function addPolylines(center,radius,steps) {
  let circlePoints = generateCirclePoints(center, radius, steps); //圆周边坐标
  let startP = Cesium.Cartesian3.fromDegrees(center[0], center[1], center[2] || 0);
  let endP;
  let positions;
  let material = new VGEEarth.Material.Polyline.PolylineLinkPulseMaterial({
    color: new Cesium.Color(1, 0.79, 0.15, 1),
    duration: 2000,
    //url: "../img/迁徙线材质.png",
  });
  let line;
  circlePoints.forEach(item => {
    endP = Cesium.Cartesian3.fromDegrees(item[0], item[1], 0);
    positions = generateCurve(startP, endP);
    line = earth.viewer3D.entities.add({
      polyline: {
        positions: positions,
        width: 2,
        material: material // Cesium.Color.RED
      }
    });
    lines.push(line);
  });
};

//生成流动曲线 传入起点和终点
function generateCurve(startPoint, endPoint) {
  let addPointCartesian = new Cesium.Cartesian3();
  Cesium.Cartesian3.add(startPoint, endPoint, addPointCartesian);
  let midPointCartesian = new Cesium.Cartesian3();
  Cesium.Cartesian3.divideByScalar(addPointCartesian, 2, midPointCartesian);
  let midPointCartographic = Cesium.Cartographic.fromCartesian(
    midPointCartesian
  );
  midPointCartographic.height =
    Cesium.Cartesian3.distance(startPoint, endPoint) / 5;
  let midPoint = new Cesium.Cartesian3();
  Cesium.Ellipsoid.WGS84.cartographicToCartesian(
    midPointCartographic,
    midPoint
  );

  let spline = new Cesium.CatmullRomSpline({
    times: [0.0, 0.5, 1.0],
    points: [startPoint, midPoint, endPoint]
  });

  let curvePoints = [];
  for (let i = 0, len = 200; i < len; i++) {
    curvePoints.push(spline.evaluate(i / len));
  }
  return curvePoints;
};
//生成圆上的终点坐标
function generateCirclePoints(center, radius, steps) {
  let points = [];
  let num = parseInt(360 / steps);
  for (let i = 0; i <= 360; i += num) {
    points.push(getCirclePoint(center[0], center[1], i, radius));
  }
  return points;
};
function getCirclePoint(lon, lat, angle, radius) {
  let dx = radius * Math.sin(angle * Math.PI / 180.0);
  let dy = radius * Math.cos(angle * Math.PI / 180.0);
  let ec = 6356725 + (6378137 - 6356725) * (90.0 - lat) / 90.0;
  let ed = ec * Math.cos(lat * Math.PI / 180);
  let newLon = (dx / ed + lon * Math.PI / 180.0) * 180.0 / Math.PI;
  let newLat = (dy / ec + lat * Math.PI / 180.0) * 180.0 / Math.PI;
  return [newLon, newLat];
};
//移除迁徙线
function removeMigrateLines() {
  for(let i = 0;i < lines.length;i++){
    earth.viewer3D.entities.remove(lines[i]);
  }
};
function addMigrateLines () {
  if (lines.length != 0){
    removeMigrateLines();
  }
  addPolylines(center,20000,30);
};
export {addMigrateLines, removeMigrateLines};
