const code = "ABC123xyz789"; // Replace with your Neptun+secret
const api = "http://gamf.nhely.hu/ajax2/";

function ajaxPost(params, cb) {
  fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(params)
  })
    .then(r => r.json())
    .then(cb)
    .catch(e => alert("AJAX error: " + e));
}

function readAll() {
  ajaxPost({ op: "read", code }, data => {
    let html = "";
    let heights = [];
    data.list.forEach(row => {
      html += `<div>ID: ${row.id}, Name: ${row.name}, Height: ${row.height}, Weight: ${row.weight}</div>`;
      heights.push(Number(row.height));
    });
    document.getElementById("ajaxResult").innerHTML = html;
    if (heights.length) {
      let sum = heights.reduce((a, b) => a + b, 0);
      let avg = (sum / heights.length).toFixed(2);
      let max = Math.max(...heights);
      document.getElementById("stats").innerHTML = `Sum: ${sum}, Avg: ${avg}, Max: ${max}`;
    }
  });
}

document.getElementById("ajaxForm").onsubmit = function(e) {
  e.preventDefault();
  let name = nameInput.value.trim();
  let height = heightInput.value.trim();
  let weight = weightInput.value.trim();
  if (!name || !height || !weight) return alert("Fields required!");
  if (name.length > 30 || height.length > 30 || weight.length > 30) return alert("Max 30 chars!");

  let id = document.getElementById("id").value;
  let op = id ? "update" : "create";
  let params = { op, name, height, weight, code };
  if (id) params.id = id;

  ajaxPost(params, res => {
    alert(`${op.charAt(0).toUpperCase() + op.slice(1)} ${res > 0 ? "successful" : "failed"}`);
    readAll();
    ajaxForm.reset();
    document.getElementById("id").value = "";
  });
};

function getDataForId() {
  let id = document.getElementById("updateId").value;
  if (!id) return alert("Enter ID");
  ajaxPost({ op: "read", code }, data => {
    let row = data.list.find(r => r.id === id);
    if (!row) return alert("Not found");
    nameInput.value = row.name;
    heightInput.value = row.height;
    weightInput.value = row.weight;
    document.getElementById("id").value = row.id;
  });
}

function deleteRecord() {
  let id = document.getElementById("updateId").value;
  if (!id) return alert("Enter ID");
  ajaxPost({ op: "delete", id, code }, res => {
    alert("Delete " + (res > 0 ? "successful" : "failed"));
    readAll();
  });
}

const nameInput = document.getElementById("name");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");

window.onload = readAll;
