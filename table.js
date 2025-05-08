let data = [
  { name: "Alice", age: 22, city: "Budapest", email: "alice@mail.com" },
  { name: "Bob", age: 25, city: "Szeged", email: "bob@mail.com" },
  { name: "Carol", age: 30, city: "Debrecen", email: "carol@mail.com" },
  { name: "Dave", age: 28, city: "Pecs", email: "dave@mail.com" }
];

let sortCol = null, sortAsc = true;

function renderTable(filter = "") {
  let tbody = document.querySelector("#crud-table tbody");
  tbody.innerHTML = "";
  let filtered = data.filter(row =>
    Object.values(row).some(val => val.toString().toLowerCase().includes(filter.toLowerCase()))
  );
  filtered.forEach((row, i) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.name}</td>
      <td>${row.age}</td>
      <td>${row.city}</td>
      <td>${row.email}</td>
      <td>
        <button onclick="editRow(${i})">Edit</button>
        <button onclick="deleteRow(${i})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function addOrUpdate(e) {
  e.preventDefault();
  let name = nameInput.value.trim();
  let age = parseInt(ageInput.value);
  let city = cityInput.value.trim();
  let email = emailInput.value.trim();
  if (!name || !city || !email || isNaN(age)) return alert("All fields required!");
  if (name.length < 2 || name.length > 20) return alert("Name length invalid!");
  if (city.length < 2 || city.length > 20) return alert("City length invalid!");
  if (email.length < 5 || email.length > 30) return alert("Email length invalid!");
  if (age < 1 || age > 120) return alert("Age invalid!");

  let idx = editIndex.value;
  if (idx === "") {
    data.push({ name, age, city, email });
  } else {
    data[idx] = { name, age, city, email };
    editIndex.value = "";
  }
  crudForm.reset();
  renderTable(searchInput.value);
}

function editRow(i) {
  let row = data[i];
  nameInput.value = row.name;
  ageInput.value = row.age;
  cityInput.value = row.city;
  emailInput.value = row.email;
  editIndex.value = i;
}

function deleteRow(i) {
  if (confirm("Delete this row?")) {
    data.splice(i, 1);
    renderTable(searchInput.value);
  }
}

function sortTable(col) {
  if (sortCol === col) sortAsc = !sortAsc;
  else { sortCol = col; sortAsc = true; }
  data.sort((a, b) => {
    if (a[col] < b[col]) return sortAsc ? -1 : 1;
    if (a[col] > b[col]) return sortAsc ? 1 : -1;
    return 0;
  });
  renderTable(searchInput.value);
}

const crudForm = document.getElementById("crud-form");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const cityInput = document.getElementById("city");
const emailInput = document.getElementById("email");
const editIndex = document.getElementById("edit-index");
const searchInput = document.getElementById("search");

crudForm.onsubmit = addOrUpdate;
searchInput.oninput = () => renderTable(searchInput.value);
document.querySelectorAll("#crud-table th[data-col]").forEach(th => {
  th.onclick = () => sortTable(th.dataset.col);
});

renderTable();
