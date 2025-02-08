// 恋爱计时器代码
const loveStartDate = new Date("2025-01-01");
const timerElement = document.getElementById("timer");

function updateTimer() {
    const now = new Date();
    const diff = now - loveStartDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    timerElement.textContent = `${days} 天`;
}

setInterval(updateTimer, 1000);

// 天气更新功能
const dateElement = document.getElementById("date");
const weatherElement = document.getElementById("weatherInfo");

function updateDateAndWeather() {
    const now = new Date();
    dateElement.textContent = now.toDateString();

    fetch('https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=YOUR_CITY')
        .then(response => response.json())
        .then(data => {
            weatherElement.textContent = `天气：${data.current.condition.text}, 温度：${data.current.temp_c}°C`;
        });
}

updateDateAndWeather();
setInterval(updateDateAndWeather, 3600000);

// 语音留言录制
let mediaRecorder;
let audioChunks = [];

const recordButton = document.getElementById("recordButton");
const audioPlayer = document.getElementById("audioPlayer");

recordButton.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        recordButton.textContent = "开始录音";
    } else {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.ondataavailable = event => {
                    audioChunks.push(event.data);
                };
                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    audioPlayer.src = audioUrl;
                    audioChunks = [];
                };
                mediaRecorder.start();
                recordButton.textContent = "停止录音";
            })
            .catch(error => {
                alert("无法访问麦克风：" + error);
            });
    }
});

// 画板功能
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
let painting = false;

canvas.addEventListener('mousedown', () => painting = true);
canvas.addEventListener('mouseup', () => painting = false);
canvas.addEventListener('mousemove', (event) => {
    if (painting) {
        ctx.fillStyle = colorPicker.value;
        ctx.fillRect(event.offsetX, event.offsetY, 10, 10);
    }
});

function saveDrawing() {
    const drawing = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = drawing;
    link.download = 'pixel-drawing.png';
    link.click();
}

// 花朵纪念日
document.querySelectorAll('.date').forEach(button => {
    button.addEventListener('click', (event) => {
        const date = event.target.dataset.date;
        if (date === "2025-02-14") {
            event.target.textContent = '🌸';
        }
    });
});