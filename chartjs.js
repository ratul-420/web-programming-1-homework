const table = document.getElementById("numTable");
let chart = null;

table.onclick = function(e) {
  const tr = e.target.closest("tr");
  if (!tr) return;

  const nums = Array.from(tr.children).map(td => Number(td.textContent));

  if (chart) chart.destroy();

  const ctx = document.getElementById("myChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["A", "B", "C", "D", "E"],
      datasets: [{
        label: "Row Data",
        data: nums,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        borderWidth: 2,
        tension: 0.2,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
};