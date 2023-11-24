<template>
  <specialEffect></specialEffect>
  <EarthworkVolume></EarthworkVolume>
  <GeologicalSection></GeologicalSection>
  <skyBoxTool></skyBoxTool>
  <MeasureTool></MeasureTool>
  <pathPlanning></pathPlanning>
  <plotTool></plotTool>
  <pathRoaming></pathRoaming>
  <Weather></Weather>
  <ImageLayerSplitMana></ImageLayerSplitMana>
  <ImageLayerTimeLine></ImageLayerTimeLine>
  <visualMarker></visualMarker>
  <spatialAnalyze></spatialAnalyze>
  <areaNavigation></areaNavigation>
  <viewShedStage></viewShedStage>
  <limitHeight></limitHeight>
  <terrainExcavate></terrainExcavate>
  <featureEffect></featureEffect>
  <VideoShed></VideoShed>
  <coordinates></coordinates>
  <pluginManagement></pluginManagement>
  <dataSetting></dataSetting>
  <linkView></linkView>
  <waterSpecial></waterSpecial>
  <particleSystem></particleSystem>
  <firePlot></firePlot>
  <fountainPlot></fountainPlot>
  <smokePlot></smokePlot>
  <flood></flood>
  <resourceTree></resourceTree>
  <uvaTool></uvaTool>
  <legends></legends>
  <aspectAnalyze></aspectAnalyze>
  <terrainRendering></terrainRendering>
  <hydrologyAnalyze></hydrologyAnalyze>
  <sunlightAnalyze></sunlightAnalyze>
  <slopeAnalyze></slopeAnalyze>
  <vr3-d></vr3-d>
  <windEffect></windEffect>
  <viewAnalyze></viewAnalyze>
  <hill-shade></hill-shade>
</template>

<script>
import specialEffect from './specialEffect/specialEffect.vue';
import skyBoxTool from './skyBoxTool/skyBoxTool.vue';
import MeasureTool from './measureTool/measureTool.vue';
import pathPlanning from './pathPlanning/pathPlanning.vue';
import plotTool from './plotTool/plotTool.vue';
import pathRoaming from './pathRoaming/pathRoaming.vue';
import Weather from './weather/weather.vue';
import ImageLayerSplitMana from './ImageLayerSplitMana/ImageLayerSplitMana.vue';
import ImageLayerTimeLine from './ImageLayerTimeLine/ImageLayerTimeLine.vue';
import visualMarker from './visualMarker/visualMarker.vue';
import spatialAnalyze from './spatialAnalyze/spatialAnalyze.vue';
import areaNavigation from './areaNavigation/areaNavigation.vue';
import viewShedStage from './spatialAnalyze/viewShedStage/viewShedStage.vue';
import VideoShed from './videoShed/videoShed.vue';
import featureEffect from './featureEffect/featureEffect.vue';
import terrainExcavate from './spatialAnalyze/terrainExcavate/terrainExcavate.vue';
import Coordinates from './coordinates/coordinates.vue';
import pluginManagement from './pluginManagement/pluginManagement.vue';
import dataSetting from './dataSetting/dataSetting.vue';
import linkView from './linkView/linkView.vue';
import waterSpecial from './waterSpecial/waterSpecial.vue';
import particleSystem from './particleSystem/particleSystem.vue';
import firePlot from './particleSystem/firePlot/firePlot.vue';
import fountainPlot from './particleSystem/fountainPlot/fountainPlot.vue';
import smokePlot from './particleSystem/smokePlot/smokePlot.vue';
import limitHeight from './spatialAnalyze/limitHeight/limitHeight.vue';
import terrainRendering from './spatialAnalyze/terrainRendering/terrainRendering.vue';
import aspectAnalyze from './spatialAnalyze/aspectAnalyze/aspectAnalyze.vue';
import slopeAnalyze from './spatialAnalyze/slopeAnalyze/slopeAnalyze.vue';
import hydrologyAnalyze from './spatialAnalyze/hydrologyAnalyze/hydrologyAnalyze.vue';
import sunlightAnalyze from './spatialAnalyze/sunlightAnalyze/sunlightAnalyze.vue';
import flood from './flood/flood.vue';
import resourceTree from './resourceTree/resourceTree.vue';
import uvaTool from './uvaTool/uvaTool.vue';
import Legends from '../viewer/legends/legends.vue';
import Vr3D from './vr3D/vr3D.vue';
import EarthworkVolume from './earthworkVolume/earthworkVolume.vue';
import GeologicalSection from './geologicalSection/geologicalSection.vue';
import windEffect from './spatialAnalyze/windEffect/windEffect.vue';
import viewAnalyze from './spatialAnalyze/viewAnalyze/viewAnalyze.vue';
import hillShade from './spatialAnalyze/hillShade/hillShade.vue';

export default {
  components: {
    GeologicalSection,
    EarthworkVolume,
    Vr3D,
    Legends,
    specialEffect,
    resourceTree,
    uvaTool,
    skyBoxTool,
    flood,
    limitHeight,
    terrainExcavate,
    featureEffect,
    viewShedStage,
    spatialAnalyze,
    visualMarker,
    MeasureTool,
    pathPlanning,
    plotTool,
    pathRoaming,
    Weather,
    ImageLayerSplitMana,
    ImageLayerTimeLine,
    areaNavigation,
    VideoShed,
    Coordinates,
    pluginManagement,
    dataSetting,
    linkView,
    waterSpecial,
    particleSystem,
    firePlot,
    fountainPlot,
    smokePlot,
    terrainRendering,
    aspectAnalyze,
    slopeAnalyze,
    hydrologyAnalyze,
    sunlightAnalyze,
    windEffect,
    viewAnalyze,
    hillShade
  }
};
</script>

