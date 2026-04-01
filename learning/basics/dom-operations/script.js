// 課題①
let message = document.getElementById("message");
let changeBtn = document.getElementById("changeBtn");

changeBtn.addEventListener("click", () => {
    message.textContent = "こんにちは";
});

// 課題②
let count = document.getElementById("count");
let plusBtn = document.getElementById("plusBtn");

plusBtn.addEventListener("click", () => {
    let current = Number(count.textContent);
    current++;
    count.textContent = current;
})

// 課題③
// let users = ["田中", "佐藤", "鈴木"];
// let list = document.getElementById("list");

// for (let i = 0; i < users.length; i++) {
//     let li = document.createElement("li");
//     li.textContent = users[i];
//     list.appendChild(li);
// }

// 課題③修正版
let users2 = ["田中", "佐藤", "鈴鹿"];
let list2 = document.getElementById("list");

users2.forEach((user) => {
    let li = document.createElement("li");
    li.textContent = user;
    list2.appendChild(li);
});