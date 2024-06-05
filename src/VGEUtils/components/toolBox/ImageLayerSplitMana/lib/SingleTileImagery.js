function SingleTileImagery(url, param = {}) {
    let layerRectangle = param.properties.layerRectangle;
    if (Array.isArray(layerRectangle)) {
        layerRectangle = Cesium.Rectangle.fromDegrees(...layerRectangle);
    } else {
        layerRectangle = Cesium.Rectangle.MAX_VALUE;
    }
    return new Cesium.SingleTileImageryProvider({ url: url, rectangle: layerRectangle });
}

export default SingleTileImagery;
