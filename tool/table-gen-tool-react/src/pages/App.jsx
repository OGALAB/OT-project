import { useState } from "react";
// コンポーネント取得
import MonthInput from "./MonthInput";
import TextInput from "./TextInput";
import GenerateBtn from "./GenerateBtn";

export default function App() {
    // JS
    // トグルボタンの処理 初期値は閉じている
    const [isOpen, setIsOpen] = useState(false);
    const toggleBtn = () => {
      if (isOpen) {
        setIsOpen(false);
      } else {
          setIsOpen(true);
      }
    }
    // 現在の年月を取得
    const nowData = new Date();
    const targetYear = nowData.getFullYear();
    const targetMonth = String(nowData.getMonth() + 1).padStart(2, "0");
    const [monthValue, setMonthValue] = useState(`${targetYear}-${targetMonth}`);

    // インプットタグの入力値設定
    const [inputValue, setInputValue] = useState("");
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///  【カレンダー用関数】
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function keepDigitsAndBuildCalendar(inputData) {

    let calendarResults = Array.from({ length: 31 }, function() {
        return {
            am: "満",
            pm: "満"
        };
    });
    
    const inputParts = inputData.split(/[，,、\s]+/);
    
    inputParts.forEach((iPart) => {
        const targetHl = /休$/i.test(iPart);
        const targetAm = /am$/i.test(iPart);
        const targetPm = /pm$/i.test(iPart);

        let strDelete = iPart.replace(/[apmAPM]/g, "");
        let converPart = strDelete.replace(/[０-９]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
        let cleanPart = converPart.replace(/[休]/g, "");

        const daysStatus = (day) => {
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
        
        if (cleanPart.includes("-") || cleanPart.includes("~") || cleanPart.includes("ー") || cleanPart.includes("～")) {
            const hyphenDel = cleanPart.split(/[-~ー～]/);
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
        
        return calendarResults;
    });
    }

    // CSS
    const styles = {
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
    }
    };

    return (
        <div>
            <button onClick={toggleBtn}>📅</button>
            <div style={styles.container}>
                <MonthInput textVal={}/>
                <TextInput/>
                <GenerateBtn/>
            </div>
        </div>
    );
}