const clientWebSocketTool = {
    ws: null,               // 只允许一个客户端连接
    listenMap: new Map()
};

clientWebSocketTool.connect = function () {
    let that = this;
    that.ws = new ReconnectingWebSocket(`ws://${window.QISWSUrl}`);

    that.ws.onopen = function (e) {
        console.log('服务器连接成功');
        let message = {role: '客户端', token: '64bfc9fcd702c537841292a41b2789f2', instruct: '连接申请', data: {}};
        // that.ws.send(JSON.stringify(message));
    };

    that.ws.onclose = (e) => console.log('服务器连接断开', e);
    that.ws.onerror = (e) => console.log('连接出错', e);

    that.ws.onmessage = (e) => {
        console.log('服务器推送消息：', e.data);
        let json = JSON.parse(e.data);
        let l = false;
        for (const [key, func] of that.listenMap) {
            if (typeof func === 'function') {
                l = true;
                func({key, data: json});
            }
        }
        l === false && console.log('服务器推送消息：', json);
    };
};


// 添加监听，监听后台传给客户端的数据
clientWebSocketTool.addListen = function (mark, func) {
    clientWebSocketTool.listenMap.set(mark, func);
};

// 发生消息
clientWebSocketTool.send = async function (json) {
    clientWebSocketTool.ws.send(JSON.stringify(json));
};

clientWebSocketTool.close = function () {
    clientWebSocketTool.ws.close();
};


export default clientWebSocketTool;


