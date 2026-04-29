// Tampermonkey code

const btn = document.createElement("button");
btn.innerHTML = "HTML生成ボタン";

document.body.appendChild(btn);

function generateHtml() {
    const blob = new Blob(["<h1>hello world</h1>"], { type: 'text/html' });
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: 'index.html' });
    a.click();
    URL.revokeObjectURL(a.href);
}

btn.addEventListener("click", generateHtml);