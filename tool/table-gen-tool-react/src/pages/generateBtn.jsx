// GenerateBtn.jsx
function GenerateBtn() {
  // CSS
  const styles = {
    btn: {
      display: 'block',
      padding: '4px 12px',
      backgroundColor: '#007bff',
      color: '#ffffff',
      borderRadius: '4px',
      border: 'none',
      marginBottom: '8px'
    }
  };

  return (
    <>
    <button styles={styles.btn}>実行</button>
    </>
  );
}

export default GenerateBtn;