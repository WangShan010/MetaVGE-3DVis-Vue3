let currentPath = document.currentScript.src.replace('index.js', '');

const awaitWrap = (promise) => {
    return promise
        .then(data => [null, data])
        .catch(err => [err, null]);
};


const turfAsync = {
    isInit: false,
    async init() {
        if (this.isInit === true) {
            return;
        }

        await import(currentPath + `lib/comlink.min.js`);
        await import(currentPath + 'lib/turf.min.js');
        const worker = new Worker(currentPath + 'lib/worker.js');
        const turf = Comlink.wrap(worker);

        let funcList = await turf.getFuncList();
        for (let i = 0; i < funcList.length; i++) {
            let funcName = funcList[i];
            this[funcName] = (...arg) => {

                return new Promise(async (resolve) => {
                    let [err, data] = await awaitWrap(turf[funcName](...arg));
                    if (err) {
                        console.log(`turf.${funcName}() 运算错误，请查阅 Turf 的官方文档`, err);
                        resolve(null);
                    } else {
                        resolve(data);
                    }
                });

            };
        }
        console.log('%c多线程库：turfAsync 初始化成功；依赖 turf 版本：V6.5.0', 'color: green;');
        this.isInit = true;
    }
};

turfAsync.init().then();
window.turfAsync = turfAsync;