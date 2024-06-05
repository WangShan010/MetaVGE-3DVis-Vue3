// JavaScript Document
function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj, false)[name];
    }
}


//startMove(oDiv, {width: 400, height: 400}
function startMove(obj, json, fnEnd) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        let bStop = true;        //假设：所有值都已经到了

        for (let attr in json) {
            let cur = 0;
            if (attr === 'opacity') {
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                cur = parseInt(getStyle(obj, attr));
            }
            let speed = (json[attr] - cur) / 5;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (cur !== json[attr])
                bStop = false;
            if (attr === 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                obj.style.opacity = (cur + speed) / 100;
            } else {
                obj.style[attr] = cur + speed + 'px';
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            if (fnEnd) fnEnd();
        }
    }, 30);
}

export default startMove;