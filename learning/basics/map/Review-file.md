# map
配列を変換する関数。

## マイコード
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

**
基本「　if () {} if () {}　」の書き方はしない。（エラーの原因になる。）
(num6)＝配列。returnも大体セット。
**