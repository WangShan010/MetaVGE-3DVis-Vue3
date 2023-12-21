Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NjYwM2E1NS00OTRlLTRiMjEtYjhhZS05MzEzNDIwNGUzMjgiLCJpZCI6MjM5OTcsImlhdCI6MTY3OTI3ODE4OX0.X_5SfpOtpL-gSbGjAP2Z6ohp1jmI5k_UtjzA72iFPcQ";

const baseConfig = {};

const appName = '虚拟地理环境大数据可视化系统';
const appTitle = '虚拟地理环境大数据可视化系统';

// const homeView = {longitude: 117.316034, latitude: 42.411409, height: 55150};
const homeView = {longitude: 108.387, latitude: 30.71, height: 4000000};

const layerList = [];
const terrainList = [];
const modelList = [];

const cesium3DTileSetList = [
    {
        pid: '80f3778c-c8dc-481b-2122-b90e04fd3104',
        name: '天一阁',
        catalog: '三维模型',
        dataType: 'Cesium3DTile',
        netRootPaths: [
            'https://vge-webgl.oss-cn-beijing.aliyuncs.com/encrypt/3DTiles-TianYi/'
        ],
        defaultLoad: true,
        offlineCache: true,
        decryptionKey: '795bc22d-c487-6fd6-ec77-56849171d53d',
        properties: {
            url: 'https://vge-webgl.oss-cn-beijing.aliyuncs.com/encrypt/3DTiles-TianYi/tileset.json',
            maximumScreenSpaceError: 2,
            offset: {
                height: 35
            }
        }
    }
];
const geoJsonList = [
    {
        name: '秦巴边界',
        catalog: '矢量数据',
        dataType: 'geoJson',
        properties: {
            url: 'https://vge-webgl.oss-cn-beijing.aliyuncs.com/GeoJson-China/秦巴边界.geojson'
        }
    },
    {
        name: '北京路网',
        catalog: '矢量数据',
        dataType: 'geoJson',
        properties: {
            url: 'https://vge-webgl.oss-cn-beijing.aliyuncs.com/GeoJson-China/北京路网.geojson'
        }
    },
    {
        name: '淮河',
        catalog: '矢量数据',
        dataType: 'geoJson',
        properties: {
            url: 'https://vge-webgl.oss-cn-beijing.aliyuncs.com/GeoJson-China/淮河.geojson'
        }
    },
    {
        name: '黄河',
        catalog: '矢量数据',
        dataType: 'geoJson',
        properties: {
            url: 'https://vge-webgl.oss-cn-beijing.aliyuncs.com/GeoJson-China/黄河.geojson'
        }
    },
    {
        name: '黄土高原',
        catalog: '矢量数据',
        dataType: 'geoJson',
        properties: {
            url: 'https://vge-webgl.oss-cn-beijing.aliyuncs.com/GeoJson-China/黄土高原.geojson'
        }
    },
    {
        name: '京杭大运河',
        catalog: '矢量数据',
        dataType: 'geoJson',
        properties: {
            url: 'https://vge-webgl.oss-cn-beijing.aliyuncs.com/GeoJson-China/京杭大运河.geojson'
        }
    },
    {
        name: '钱塘江',
        catalog: '矢量数据',
        dataType: 'geoJson',
        properties: {
            url: 'https://vge-webgl.oss-cn-beijing.aliyuncs.com/GeoJson-China/钱塘江.geojson'
        }
    },
    {
        name: '长江',
        catalog: '矢量数据',
        dataType: 'geoJson',
        properties: {
            url: 'https://vge-webgl.oss-cn-beijing.aliyuncs.com/GeoJson-China/长江.geojson'
        }
    },
    {
        name: '省行政区边界',
        catalog: '矢量数据',
        dataType: 'geoJson',
        properties: {
            url: `./app/demo/水体效果/100000.geoJson`
        }
    },
    {
        name: '市行政区边界',
        catalog: '矢量数据',
        dataType: 'geoJson',
        properties: {
            url: `./app/demo/水体效果/第三方.geojson`
        }
    }
];
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

// VGEEarth.ConfigTool.addMapBoxOnAliYun(true);
// VGEEarth.ConfigTool.addTerrainOnAliYun(true);

VGEEarth.ConfigTool.addAMapSatelliteLayerOnLine(false);
VGEEarth.ConfigTool.addAMapLayerOnLine(false);
VGEEarth.ConfigTool.addTerrainOnIon(true);
VGEEarth.ConfigTool.addBingMapOnIon(true);
VGEEarth.ConfigTool.loadConfig(baseConfig);

