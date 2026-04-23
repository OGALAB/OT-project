// AEMツール開発
const tbodyItem = document.querySelector('tbody')
const trItem = document.querySelectorAll('tr').children[3];
const tdItems = trItem.querySelectorAll('td');
const button = document.createElement("button");
button.textContent = "貼り付け";
document.body.appendChild(button);
button.style.position = "fixed";
button.style.top = "10px";
button.style.right = "10px";

const Contents = {
    // ??? コピー時に「:」が無い。
}

async function copyPasteFunction() {
    if (tbodyItem.length === 0) {
        console.error("要素がありません");
    }

    try {
        const text = await navigator.clipboard.readText();

        tbodyItem.forEach(tableEl => {
        if () {
            // ()の中にどんな条件を入れたら良いのか分からない。
            // 何番目のtrを削除 & その中のtdも削除。
        } else if () {
            // ここも同じく()の中にどんな条件を入れたら良いのか分からない。
            // 何番目のtrを追加 & その中にtdも追加。
        }
        });

        const newtext = text.split(/\r?\n/);

        tbodyItem.forEach(tableEl => {
            // コロン「:」が実際のコピー内容に無かったので内部データ関係の書き方が分からない。
        });
    } catch (err) {
        console.error(err);
        tbodyItem.forEach(tableEl => tableEl.value = "失敗しました");
    }
}

button.addEventListener("click", copyPasteFunction);