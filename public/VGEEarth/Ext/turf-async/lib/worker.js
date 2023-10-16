importScripts('./comlink.min.js');
importScripts('./turf.min.js');

let funcList = [];
for (const turfKey in turf) {
    funcList.push(turfKey);
}
// console.log(funcList);

const turfAsync = {...turf};
turfAsync.getFuncList = function () {
    return funcList;
};


Comlink.expose(turfAsync);