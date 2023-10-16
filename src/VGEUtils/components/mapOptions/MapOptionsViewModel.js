
let defined = Cesium.defined;
let defaultValue = Cesium.defaultValue;
let ScreenSpaceEventHandler = Cesium.ScreenSpaceEventHandler;
let DeveloperError = Cesium.DeveloperError;
let destroyObject = Cesium.destroyObject;
let knockout = Cesium.knockout;

class MapOptionsViewModel {
    constructor(viewer) {
        if (!defined(viewer)) {
            throw new DeveloperError("viewer is required");
        }

        const that = this;
        const scene = earth.viewer3D.scene;
        const globe = scene.globe;
        const canvas = scene.canvas;
        const eventHandler = new ScreenSpaceEventHandler(canvas);

        this._viewer = viewer;
        this._eventHandler = eventHandler;
        this._removePostRenderEvent = scene.postRender.addEventListener(function () {
            that._update();
        });
        this._subscribes = [];

        Object.assign(this, {
            "viewerShadows": defaultValue(earth.viewer3D.shadows, false),
            "globeEnableLighting": defaultValue(globe.enableLighting, false),
            "globeShowGroundAtmosphere": defaultValue(globe.showGroundAtmosphere, true),
            "globeTranslucencyEnabled": defaultValue(globe.translucency.enabled, false),
            "globeShow": defaultValue(globe.show, true),
            "globeDepthTestAgainstTerrain": defaultValue(globe.depthTestAgainstTerrain, false),
            "globeWireFrame": defaultValue(globe._surface.tileProvider._debug.wireFrame, false),
            "sceneSkyAtmosphereShow": defaultValue(scene.skyAtmosphere.show, true),
            "sceneFogEnabled": defaultValue(scene.fog.enabled, true),
            "sceneRequestRenderMode": defaultValue(scene.requestRenderMode, false),
            "sceneLogarithmicDepthBuffer": defaultValue(scene.logarithmicDepthBuffer, false),
            "sceneDebugShowFramesPerSecond": defaultValue(scene.debugShowFramesPerSecond, false),
            "sceneDebugShowFrustumPlanes": defaultValue(scene.debugShowFrustumPlanes, false),
            "sceneEnableCollisionDetection": defaultValue(scene.enableCollisionDetection, false),
            "sceneBloomEnabled": defaultValue(scene.postProcessStages.bloom.enabled, false),
        })
        knockout.track(this);
        /*knockout.track(this, [
            "viewerShadows",
            "globeEnableLighting",
            "globeShowGroundAtmosphere",
            "globeTranslucencyEnabled",
            "globeShow",
            "globeDepthTestAgainstTerrain",
            "globeWireFrame",
            "sceneSkyAtmosphereShow",
            "sceneFogEnabled",
            "sceneRequestRenderMode",
            "sceneLogarithmicDepthBuffer",
            "sceneDebugShowFramesPerSecond",
            "sceneDebugShowFrustumPlanes",
            "sceneEnableCollisionDetection",
            "sceneBloomEnabled"
        ]);*/
        const props = [
            ["viewerShadows", viewer, "shadows"],
            ["globeEnableLighting", globe, "enableLighting"],
            ["globeShowGroundAtmosphere", globe, "showGroundAtmosphere"],
            ["globeTranslucencyEnabled", globe.translucency, "enabled"],
            ["globeShow", globe, "show"],
            ["globeDepthTestAgainstTerrain", globe, "depthTestAgainstTerrain"],
            ["globeWireFrame", globe._surface.tileProvider._debug, "wireframe"],
            ["sceneSkyAtmosphereShow", scene.skyAtmosphere, "show"],
            ["sceneFogEnabled", scene.fog, "enabled"],
            ["sceneRequestRenderMode", scene, "requestRenderMode"],
            ["sceneLogarithmicDepthBuffer", scene, "logarithmicDepthBuffer"],
            ["sceneDebugShowFramesPerSecond", scene, "debugShowFramesPerSecond"],
            ["sceneDebugShowFrustumPlanes", scene, "debugShowFrustumPlanes"],
            ["sceneEnableCollisionDetection", scene.screenSpaceCameraController, "enableCollisionDetection"],
            ["sceneBloomEnabled", scene.postProcessStages.bloom, "enabled"]
        ];
        props.forEach(value => this._subscribe(value[0], value[1], value[2]));

        // this._frustumsSubscription = knockout
        //     .getObservable(this, "sceneFrustums")
        //     .subscribe(function (val) {
        //         scene.debugShowFrustums = val;
        //         scene.requestRender();
        //     });
    }

    destroy() {
        this._eventHandler.destroy();
        this._viewer.scene.postRender.removeEventListener(this._removePostRenderEvent);
        // this._frustumsSubscription.dispose();
        for (let i = this._subscribes.length - 1; i >= 0; i--) {
            this._subscribes[i].dispose();
            this._subscribes.pop();
        }
        return destroyObject(this);
    }

    _update() {

    }

    _subscribe(name, obj, prop) {
        const that = this;
        const result = knockout
            .getObservable(that, name)
            .subscribe(() => {
                obj[prop] = that[name];
                that._viewer.scene.requestRender();
                if (name === "sceneEnableCollisionDetection") {
                    obj[prop] = !that[name];
                } else if (name === "globeTranslucencyEnabled") {
                    obj.frontFaceAlpha = 0.5;
                } else if (name === "sceneBloomEnabled") {
                    obj.uniforms.glowOnly = false;
                    obj.uniforms.contrast = 128;
                    obj.uniforms.brightness = -0.3;
                    obj.uniforms.delta = 1.0;
                    obj.uniforms.sigma = 3.78;
                    obj.uniforms.stepSize = 5.0;
                }
            });
        this._subscribes.push(result);
    }
}

export default MapOptionsViewModel;
