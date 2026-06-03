//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 【UI構築】 ＊＊ページ表示用のHTMLを作成＊＊
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 処理を軽くするためにHTMLコンテンツを一括で構築する方法に変更 CSSも一緒に追加
const htmlContent = `
<button class="toggle-btn" style="display: block; background-color: #efefef; padding: 8px 12px; border-radius: 4px; cursor: pointer; margin-bottom: 5px; border: none; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">📅</button>
<div class="input-container" style="background-color: #ffffff; width: 200px; padding: 10px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: none;">
<input class="input-month" type="month" style="display: block; width: 145px; color: #333; padding: 5px; margin-bottom: 10px; border-radius: 4px;">
<label style="display: block; color: #333; font-size: 12px;">
    空日／休日を記入↓
    <input class="input-field" type="text" style="display: block; width: 170px; height: 25px; margin-top: 5px; margin-bottom: 10px;">
</label>
<p style="font-size: 10px; color: #666; margin-top: 0; margin-bottom: 10px; line-height: 1.2;">※入力例：1,2-4,5am,6pm,7~15休<br>※5-7pmなどの範囲指定も可</p>
<button class="generate-btn" style="width: 150px; height: 30px; background-color: #c82333; color: #ffffff; font-size: 12px; border: none; border-radius: 4px; padding: 6px 10px;">カレンダー生成ボタン</button>
</div>
`;
// 大枠のdivだけDOM操作する
const div = document.createElement("div");
div.style.cssText = "position: fixed; top: 10px; left: 10px; z-index: 1000;"
div.innerHTML = htmlContent;
document.body.appendChild(div);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 【UI機能】 ＊＊トグルボタンのクリックイベント＊＊
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DOMのクラスを取得
const tgBtn = document.querySelector(".toggle-btn");
const iptContainer = document.querySelector(".input-container");

// 初期設定として状態を「true」に設定（最初に読み込まれるコードを指定）
let tgAction = true;

tgBtn.addEventListener("click", () => {
// 最初にここが読まれる ボタンの状態を「非表示」から「表示」に変動
if (tgAction) {
    iptContainer.style.display = "block";
    
    // トグルボタンのアニメーション（非表示時に少し上に上げる、0,4秒間で、緩急追加、状態キープ）
    iptContainer.animate([
        {opacity: 0, transform: "translateY(-10px)"},
        {opacity: 1, transform: "translateY(0)"}
    ], {
        duration: 400,
        easing: "ease",
        fill: "forwards"
    });
    // トグルボタンが開いた後にここが読まれる ボタンの状態を「表示」から「非表示」に変動
} else {
    
    // トグルボタンのアニメーション（非表示時に少し上に上げる、0,3秒間で、緩急追加、状態キープ）
    const tgAnimation = iptContainer.animate([
        {opacity: 1, transform: "translateY(0)"},
        {opacity: 0, transform: "translateY(-10px)"}
    ], {
        duration: 300,
        easing: "ease",
        fill: "forwards"
    });

    // ここで「非表示」になる
    tgAnimation.onfinish = () => {
        iptContainer.style.display = "none";
    };
}

// 【重要】状態のスイッチ ボタン開く → 閉じると繰り返す事が出来る
tgAction = !tgAction;
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  【カレンダー用関数】＊＊データ管理＋配列作成用＊＊
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function keepDigitsAndBuildCalendar(inputData) {

// 最終的なカレンダーの配列データ
let calendarResults = [];

// まず項目全部に「満」を入れる
for (let i = 0; i < 31; i++) {
    let daysData = {
        am: "満",
        pm: "満"
    };
    calendarResults.push(daysData);
}

// 入力データをカンマ、スペース、タブで区切って配列に入れる
const inputParts = inputData.split(/[，,、\s]+/);

// カンマで分けた配列の文字列それぞれに各処理を加える
inputParts.forEach(iPart => {
    // 入力データから「休」「午前」「午後」を検索
    const targetHl = /休$/i.test(iPart);
    const targetAm = /am$/i.test(iPart);
    const targetPm = /pm$/i.test(iPart);
    
    // 入力データからアルファベットと休み（1am、2休）を削除し、さらに全角数字も半角に変更（データの洗浄）
    let strDelete = iPart.replace(/[apmAPM]/g, "");
    let converPart = strDelete.replace(/[０-９]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
    let cleanPart = converPart.replace(/[休]/g, "");

    // 【重要：データ管理の関数】下のforとifで貰った数値を引数に渡して「インデックス」として管理 ＋ amとpmに既に埋めてある「満」を条件によって「休」か「空」に変更
    const daysStatus = (day) => {
        if (day >= 1 && day <= 31) {
            let holOrEmpty = targetHl ? "休" : "空";

            if (targetAm) {
                calendarResults[day - 1].am = holOrEmpty;
            } else if (targetPm) {
                calendarResults[day - 1].pm = holOrEmpty;
            } else {
                calendarResults[day - 1].am = holOrEmpty;
                calendarResults[day - 1].pm = holOrEmpty;
            }
        }
    };
    
    //  綺麗にした配列（cleanPart）にハイフン類（-~ー～）が含まれているか確認する
    if (cleanPart.includes("-") || cleanPart.includes("~") || cleanPart.includes("ー") || cleanPart.includes("～")) {
        // 配列をハイフンで区切って配列に再代入し、配列の1番目（左側）と2番目（右側）の数値を取得
        const hyphenDel = cleanPart.split(/[-~ー～]/);
        const start = Number(hyphenDel[0]);
        const end = Number(hyphenDel[1]);
        
        // start（1番目の数値）とend（2番目の数値）の両方が、有効な数値の場合の処理 （数値に「-」等のハイフンがある場合の処理）
        // 【重要】if else共にさっき作ったdaysStatus関数に「表示用」の数値を代入する
        if (!isNaN(start) && !isNaN(end)) {
            const s = Math.min(start, end); // 最小値を取得
            const e = Math.max(start, end); // 最大値を取得
            // 最小値から最大値まで数値をdaysStatusに代入
            for (let j = s; j <= e; j++) {
                daysStatus(j);
            }
        // 数値が単一の場合の処理
        }
    } else {
        const singleNb = Number(cleanPart);
        if (!isNaN(singleNb)) {
            daysStatus(singleNb);
        }
    }
});

// 【重要】完成した31日分のデータを戻り値として外に返す
return calendarResults;
};
// テーブルタグ生成 UI出力関数 JSDoc
/**
 * @param {number} year // 表示する年
 * @param {number} month // 表示する月
 * @param {Object[]} calendarData // カレンダーのデータ配列
 * @param {string} calendarData[].am // 午前の予定
 * @param {string} calendarData[].pm // 午後の予定
 */
// DOMのクラスを取得
const monthInput = document.querySelector(".input-month");

// 現在の年月の取得 padStartメソッドで月の文字列を0を先頭に2桁へ変更
const nowData = new Date();
const targetYear = nowData.getFullYear();
const targetMonth = String(nowData.getMonth() + 1).padStart(2, "0");
monthInput.value = `${targetYear}-${targetMonth}`;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  【カレンダー用関数】＊＊データ管理＋配列作成用＊＊
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function generateCalendarHtml(year, month, calendarData) {
    // 月初、月末の取得
    const firstDay = new Date(year, month - 1, 1).getDay();
    const lastDate = new Date(year, month, 0).getDate();
    
    // カレンダーのHTML用空配列とカウント用変数
    let calendarRow = "";
    let dateCount = 1;
    
    // 全体の行 3つで1セットのため合計18個
    for (let k = 0; k < 18; k++) {
        let row = "<tr>";
        // 【重要】カウントリセット用の記述 セットが変わってもカウントは動いてしまうので止めるために必須
        let retenCount = dateCount;
        
        // 1週間の処理
        for (let l = 0; l < 7; l++) {
            // 行の計算式 これをベースにifを展開する
            let firstRow = (k % 3 === 0);
            let secondRow = (k % 3 === 1);
            let thirdRow = (k % 3 === 2);
            
            // 月初の前、月末の後の空欄を計算しないための記述
            let nowDate = !((k < 3 && l < firstDay) || retenCount > lastDate);
            
            // カレンダー生成の核 行ごとの処理を記述
            if (firstRow) {
                row += `<td colspan="2">${nowDate ? retenCount : ""}</td>`;
            } else if (secondRow) {
                row += nowDate ? `<td>午前</td><td>午後</td>` : `<td></td><td></td>`;
            } else if (thirdRow) {
                if (nowDate) {
                    // 
                    const weekend = (l === 0 || l === 6);
                    const data = calendarData[retenCount - 1];
                    let amHl = weekend ? "休" : data.am;
                    let pmHl = weekend ? "休" : data.pm;
                    row += `<td>${amHl}</td><td>${pmHl}</td>`;
                } else {
                    row += `<td></td><td></td>`;
                }
            }
            
            // 
            if (!(k < 3 && l < firstDay)) {
                retenCount++;
            }
        }

        row += "</tr>";
        calendarRow += row;
        
        // 【重要】さっきのカウントリセット用の記述 3行目からようやくカウントが動き出す
        if (k % 3 === 2) {
            dateCount = retenCount;
        }
        
        if (dateCount > lastDate && k % 3 === 2) break;
    }
    
    return `
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
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  【カレンダー出力用イベントリスナー】＊＊ボタンクリック時の処理＊＊
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DOMのクラスを取得
const generateBtn = document.querySelector(".generate-btn");
const inputField = document.querySelector(".input-field");

// カレンダー出力のイベントリスナー
generateBtn.addEventListener("click", () => {
    // 年月欄が空の時の処理
    if (!monthInput.value) {
        alert("年月入力欄が空です。");
        return;
    }
    
    // データ入力欄を取得
    const inputValue = inputField.value.trim();
    
    // データ入力欄が空の時の処理
    if (inputValue === "") {
        alert("データ入力欄が空です。");
        return;
    }
    
    // 年月欄をハイフンで分割 その後に数値に変えて年と月を取得
    const [inputYear, inputMonth] = monthInput.value.split("-");
    const year = Number(inputYear);
    const month = Number(inputMonth);
    
    // 【重要】データ管理関数に入力欄のデータを渡す
    const cleanedCalendarData = keepDigitsAndBuildCalendar(inputValue);
    // 【重要】HTML生成関数へデータを渡す
    const calendarHtmlContent = generateCalendarHtml(year, month, cleanedCalendarData);
    
    // ダウンロードの処理
    const blob = new Blob([calendarHtmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${year}年${month}月_カレンダー.html`;
    a.click();
    URL.revokeObjectURL(url);
    
    inputField.value = "";
    alert(`カレンダーの生成／ダウンロードが完了しました。`);
});