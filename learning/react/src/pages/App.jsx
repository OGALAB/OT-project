// App.jsx
import Btn from './Btn';
import Card from './Card';

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>マイ・アプリの画面</h1>
      <p>ここが全体のボス（ベース）になる場所です。</p>
      
      <Card />
      <div style={{ marginTop: '15px' }}>
        <Btn />
      </div>
    </div>
  );
}