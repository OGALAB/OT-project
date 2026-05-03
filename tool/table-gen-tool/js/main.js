// Tampermonkey code
const btn = document.createElement("button");
btn.innerHTML = "HTML生成ボタン";

document.body.appendChild(btn);

function handleExport() {
    const now = new Date();
    buildCalendarHtml(now.getFullYear(), now.getMonth() + 1);
}

/**
 * @param {number} year
 * @param {number} month
 */
function  buildCalendarHtml(year, month) {
    const firstDay = new Date(year, month - 1, 1).getDay();
    const lastDate = new Date(year, month, 0).getDate();

    let calendarRow = "";
    let dateCount = 1;

    for (let i = 0; i < 18; i++) {
        let row = "<tr>";
        let currentDay = dateCount;

        for (let j = 0; j < 7; j++) {
            let firstRow = (i % 3 === 0);
            let secondRow = (i % 3 === 1);
            let thirdRow = (i % 3 === 2);

            if (firstRow) {
                if (i === 0 && j < firstDay || dateCount > lastDate) {
                    row += `<td colspan="2"></td>`;
                } else {
                    row += `<td colspan="2">${dateCount}</td>`;
                    dateCount++;
                }
            } else if (secondRow) {
                let currentDay = this.rowStartDate + (j - (i === 1 ? firstDay : 0));

                if (i === 1 && j < firstDay || currentDay > lastDate) {
                    row += `<td colspan="2"></td>`;
                } else {
                    row += `<td>午前</td><td>午後</td>`;
                }
            }
        }

        row += "</tr>";
        calendarRow += row;
        if (dateCount > lastDate && i % 3 === 2) break;
    }

    const htmlContent = `
    <table border="0" cellpadding="0" cellspacing="0" width="1000">
        <tbody>
            <tr><td colspan="14">${year}年${month}月</td></tr>
            <tr><td colspan="2" style="background: #999;">日</td>
            <td colspan="2" style="background: #999;">月</td>
            <td colspan="2" style="background: #999;">火</td>
            <td colspan="2" style="background: #999;">水</td>
            <td colspan="2" style="background: #999;">木</td>
            <td colspan="2" style="background: #999;">金</td>
            <td colspan="2" style="background: #999;">土</td>
            </tr>
            ${calendarRow}
        </tbody>
    </table>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `最新カレンダー.html`
    a.click();
    URL.revokeObjectURL(url);
}

btn.addEventListener("click", handleExport);