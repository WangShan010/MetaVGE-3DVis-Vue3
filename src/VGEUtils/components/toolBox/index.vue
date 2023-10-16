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
import specialEffect from './lib/specialEffect/specialEffect.vue';
import skyBoxTool from './lib/skyBoxTool/skyBoxTool.vue';
import MeasureTool from './lib/measureTool/measureTool.vue';
import pathPlanning from './lib/pathPlanning/pathPlanning.vue';
import plotTool from './lib/plotTool/plotTool.vue';
import pathRoaming from './lib/pathRoaming/pathRoaming.vue';
import Weather from './lib/weather/weather.vue';
import ImageLayerSplitMana from './lib/ImageLayerSplitMana/ImageLayerSplitMana.vue';
import ImageLayerTimeLine from './lib/ImageLayerTimeLine/ImageLayerTimeLine.vue';
import visualMarker from './lib/visualMarker/visualMarker.vue';
import spatialAnalyze from './lib/spatialAnalyze/spatialAnalyze.vue';
import areaNavigation from './lib/areaNavigation/areaNavigation.vue';
import viewShedStage from './lib/spatialAnalyze/viewShedStage/viewShedStage.vue';
import VideoShed from './lib/videoShed/videoShed.vue';
import featureEffect from './lib/featureEffect/featureEffect.vue';
import terrainExcavate from './lib/spatialAnalyze/terrainExcavate/terrainExcavate.vue';
import Coordinates from './lib/coordinates/coordinates.vue';
import pluginManagement from './lib/pluginManagement/pluginManagement.vue';
import dataSetting from './lib/dataSetting/dataSetting.vue';
import linkView from './lib/linkView/linkView.vue';
import waterSpecial from './lib/waterSpecial/waterSpecial.vue';
import particleSystem from './lib/particleSystem/particleSystem.vue';
import firePlot from './lib/particleSystem/firePlot/firePlot.vue';
import fountainPlot from './lib/particleSystem/fountainPlot/fountainPlot.vue';
import smokePlot from './lib/particleSystem/smokePlot/smokePlot.vue';
import limitHeight from './lib/spatialAnalyze/limitHeight/limitHeight.vue';
import terrainRendering from './lib/spatialAnalyze/terrainRendering/terrainRendering.vue';
import aspectAnalyze from './lib/spatialAnalyze/aspectAnalyze/aspectAnalyze.vue';
import slopeAnalyze from './lib/spatialAnalyze/slopeAnalyze/slopeAnalyze.vue';
import hydrologyAnalyze from './lib/spatialAnalyze/hydrologyAnalyze/hydrologyAnalyze.vue';
import sunlightAnalyze from './lib/spatialAnalyze/sunlightAnalyze/sunlightAnalyze.vue';
import flood from './lib/flood/flood.vue';
import resourceTree from './lib/resourceTree/resourceTree.vue';
import Legends from '@/VGEUtils/components/viewer/legends/legends.vue';
import Vr3D from '@/VGEUtils/components/toolBox/lib/vr3D/vr3D.vue';
import EarthworkVolume from '@/VGEUtils/components/toolBox/lib/earthworkVolume/earthworkVolume.vue';
import GeologicalSection from '@/VGEUtils/components/toolBox/lib/geologicalSection/geologicalSection.vue';
import windEffect from "@/VGEUtils/components/toolBox/lib/spatialAnalyze/windEffect/windEffect.vue";
import viewAnalyze from "@/VGEUtils/components/toolBox/lib/spatialAnalyze/viewAnalyze/viewAnalyze.vue";
import hillShade from "@/VGEUtils/components/toolBox/lib/spatialAnalyze/hillShade/hillShade.vue";
export default {
    components: {
        GeologicalSection,
        EarthworkVolume,
        Vr3D,
        Legends,
        specialEffect,
        resourceTree,
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

