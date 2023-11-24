
function ImageryXYZ_3857_Provider(url, param) {
    let queryParameters = param.properties.queryParameters || {};
    let resource = new Cesium.Resource({url, queryParameters});

    return new Cesium.UrlTemplateImageryProvider({
        url: resource,
        tilingScheme: new Cesium.WebMercatorTilingScheme(),
        minimumLevel: param.properties.minimumLevel || 0,
        maximumLevel: param.properties.maximumLevel || 22
    });
}

export default ImageryXYZ_3857_Provider;
