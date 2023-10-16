// 根据多边形、多折线的端点创建虚拟点
function buildVirtualPoint(dynamicPositions, properties) {
    return {
        id: properties.id, position: dynamicPositions, point: {
            pixelSize: 12,
            color: Cesium.Color.RED,
            outlineColor: Cesium.Color.BROWN,
            outlineWidth: 2,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 15000000)
        }, label: {
            text: properties.id + '',
            font: '14pt monospace',
            pixelOffset: new Cesium.Cartesian2(0, -18),
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 15000000),
            disableDepthTestDistance: Number.POSITIVE_INFINITY
        }
    };
}

export default buildVirtualPoint;