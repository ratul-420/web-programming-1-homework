// Web Storage
function saveStorage() {
  const value = document.getElementById("storageInput").value;
  localStorage.setItem("demo", value);
}

function loadStorage() {
  const result = localStorage.getItem("demo") || "";
  document.getElementById("storageResult").textContent = result;
}

// Web Worker
let worker;

function startWorker() {
  if (window.Worker) {
    if (!worker) {
      const blob = new Blob([`
        onmessage = function(e) {
          postMessage('Worker says: ' + e.data);
        };
      `], { type: "application/javascript" });
      worker = new Worker(URL.createObjectURL(blob));
    }

    worker.onmessage = function(e) {
      document.getElementById("workerResult").textContent = e.data;
    };

    worker.postMessage("Hello from main!");
  }
}

// Geolocation
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      document.getElementById("geoResult").textContent = `Lat: ${latitude}, Lon: ${longitude}`;
    }, () => {
      document.getElementById("geoResult").textContent = "Permission denied or error.";
    });
  } else {
    document.getElementById("geoResult").textContent = "Geolocation not supported.";
  }
}

// Drag and Drop
function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  if (event.target !== draggedElement) {
    event.target.appendChild(draggedElement);
  }
}

// Canvas
window.onload = function() {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(10, 10, 80, 80);
};
