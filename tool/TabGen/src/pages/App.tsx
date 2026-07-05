import { useState } from "react";
import MonthInput from "./MonthInput";
import TextInput from "./TextInput";
import GenerateBtn from "./GenerateBtn";
interface CalendarInitialData {
    am: string;
    pm: string;
}

//【データ管理関数】
function keepDigitsAndBuildCalendar(inputData: string): CalendarInitialData[] {
    
let calendarResults: CalendarInitialData[] = Array.from({ length: 31 }, function(): CalendarInitialData {
    return {
        am: "満",
        pm: "満"
    };
});

const inputParts: string[] = inputData.split(/[，,、\s]+/);

inputParts.forEach((iPart: string) => {
    const targetHl = /休$/i.test(iPart);
    const targetAm = /[amａｍ]$/i.test(iPart);
    const targetPm = /[pmｐｍ]$/i.test(iPart);

    let strDelete = iPart.replace(/[apmAPMａ-ｚＡ-Ｚ]/g, ""); 
    
    let converPart = strDelete.replace(/[０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
    let cleanPart = converPart.replace(/[休]/g, "");

    const daysStatus = (day: number): void => {
        if (day >= 1 && day <= 31) {
            let holOrEmpty = "空";
            if (targetHl === true) {
                holOrEmpty = "休";
            }
            if (targetAm === true) {
                calendarResults[day - 1].am = holOrEmpty;
            } else if (targetPm === true) {
                calendarResults[day - 1].pm = holOrEmpty;
            } else {
                calendarResults[day - 1].am = holOrEmpty;
                calendarResults[day - 1].pm = holOrEmpty;
            }
        }
    };

    if (cleanPart.includes("-") || cleanPart.includes("~") || cleanPart.includes("ー") || cleanPart.includes("～") || cleanPart.includes("－")) {
        
        const hyphenDel = cleanPart.split(/[-~ー～－]/);
        const start = Number(hyphenDel[0]);
        const end = Number(hyphenDel[1]);

        if (!isNaN(start) && !isNaN(end)) {
            const s = Math.min(start, end);
            const e = Math.max(start, end);
            for (let j = s; j <= e; j = j + 1) {
                daysStatus(j);
            }
        }
    } else {
        const singleNb = Number(cleanPart);
        if (!isNaN(singleNb)) {
            daysStatus(singleNb);
        }
    }
});
    // 完成した31日分のデータを戻り値として外に返す
    return calendarResults;
}

//【HTML生成関数】
function generateCalendarHtml(year: number, month: number, calendarData: CalendarInitialData[]) {
    const firstDay = new Date(year, month - 1, 1).getDay();
    const lastDate = new Date(year, month, 0).getDate();

    let calendarRow = "";
    let dateCount = 1;

    for (let k = 0; k < 18; k++) {
        let row = "<tr>";
        let retenCount = dateCount;

        for (let l = 0; l < 7; l++) {
            let firstRow = (k % 3 === 0);
            let secondRow = (k % 3 === 1);
            let thirdRow = (k % 3 === 2);

            let nowDate = !((k < 3 && l < firstDay) || retenCount > lastDate);

            if (firstRow) {
                row += `<td colspan="2">${nowDate ? retenCount : ""}</td>\n`;
            } else if (secondRow) {
                row += nowDate ? `<td>午前</td>\n<td>午後</td>\n` : `<td></td>\n<td></td>\n`;
            } else if (thirdRow) {
                if (nowDate) {
                    const weekend = (l === 0 || l === 6);
                    const data = calendarData[retenCount - 1];
                    let amHl = weekend ? "休" : data.am;
                    let pmHl = weekend ? "休" : data.pm;
                    row += `<td>${amHl}</td>\n<td>${pmHl}</td>\n`;
                } else {
                    row += `<td></td>\n<td></td>\n`;
                }
            }
            if (!(k < 3 && l < firstDay)) {
                retenCount++;
            }
        }

        row += "</tr>";
        calendarRow += row;
        
        if (k % 3 === 2) {
            dateCount = retenCount;
        }
        if (dateCount > lastDate && k % 3 === 2) break;
    }

    // 生成したHTMLを戻り値として外に返す
    return `
<table border="0" cellpadding="0" cellspacing="0" width="1000">
<tbody><tr><td colspan="14">${year}年${month}月</td>
</tr><tr><td colspan="2" style="background: #999;">日</td>
<td colspan="2" style="background: #999;">月</td>
<td colspan="2" style="background: #999;">火</td>
<td colspan="2" style="background: #999;">水</td>
<td colspan="2" style="background: #999;">木</td>
<td colspan="2" style="background: #999;">金</td>
<td colspan="2" style="background: #999;">土</td>
</tr>${calendarRow}</tbody></table>`;
}

export default function App() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleBtn = (): void => {
      if (isOpen) {
        setIsOpen(false);
      } else {
          setIsOpen(true);
      }
    }
    const nowData = new Date();
    const targetYear = nowData.getFullYear();
    const targetMonth = String(nowData.getMonth() + 1).padStart(2, "0");
    const [monthValue, setMonthValue] = useState(`${targetYear}-${targetMonth}`);

    const [inputValue, setInputValue] = useState("");

    //【ダウンロード処理関数】
    const calendarDownloadButton = async () => {
        if (!monthValue) {
            alert("年月入力欄が空です。");
            return;
        }

        const trimInputValue = inputValue.trim();
        
        if (trimInputValue === "") {
            alert("データ入力欄が空です。");
            return;
        }

        const [inputYear, inputMonth] = monthValue.split("-");
        const year = Number(inputYear);
        const month = Number(inputMonth);

        const cleanedCalendarData = keepDigitsAndBuildCalendar(trimInputValue);
        const calendarHtmlContent = generateCalendarHtml(year, month, cleanedCalendarData);

        try {
            const htmlblob = new Blob([calendarHtmlContent], {type: 'text/html'});
            const plainblob = new Blob([calendarHtmlContent], {type: 'text/plain'});
            const clipboardItem = new ClipboardItem({
               'text/html': htmlblob,
               'text/plain': plainblob
        });

        await navigator.clipboard.write([clipboardItem]);

        setInputValue("");
        alert(`カレンダーの生成／コピーが完了しました。／貼り付け（Ctrl+V）をしてください。`);
        } catch (err) {
            console.error("コピーに失敗しました:", err);
            alert("クリップボードへのコピーに失敗しました。");
        }
    };

    // CSS
    const styles: { [key: string]: React.CSSProperties } = {
    fixedTool: {
      position: 'fixed',
      top: '20px',
      left: '20px',
      zIndex: 100,  
    },
    container: {
      width: '200px',
      padding: '10px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      // アニメーション処理
      transition: 'all 0.4s ease',
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
      visibility: isOpen ? 'visible' : 'hidden'
    },
    toggleBtn: {
        display: 'block',
        backgroundColor: '#efefef',
        padding: '8px 12px',
        borderRadius: '4px',
        marginBottom: '5px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
    }
    };

    return (
        <div style={styles.fixedTool}>
            <button style={styles.toggleBtn} onClick={toggleBtn}>📅</button>
            <div style={styles.container}>
                <MonthInput value={monthValue} onChange={(e) => setMonthValue(e.target.value)}/>
                <TextInput value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <GenerateBtn onClick={calendarDownloadButton}/>
            </div>
        </div>
    );
}