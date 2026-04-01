// let numbers = [1, 2, 3];

// numbers.map((num) => {
//     console.log(num);
// });

// let numbers2 = [1, 2, 3];

// let result = numbers2.map((num2) => {
//     return num2 * 2;
// });

// console.log(result);

// 課題①　➡　〇
let numbers3 = [1, 2, 3, 4];

let result2 = numbers3.map((num3) => {
   return num3 * 2; 
});

console.log(result2);

// 課題②　➡　×
// let users = ["田中", "佐藤", "鈴木"];

// users.map((num4) => {
//     console.log(num4 + "さん");
// });

let users = ["田中", "佐藤", "鈴木"];

let result = users.map((num4) => {
    return num4 + "さん";
});

console.log(result);

// 課題③　➡　×
// let prices = [100, 200, 300];

// let result3 = prices.map((num5) => {
//     return num5 + num5 * .1;
// });

// console.log(result3);

let prices = [100, 200, 300];

let result3 = prices.map((num5) => {
    return num5 * 1.1;
});

console.log(result3);