const BASE_URL = "http://192.168.1.100"; // Arduino IP

// ===== Button Triggers =====
function toggleADAS() {
  fetch(`${BASE_URL}/adas/toggle`);
}

function toggleParking() {
  fetch(`${BASE_URL}/parking/toggle`);
}

function sendCmd(cmd) {
  fetch(`${BASE_URL}/move/${cmd}`);
}

function setSpeed(val) {
  document.getElementById("speedVal").innerText = val;
  fetch(`${BASE_URL}/speed?value=${val}`);
}

// ===== Live Dashboard Sync =====
setInterval(() => {
  fetch(`${BASE_URL}/status`)
    .then((res) => res.json())
    .then((data) => {
      // Dashboard
      document.getElementById("adasStatus").innerText = data.adas
        ? "ON"
        : "OFF";
      document.getElementById("parkingStatus").innerText = data.parking
        ? "ON"
        : "OFF";
      document.getElementById("speedVal").innerText = data.speed;
      document.getElementById("directionVal").innerText = data.direction;

      // ADAS Button
      const adasBtn = document.getElementById("adasBtn");
      adasBtn.className = "adas-btn " + (data.adas ? "on" : "off");
      adasBtn.innerText = data.adas ? "ADAS ON" : "ADAS OFF";

      // Parking Button
      const pBtn = document.getElementById("parkingBtn");
      pBtn.className = "parking-btn " + (data.parking ? "on" : "off");
      pBtn.innerText = data.parking ? "PARKING ON" : "PARKING OFF";

      // Disable controls if Parking ON
      document.querySelectorAll(".controls button").forEach((btn) => {
        btn.disabled = data.parking;
      });
    });
}, 500);
