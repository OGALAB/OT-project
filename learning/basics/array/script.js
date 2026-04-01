// 課題①　〇
let animals = ["犬", "猫", "うさぎ"];

for (let i = 0; i < animals.length; i++) {
    console.log(animals[i]);
}

// 課題②　×
// let number = [10, 20, 30, 40];

// for (let i = 0; i <= 40; i++) {
//     number += i;
//     console.log(i);
// }

let number2 = [10,20, 30, 40];
let sum = 0;

for (let i = 0; i < number2.length; i++) {
    sum += number2[i];
}

console.log(sum);

// 課題③　〇
let users = ["田中", "佐藤", "鈴木"];

for (let i = 0; i < users.length; i++) {
    console.log(users[i] + "さん");
}

// 課題④
let number3 = [10, 25, 60, 5, 80];

for (let i =  0; i < number3.length; i++) {
    if (number3[i] >=60) {
        console.log(number3[i]);
    }
}

// 課題⑤
let users2 = ["田中", "佐藤", "鈴木", "山田"];

for (let i = 0; i < users2.length; i++) {
    if (users2[i] !== "田中") {
        console.log(users2[i]);
    }
}
