/****************************************************************************
 名称：用于展示echarts迁徙图样式2
 最后修改日期：2022-04-18
 ****************************************************************************/

function createMigrate2() {
    let options = getEchartsOption();
    let echartsLayer = new VGEEarth.EchartsLayer(VGEEarth.getMainViewer(), options);
    return echartsLayer;
}

function getEchartsOption() {
    let items = [
        {
            level: 1,
            name: '北京',
            label: 'beijing',
            value: [116.4551, 40.2539],
            symbol: '',
            symbolSize: [18, 18]
        },
        {
            level: 1,
            symbol: '',
            name: '廊坊',
            label: 'langfang',
            category: 0,
            active: true,
            speed: 6,
            value: [116.521, 39.0509],
            belong: '北京'
        },
        {
            level: 1,
            symbol: '',
            name: '乌鲁木齐',
            category: 0,
            active: true,
            speed: 6,
            value: [87.9236, 43.5883],
            belong: '北京'
        },
        {
            level: 1,
            symbol: '',
            name: '兰州',
            category: 0,
            active: true,
            speed: 6,
            value: [103.5901, 36.3043],
            belong: '北京'
        },
        {
            level: 1,
            symbol: '',
            name: '杭州',
            category: 0,
            active: true,
            speed: 6,
            value: [119.5313, 29.8773],
            belong: '北京'
        },
        {
            level: 1,
            symbol: '',
            name: '四川',
            category: 0,
            active: true,
            speed: 6,
            value: [103.9526, 30.7617],
            belong: '北京'
        },
        {
            level: 2,
            symbol: '',
            name: '重庆',
            category: 0,
            active: true,
            speed: 6,
            value: [107.7539, 30.1904],
            belong: '四川'
        },
        {
            level: 1,
            symbol: '',
            name: '厦门',
            category: 0,
            active: true,
            speed: 6,
            value: [118.1689, 24.6478],
            belong: '北京'
        },
        {
            level: 1,
            symbol: '',
            name: '包头',
            category: 0,
            active: true,
            speed: 6,
            value: [110.3467, 41.4899],
            belong: '北京'
        },
        {
            level: 1,
            symbol: '',
            name: '温州',
            category: 0,
            active: true,
            speed: 6,
            value: [120.498, 27.8119],
            belong: '杭州'
        },
        {
            level: 2,
            symbol: '',
            name: '舟山',
            category: 0,
            active: true,
            speed: 6,
            value: [122.2559, 30.2234],
            belong: '杭州'
        }
    ];
    let lineColor = ['#fff', '#f6fb05', '#00fcff'];
    let symbolList = [
        'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAABtCAYAAABz2IkZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUzNkQ4NjBBRjFGNzExRTk5OUM4RjQyNURGMDk2RDlDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUzNkQ4NjBCRjFGNzExRTk5OUM4RjQyNURGMDk2RDlDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTM2RDg2MDhGMUY3MTFFOTk5QzhGNDI1REYwOTZEOUMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTM2RDg2MDlGMUY3MTFFOTk5QzhGNDI1REYwOTZEOUMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6i5RaaAAAURklEQVR42uxda6xc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',
        'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAABvCAYAAAA+ECgSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkMzREQ2QzM3RjFGNzExRTk5OUM4RjQyNURGMDk2RDlDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkMzREQ2QzM4RjFGNzExRTk5OUM4RjQyNURGMDk2RDlDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTM2RDg2MENGMUY3MTFFOTk5QzhGNDI1REYwOTZEOUMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzNERDZDMzZGMUY3MTFFOTk5QzhGNDI1REYwOTZEOUMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7xIaVlAAAW50lEQVR42uyde4wk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'
    ];
    let pointSymbol = [
        'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAgCAYAAADJ2fKUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADKGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMwNjcgNzkuMTU3NzQ3LCAyMDE1LzAzLzMwLTIzOjQwOjQyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3OTQzNjc0N0E3MDcxMUU4QjM0REMzOTdCMkY4RDdEQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3OTQzNjc0OEE3MDcxMUU4QjM0REMzOTdCMkY4RDdEQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc5NDM2NzQ1QTcwNzExRThCMzREQzM5N0IyRjhEN0RDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc5NDM2NzQ2QTcwNzExRThCMzREQzM5N0IyRjhEN0RDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Y/Y3eAAAAd1JREFUOE991dlqFFEUheF04jwhKiIqqCAoGHwCH8E7H98LvRLnIQ5xiGnXV9Rqqtp0NvzUqVN77b3qnK7Ti+VyuTWJxYjoVUIZoiIJOyMnRraDh3/DwYjxYUWST4ez4Xw4FwgPw8/wPfwYxwcVEVwIV8K1cDWcCap/Ce9H9sI+EWsqS74d7oU74WL4HV6HF+FleBP2+CY6GSTdDA/Dk/AsPA2Pw93Ahe47RIJ/76KbTrvhfngUHoRb4XIg2q6oC3EpXA83gjgVWPaOinK0qIhF3VSyIMYNHcwpqvhK1HA/FQjVzXk2bLiBNYc9sXl/wjTMDZsahv2pyMQmkWVf/RrCsvamnSRMo6IWnolqQ6ep8NhOFRL9Co2paMjbZE9iw1ihI+1VJKEic8faayUJtUdgrNBGUa1JdO/qG5qKhn0SU3tE+0EBH54xcS3+10nFfqnEX8O3QOh+o0iCZOJPwdeq40YRG7p8DhJ9qcbmanEl6vt4wI5zQfKHcVy7cmYLoQpLrEl+N8KiQgrORH2fWnsbXgX2KjqyU0WSiJxARB9DRfJmnUxWJPn5eHXfd5I3O5adfQ6P4rzonhUruqxIOHkcHq5wNrCsAyyE66qT6B/AFC++zkzE4joerrG19Q+FsQuu8dR/aQAAAABJRU5ErkJggg==',
        'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAgCAYAAADJ2fKUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADKGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMwNjcgNzkuMTU3NzQ3LCAyMDE1LzAzLzMwLTIzOjQwOjQyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowQzUxNDcxOUE3Q0IxMUU4QjM0REMzOTdCMkY4RDdEQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowQzUxNDcxQUE3Q0IxMUU4QjM0REMzOTdCMkY4RDdEQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBDNTE0NzE3QTdDQjExRThCMzREQzM5N0IyRjhEN0RDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBDNTE0NzE4QTdDQjExRThCMzREQzM5N0IyRjhEN0RDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Jjx60AAAAiRJREFUOE+NlV0vA0EUhmfbUooSRAQJTSQkxC/wE9z5+S64QlHfiqod7zMzZ7uLikkeMzt73nPememO7OVixpValqBZ70uEZiIC6olGoiYI/BTDBOPcRAQ3xbRgoiUQ5uJNvIh+Gg9NhGBWLIplsSSmBNkfxE3iUbwiwhqZCd4QHbEp5sRAXIpTcSa64hHfiCYEQWti19Uah26yfewmWkd6PhBbAhdUryOi4R+fVOu4rL6fNee3s8bMnp53xLpYEIhqJrKNaIsV5/NVJtVP6i+WWSNJcZSZCItUI5M2xDNWC0dDBTaJpCQvRNZ4bjifzjH2ZLdzCwfOgDfAmXB4H3FICz1z4VBFyGIiJkaiVMnHnm0vfg3Cm71yJQJQ8IeRiSxxRWQ2ZI8gvf9HJRMieo8CYiqiEDfOngI1NapEIt7/qGQiAgY6WETM/WmPCSAg2fMI3gWJxoqSNQJVxecI+IbKonBOtLI9RK+aUgLPh6dxqGYWf1QiY/xSvax5/6Txs0BIsrEiAhTsJfZ3GvO1UnGsCBvcB/ea6WtNfKn3ac4sFiJbDy+wo3shJ7gXx0FklSobQRbWwzp6OqJr9YBFEpGwIrL1RGvOXcnauXrsmejXSiYiCBE3EKJbYSLiKpWYNFHX5cOT0MdnWxNxlWuZu48Hg/sintkItt6biMbNw+VBD9wNWKYCsBH0RSWa/QMow8K/U6yJhl/7wWLLLnyemQ/rcc65L2HyP9eIbO1cAAAAAElFTkSuQmCC'
    ];
    items.forEach(el => {
        el.symbol = symbolList[el.level - 1];
    });
    const targetCoord = [69, 70];
    const hangzhouCoord = [80, 40];
    const curveness = -0.2;
    let dataArr = [
        [],
        [],
        []
    ];
    items.forEach(el => {
        if (el.belong) {
            items.forEach(element => {
                if (el.belong == element.name) {
                    dataArr[el.level - 1].push([{
                        coord: element.value
                    },
                        {
                            coord: el.value
                        }
                    ]);
                }
            });
        }
    });
    let seriesOne = [{
        type: 'effectScatter',
        coordinateSystem: 'cesium',
        symbolSize: [15, 15],
        symbolOffset: [0, -10],
        z: 3,
        circular: {
            rotateLabel: true
        },
        label: {
            normal: {
                show: true,
                position: 'right',
                formatter: '{b}',
                fontSize: 16,
                color: 'yellow',
                textBorderColor: '#2aa4e8',
                offset: [0, 10]
            }
        },
        itemStyle: {
            normal: {
                shadowColor: 'none'
            }
        },
        data: items
    }];
    let lineSeries = [];
    dataArr.forEach((el, index) => {
        lineSeries.push({
            name: '',
            type: 'lines',
            coordinateSystem: 'cesium',
            z: 1,
            effect: {
                show: true,
                smooth: false,
                trailLength: 0,
                symbol: pointSymbol[index],
                symbolSize: [10, 30],
                period: 4
            },
            lineStyle: {
                width: 2,
                color: lineColor[index],
                curveness: curveness
            },
            data: el
        });
    });
    let seriesData = seriesOne.concat(lineSeries);
    let option = {
        animation: false,
        cesium: {},
        series: seriesData
    };

    return option;
}

export default createMigrate2;
