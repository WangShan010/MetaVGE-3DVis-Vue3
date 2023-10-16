// 负责控制 基础平台 Vue 项目的 UI 组件

let UIConfig = {
    // 当时组件的状态，是用于 Demo 演示，还是用在正真的生产环境下。
    demoModel: true,
    themeColor: 'green',
    comActions:  [
        // UI 挂件
        {name: '头部标题栏', type: 'UIPendant', open: true, comName: 'titleHeader'},
        {name: '基础功能栏', type: 'UIPendant', open: true, comName: 'functionBar'},
        {name: '资源管理树', type: 'UIPendant', open: false, comName: 'resourceTree'},
        {name: '底图选取', type: 'UIPendant', open: false, comName: 'baseMap'},
        {name: '工具箱', type: 'UIPendant', open: false, comName: 'toolBox'},
        {name: '大数据可视化', type: 'UIPendant', open: false, comName: 'Echarts-MapV'},
        {name: '信息面版', type: 'UIPendant', open: false, comName: 'infoWindows'},
        {name: '地球相机信息栏', type: 'UIPendant', open: false, comName: 'earthPositionInfo'},


        // 工具箱内模块
        {name: '图上量算', type: 'ToolBoxItem', open: false, comName: 'measureTool', config: {inToolBox: true, iconClass: 'vge-shuipingliangsuan'}},
        {name: '剖面分析', type: 'ToolBoxItem', open: false, comName: 'geologicalSection', config: {inToolBox: true, iconClass: 'vge-shuipingliangsuan'}},
        {name: '土方量算', type: 'ToolBoxItem', open: false, comName: 'earthworkVolume', config: {inToolBox: false, iconClass: 'vge-changjing'}},
        {name: '空间分析', type: 'ToolBoxItem', open: false, comName: 'spatialAnalyze', config: {inToolBox: true, iconClass: 'vge-fenxi'}},
        {name: '坐标定位', type: 'ToolBoxItem', open: false, comName: 'coordinates', config: {inToolBox: true, iconClass: 'vge-dingwei'}},
        {name: '地区导航', type: 'ToolBoxItem', open: false, comName: 'areaNavigation', config: {inToolBox: true, iconClass: 'vge-daohang1'}},
        {name: '视角书签', type: 'ToolBoxItem', open: false, comName: 'visualMarker', config: {inToolBox: true, iconClass: 'vge-biaoqian'}},
        {name: '图上标绘', type: 'ToolBoxItem', open: false, comName: 'plotTool', config: {inToolBox: true, iconClass: 'vge-Icon_lujinghuizhi'}},
        {name: '卷帘对比', type: 'ToolBoxItem', open: false, comName: 'ImageLayerSplitMana', config: {inToolBox: true, iconClass: 'vge-juanlian'}},
        {name: '时序图层', type: 'ToolBoxItem', open: false, comName: 'ImageLayerTimeLine', config: {inToolBox: true, iconClass: 'vge-timeline'}},
        {name: '路线规划', type: 'ToolBoxItem', open: false, comName: 'pathPlanning', config: {inToolBox: true, iconClass: 'vge-zhuanyiluxian'}},
        {name: '路径漫游', type: 'ToolBoxItem', open: false, comName: 'pathRoaming', config: {inToolBox: true, iconClass: 'vge-zhuanyiluxian'}},
        {name: '天空盒', type: 'ToolBoxItem', open: false, comName: 'skyBoxTool', config: {inToolBox: true, iconClass: 'vge-jiejing'}},
        {name: 'VR立体', type: 'ToolBoxItem', open: false, comName: 'vr3d', config: {inToolBox: true, iconClass: 'vge-zhuanyiluxian'}},
        {name: '实时天气', type: 'ToolBoxItem', open: false, comName: 'weather', config: {inToolBox: false, iconClass: 'vge-duoyun'}},
        {name: '几何特效', type: 'ToolBoxItem', open: false, comName: 'featureEffect', config: {inToolBox: true, iconClass: 'vge-texiao'}},
        {name: '场景特效', type: 'ToolBoxItem', open: false, comName: 'specialEffect', config: {inToolBox: true, iconClass: 'vge-texiao'}},
        {name: '洪水演进', type: 'ToolBoxItem', open: false, comName: 'flood', config: {inToolBox: true, iconClass: 'vge-texiao'}},
        {name: '视频融合', type: 'ToolBoxItem', open: false, comName: 'videoShed', config: {inToolBox: false, iconClass: 'vge-texiao'}},
        {name: '视图管理', type: 'ToolBoxItem', open: false, comName: 'linkView', config: {inToolBox: true, iconClass: 'vge-texiao'}},
        {name: '粒子系统', type: 'ToolBoxItem', open: false, comName: 'particleSystem', config: {inToolBox: true, iconClass: 'vge-texiao'}},
        {name: '插件管理', type: 'ToolBoxItem', open: false, comName: 'PluginManagement', config: {inToolBox: true, iconClass: 'vge-texiao'}},

        // 工具类挂件
        {name: '数据配置', type: 'Pendant', open: false, comName: 'dataSetting'},
        {name: '可视分析', type: 'Pendant', open: false, comName: 'viewShedStage'},
        {name: '地表开挖', type: 'Pendant', open: false, comName: 'terrainExcavate'},
        {name: '限高分析', type: 'Pendant', open: false, comName: 'limitHeight'},
        {name: '地貌渲染', type: 'Pendant', open: false, comName: 'terrainRendering'},
        {name: '坡向分析', type: 'Pendant', open: false, comName: 'aspectAnalyze'},
        {name: '坡度分析', type: 'Pendant', open: false, comName: 'slopeAnalyze'},
        {name: '水文分析', type: 'Pendant', open: false, comName: 'hydrologyAnalyze'},
        {name: '风力效应', type: 'Pendant', open: false, comName: 'windEffect'},
        {name: '山体阴影', type: 'Pendant', open: false, comName: 'hillShade'},
        {name: '视域分析', type: 'Pendant', open: false, comName: 'viewAnalyze'},
        {name: '日照分析', type: 'Pendant', open: false, comName: 'sunlightAnalyze'},
        {name: '水体特效', type: 'Pendant', open: false, comName: 'waterSpecial'},
        {name: '火焰粒子', type: 'Pendant', open: false, comName: 'firePlot'},
        {name: '喷泉粒子', type: 'Pendant', open: false, comName: 'fountainPlot'},
        {name: '烟雾粒子', type: 'Pendant', open: false, comName: 'smokePlot'},
        {name: '图例', type: 'Pendant', open: false, comName: 'legend'},

        // 待开发
        // { name: '我的标记',  open:false, iconClass: 'vge-pin-fill' },
        // { name: '地图打印',  open:false, iconClass: 'vge-24gf-printer' },
        // { name: '飞行漫游',  open:false, iconClass: 'vge-biaoqian' },
        // { name: '分屏对比',  open:false, iconClass: 'vge-fenping' },
        // { name: '百度街景',  open:false, iconClass: 'vge-jiejing' },
    ]
};


window.UIConfig = UIConfig;
