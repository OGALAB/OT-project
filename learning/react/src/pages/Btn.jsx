import { useState } from "react";

function Btn() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);
  
  const clickBtn = () => {
    if (inputText.trim() === "") return;
    
    const newItem = {
      id: Date.now(),
      text: inputText,
      checked: false
    };
    
    setItems([...items, newItem]);
    setInputText("");
  };
  
  const checkChange = (id) => {
    setItems(
      items.map((item) => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  
  const removeBtn = () => {
    const cleanItems = items.filter((item) => !item.checked);
    setItems(cleanItems);
  };
  
  return (
    <>
    <input
      type="text"
      value={inputText}
      onChange={ (e) => setInputText(e.target.value)}
      placeholder="入力欄"
    />
    <button onClick={clickBtn}>追加ボタン</button>
    
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => checkChange(item.id)}
            />
            {item.text}
          </label>
        </li>
      ))}
    </ul>
    
    <button onClick={removeBtn}>削除ボタン</button>
    </>
  );
};

export default Btn;