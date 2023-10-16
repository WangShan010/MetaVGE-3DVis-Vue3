function getDemoList() {
    return fetch(demoServer + 'htmlList.json').then(res => res.json());
}
function getHtmlContent(url) {
    return fetch(url).then(res => res.text());
}



export {
    getDemoList,
    getHtmlContent,
};