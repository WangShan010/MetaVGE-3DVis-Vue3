export default class VideoShed {
    init() {
        this.initVideoFuse();
    }

    initVideoFuse() {
        let videoEl = document.getElementById('testVideo'); //播放成功的video标签
        this.videoShed = new VGEEarth.VideoPlugin.VideoShed({
            video: videoEl,
            position: {
                x: 121.53806,
                y: 29.87179,
                z: 48.5
            },
            //旋转参数
            rotation: {
                x: -17,
                y: -69,
                z: 0
            },
            near: 0,
            far: 240, //距离
            fov: 12, //张角
            aspectRatio: 1,
            alpha: 1, //透明
            debugFrustum: true //是否显示投影线
        });
    }

    getStyle() {
        return this.videoShed.getStyle();
    }

    upData(option) {
        this.videoShed.updateStyle(option);
    }

    openViedo(value) {
        if (value === true) {
            this.videoShed.activeVideo();
        } else {
            this.videoShed.deActiveVide();
        }
    }

    destroy() {
        this.videoShed && this.videoShed.destroy();
    }

    openLine(option) {
        this.videoShed.setFrustumVisible(option);
    }
}
