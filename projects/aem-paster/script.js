const btn = document.createElement("button");
btn.textContent = "貼り付け";
document.body.appendChild(btn);

Object.assign(btn.style, {
    position: "fixed",
    top: "10px",
    left: "10px",
    padding: "10px 20px",
    zIndex: "1000",
    cursor: "pointer"
});

const tbody = document.querySelector("tbody");

btn.addEventListener("click", async () => {
    try {
        const text = await navigator.clipboard.readText();

        const grid = text
            .split(/\r?\n/)
            .map(row => row.split(/\t/));

        const height = grid.length;
        const width = Math.max(...grid.map(r => r.length));

        const dayPositions = [];

        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {
                const cell = (grid[r][c] || "").trim();

                if (/^\d{1,2}$/.test(cell)) {
                    const day = Number(cell);
                    if (day >= 1 && day <= 31) {
                        dayPositions.push({ day, row: r, col: c });
                    }
                }
            }
        }

        dayPositions.sort((a, b) => a.day - b.day);

        let startCol = 0;

        const firstDay = dayPositions.find(d => d.day === 1);
        if (firstDay) {
            startCol = firstDay.col % 7;
        }

        const calendarData = {};

        dayPositions.forEach(pos => {
            const { day, row, col } = pos;

            const values = [];

            for (let offset = 1; offset <= 3; offset++) {
                const r = row + offset;
                if (r >= height) break;

                const cell = (grid[r][col] || "").trim();

                if (!cell) continue;

                if (/^\d+$/.test(cell)) break;

                values.push(cell);
            }

            calendarData[day] = values;
        });

        tbody.innerHTML = "";

        let day = 1;
        const totalDays = 31;

        for (let week = 0; week < 6; week++) {
            const trDate = document.createElement("tr");
            trDate.style.background = "#F0F0F0";
            trDate.style.fontWeight = "bold";

            const trLabel = document.createElement("tr");
            trLabel.style.fontSize = "11px";

            const trData = document.createElement("tr");

            for (let d = 0; d < 7; d++) {

                const realCol = (d + startCol) % 7;

                const tdDate = document.createElement("td");
                tdDate.colSpan = 2;

                if (day <= totalDays) {
                    tdDate.textContent = day;
                }
                trDate.appendChild(tdDate);

                const tdAM = document.createElement("td");
                tdAM.textContent = "AM";

                const tdPM = document.createElement("td");
                tdPM.textContent = "PM";

                trLabel.appendChild(tdAM);
                trLabel.appendChild(tdPM);

                const td1 = document.createElement("td");
                const td2 = document.createElement("td");

                if (day <= totalDays) {
                    const values = calendarData[day] || [];

                    td1.textContent = values[0] || "";
                    td2.textContent = values[1] || values[0] || "";

                    if (realCol === 0 || realCol === 6) {
                        td1.style.color = "red";
                        td2.style.color = "red";
                    }
                }

                trData.appendChild(td1);
                trData.appendChild(td2);

                day++;
            }

            tbody.appendChild(trDate);
            tbody.appendChild(trLabel);
            tbody.appendChild(trData);

            if (day > totalDays) break;
        }

    } catch (err) {
        console.error(err);
        alert("クリップボードの読み取りを許可してください");
    }
});