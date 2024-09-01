<template>
    <specialEffect></specialEffect>
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
    <areaNavigation></areaNavigation>
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
    <resourceTree></resourceTree>
    <legends></legends>
    <vr3-d></vr3-d>
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
import areaNavigation from './areaNavigation/areaNavigation.vue';
import VideoShed from './videoShed/videoShed.vue';
import featureEffect from './featureEffect/featureEffect.vue';
import Coordinates from './coordinates/coordinates.vue';
import pluginManagement from './pluginManagement/pluginManagement.vue';
import dataSetting from './dataSetting/dataSetting.vue';
import linkView from './linkView/linkView.vue';
import waterSpecial from './waterSpecial/waterSpecial.vue';
import particleSystem from './particleSystem/particleSystem.vue';
import firePlot from './particleSystem/firePlot/firePlot.vue';
import fountainPlot from './particleSystem/fountainPlot/fountainPlot.vue';
import smokePlot from './particleSystem/smokePlot/smokePlot.vue';
import resourceTree from './resourceTree/resourceTree.vue';
import Legends from '../viewer/legends/legends.vue';
import Vr3D from './vr3D/vr3D.vue';
import GeologicalSection from './geologicalSection/geologicalSection.vue';

export default {
    components: {
        GeologicalSection,
        Vr3D,
        Legends,
        specialEffect,
        resourceTree,
        skyBoxTool,
        featureEffect,
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
        smokePlot
    }
};
</script>

