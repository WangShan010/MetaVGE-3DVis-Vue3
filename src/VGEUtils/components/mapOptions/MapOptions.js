let defined = Cesium.defined;
let DeveloperError = Cesium.DeveloperError;
let destroyObject = Cesium.destroyObject;
let knockout = Cesium.knockout;

import MapOptionsViewModel from './MapOptionsViewModel.js';

class MapOptions {
    get viewModel() {
        return this._viewModel;
    }

    constructor(viewer, options = {}) {
        this._element = undefined;
        this._viewModel = undefined;
        this._onDestroyListeners = [];

        if (!defined(viewer)) {
            throw new DeveloperError('viewer is required.');
        }


        const element = document.getElementById('mapOptions');

        const viewModel = new MapOptionsViewModel(viewer);

        this._viewModel = viewModel;
        this._element = element;

        // 绑定viewModel和element
        knockout.applyBindings(viewModel, element);
    }

    /**
     * @returns {Boolean} true if the object has been destroyed, false otherwise.
     */
    isDestroyed() {
        return false;
    }

    /**
     * Destroys the widget. Should be called if permanently.
     * removing the widget from layout.
     */
    destroy() {
        if (defined(this._element)) {
            knockout.cleanNode(this._element);
        }
        delete this._element;

        defined(this._viewModel) && this._viewModel.destroy();
        delete this._viewModel;

        for (let i = 0; i < this._onDestroyListeners.length; i++) {
            this._onDestroyListeners[i]();
        }

        return destroyObject(this);
    }

    addOnDestroyListener(callback) {
        if (typeof callback === 'function') {
            this._onDestroyListeners.push(callback);
        }
    }
}

export default MapOptions;
