# 基础平台二次开发指南

>编译版本：2023 年 11 月 24日
>
>推荐运行环境：nodeJs 18.18.0

MetaVGE-3DVis-Vue3 是一个基于 WebGL 技术实现的三维地球 BS 端开发平台。

包括基于 Cesium 的拓展核心函数库、基于 Vue3 + Vite 的 UI 组件库，开发了四十多个常用的 GIS 组件，包含地图、场景、图层、工具、控件、分析、数据、模型、调试等模块。

开发者可通过简单的参数配置，进行系统配置、资源接入、组件定制等操作，快速一套搭建三维地球应用系统


### 虚拟地理环境大数据可视化平台


> 官网帮助文档：http://8.146.208.114:8083/
> 
> 在线演示系统：http://8.146.208.114:3000/MetaVGE-3DVis-Vue3/index.html
>
> 在线演示视频下载：https://webgpu.top:3016/VGEEarth-PPT/VGEEarth-演示-720版.mp4
>
> 演示视频下载：https://webgpu.top:3016/VGEEarth-PPT/VGEEarth-演示-4k版.zip


包括：

- UI 挂件

    - [x] 头部标题栏
    - [x] 基础功能栏
    - [x] 资源管理树
    - [x] 底图选取
    - [x] 工具箱
    - [x] 大数据可视化
    - [x] 信息面版
    - [x] 地球相机信息栏


- 工具箱

    - [x] 图上量算
    - [x] 剖面分析
    - [x] 土方量算
    - [x] 空间分析
    - [x] 坐标定位
    - [x] 地区导航
    - [x] 视角书签
    - [x] 图上标绘
    - [x] 卷帘对比
    - [x] 时序图层
    - [x] 路线规划
    - [x] 路径漫游
    - [x] 天空盒
    - [x] VR立体
    - [x] 实时天气
    - [x] 几何特效
    - [x] 场景特效
    - [x] 洪水演进
    - [x] 视频融合
    - [x] 视图管理
    - [x] 粒子系统
    - [x] 插件管理



- 工具类挂件

    - [x] 数据配置
    - [x] 可视分析
    - [x] 地表开挖
    - [x] 限高分析
    - [x] 地貌渲染
    - [x] 坡向分析
    - [x] 坡度分析
    - [x] 水文分析
    - [x] 风力效应
    - [x] 山体阴影
    - [x] 视域分析
    - [x] 日照分析
    - [x] 水体特效
    - [x] 火焰粒子
    - [x] 喷泉粒子
    - [x] 烟雾粒子
    - [x] 图例





# 1 概述



## 1.1 文档内容

本指南旨在介绍数字地球框架 MetaVGE-3DVis-Vue3 的内容与二次开发方法，包括 介绍、二次开发环境搭建流程、二次开发基础准则、功能类库开发规范、组件开发规范、应用系统开发运行方法等，为具有进行数字地球应用系统开发需求的用户提供参考。

本文档适用于具有三维 Web 研发基础的开发人员，须熟悉 HTML5、CSS3、JavaScript、ECMAScript6 等语言和标准，熟悉 Node.js、Cesium、Vue.js 等类库和框架。



## 1.2 架构与组成

MetaVGE-3DVis-Vue3 总体架构由基础层、类库层、组件层和应用层组成，其中，类库层和组件层是其核心内容。基础层包括基础运行环境例如浏览器环境、编程语言环境、前端架构环境等；类库层包含数字地球相关的数据解析、分析、可视化、服务等基础数据结构与算法，是纯 JavaScript 的类库、方法与接口的实现；组件层面向具体功能模块，结合前端 UI 框架和 类库进行实现，为应用系统提供封装好的、模块化的组件；应用层是基于类库和组件实现的数字地球应用系统，例如应用示例、专题应用系统等。

SDK 类库层目前包括三类功能类库：

Core（Config、DrawShape、Earth、EventMana、ExpandEntity、ExpandLayer、HandlerMana、Impl、KeyboardDominate、MeasureTool、PathPlanning、PlotTool、RunEntityController、TreeMana、WorkSpace）

Plus（ParticleSystem、SceneHelper、SpatialAnalysis、TileSetPlugin、VideoPlugin）

Utils（CameraUtils、CoordinateTool、GISMathUtils、MarkTool、SceneUtils、TileSetUtils、YaoDo）

组件层是基于以上的类库进行 WebUI 组件封装，包含 52 个 Web组件（图层管理、测量、空间分析、卷帘对比、时序数据可视化等）。



## 1.3 技术栈

MetaVGE-3DVis-Vue3 的技术栈包括：
1) Vue3、Element UI：开源前端框架
2) Cesium：开源三维 JS 库
3) turf、proj4：空间地理算法库
4) Echarts、D3、MapV: 开源图表库
   系统基于 webpack 打包工具进行构建，提供了打包组件为插件并运行插件的
   功能。

系统基于 Vite 打包工具进行构建，提供了打包组件为插件并运行插件的功能。



# 2 基于平台的二次开发



## 2.1 基础平台初始运行

运行本系统前，必须安装的软件有：
1) Node.js（大于 16.20.0 版本）：请前往 https://nodejs.org/en/ 下载最新版本的软件并安装。
2) Chrome 浏览器（大于 119.0.6045.160 版本）：请下载最新版本的 Chrome 浏览器以便系统能够正常运行。

拉取项目的工程文件后，在根文件夹中打开终端窗口，在命令行中输入以下命令以安装系统运行所需要的依赖并启动项目

```bash
# 安装依赖包
npm install

# 服务启动/平台启动
npm run dev
```



系统目录结构介绍

```
- public
	- app							// 与应用项目
	- config
		- baseConfig.js				// 地理资源配置文件，可配置影像、地形、模型等
		- UIConfig.js				// 组件的配置文件，控制加载、默认状态等行为
	- VGEEarth
		- Config
			- ImageLayerTimeLine	// 卷帘对比组件的配置文件
			- pathPlanning			// 路径规划组件的配置文件
			- plotTool				// 标绘工具组件的配置文件
			- skybox				// 天空盒组件的配置文件
		- Ext						// 其他第三方依赖库的路径
		- Src						// VGEEearhSDK 的路径
	- favicon.ico
- src
	- assets
	- components			// 开发者编写的第二次开发组件路径
	- plugin
	- router
	- store
	- VGEUtils				// GIS 相关组件	
	- App.vue
	- main.js
- index.html
- package.json
```



## 2.2 二次开发基础准则

为确保您编写的二次开发库与组件能够正确的运行并集成，以下规则请您务必知晓并遵守

- **模块化**。采用模块化开发思想，高内聚、低耦合；功能类库（纯 js 类库）、组件、应用系统分离；JavaScript、CSS、HTML 代码相互分离；将配置数据从代码中分离。
- **遵循 ES6 标准**。提升内部代码的可复用性，可扩展性和可读性，提供的源码需要遵循 ES6编码语法、面向对象的编程开发方式和编码规范，例如：
    - 使用 ES6 的模块机制，使用 import、export 来获取、输出变量；
    - 全局不使用 var 定义变量，用 let,const 代替；
    - 变量定义采用驼峰式；
    - 函数名和方法名需要有意义；
    - 建议使用 ES6 语法来优化代码。
- **避免自定义全局变量**。为防止全局变量覆盖和污染，在二次开发库与组件的编写过程中禁止将变量赋值到全局作用域（例如 window，top）下。
- **禁止修改全局对象**。请谨慎使用对 JS 全局对象进行修改的第三方插件，同时禁止编写代码对全局对象进行修改，例如：不允许向 String.Prototype 或Array.prototype 添加新的方法或修改已有方法。

- **VGEEearth.js 的使用**：系统的运行环境中已默认引入并被设置为了全局变量
    - 所有 Cesium 的 API 调用不受影响
    - 本库主要是关于对 Cesium 的功能拓展，可通过 VGEEearth.* 来调用

- **第三方类库的使用**：代码开发中如遇到需要引入第三方类库（如 lodash.js）的情形，推荐从 index.html 进行引入静态脚本文件，而不是 npm import 方式。因为在部署阶段可通过 CDN 进行对项目进行加速，并减少项目体积。







# 3 平台配置文件说明

以下内容是项目二次开发的基础配置，包括了项目的基本运行信息、虚拟地球的图层管理、项目的UI样式、项目的组件状态控制。



## 2.1 baseConfig.js 文件说明

### 2.1.1 项目配置

本配置文件可对系统的如 **项目标题名称**、**初始视角**、**资源根目录**、**地图资源**、**开场动画** 等重要参数进行配置。实现工程项目打包后部署上线后，仍可以进行快捷修改。

### 2.2.2 配置方式

具体完整示例可参见 *MetaVGE-3DVis-Vue3\public\config\baseConfig.js* ，使用记事本或代码编辑器都可以进行修改编辑，关键代码如下：

```javascript
const baseConfig = {
    /** SDK 的版本号，可由开发者去自定义 */
    Version: string,
    /** SDK 的 Token，用于与后台服务进行通信 */
    Token: string,
    /** 业务系统的名称 */
    appName: string,
    /** 显示在浏览器上 Tab 栏上的系统名称 */
    appTitle: string,
    /** 业务系统的图标 */
    appIcon: string,
    /** 数字地球的默认启动视角 */
    homeView: {
        longitude: number,
        latitude: number,
        height: number,
        /** 弧度制 **/
        headingRadians?: number,
        pitchRadians?: number,
        rollRadians?: number
    },
    /** 是否显示从全球旋转然后推进到默认视角的加载动画 */
    startAnimation: boolean,

    /** 演示服务器 基础路径 */
    demoServerUrl: string,
    /** 系统后台服务 基础路径 */
    AppBaseUrl: string,
    /** 静态资源服务器 基础路径 */
    GISResourcesUrl: string,

    /** GIS资源配置：图层、地形、gltf模型、倾斜模型、矢量、兴趣点 */
    layerList: ResourceItem [],
    terrainList: ResourceItem [],
    modelList: ResourceItem [],
    cesium3DTileSetList: ResourceItem [],
    geoJsonList: ResourceItem [],
    poiList: ResourceItem []
};

VGEEarth.ConfigTool.loadConfig(baseConfig);
```





### 2.1.2 资源项配置

图层、地形、gltf 模型、倾斜模型、矢量、兴趣点，在配置文件里都是以 ``ResourceItem []`` 对象数组的方式进行配置。

> 更多示例可参考 SDK 源码工程的 ```VGEEarth-SDK\Src\ts\Core\Config\Resource`` 目录

```typescript
enum DataTypeEnum {
    layer = 'layer',
    terrain = 'terrain',
    gltf = 'gltf',
    Cesium3DTile = 'Cesium3DTile',
    geoJson = 'geoJson',
    water = 'water',
    poi = 'poi'
}

interface ResourceItem {
    pid: string,				// 资源项的 pid，如果不指定，将默认自动生成一个
    name: string,				// 资源项的名称
    catalog: string,			// 资源项所属的目录
    dataType: DataTypeEnum,		// 资源项的类型
    showInTree: boolean,		// 资源项是否会出现在资源数中
    defaultLoad: boolean,		// 资源是否默认加载

    /** 资源项的网络根路径 **/
    netRootPaths?: string[],
    /** 资源项是否开启 IndexedDB 缓存，如为 ture 则 netRootPaths 为必填项 **/
    offlineCache: boolean,
    /** 资源项的解码字符串 **/
    decryptionKey?: string,
    
    /** 为 Cesium 的默认参数。例如：
    1、当资源类型为 layer 时，properties 对应填写 new Cesium.ImageryLayer(imageryProvider, options)的 options 参数
    2、当资源类型为 terrain 时，properties 对应填写 new Cesium.Cesium3DTileset(options) 的 options 参数
    **/
    properties: any;			// 为 Cesium 的默认参数。例如
}
```



- ``layerList`` 图层类型的资源项

影像图层，或者加载任何可用的影像资源服务，默认加载一个 基础影像，全球影像底图

properties 内的 **必填** 参数：

| 属性名 |      类型       |      描述      |
| :----: | :-------------: | :------------: |
| scheme | layerSchemeEnum | 图层的瓦片规则 |
|  url   |     string      |  地形服务地址  |

```typescript
enum layerSchemeEnum {
    'layer-wms' = 'layer-wms',
    'layer-tms' = 'layer-tms',
    'layer-wmts' = 'layer-wmts',
    'layer-singleTileImagery' = 'layer-singleTileImagery',
    'layer-xyz-3857' = 'layer-xyz-3857',
    'layer-xyz-4326' = 'layer-xyz-4326',
    'layer-arcgisMapServer' = 'layer-arcgisMapServer',
    'layer-geoserver' = 'layer-geoserver',
    'IonImageryProvider' = 'IonImageryProvider'
}
```



下边是一个配置实例供用户参考

```javascript
{
    pid: 'f859bb06-68b3-aed9-f7c5-e85c0c544516',
    name: '高德电子地图',
    catalog: '基础数据',
    dataType: 'layer',
    showInTree: true,
    defaultLoad: true,
    properties: {
       scheme: 'layer-xyz-3857',
       url: 'http://webst04.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}'
    }
}
```



- ``layerList`` 图层类型 的资源项配置参考实例：

地形图层，仅能加载一个地形数据。从上到下遍历数组，将第一个 `defaultLoad` 为 `true` 的地形图层设置为默认显示。

properties 内的 **必填** 参数：

| 属性名 |  类型  |                          描述                          |
| :----: | :----: | :----------------------------------------------------: |
| scheme | string | "CesiumTerrainProvider"\|\|"VRTheWorldTerrainProvider" |
|  url   | string |                      地形服务地址                      |



下边是一个配置实例供用户参考：

```javascript
{
    pid: '5b1f7a60-3195-4b95-1916-6e87558145f2',
    name: '区域地形',
    catalog: '经典场景',
    dataType: 'terrain',
    default: false,
    properties: {
        scheme: 'CesiumTerrainProvider',
        url: 'https://127.0.0.1:3560/yuncs/dem'
    },
}
```





- ``cesium3DTileSetList`` 倾斜模型的资源项配置参考实例：

properties 内的 **必填** 参数：

| 属性名 |  类型  |               描述               |
| :----: | :----: | :------------------------------: |
|  url   | string |        3DTileSet 服务地址        |
| offset | Offset | 可以设置模型相对于原位置的偏移量 |

```typescript
interface Offset {
    lon: number,
    lat: number,
    height: number
}
```



下边是一个配置实例供用户参考：


```javascript
{
    name: '大雁塔',
    catalog: '三维模型',
    dataType: '3DTiles',
    properties: {
        url: 'https://127.0.0.1:3560/3DTIles/tileset.json',
        maximumScreenSpaceError: 2,
        offset: {
            height: 180
        }
    }
},
```



### 2.1.3 其他在线资源配置

``VGEEarth.ConfigTool`` 对象还有以下的方法：

```javascript
/** 为 false 时，只将资源项显示在资源树中；为 true 时，直接加载上球，并显示在资源树中 **/

VGEEarth.ConfigTool.addOSMOnLine(false);
VGEEarth.ConfigTool.addMapBoxOnAliYun(false);
VGEEarth.ConfigTool.addBingMapOnIon(false);
VGEEarth.ConfigTool.addTerrainOnIon(false);
VGEEarth.ConfigTool.addTerrainOnAliYun(false);
```



## 2.2 UIConfig文件说明

​	工具箱中的工具UI

|   属性名   |       类型        | 默认值 |                             描述                             |
| :--------: | :---------------: | :----: | :----------------------------------------------------------: |
| demoModel  |      boolean      |   无   | 当时组件的状态，是用于 Demo 演示，还是用在正真的生产环境下。 |
| themeColor | 'green'\|'yellow' |   无   |                         应用主题颜色                         |
| comActions |       Array       |   无   | UI组件，分为三类，即UI 挂件、工具箱内模块、工具类挂件，见下  |

- UI 挂件

| 属性名  |    类型     | 默认值 |               描述               |
| :-----: | :---------: | :----: | :------------------------------: |
|  name   |   string    |   无   |               名字               |
|  type   | 'UIPendant' |   无   |            UI所属类型            |
|  open   |   boolean   |   无   |          是否显示该组件          |
| comName |   string    |   无   | 组件名称，该名称关联组件显隐控制 |

- 工具箱内模块

| 属性名  |     类型      | 默认值 |                            描述                            |
| :-----: | :-----------: | :----: |:--------------------------------------------------------:|
|  name   |    string     |   无   |                        在工具箱中显示的名字                        |
|  type   | 'ToolBoxItem' |   无   |                          UI所属类型                          |
|  open   |    boolean    |   无   |                          是否显示该组件                         |
| comName |    string     |   无   |                     组件名称，该名称关联组件显隐控制                     |
| config  |    object     |   无   | 配置工具控制按钮的显隐和icon，如 inToolBox: true, iconClass: 'dingwei' |

- 工具类挂件

| 属性名  |   类型    | 默认值 |               描述               |
| :-----: | :-------: | :----: | :------------------------------: |
|  name   |  string   |   无   |               名字               |
|  type   | 'Pendant' |   无   |            UI所属类型            |
|  open   |  boolean  |   无   |          是否显示该组件          |
| comName |  string   |   无   | 组件名称，该名称关联组件显隐控制 |

## 2.3 VUEX状态管理配置

​	该方法控制组件的显隐状态，基础平台是根据vuex控制组件的，所以需要把改变状态时需要执行setVGEEarthComAction函数，对相应的组件显隐属性进行修改。

- mutations   **setVGEEarthComAction({comActions}, {name, on_off})**

|    参数    |  类型  |           描述            |
| :--------: | :----: | :-----------------------: |
| comActions | array  |      所有组件的集合       |
|    name    | string |   需要改变状态的组件名    |
|   on_off   | number | 1：显示，2：隐藏，3：切换 |

```javascript
this.$store.commit('setVGEEarthComAction', { name: 'areaNavigation', on_off: 2 });
```

​	该行代码修改了组件 areaNavigation 的状态为隐藏

- getters   **comStatus: (state) => (comName)**

|  参数   |  类型  |          描述          |
| :-----: | :----: | :--------------------: |
| comName | string | 需要获取显隐状态的组件 |

```javascript
this.$store.getters.comStatus("areaNavigation")
```

​	该行代码获取了组件 areaNavigation 的显隐状态






# 3 基础平台工具箱新添加工具

例如想创建一个名为 floodSimulation Vue 的组件，并且在工具箱中该工具的名字为 “洪水模拟”

## 3.1 在工具箱中创建工具UI

在 UICongif 文件的对应位置添加下示代码

```javascript
{name: '洪水模拟', type: 'ToolBoxItem', open: false, comName: 'floodSimulation', config: {inToolBox: true, iconClass: 'fenxi'}},
```

## 3.2 创建工具组件文件

<img src="https://vge-webgl.oss-cn-beijing.aliyuncs.com/SDK-API/img/%E5%B7%A5%E5%85%B7%E7%AE%B1%E7%BB%84%E4%BB%B6.png" alt="image-20230828164426919" style="zoom: 50%;" />



文件一般有两个，像图上这一对组件，content中是组建的内容，另外一个文件是控制组件显隐的组件。

- fs-content.vue 组件

​	该组件需要引入两个样式模板组件，来控制工具窗口的样式一致，即 TabPane、DarkGreenTabs，引入组件时，@是src 路径的简略写法。模板上的内容组织方式基本不需要改。

```vue
<template>
    <dark-green-tabs style="left: 400px; width: 280px" @close="close">
        <tabPane label="洪水模拟">
            <div>这里写工具的内容</div>
        </tabPane>
    </dark-green-tabs>
</template>
<script>
import TabPane from '@/VGEUtils/views/window/src/tab-pane.vue';
import DarkGreenTabs from "../../../../views/window/darkGreenTabs.vue";
export default {
    name: "fs-content",
    components: {
        DarkGreenTabs,
        TabPane
    },
    methods: {
        close() {
            this.$store.commit('setVGEEarthComAction', { name: 'floodSimulation', on_off: 2 });
        },
    },
}
</script>
  
<style scoped></style>
```

- floodSimulation.vue 组件

​	该组件将fs-content组件引入并挂载，transition 是控制窗口显示隐藏的过渡效果

```vue
<template>
    <transition name="fade">
        <fsContent v-if="show"></fsContent>
    </transition>
</template>
<script>
import fsContent from './fs-content.vue';
export default {
    name: "floodSimulation",
    components: { fsContent },
    computed: {
        show() {
            return this.$store.getters.comStatus("floodSimulation")
        }
    }
}
</script>
<style scoped></style>
```

## 3.3 注册并挂载组件

​	在工具箱的 **index.vue** 文件中，将 floodSimulation 引入并挂载。

```vue
<template>
  <div>
    ...省略其他组件...
    <floodSimulation></floodSimulation>
  </div>
</template>
<script>
...省略其他组件...
import floodSimulation from "./lib/floodSimulation/floodSimulation.vue";
export default {
  components: {
      ...省略其他组件...
      floodSimulation
  }
}
</script>

<style scoped>

</style>

```

​	至此新功能添加完毕，需要在对应的content组件中写具体的工具实现的功能（上边例子中的是 fs-content.vue 文件）。



# 4 基础平台视窗设计

## 4.1 视窗大屏

基础平台的视窗如下。

<img src="https://vge-webgl.oss-cn-beijing.aliyuncs.com/SDK-API/img/%E8%A7%86%E7%AA%97.png" alt="image-20230828164426919" style="zoom: 50%;" />



平台的视窗挂载了工具、数据、可视化、标题、标题工具等多个组件，同时允许用户自定义设计。

<img src="https://vge-webgl.oss-cn-beijing.aliyuncs.com/SDK-API/img/%E8%A7%86%E7%AA%97%E6%8C%82%E8%BD%BD.png" alt="image-20230828164426919" style="zoom: 50%;" />



## 4.2 视窗主题UI

​	用户可以自定义视窗主题UI，要想修改视窗的主题UI，需要找到视窗的css文件修改后引入。

<img src="https://vge-webgl.oss-cn-beijing.aliyuncs.com/SDK-API/img/%E8%A7%86%E7%AA%97%E4%B8%BB%E9%A2%98ui.png" alt="image-20230828164426919" style="zoom: 50%;" />

## 4.3 titleHeader组件

​	该组件控制工程项目头中的左右两侧的工具按钮。

<img src="https://vge-webgl.oss-cn-beijing.aliyuncs.com/SDK-API/img/%E6%A0%87%E9%A2%98%E4%B8%A4%E4%BE%A7.png" alt="image-20230828164426919" style="zoom: 50%;" />

## 4.4 functionBar组件

​	该组件控制工程项目左侧的工具，底图，可视化按钮。

<img src="https://vge-webgl.oss-cn-beijing.aliyuncs.com/SDK-API/img/%E8%A7%86%E7%AA%97%E5%B7%A6%E4%BE%A7%E5%B7%A5%E5%85%B7.png" alt="image-20230828164426919" style="zoom: 50%;" />
