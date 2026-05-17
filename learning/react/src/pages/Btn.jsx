import { useState } from "react";

function Btn() {
    const [items, setItems] = useState([]);
    const ClickBtn = () => {
        setItems([...items, "テキスト"]);
    };
    
    return (
        <>
        <button onClick={ClickBtn}>テストボタン</button>
        
        <ul>
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    </>
    );
}

export default Btn;