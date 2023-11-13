const VGEEarthStore = {
    state: {
        // 当时组件的状态，是用于 Demo 演示，还是用在真正的生产环境下。
        demoModel: true,
        themeColor: 'green',
        // 当前所显示的图例
        legendCurrent: {
            title: '',
            img: '',
            list: []
        },
        // 全部的图例数据
        legendCollection: [],
        comActions: []
    },
    getters: {
        // 获取组件开关状态
        comStatus: (state) => (comName) => {
            let com = state.comActions.find(item => item.comName === comName);
            return !!(com && com.open);
        }
    },
    mutations: {
        loadUIConfig(state, UIConfig) {
            state.demoModel = UIConfig.demoModel;
            state.comActions = UIConfig.comActions;
            state.themeColor = UIConfig.themeColor;
        },
        setThemeColor(state, color) {
            state.themeColor = color;
        },

        setLegendCurrent: (state, legend) => {
            state.legendCurrent = {
                title: legend?.title,
                img: legend?.img,
                list: legend?.list
            };
            // state.legendCurrent = {
            //   title: '水资源评价',
            //   list: [
            //     { text: `超载`, color: 'rgba(251,0,10,0.7)' },
            //     { text: `临界超载`, color: 'rgba(251,201,0,0.7)' },
            //     { text: `不超载`, color: 'rgba(0,251,24,0.7)' }
            //   ],
            //   img: ''
            // };
        },
        resetLegend(state) {
            state.legendCurrent = {
                title: '',
                list: [],
                img: ''
            };
        },

        /**
         * 改变模块组件的开关
         * @param state   状态
         * @param name    组件名称
         * @param on_off  1：显示，2：隐藏，3：切换
         */
        setVGEEarthComAction({comActions}, {name, on_off}) {
            let effective = false;
            if (typeof name === 'string' && typeof on_off === 'number') {
                for (let i = 0; i < comActions.length; i++) {
                    if (comActions[i].comName === name) {
                        comActions[i].open = on_off === 1 ? true : (on_off === 2 ? false : !comActions[i].open);
                        effective = true;
                        break;
                    }
                }
            }
            comActions = JSON.parse(JSON.stringify(comActions));
            effective === false && console.log('无法识别的组件：', name);
        },
        /**
         * 设置工具箱模块是否显示在左侧工具箱中
         * @param comActions
         * @param comName
         * @param show
         */
        setItemInTool({comActions}, {comName, show}) {
            for (let i = 0; i < comActions.length; i++) {
                if (comActions[i].comName === comName) {
                    comActions[i].show = show;
                    saveComStatus(comActions);
                    break;
                }
            }
        },
    }
};

function saveComStatus(state) {
    let cloneComActions = JSON.parse(JSON.stringify(state));
    cloneComActions.map(e => {
        e.open = false;
        return e;
    });
    localStorage.setItem('VGEConfig', JSON.stringify({
        Version: VGEEarth.ConfigTool.config.Version,
        comActions: cloneComActions
    }));
}

export default VGEEarthStore;
