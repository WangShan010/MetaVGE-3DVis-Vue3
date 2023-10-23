function getDemoList() {
    return fetch(demoServer + '/VGEEarth-SDK/Demo/htmlList.json').then(res => res.json());
}
function getHtmlContent(url) {
    return fetch(url).then(res => res.text());
}

function buildHtml(htmlText) {
    document.getElementById('htmlView').src = htmlText;
}


export {
    getDemoList,
    getHtmlContent,
    buildHtml,
};
