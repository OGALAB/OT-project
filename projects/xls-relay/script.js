const btn = document.getElementById("btn");
const targets = document.querySelectorAll(".target");
const labelMap = {
    "name": "名前",
    "age": "年齢",
    "email": "メール"
};

async function copyPasteFunction() {
    try {
        const text = await navigator.clipboard.readText();
        if (!text) return;

        const lines = text.split(/\r?\n/);
        const data = {};

        lines.forEach(line => {
            const [key, value] = line.split(":");
            if (key && value) {
                data[key.trim()] = value.trim();
            }
        });

        targets.forEach((el) => {
            const type = el.dataset.type;
            const label = labelMap[type];
            el.value = data[label] || "";
        });

    } catch (err) {
        console.error("エラーが発生しました", err);
    }
}

btn.addEventListener("click", copyPasteFunction);