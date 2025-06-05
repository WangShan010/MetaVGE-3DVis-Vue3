Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NjYwM2E1NS00OTRlLTRiMjEtYjhhZS05MzEzNDIwNGUzMjgiLCJpZCI6MjM5OTcsImlhdCI6MTY3OTI3ODE4OX0.X_5SfpOtpL-gSbGjAP2Z6ohp1jmI5k_UtjzA72iFPcQ';

console.log(`%c📜 MetaVGE-3DVis-Vue3 编译版本：2024年08月09日`, 'color: #84709b; font-size: 14px; font-weight: bold;');
window.GISResourcesUrl = 'http://xxx:9001';
window.AppBaseUrl = 'http://xxx:3060';

window.QISWSUrl = 'xxx:8766/';                            // QIS 空间分析服务的 WebSocket 地址
window.GeoServerLiveUrl = 'http://xxx:8086/geoserver/st/wms?service=WMS';             // GeoServer 实时生成图层地址
window.GeoServerLocalUrl = 'https://xxxxxx:3004/geoserver/VGE/wms?service=WMS';          // GeoServer 本地提前配置的图层地址



const baseConfig = {};

window.appName = '虚拟地理环境大数据可视化系统';
window.appTitle = '虚拟地理环境大数据可视化系统';

// const homeView = {longitude: 117.316034, latitude: 42.411409, height: 55150};
const homeView = { longitude: 108.387, latitude: 30.71, height: 4000000 };

const layerList = [
];
const terrainList = [];
const modelList = [];

const cesium3DTileSetList = [
    {
        pid: 'd76023df-981d-d4d5-5f46-21864b706b0e',
        name: '天一阁-倾斜模型',
        catalog: '三维模型',
        dataType: 'Cesium3DTile',
        defaultLoad: true,
        show: true,
        resourceImg: './app/ResourceImg/倾斜模型.png',
        offlineCache: true,
        netRootPaths: [
            'https://nas.vgemap.site:3006/DBService/3DTiles-TianYi-en/'
        ],
        decryptionKey: 'SDcVrdKWEgjKPTGQgZ6zonZ7hLX+IjnF2Y0AwiKLXjewB5todhQ3UskdmWuGRl3FXYRUq37xlkrkmEyg+6Aub29/JH+Ga2AeS6AXTCcp1IMwxWXi4gMUhevgkwHt7AXl3GjsEiQ93HYVq/kXGcYx28aj/VrqPSCADtwjkQI+28Y=',
        properties: {
            url: 'https://nas.vgemap.site:3006/DBService/3DTiles-TianYi-en/tileset.json',
            maximumScreenSpaceError: 2,
            maximumMemoryUsage: 8192,
            offset: {
                height: 25
            }
        }
    },
    {
        pid: '8e2d4f81-122f-d1ba-8e42-2a20c2c9e42b',
        name: '合肥城区-倾斜模型',
        catalog: '三维模型',
        dataType: 'Cesium3DTile',
        defaultLoad: true,
        show: true,
        resourceImg: './app/ResourceImg/倾斜模型.png',
        offlineCache: true,
        netRootPaths: [
            'https://nas.vgemap.site:3006/DBService/3DTile-FeiDong-en/'
        ],
        decryptionKey: 'SDcVrdKWEgjKPTGQgZ6zonZ7hLX+IjnF2Y0AwiKLXjc5CRgpSDHPq1Uy/7owGn1b9ianW+GH4zUh5CgilKFT0CGrdWHWgQ2q/Gdz8h68Lqa56o242Kg/6bDSn/lq+QGXSiy/vmQabumO/uVMPOWe8W9AAkjuxB22u2oZh69uMIL13Aqkqllwdc9hSQmXPatDNEIMSnBIYxG+Sro7Ou1VbgrLnXFdwal0vOsKdEBWh9E=',
        properties: {
            url: 'https://nas.vgemap.site:3006/DBService/3DTile-FeiDong-en/tileset.json',
            maximumScreenSpaceError: 2,
            maximumMemoryUsage: 8192,
            offset: {
                height: 25
            }
        }
    }
];
const geoJsonList = [];
const poiList = [];

baseConfig.GISResourcesUrl = window.GISResourcesUrl;   // GIS资源路径
baseConfig.AppBaseUrl = window.AppBaseUrl;             // 项目主后台服务基本路径
baseConfig.appName = appName;                   // 完整项目名
baseConfig.appTitle = appTitle;                 // 项目简名 用于加载在标签栏上
baseConfig.homeView = homeView;
baseConfig.startAnimation = true;
baseConfig.layerList = layerList;
baseConfig.terrainList = terrainList;
baseConfig.modelList = modelList;
baseConfig.cesium3DTileSetList = cesium3DTileSetList;
baseConfig.geoJsonList = geoJsonList;
baseConfig.poi = poiList;

VGEEarth.ConfigTool.addMapBoxOnAliYun(true);
VGEEarth.ConfigTool.addAMapSatelliteLayerOnLine(false);
VGEEarth.ConfigTool.addAMapLayerOnLine(false);
VGEEarth.ConfigTool.addTerrainOnAliYun(true);
VGEEarth.ConfigTool.addBingMapOnAliYun(true);
VGEEarth.ConfigTool.addTianDiTuLayerList(['cia_w']);
VGEEarth.ConfigTool.loadConfig(baseConfig);

