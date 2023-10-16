function imgUrl2Base64(imgUrl) {
    return new Promise((resolve) => {
        let img = document.createElement('img');
        img.src = imgUrl;
        img.crossOrigin = 'anonymous';
        img.onload = function () {
            let data = getBase64Image(img);
            resolve(data);
        };
    });
}

function getBase64Image(img) {
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    return canvas.toDataURL('image/png');
}


export default imgUrl2Base64;
