// UIエリア構築
const htmlContent = `
<button class="toggle-btn" style="display: block; background-color: #efefef; padding: 8px 12px; border-radius: 4px; cursor: pointer; margin-bottom: 5px; border: none; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">📅</button>
<div class="input-container" style="background-color: #ffffff; width: 200px; padding: 10px; border-radius: 8px; box-sizing: 0 4px 12px rgba(0,0,0,0.15); display: none;">
    <input type="month" style="display: block; width: 145px; color: #333; padding: 5px; margin-bottom: 10px; border-radius: 4px;">
    <label style="display: block; color: #333; font-size: 12px;">
        空日／休日を記入↓
        <input class="input-field" type="text" style="display: block; width: 170px; height: 25px; margin-top: 5px; margin-bottom: 10px;">
    </label>
    <p style="font-size: 10px; color: #666; margin-top: 0; margin-bottom: 10px; line-height: 1.2;">※入力例：1,2-4,5am,6pm,7~15休<br>※5-7pmなどの範囲指定も可</p>
    <button class="input-button" style="display: block; margin-bottom: 8px; background-color: #007bff; color: #ffffff; border-radius: 4px; border: none; padding: 4px 12px;">実行</button>
    <button style="width: 150px; height: 30px; background-color: #c82333; color: #ffffff; font-size: 12px; border: none; border-radius: 4px; padding: 6px 10px;">カレンダー生成ボタン</button>
</div>
`;

const div = document.createElement("div");
div.style.cssText = "position: fixed; top: 10px; left: 10px; z-index: 1000;"
div.innerHTML = htmlContent;
document.body.appendChild(div);

// UI機能実装
const tgBtn = document.querySelector(".toggle-btn");
const iptContainer = document.querySelector(".input-container");
let tgAction = true;

tgBtn.addEventListener("click", () => {
    if (tgAction) {
        iptContainer.style.display = "block";
        
        iptContainer.animate([
            {opacity: 0, transform: "translateY(-10px)"},
            {opacity: 1, transform: "translateY(0)"}
        ], {
            duration: 400,
            easing: "ease",
            fill: "forwards"
        });
    } else {
        const tgAnimation = iptContainer.animate([
            {opacity: 1, transform: "translateY(0)"},
            {opacity: 0, transform: "translateY(-10px)"}
        ], {
            duration: 300,
            easing: "ease",
            fill: "forwards"
        });

        tgAnimation.onfinish = () => {
            iptContainer.style.display = "none";
        };
    }
    tgAction = !tgAction;
});

// 入力データの整理
function inputFieldOrganize() {
    const inputField = document.querySelector(".input-field");
    
    // inputタグの入力データを取り出す
    const textInputVal = inputField.value.trim();
    // 読点が入っている入力データを分割
    const divisionInput = textInputVal.split(/[，,、\s]+/);
    // 入力データの不要な文字を削除
    const alphabetDeleteInput = divisionInput.replace(/[apmAPM]/g, "");
    // 大文字の数字を小文字に変換
    const cleanInput = alphabetDeleteInput.replace(/[０-９]/g, function(s) {
       return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); 
    });
    
}