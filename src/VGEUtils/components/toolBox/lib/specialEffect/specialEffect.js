/****************************************************************************
 名称：工具-场景特效模块类
 描述：写管理天气的函数
 最后修改日期：2022-04-12
 ****************************************************************************/


export default class SpecialEffect {
    setView() {
        let flyToOpts = {
            // destination:  Cesium.Cartesian3.fromDegrees(121.53806,29.87179,220),
            destination: {
                x: -2896888.0568035087, y: 4720239.53582123, z: 3159699.620720131
            },
            orientation: {
                heading: 6.283185307179586,
                pitch: -1.569999385845113,
                roll: 0
            },
            duration: 1
        };
        earth.viewer3D.scene.camera.setView(flyToOpts);
    }

    openEffect(className) {
        switch (className) {
            case 'depthTestAgainstTerrain': {
                earth.viewer3D.scene.globe.depthTestAgainstTerrain = true;
            }
                break;
            case 'FramesPerSecond': {
                earth.openDeBug();
            }
                break;
            case 'FrustumPlanes': {
                earth.viewer3D.scene.debugShowFrustumPlanes = true;
            }
                break;
            case 'dbtm': {
                this.dbtmOpen();
            }
                break;
            case 'dxsjw': {
                this.dxsjwOpen();
            }
                break;
            case 'light': {
                this.lightOpen();
            }
                break;
            case 'shade': {
                this.shadeOpen();
            }
                break;
            case 'blackWhite': {
                this.blackWhiteOpen();
            }
                break;
            case 'nightVision': {
                this.nightVisionOpen();
            }
                break;
            case 'brightness': {
                this.brightnessOpen();
            }
                break;
            case 'forceLight': {
                this.forceLightOpen();
            }
                break;
            case 'lenFlare': {
                this.lenFlareOpen();
            }
                break;
            case 'ambientOcclusion': {
                this.ambientOcclusionOpen();
            }
                break;
            case 'outline': {
                this.outlineOpen();
            }
                break;
            case 'depthField': {
                this.depthFieldOpen();
            }
                break;
            case 'sun': {
                this.sunOpen();
            }
                break;
            case 'moon': {
                this.moonOpen();
            }
                break;
            case 'groundAir': {
                this.groundAirOpen();
            }
                break;
            case 'star': {
                this.starOpen();
            }
                break;
            case 'snow': {
                this.snowOpen();
            }
                break;
            case 'rain': {
                this.rainOpen();
            }
                break;
            case 'fog': {
                this.fogOpen();
            }
                break;
        }
    }

    endEffect(className) {
        switch (className) {
            case 'shadows': {
                earth.viewer3D.scene.globe.depthTestAgainstTerrain = false;
            }
                break;
            case 'FramesPerSecond': {
                earth.closeDeBug();
            }
                break;
            case 'FrustumPlanes': {
                earth.viewer3D.scene.debugShowFrustumPlanes = false;
            }
                break;
            case 'dbtm' : {
                this.dbtmEnd();
            }
                break;
            case 'dxsjw': {
                this.dxsjwEnd();
            }
                break;
            case 'light': {
                this.lightEnd();
            }
                break;
            case 'shade': {
                this.shadeEnd();
            }
                break;
            case 'blackWhite': {
                this.blackWhiteEnd();
            }
                break;
            case 'nightVision': {
                this.nightVisionEnd();
            }
                break;
            case 'brightness': {
                this.brightnessEnd();
            }
                break;
            case 'forceLight': {
                this.forceLightEnd();
            }
                break;
            case 'lenFlare': {
                this.lenFlareEnd();
            }
                break;
            case 'ambientOcclusion': {
                this.ambientOcclusionEnd();
            }
                break;
            case 'outline': {
                this.outlineEnd();
            }
                break;
            case 'depthField': {
                this.depthFieldEnd();
            }
                break;
            case 'sun': {
                this.sunEnd();
            }
                break;
            case 'moon': {
                this.moonEnd();
            }
                break;
            case 'star': {
                this.starEnd();
            }
                break;
            case 'groundAir': {
                this.groundAirEnd();
            }
                break;
            case 'snow': {
                this.snowEnd();
            }
                break;
            case 'rain': {
                this.rainEnd();
            }
                break;
            case 'fog': {
                this.fogEnd();
            }
                break;
        }
    }

    //地形三角网
    dxsjwOpen() {
        if (!earth.viewer3D.cesiumInspector) {
            earth.viewer3D.extend(Cesium.viewerCesiumInspectorMixin);
            earth.viewer3D.cesiumInspector.container.style.display = 'none';
        }
        //
        earth.viewer3D.cesiumInspector.viewModel.wireframe = true;
    }

    dxsjwEnd() {
        earth.viewer3D.cesiumInspector.viewModel.wireframe = false;
    }

    //地表透明
    dbtmOpen() {
        earth.viewer3D.scene.screenSpaceCameraController.enableCollisionDetection = false;
        earth.viewer3D.scene.globe.translucency.enabled = true; //可用透明度
        earth.viewer3D.scene.globe.translucency.frontFaceAlpha = 0.8; //默认设置为0.8
    }

    dbtmEnd() {
        earth.viewer3D.scene.globe.translucency.frontFaceAlpha = 1;
        earth.viewer3D.scene.screenSpaceCameraController.enableCollisionDetection = true;
        earth.viewer3D.scene.globe.translucency.enabled = false; //可用透明度
    }

    //泛光
    lightOpen() {
        this.setView();
        let bloom = earth.viewer3D.scene.postProcessStages.bloom;
        bloom.enabled = true;
        bloom.uniforms.glowOnly = false;
        bloom.uniforms.contrast = 128;
        bloom.uniforms.brightness = -0.3;
        bloom.uniforms.delta = 1;
        bloom.uniforms.sigma = 2;
        bloom.uniforms.stepSize = 1;
    };

    lightEnd() {
        earth.viewer3D.scene.postProcessStages.bloom.enabled = false;
    };

    //黑白
    blackWhiteOpen() {
        let collection = earth.viewer3D.scene.postProcessStages;
        this.blackWhite = new Cesium.PostProcessStageLibrary.createBlackAndWhiteStage();
        let silhouette = collection.add(this.blackWhite);
        silhouette.enabled = true;
        silhouette.uniforms.gradations = 15.0; //调节黑白程度（1-20）
    };

    blackWhiteEnd() {
        let collection = earth.viewer3D.scene.postProcessStages;
        collection.remove(this.blackWhite);
        this.blackWhite = undefined;
    };

    //夜视
    nightVisionOpen() {
        let collection = earth.viewer3D.scene.postProcessStages;
        this.night = new Cesium.PostProcessStageLibrary.createNightVisionStage();
        let silhouette = collection.add(this.night);
        silhouette.enabled = true;
    }

    nightVisionEnd() {
        earth.viewer3D.scene.postProcessStages.remove(this.night);
        this.night = undefined;
    }

    //亮度
    brightnessOpen() {
        let collection = earth.viewer3D.scene.postProcessStages;
        this.bright = new Cesium.PostProcessStageLibrary.createBrightnessStage();
        let silhouette = collection.add(this.bright);
        silhouette.enabled = true;
        silhouette.uniforms.brightness = 2; //（调节亮度0-3最佳）
    }

    brightnessEnd() {
        earth.viewer3D.scene.postProcessStages.remove(this.bright);
        this.bright = undefined;
    }

    //镜头耀斑
    lenFlareOpen() {
        this.lenFlares = new Cesium.PostProcessStageLibrary.createLensFlareStage();
        let lensFlare = earth.viewer3D.scene.postProcessStages.add(this.lenFlares);
        lensFlare.enabled = true;
        lensFlare.uniforms.intensity = 5;
        lensFlare.uniforms.distortion = 5;
        lensFlare.uniforms.ghostDispersal = 5;
        lensFlare.uniforms.haloWidth = 5;
        lensFlare.uniforms.dirtAmount = 5;
        lensFlare.uniforms.earthRadius = 5;

        let camera = earth.viewer3D.scene.camera;
        camera.position = new Cesium.Cartesian3(40010447.97500168, 56238683.46406788, 20776576.752223067);
        camera.direction = new Cesium.Cartesian3(-0.5549701431494752, -0.7801872010801355, -0.2886452346452218);
        camera.up = new Cesium.Cartesian3(-0.3016252360948521, -0.13464820558887716, 0.9438707950150912);
        camera.right = Cesium.Cartesian3.cross(camera.direction, camera.up, new Cesium.Cartesian3());
        earth.viewer3D.clock.currentTime = new Cesium.JulianDate(2458047, 27399.860215000022);
    }

    lenFlareEnd() {
        earth.viewer3D.scene.postProcessStages.remove(this.lenFlares);
        this.lenFlares = undefined;
        earth.viewer3D.clock.currentTime = new Cesium.JulianDate();
    }

    //强制光照-开启和关闭光照
    forceLightOpen() {
        earth.viewer3D.scene.globe.enableLighting = true;
    }

    forceLightEnd() {
        earth.viewer3D.scene.globe.enableLighting = false;
    }

    //环境遮蔽
    ambientOcclusionOpen() {
        let ambientOcclusion = earth.viewer3D.scene.postProcessStages.ambientOcclusion;
        ambientOcclusion.enabled = true;
        ambientOcclusion.uniforms.ambientOcclusionOnly = false;
        ambientOcclusion.uniforms.intensity = 3;
        ambientOcclusion.uniforms.bias = 0.1;
        ambientOcclusion.uniforms.lengthCap = 0.03;
        ambientOcclusion.uniforms.stepSize = 1;
        ambientOcclusion.uniforms.blurStepSize = 0.86;
    }

    ambientOcclusionEnd() {
        earth.viewer3D.scene.postProcessStages.ambientOcclusion.enabled = false;
    }

    //轮廓
    outlineOpen() {
        let collection = earth.viewer3D.scene.postProcessStages;
        this.outLine = new Cesium.PostProcessStageLibrary.createSilhouetteStage();
        let silhouette = collection.add(this.outLine);
        silhouette.enabled = true;
        silhouette.uniforms.color = Cesium.Color.YELLOW;
    }

    outlineEnd() {
        earth.viewer3D.scene.postProcessStages.remove(this.outLine);
        this.outLine = undefined;
    }

    //景深
    depthFieldOpen() {
        let collection = earth.viewer3D.scene.postProcessStages;
        this.depth = new Cesium.PostProcessStageLibrary.createDepthOfFieldStage();
        let silhouette = collection.add(this.depth);
        silhouette.enabled = true;
        silhouette.uniforms.focalDistance = 1;  //（1000）
        silhouette.uniforms.delta = 1;   //（5）
        silhouette.uniforms.sigma = 1;   //（5）
        silhouette.uniforms.stepSize = 1;  //（10）
    }

    depthFieldEnd() {
        earth.viewer3D.scene.postProcessStages.remove(this.depth);
        this.depth = undefined;
    }

    //阴影，日照阴影
    shadeOpen() {
        earth.viewer3D.scene.shadowMap = new Cesium.ShadowMap({
            lightCamera: earth.viewer3D.camera, context: earth.viewer3D.scene.context
        });
        earth.viewer3D.scene.shadowMap.enabled = true;
    };

    shadeEnd() {
        earth.viewer3D.scene.shadowMap.enabled = false;
    };

    //太阳
    sunOpen() {
        earth.viewer3D.scene.sun.show = true;
    };

    sunEnd() {
        earth.viewer3D.scene.sun.show = false;
    }

    //月亮
    moonOpen() {
        earth.viewer3D.scene.moon.show = true;
    };

    moonEnd() {
        earth.viewer3D.scene.moon.show = false;
    }

    //星空
    starOpen() {
        earth.viewer3D.scene.skyBox.show = true;
    };

    starEnd() {
        earth.viewer3D.scene.skyBox.show = false;
    }

    //地面大气
    groundAirOpen() {
        earth.viewer3D.scene.skyAtmosphere.show = true;
    };

    groundAirEnd() {
        earth.viewer3D.scene.skyAtmosphere.show = false;
    }


    snowOpen() {
        this.setView();
        VGEEarth.WeatherEffect.addSnowEffect();
    };

    rainOpen() {
        this.setView();
        VGEEarth.WeatherEffect.addRainEffect();
    };

    fogOpen() {
        let flyToOpts = {
            // destination:  Cesium.Cartesian3.fromDegrees(121.53806,29.87179,220),
            destination: {
                x: -2894890.952233019, y: 4717882.878778957, z: 3159835.2187021286
            },
            orientation: {
                heading: 2.89286059751638,
                pitch: -0.12778466261122756,
                roll: 6.283184259531674
            },
            duration: 1
        };
        earth.viewer3D.scene.camera.setView(flyToOpts);
        VGEEarth.WeatherEffect.addFogEffect();
    };

    snowEnd() {
        VGEEarth.WeatherEffect.removeEffect();
    };

    rainEnd() {
        VGEEarth.WeatherEffect.removeEffect();
    };

    fogEnd() {
        VGEEarth.WeatherEffect.removeEffect();
    };
}

