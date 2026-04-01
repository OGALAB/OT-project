// 課題⑥
// let numbers = [30, 70, 55, 90, 40];
// let smt = 0;

// for (let i =0; i < numbers.length; i++) {
//     if (numbers[i] >= 60) {
//         console.log(numbers[i]);
//     smt += numbers[i];
//         console.log(smt);
//     }
// }

// 正解
let numbers2 = [30, 70, 55, 90, 40];
let sum2 = 0;

for (let i = 0; i <numbers2.length; i++) {
    if (numbers2[i] >= 60) {
        console.log(numbers2[i]);
        sum2 += numbers2[i];
    }
}

console.log(sum2);

// 課題⑦
// let users3 = ["田中", "佐藤", "田中", "鈴木"];

// for (let i = 0; i < users3.length; i++) {
//     if (users3[i] !== "田中") {
//         console.log(users3[i]);
//         console.log(users3.length);
//     }
// }

// 正解
let user4 = ["田中", "佐藤", "田中", "鈴木"];
let count = 0;

for (let i = 0; i < user4.length; i++) {
    if(user4[i] !== "田中") {
        console.log(user4[i]);
        count++;
    }
}

console.log(count);