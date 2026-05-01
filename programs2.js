document.addEventListener("DOMContentLoaded", () => {
    loadGoatCSV();
});

function loadGoatCSV() {
    Papa.parse("./Data/tsc_goat.csv", {
        download: true,
        skipEmptyLines: true,
        header: true,

        complete: csv => {
            var table = document.getElementById("goat_data");
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
        }
    });
}