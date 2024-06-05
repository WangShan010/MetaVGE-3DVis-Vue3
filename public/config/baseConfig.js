Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NjYwM2E1NS00OTRlLTRiMjEtYjhhZS05MzEzNDIwNGUzMjgiLCJpZCI6MjM5OTcsImlhdCI6MTY3OTI3ODE4OX0.X_5SfpOtpL-gSbGjAP2Z6ohp1jmI5k_UtjzA72iFPcQ';

console.log(`%c📜 MetaVGE-3DVis-Vue3 编译版本：2024年03月13日`, 'color: #84709b; font-size: 14px; font-weight: bold;');
window.GISResourcesUrl = 'http://8.146.208.114:9001';
window.AppBaseUrl = 'http://8.146.208.114:3060';

window.QISWSUrl = '8.146.208.114:8766/';                            // QIS 空间分析服务的 WebSocket 地址
window.GeoServerLiveUrl = 'http://8.146.208.114:8086/geoserver/st/wms?service=WMS';             // GeoServer 实时生成图层地址
window.GeoServerLocalUrl = 'https://bj.webgpu.top:3004/geoserver/VGE/wms?service=WMS';          // GeoServer 本地提前配置的图层地址

window.demoServer = 'https://bj.webgpu.top:3006/VGEEarth-SDK';
window.FloodResourcesUrl = 'http://8.146.208.114:9002';

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
    }
];
const terrainList = [];
const modelList = [];

const cesium3DTileSetList = [];
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
VGEEarth.ConfigTool.addBingMapOnIon(false);
VGEEarth.ConfigTool.addTianDiTuLayerList(true);
VGEEarth.ConfigTool.loadConfig(baseConfig);

