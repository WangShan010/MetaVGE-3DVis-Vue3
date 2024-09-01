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
    {
        pid: '22946758-d6c6-a314-861f-f1721554ed46',
        name: '北京河网',
        catalog: '矢量数据服务',
        dataType: 'layer',
        showInTree: true,
        show: false,
        defaultLoad: false,
        offlineCache: false,
        resourceImg: './app/ResourceImg/河流.png',
        netRootPaths: [],
        properties: {
            scheme: 'layer-geoserver',
            url: window.GeoServerLocalUrl,
            layers: 'topp:SaudiArabia_bjriver'
        }
    },
    {
        pid: 'a279d56b-8a1a-8798-adab-a18218644a69',
        name: '北京路网',
        catalog: '矢量数据服务',
        dataType: 'layer',
        showInTree: true,
        show: false,
        defaultLoad: false,
        offlineCache: false,
        resourceImg: './app/ResourceImg/道路.png',
        netRootPaths: [],
        properties: {
            scheme: 'layer-geoserver',
            url: window.GeoServerLocalUrl,
            layers: 'topp:SaudiArabia_bjroad3'
        }
    },
    {
        pid: 'adcd05bb-29ba-7026-f824-9257bd400c5a',
        name: '北京建筑',
        catalog: '矢量数据服务',
        dataType: 'layer',
        showInTree: true,
        show: false,
        defaultLoad: false,
        offlineCache: false,
        resourceImg: './app/ResourceImg/建筑.png',
        netRootPaths: [],
        properties: {
            scheme: 'layer-geoserver',
            url: window.GeoServerLocalUrl,
            layers: 'topp:SaudiArabia_jbuilding'
        }
    },
    {
        pid: '82dfb4af-abb7-a274-7077-c73e44e8ce82',
        name: '北京交通站点',
        catalog: '矢量数据服务',
        dataType: 'layer',
        showInTree: true,
        show: false,
        defaultLoad: false,
        offlineCache: false,
        resourceImg: './app/ResourceImg/道路.png',
        netRootPaths: [],
        properties: {
            scheme: 'layer-geoserver',
            url: window.GeoServerLocalUrl,
            layers: 'topp:SaudiArabia_bjtransports'
        }
    },
    {
        pid: 'b2d16d6c-612e-10f9-1f07-3db5235ee5a8',
        name: '天津交通站点',
        catalog: '矢量数据服务',
        dataType: 'layer',
        showInTree: true,
        show: false,
        defaultLoad: false,
        offlineCache: false,
        resourceImg: './app/ResourceImg/道路.png',
        netRootPaths: [],
        properties: {
            scheme: 'layer-geoserver',
            url: window.GeoServerLocalUrl,
            layers: 'topp:SaudiArabin_tianjintranpoint'
        }
    },
    {
        pid: '5c1a6540-5101-7f2f-de25-a1cf17c36c73',
        name: '天津路网',
        catalog: '矢量数据服务',
        dataType: 'layer',
        showInTree: true,
        show: false,
        defaultLoad: false,
        offlineCache: false,
        resourceImg: './app/ResourceImg/道路.png',
        netRootPaths: [],
        properties: {
            scheme: 'layer-geoserver',
            url: window.GeoServerLocalUrl,
            layers: 'topp:SaudiArabin_tianjinroad'
        }
    },
    {
        pid: '1c514fe7-5453-24cb-bde5-d33d49a40f2e',
        name: '天津县级区划',
        catalog: '矢量数据服务',
        dataType: 'layer',
        showInTree: true,
        show: false,
        defaultLoad: false,
        offlineCache: false,
        resourceImg: './app/ResourceImg/道路.png',
        netRootPaths: [],
        properties: {
            scheme: 'layer-geoserver',
            url: window.GeoServerLocalUrl,
            layers: 'topp:SaudiArabin_tianjincountygbk'
        }
    },
    {
        pid: '94e367be-7692-c167-9a74-e117d83dd174',
        name: '天津建筑',
        catalog: '矢量数据服务',
        dataType: 'layer',
        showInTree: true,
        show: false,
        defaultLoad: false,
        offlineCache: false,
        resourceImg: './app/ResourceImg/建筑.png',
        netRootPaths: [],
        properties: {
            scheme: 'layer-geoserver',
            url: window.GeoServerLocalUrl,
            layers: 'topp:SaudiArabin_tianjinbuilding'
        }
    },
    {
        pid: '1eb35f64-654b-05c7-b155-96ccda72b4ab',
        name: '河北路网',
        catalog: '矢量数据服务',
        dataType: 'layer',
        showInTree: true,
        show: false,
        defaultLoad: false,
        offlineCache: false,
        resourceImg: './app/ResourceImg/道路.png',
        netRootPaths: [],
        properties: {
            scheme: 'layer-geoserver',
            url: window.GeoServerLocalUrl,
            layers: 'topp:SaudiArabin_hebeiroad'
        }
    },
    {
        pid: '67bda2e2-2333-9c55-81da-49580a200265',
        name: '河北河网',
        catalog: '矢量数据服务',
        dataType: 'layer',
        showInTree: true,
        show: false,
        defaultLoad: false,
        offlineCache: false,
        resourceImg: './app/ResourceImg/道路.png',
        netRootPaths: [],
        properties: {
            scheme: 'layer-geoserver',
            url: window.GeoServerLocalUrl,
            layers: 'topp:SaudiArabin_hebeiriver'
        }
    },
    {
        pid: 'ef3a9828-bec2-cc62-3c11-3e6059a30927',
        name: '北京市界',
        catalog: '矢量数据服务',
        dataType: 'layer',
        showInTree: true,
        show: false,
        defaultLoad: false,
        offlineCache: false,
        resourceImg: './app/ResourceImg/道路.png',
        netRootPaths: [],
        properties: {
            scheme: 'layer-geoserver',
            url: window.GeoServerLocalUrl,
            layers: 'topp:SaudiArabin_beijing'
        }
    },
    {
        pid: '4ba24a44-1dfd-c88b-2e80-dcdaab097276',
        name: '北京区级区划',
        catalog: '矢量数据服务',
        dataType: 'layer',
        showInTree: true,
        show: false,
        defaultLoad: false,
        offlineCache: false,
        resourceImg: './app/ResourceImg/道路.png',
        netRootPaths: [],
        properties: {
            scheme: 'layer-geoserver',
            url: window.GeoServerLocalUrl,
            layers: 'topp:SaudiArabin_beijingcountygbk'
        }
    },
    {
        pid: 'de94caa4-de77-ec5f-78c9-c0768914c1a5',
        name: '大鹏湾影像',
        catalog: '区域影像',
        dataType: 'layer',
        showInTree: true,
        defaultLoad: true,
        properties: {
            scheme: 'layer-xyz-3857',
            url:  'https://bj.webgpu.top:3006/DBService/大鹏湾影像/{z}/{x}/{y}.png',
            minimumLevel: 0,
            maximumLevel: 19,
            rectangle: {
                "east": 114.50238570570946,
                "north": 22.641680985689167,
                "south": 22.51551000447277,
                "west": 114.36642721295357
            }
        }

    }
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
            'https://bj.webgpu.top:3006/DBService/3DTiles-TianYi-en/'
        ],
        decryptionKey: 'SDcVrdKWEgjKPTGQgZ6zonZ7hLX+IjnF2Y0AwiKLXjewB5todhQ3UskdmWuGRl3FXYRUq37xlkrkmEyg+6Aub29/JH+Ga2AeS6AXTCcp1IMwxWXi4gMUhevgkwHt7AXl3GjsEiQ93HYVq/kXGcYx28aj/VrqPSCADtwjkQI+28Y=',
        properties: {
            url: 'https://bj.webgpu.top:3006/DBService/3DTiles-TianYi-en/tileset.json',
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
            'https://bj.webgpu.top:3006/DBService/3DTile-FeiDong-en/'
        ],
        decryptionKey: 'SDcVrdKWEgjKPTGQgZ6zonZ7hLX+IjnF2Y0AwiKLXjc5CRgpSDHPq1Uy/7owGn1b9ianW+GH4zUh5CgilKFT0CGrdWHWgQ2q/Gdz8h68Lqa56o242Kg/6bDSn/lq+QGXSiy/vmQabumO/uVMPOWe8W9AAkjuxB22u2oZh69uMIL13Aqkqllwdc9hSQmXPatDNEIMSnBIYxG+Sro7Ou1VbgrLnXFdwal0vOsKdEBWh9E=',
        properties: {
            url: 'https://bj.webgpu.top:3006/DBService/3DTile-FeiDong-en/tileset.json',
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

