Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NjYwM2E1NS00OTRlLTRiMjEtYjhhZS05MzEzNDIwNGUzMjgiLCJpZCI6MjM5OTcsImlhdCI6MTY3OTI3ODE4OX0.X_5SfpOtpL-gSbGjAP2Z6ohp1jmI5k_UtjzA72iFPcQ';

const baseConfig = {};

const appName = '虚拟地理环境三维可视化平台';
const appTitle = '虚拟地理环境三维可视化平台';

// const homeView = {longitude: 117.316034, latitude: 42.411409, height: 55150};
const homeView = {longitude: 108.387, latitude: 30.71, height: 4000000};

const layerList = [
    {
        name: '高德影像',
        catalog: '基础影像',
        dataType: 'layer',
        properties: {
            scheme: 'layer-xyz-3857',
            url: 'http://webst04.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
        }
    },
    {
        name: '高德电子地图',
        catalog: '电子地图',
        dataType: 'layer',
        properties: {
            scheme: 'layer-xyz-3857',
            url: 'http://webst04.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}'
        }
    }
];
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
            maximumScreenSpaceError: 8,
            offset: {
                height: 35
            }
        }
    },
    // {
    //     pid: 'b0c24b7d-5970-f574-a7f2-5ef0851dfcc0',
    //     name: '小区',
    //     catalog: '三维模型',
    //     dataType: '3DTiles',
    //     defaultLoad: true,
    //     properties: {
    //         url: 'http://211.149.185.229:8081/data/offset_3dtiles/tileset.json',
    //         maximumScreenSpaceError: 1,
    //         offset: {
    //             height: -470
    //         }
    //     }
    // }
    {
        pid: '22993869-44d3-a445-8c88-f36fb18d65bc',
        name: '案例-1',
        catalog: '三维模型',
        dataType: 'Cesium3DTile',
        defaultLoad: false,
        properties: {
            url: 'http://127.0.0.1:3000/DBService/OSGB0327_b3dm/tileset.json',
            maximumScreenSpaceError: 1,
            offset: {
                height: 35
            }
        }
    },
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
    },
    {
        name: '水体特效',
        catalog: '特效',
        dataType: 'water',
        defaultLoad: true,
        properties: {
            geoJsonUrl: `./app/demo/水体效果/水域.geojson`,
            height: 11.7
        }
    },
    {
        name: '长虹桥',
        catalog: '特效',
        dataType: 'water',
        defaultLoad: true,
        properties: {
            geoJsonUrl: `./app/demo/水体效果/长虹桥.geojson`,
            height: 11.7
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
VGEEarth.ConfigTool.addTerrainOnIon(true);
VGEEarth.ConfigTool.addBingMapOnIon(true);
VGEEarth.ConfigTool.loadConfig(baseConfig);

