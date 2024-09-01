// 负责控制 基础平台 Vue 项目的 UI 组件

let UIConfig = {
    // 当时组件的状态，是用于 Demo 演示，还是用在正真的生产环境下。
    demoModel: true,
    themeColor: 'green',
    titleHeader: {
        left: [
            { id: 'Introduce', name: '平台介绍', type: 'url', defaultOptions: false, url: 'http://8.146.208.114:8083/' },
            { id: 'UserBook', name: '用户手册', type: 'url', defaultOptions: false, url: 'http://8.146.208.114:8083/zh/简介/' },
            { id: 'APIBook', name: 'API文档', type: 'url', defaultOptions: false, url: 'http://8.146.208.114:3000/VGEEarth-SDK-API/index.html' }
        ],
        right: [
            { id: 'codeBase', name: '开源代码', type: 'url', defaultOptions: false, url: 'https://github.com/WangShan010/MetaVGE-3DVis-Vue3' },
            { id: 'CodeView', name: '代码示例', type: 'url', defaultOptions: false, url: './#/example' },
            { id: 'productsView', name: '案例展示', type: 'menu', defaultOptions: false }
        ]
    },
    comActions: [
        // UI 挂件
        { name: '头部标题栏', type: 'UIPendant', open: true, comName: 'titleHeader', role: 'all' },
        { name: '基础功能栏', type: 'UIPendant', open: true, comName: 'functionBar', role: 'all' },
        { name: '资源管理树', type: 'UIPendant', open: false, comName: 'resourceTree', role: 'all' },
        { name: '底图选取', type: 'UIPendant', open: false, comName: 'baseMap', role: 'all' },
        { name: '工具箱', type: 'UIPendant', open: false, comName: 'toolBox', role: 'all' },
        { name: '大数据可视化', type: 'UIPendant', open: false, comName: 'Echarts-MapV', role: 'all' },
        { name: '信息面版', type: 'UIPendant', open: false, comName: 'infoWindows', role: 'all' },
        { name: '地球相机信息栏', type: 'UIPendant', open: false, comName: 'earthPositionInfo', role: 'all' },
        { name: '地图资源选择盒', type: 'UIPendant', open: true, comName: 'ResourceBoxShow' , role: 'all' },


        // 工具箱内模块
        { name: '图上量算', type: 'ToolBoxItem', open: false, comName: 'measureTool', config: { inToolBox: true, iconClass: 'vge-shuipingliangsuan' }, role: 'all' },
        { name: '剖面分析', type: 'ToolBoxItem', open: false, comName: 'geologicalSection', config: { inToolBox: true, iconClass: 'vge-shuipingliangsuan', role: 'all' } },
        // { name: '土方量算', type: 'ToolBoxItem', open: false, comName: 'earthworkVolume', config: { inToolBox: false, iconClass: 'vge-changjing' }, role: 'admin' },
        { name: '空间分析', type: 'ToolBoxItem', open: false, comName: 'spatialAnalyze', config: { inToolBox: true, iconClass: 'vge-fenxi' }, role: 'admin' },
        { name: '坐标定位', type: 'ToolBoxItem', open: false, comName: 'coordinates', config: { inToolBox: true, iconClass: 'vge-dingwei' }, role: 'all' },
        { name: '地区导航', type: 'ToolBoxItem', open: false, comName: 'areaNavigation', config: { inToolBox: true, iconClass: 'vge-daohang1' }, role: 'all' },
        { name: '视角书签', type: 'ToolBoxItem', open: false, comName: 'visualMarker', config: { inToolBox: true, iconClass: 'vge-biaoqian' }, role: 'all' },
        { name: '图上标绘', type: 'ToolBoxItem', open: false, comName: 'plotTool', config: { inToolBox: true, iconClass: 'vge-Icon_lujinghuizhi' }, role: 'all' },
        { name: '卷帘对比', type: 'ToolBoxItem', open: false, comName: 'ImageLayerSplitMana', config: { inToolBox: true, iconClass: 'vge-juanlian' }, role: 'all' },
        { name: '时序图层', type: 'ToolBoxItem', open: false, comName: 'ImageLayerTimeLine', config: { inToolBox: true, iconClass: 'vge-timeline' }, role: 'all' },
        { name: '路线规划', type: 'ToolBoxItem', open: false, comName: 'pathPlanning', config: { inToolBox: true, iconClass: 'vge-zhuanyiluxian' }, role: 'all' },
        // { name: '路径漫游', type: 'ToolBoxItem', open: false, comName: 'pathRoaming', config: { inToolBox: false, iconClass: 'vge-zhuanyiluxian' }, role: 'all' },
        { name: '天空盒', type: 'ToolBoxItem', open: false, comName: 'skyBoxTool', config: { inToolBox: true, iconClass: 'vge-jiejing' }, role: 'all' },
        { name: 'VR立体', type: 'ToolBoxItem', open: false, comName: 'vr3d', config: { inToolBox: true, iconClass: 'vge-zhuanyiluxian' }, role: 'all' },
        { name: '实时天气', type: 'ToolBoxItem', open: false, comName: 'weather', config: { inToolBox: false, iconClass: 'vge-duoyun' }, role: 'all' },
        { name: '几何特效', type: 'ToolBoxItem', open: false, comName: 'featureEffect', config: { inToolBox: true, iconClass: 'vge-texiao' }, role: 'all' },
        { name: '场景特效', type: 'ToolBoxItem', open: false, comName: 'specialEffect', config: { inToolBox: true, iconClass: 'vge-texiao' }, role: 'all' },
        { name: '洪水演进', type: 'ToolBoxItem', open: false, comName: 'flood', config: { inToolBox: true, iconClass: 'vge-texiao' }, role: 'all' },
        { name: '视频融合', type: 'ToolBoxItem', open: false, comName: 'videoShed', config: { inToolBox: false, iconClass: 'vge-texiao' }, role: 'all' },
        { name: '视图管理', type: 'ToolBoxItem', open: false, comName: 'linkView', config: { inToolBox: true, iconClass: 'vge-texiao' }, role: 'all' },
        { name: '粒子系统', type: 'ToolBoxItem', open: false, comName: 'particleSystem', config: { inToolBox: true, iconClass: 'vge-texiao' }, role: 'all' },
        { name: '插件管理', type: 'ToolBoxItem', open: false, comName: 'PluginManagement', config: { inToolBox: true, iconClass: 'vge-texiao' }, role: 'all' },
        { name: '洪水模型', type: 'ToolBoxItem', open: false, comName: 'floodModel', config: { inToolBox: true, iconClass: 'vge-texiao' }, role: 'all' },

        // 工具类挂件
        { name: '数据配置', type: 'Pendant', open: false, comName: 'dataSetting', role: 'all' },
        { name: '可视分析', type: 'Pendant', open: false, comName: 'viewShedStage', role: 'all' },
        { name: '地表开挖', type: 'Pendant', open: false, comName: 'terrainExcavate', role: 'all' },
        { name: '限高分析', type: 'Pendant', open: false, comName: 'limitHeight', role: 'all' },
        { name: '地貌渲染', type: 'Pendant', open: false, comName: 'terrainRendering', role: 'all' },
        { name: '坡向分析', type: 'Pendant', open: false, comName: 'aspectAnalyze', role: 'all' },
        { name: '坡度分析', type: 'Pendant', open: false, comName: 'slopeAnalyze', role: 'all' },
        { name: '风力效应', type: 'Pendant', open: false, comName: 'windEffect', role: 'all' },
        { name: '山体阴影', type: 'Pendant', open: false, comName: 'hillShade', role: 'all' },
        { name: '视域分析', type: 'Pendant', open: false, comName: 'viewAnalyze', role: 'all' },
        { name: '日照分析', type: 'Pendant', open: false, comName: 'sunlightAnalyze', role: 'all' },

        { name: '水文分析', type: 'Pendant', open: false, comName: 'hydrologyAnalyze', role: 'admin' },
        { name: '三维地层', type: 'Pendant', open: false, comName: 'stratumAnalyze', role: 'admin' },
        { name: '数据裁切', type: 'Pendant', open: false, comName: 'dataCropping', role: 'admin' },
        { name: '数据拼接', type: 'Pendant', open: false, comName: 'dataConcatenation', role: 'admin' },
        { name: '求交分析', type: 'Pendant', open: false, comName: 'intersectAnalysis', role: 'admin' },
        { name: '缓冲区', type: 'Pendant', open: false, comName: 'bufferAnalysis', role: 'admin' },
        { name: '差值分析', type: 'Pendant', open: false, comName: 'interpolation', role: 'admin' },

        { name: '水体特效', type: 'Pendant', open: false, comName: 'waterSpecial', role: 'all' },
        { name: '火焰粒子', type: 'Pendant', open: false, comName: 'firePlot', role: 'all' },
        { name: '喷泉粒子', type: 'Pendant', open: false, comName: 'fountainPlot', role: 'all' },
        { name: '烟雾粒子', type: 'Pendant', open: false, comName: 'smokePlot', role: 'all' },
        { name: '图例', type: 'Pendant', open: false, comName: 'legend' }

        // 待开发
        // { name: '我的标记',  open:false, iconClass: 'vge-pin-fill' , role: 'all'},
        // { name: '地图打印',  open:false, iconClass: 'vge-24gf-printer' , role: 'all'},
        // { name: '飞行漫游',  open:false, iconClass: 'vge-biaoqian', role: 'all' },
        // { name: '分屏对比',  open:false, iconClass: 'vge-fenping' , role: 'all'},
        // { name: '百度街景',  open:false, iconClass: 'vge-jiejing' , role: 'all'},
    ]
};


window.UIConfig = UIConfig;
