const BASE_URL = "http://192.168.1.100"; // Arduino IP
let adas = false;

function toggleADAS() {
  adas = !adas;
  fetch(`${BASE_URL}/adas/${adas ? "on" : "off"}`);
}

function sendCmd(cmd) {
  fetch(`${BASE_URL}/move/${cmd}`);
}

function setSpeed(val) {
  document.getElementById("speedVal").innerText = val;
  fetch(`${BASE_URL}/speed?value=${val}`);
}

// Live Dashboard Update
setInterval(() => {
  fetch(`${BASE_URL}/status`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("adasStatus").innerText =
        data.adas ? "ON" : "OFF";
      document.getElementById("speedVal").innerText = data.speed;
      document.getElementById("directionVal").innerText = data.direction;
    });
}, 500);
