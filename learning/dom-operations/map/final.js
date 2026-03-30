// 課題④　➡　× elseが必要。
let scores = [50, 70, 90];

let result4 = scores.map((num6) => {
    if (num6 > 80) {
        return "優秀";
    } else if (num6 >60) {
        return "合格";
    } else {
        return "不合格";
    }
});

console.log(result4);

// 課題⑤　➡　〇
let users2 = ["田中", "佐藤", "鈴木"];

let result5 = users2.map((num7) => {
    return "ID:" + num7;
});

console.log(result5);