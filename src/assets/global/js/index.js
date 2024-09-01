// 禁止页面默认右键菜单
document.oncontextmenu = function () {
    return false;
};

// 禁止页面选择文字
document.onselectstart = function () {
    return false;
};
