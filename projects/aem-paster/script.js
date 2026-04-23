const btn = document.createElement("button");
btn.textContent = "貼り付け";
document.body.appendChild(btn);
btn.style.position = "fixed";
btn.style.top = "10px";
btn.style.left = "10px";
btn.style.padding = "10px 20px";
btn.style.zIndex = "1000";
btn.style.cursor = "pointer";

const tbody = document.querySelector("tbody");

btn.addEventListener("click", async () => {
    try {
        const text = await navigator.clipboard.readText();
        const date = text.split(/\r?\n/);

        tbody.innerHTML = "";

        let day = 1;
        let dateIndex = 0;
        const totalDays = "31";

        for (let week = 0; week < 6; week++) {
            const trDate = document.createElement("tr");
            trDate.style.background = "#F0F0F0";
            trDate.style.fontWeight = "bold";

            const trLabel = document.createElement("tr");
            trLabel.style.fontSize = "11px";

            const trData = document.createElement("tr");

            for (let d = 0; d < 7; d++) {
                const tdDate = document.createElement("td");
                tdDate.colSpan = 2;

                if (day <= totalDays) {
                    tdDate.textContent = day;
                }
                trData.appendChild(tdDate);

                const tdAM = document.createElement("td");
                tdAM.textContent = "AM";
                const tdPM = document.createElement("td");
                tdPM.textContent = "PM";

                trLabel.appendChild(tdAM);
                trLabel.appendChild(tdPM);

                const td1 = document.createElement("td");
                const td2 = document.createElement("td");

                if (d === 0 || d === 6) {
                    td1.textContent = "休";
                    td2.textContent = "休";
                    td1.style.color = "red";
                    td2.style.color = "red";
                } else {
                    const content = date[dateIndex] || "";
                    td1.textContent = content;
                    td2.textContent = content;
                    dateIndex++;
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
        console.error("エラーが発生しました", err);
        alert("クリップボードの読み取りを許可してください。");
    }
});