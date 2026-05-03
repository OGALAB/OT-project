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
        let retenCount = dateCount;

        for (let j = 0; j < 7; j++) {
            let firstRow = (i % 3 === 0);
            let secondRow = (i % 3 === 1);
            let thirdRow = (i % 3 === 2);

            let nowDate = !((i < 3 && j < firstDay) || retenCount > lastDate);

            if (firstRow) {
                row += `<td colspan="2">${nowDate ? retenCount : ""}</td>`;
            } else if (secondRow) {
                row += nowDate ? `<td>午前</td><td>午後</td>` : `<td colspan="2"></td>`;
            } else if (thirdRow) {
                row += `<td colspan="2">${nowDate ? "〇" : ""}</td>`;
            }

            if (!(i < 3 && j < firstDay)) {
                retenCount++;
            }
        }

        row += "</tr>";
        calendarRow += row;
        
        if (i % 3 === 2) {
            dateCount = retenCount;
        }
        
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