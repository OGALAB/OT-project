// DOM側のid取得して変数化する。
const btn = document.getElementById("btn");
const list = document.getElementById("list");
const input = document.getElementById("input");

// id="btn"専用イベントリスナーを登録する。
btn.addEventListener("click", () => {
    let text = input.value; // <input>をJSの文字列に変換する。
    let li = document.createElement("li"); // liタグを新規追加する。
    li.textContent = text; // 新規で作ったliタグの中にinput内のテキストを流し込む。

    list.appendChild(li);  // DOMのulタグにliタグを追加する。

    input.value = ""; // inputに入力したテキストがリスト化されたら空欄に戻る。
});

// アロー関数だが、今回は呼び出し主がブラウザ（ページ上での操作）なので、returnは不要。