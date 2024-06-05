/****************************************************************************
 名称：用于展示mapv热力图
 描述：MapV实例 详情请查看 https://mapv.baidu.com/examples/#baidu-map-point-heatmap.html

 最后修改日期：2022-04-18
 ****************************************************************************/

/**
 * 创建mapvLayer图层
 * @returns {*[]} 所创建的所有的mapvLayer图层
 */
function createHeatmap() {
    let randomCount = 1000;
    let data = [];
    let citys = ['北京', '天津', '上海', '重庆', '石家庄', '太原', '呼和浩特', '哈尔滨', '长春', '沈阳', '济南', '南京', '合肥', '杭州', '南昌', '福州', '郑州', '武汉', '长沙', '广州', '南宁', '西安', '银川', '兰州', '西宁', '乌鲁木齐', '成都', '贵阳', '昆明', '拉萨', '海口'];

    // 构造数据
    while (randomCount--) {
        let cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
        data.push({
            geometry: {
                type: 'Point',
                coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
            },
            count: 30 * Math.random()
        });
    }

    let dataSet = new mapv.DataSet(data);

    let options = {
        size: 13,
        gradient: { 0.25: 'rgb(0,0,255)', 0.55: 'rgb(0,255,0)', 0.85: 'yellow', 1.0: 'rgb(255,0,0)' },
        max: 100,
        // range: [0, 100], // 过滤显示数据范围
        // minOpacity: 0.5, // 热力图透明度
        // maxOpacity: 1,
        draw: 'heatmap'
    };

    let mapvLayer = new VGEEarth.MapVLayer(VGEEarth.getMainViewer(), dataSet, options);
    return [mapvLayer];
}

export default createHeatmap;
