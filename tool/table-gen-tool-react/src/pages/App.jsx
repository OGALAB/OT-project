import { useState } from "react";
// コンポーネント取得
import MonthInput from "./MonthInput";
import TextInput from "./TextInput";
import GenerateBtn from "./GenerateBtn";

export default function App() {
    // JS
    // トグルボタンの処理 初期値は閉じてる
    const [isOpen, setIsOpen] = useState(false);
    const toggleBtn = () => {
      if (isOpen) {
        setIsOpen(false);
    } else {
        setIsOpen(true);
    }
    }
    // カレンダーのデータ管理／生成
    function keepDigitsAndBuildCalendar() {
       // 無から「満」が入っている31日分の配列データを生成
       const initialCalendar = Array.from({length: 31}, () => ({
        am: "満",
        pm: "満"
       }));
       
       // ↑で作った31日分のデータを初期データとして設定。
       const [calendarItems, calendarSetItems] = useState(initialCalendar);
       
       const daysStatus = (inputData) => {
        // TextInputから入力データ取得
        const inputValue = inputData.target.value;
        // 31日分のデータをコピー
        const nextCalendar = [...initialCalendar];
       }
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
                <MonthInput text={}/>
                <TextInput/>
                <GenerateBtn/>
            </div>
        </div>
    );
}