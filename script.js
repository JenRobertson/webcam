//https://github.com/webrtc/samples/blob/gh-pages/src/content/getusermedia/canvas/js/main.js
window.onload = function () {
    const video = document.querySelector('video');
    const canvas = document.querySelector('canvas');
    const box = document.querySelector('#box');
    const ctx = canvas.getContext('2d');

    navigator.mediaDevices.getUserMedia({audio: false, video: true})
        .then(function(stream) {
            video.srcObject = stream;
            canvas.width = 640;
            canvas.height = 480;
            setInterval(interval, 30);

        })
        .catch(function(err) {
        /* handle the error */
        });
        
    const interval = () => {
        ctx.filter = 'grayscale(100%)';
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const avg = getAverageBrightnessOfArea(ctx, 0, 0, 100, 100);
        ctx.beginPath();
        ctx.rect(0, 0, 100, 100);
        ctx.stroke();

        box.style.backgroundColor = `rgba(${avg},${avg},${avg}, 1)`;
    }
}

function getAverageBrightnessOfArea(ctx, sx, sy, sw, sh){
    const arrayOfRs = getEveryNth(ctx.getImageData(0,0,2,2).data);
    return average(arrayOfRs);
}

function average(nums) {
    return nums.reduce((a, b) => (a + b)) / nums.length;
}

function getEveryNth(array){
    return array.filter(function(value, index, Arr) {
        return index % 4 == 0;
    });
}