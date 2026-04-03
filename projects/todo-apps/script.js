const input = document.getElementById("input");
const btn = document.getElementById("btn");
const ullist = document.getElementById("ullist");

// 🔥 外で管理
let todos = [];

function addTodo() {
    let text = input.value;

    if (text === "") {
        console.log("入力してください");
        return;
    }

    // データ追加
    todos.push(text);

    render(); // 画面更新

    input.value = "";
}

// 🔥 描画処理（超重要）
function render() {
    ullist.innerHTML = ""; // 一旦リセット

    todos.forEach((todo, index) => {
// forEachもfilterと同じく引数が複数必要な物。filterの時と意味が違うように見えるが、番号を受け取るという事自体は同じなので意味は同じ。ただそのための目的が違うだけ。
// forEach：「削除ボタンが押された瞬間に、どのデータを消せばいいか迷わないようにするため」に番号を受け取った。二番目ならJSの仕様上「1」という番目を受け取る。filter：「一人ずつ照らし合わせるため」に全体の番号を受け取った。
        let li = document.createElement("li");
        li.textContent = todo;

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "削除";

        removeBtn.addEventListener("click", () => {
            // データ削除
            todos = todos.filter((_, i) => i !== index);
// filterで番号を選別する場合、性質上引数は2つ必要になる。（最大3つ）今回は1つめの引数が不要だが引数は書かないといけないので引数「_」で回避。
// 記述の意味：クリックイベント発生時に改めて配列の全体を確認する為の引数が「i」。既に作成済みのリストの引数が「index」。
// filterは条件にあった物を選んで残すコード。「条件：i !== index」 ⇒ この条件と一致した物を残し、一致しなかった物（===）を消している。
            render(); 
// render(); は ullist.appendChild(li); と役割は同じだが、あちらは「追加」。こちらは一度まっさらにして最新データで作り直している。
        });

        li.appendChild(removeBtn);
        ullist.appendChild(li);
    });
}

// クリック時のイベントとして、addTodo関数が呼び起こされる。addTodo関数にrender関数起動も入っているので、要はクリックで全て起動するという事。
btn.addEventListener("click", addTodo);

// 通常追加ボタンを押さないとタスクが増えないが、以下によってエンターキーでもタスクが追加出来るようになる。
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});


// 関数を分けた理由
// render：「画面」を最新にする（配列をHTMLにする）。addTodo：「データ」を加工する（配列に1つ足す）。
// 要はrender関数で料理を作り、addTodoで提供しているという事。役割が違う。このことからaddTodo関数の中にrender関数起動の記述がある。
// addTodo関数を起動すると、render関数も起動される。