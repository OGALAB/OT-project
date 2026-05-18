import { useState } from "react";

function Btn() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  const ClickBtn = () => {
    if (inputText.trim() === "") return;

    const newItem = {
      id: Date.now(),
      text: inputText,
      checked: false,
    };

    setItems([...items, newItem]);
    setInputText("");
  };

  const handleCheckChange = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const deleteCheckedItems = () => {
    const remainingItems = items.filter((item) => !item.checked);
    setItems(remainingItems);
  };

  return (
    <>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="項目を入力"
      />
      <button onClick={ClickBtn}>追加ボタン</button>

      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ listStyle: "none" }}>
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheckChange(item.id)}
              />
              {item.text}
            </label>
          </li>
        ))}
      </ul>

      <button onClick={deleteCheckedItems}>チェックした項目を一括削除</button>
    </>
  );
}

export default Btn;