import React, { useEffect, useState } from 'react';
import './App.css';
import parseJsonData from './parseJsonData';
import jsonData from './input.json'; 

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(jsonData);
  }, []);

  return (
    <div className="App">
      {parseJsonData(data)}
    </div>
  );
}

export default App;