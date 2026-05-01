document.addEventListener("DOMContentLoaded", () => {
    loadCSV("./data/2026/April24.csv");
});

/* My form actually submits to a Google Sheet */
/* Blocks Google notification from opening upon form submission */
window.addEventListener("load", function() {
  const form = document.getElementById('contact-form');
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: 'POST',
      body: data,
    })
    .then(() => {
      alert("Thanks for your message! We will respond to you as soon as possible.");
    })
  });
});

// Load table

function loadCSV(path) {
    Papa.parse(path, {
        download: true,
        skipEmptyLines: true,
        header: true,

        complete: csv => {
            var table = document.getElementById("pick_data");
            table.innerHTML = "";

            // 1. Create Header using the meta-data keys
            let thead = table.createTHead();
            let headerRow = thead.insertRow();
            csv.meta.fields.forEach(columnName => {
                let th = document.createElement("th");
                th.innerHTML = columnName;
                headerRow.appendChild(th);
            });

            // 2. Create Body using the rows
            let tbody = table.createTBody();
            csv.data.forEach(row => {
                let tr = tbody.insertRow();
                csv.meta.fields.forEach(columnName => {
                    let td = tr.insertCell();
                    td.innerHTML = row[columnName]; // Access by column name
                });
            });
            // 3. Change color of values in the second column
            // Get all rows from your table (assuming your table has an id of "myTable")
            const rows = document.querySelectorAll('#pick_data tr');

            rows.forEach(row => {
              // Target the second column (index 1)
              const cell = row.cells[1];
              
              if (cell) {
                const value = cell.textContent.trim();
                const numValue = parseFloat(value);

                // Characters
                if (value === "N") {
                  cell.style.color = "yellow";
                  cell.style.background = "rgb(59, 59, 0)";
                } else if (value === "R") {
                  cell.style.color = "orange";
                  cell.style.background = "rgb(59, 39, 0)";
                } else if (value === "=") {
                  cell.style.color = "white";
                } 
                // Numbers
                else if (!isNaN(numValue)) {
                  if (numValue > 0) {
                    cell.style.color = "green";
                    cell.textContent = "+" + value;
                    cell.style.background = "rgb(0, 41, 2)";
                  } else if (numValue < 0) {
                    cell.style.color = "red";
                    cell.style.background = "rgb(41, 0, 3)";
                  }
                }
              }
            });
        }
    });
}

let goBtn = document.getElementById("go-button");
goBtn.addEventListener("click", function(e) {
  e.preventDefault(); // This stops the page from reloading!
  changeTitle();
});

function changeTitle() {
  // Access header
  let header = document.getElementById("date-header");
  // Access selector value
  let date = document.getElementById("week-selector").value;
  let datefile = date.replaceAll(" ", "");
  // Change header
  header.textContent = "2026 " + date;
  // Create path
  path = "./data/2026/" + datefile + ".csv";
  // Call function to change table
  loadCSV(path);
}

let contactBtn = document.getElementById("contact-button")
contactBtn.addEventListener("click", function(e) {
  e.preventDefault();
  displayMessage();
})

function displayMessage() {
  let h1 = document.getElementById("contact-h1");
  let p = document.getElementById("contact-p");
  h1.textContent = "Thank You!";
  h1.style.color = "lightgreen";
  p.textContent = "We appreciate your feedback! We will get back to you as soon as possible.";
}