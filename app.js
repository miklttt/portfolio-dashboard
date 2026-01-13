async function loadCSV(path) {
  const res = await fetch(path);
  const text = await res.text();
  const [header, ...rows] = text.trim().split("\n");
  const keys = header.split(",");
  return rows.map(r => {
    const values = r.split(",");
    return Object.fromEntries(keys.map((k, i) => [k, values[i]]));
  });
}

// Dashboard
loadCSV("data/dashboard.csv").then(d => {
  const row = d[0];
  document.getElementById("totalValue").innerText =
    "¥ " + Number(row.total_value).toLocaleString();
  document.getElementById("xirr").innerText =
    (row.xirr * 100).toFixed(2) + "%";
  document.getElementById("rebalance").innerText = row.rebalance;
});

// Allocation
loadCSV("data/allocation.csv").then(data => {
  const ul = document.getElementById("allocation");
  data.forEach(r => {
    const li = document.createElement("li");
    li.innerText = `${r.bucket}: ${(r.weight * 100).toFixed(1)}%`;
    ul.appendChild(li);
  });
});

// Buckets
loadCSV("data/buckets.csv").then(data => {
  const ul = document.getElementById("buckets");
  data.forEach(r => {
    const li = document.createElement("li");
    li.innerText =
      `${r.bucket}: ¥${Number(r.value).toLocaleString()} | ${(r.xirr * 100).toFixed(1)}%`;
    ul.appendChild(li);
  });
});