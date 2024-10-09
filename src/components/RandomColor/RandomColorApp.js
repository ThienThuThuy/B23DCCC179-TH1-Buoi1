import React, { useState, useEffect } from "react";

const RandomColorApp = () => {
  const [color, setColor] = useState("#ffffff");
  const [history, setHistory] = useState([]); 
  const [autoChange, setAutoChange] = useState(false);
  const [intervalId, setIntervalId] = useState(null); 

  const getRandomColor = () => {
    const colors = ["red", "blue", "green"];

    return colors[Math.floor(Math.random() * 3)];
   
  };

  const changeColor = (newColor) => {
    setColor(newColor);
    setHistory((prevHistory) => [...prevHistory, newColor]);
  };

  const undoColor = () => {
    if (history.length > 1) {
      setHistory((prevHistory) => prevHistory.slice(0, -1));
      setColor(history[history.length - 2]);
    }
  };

  const toggleAutoChange = () => {
    setAutoChange(!autoChange);
  };

  useEffect(() => {
    if (autoChange) {
      const id = setInterval(() => {
        changeColor(getRandomColor());
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    return () => clearInterval(intervalId);
  }, [autoChange]);

  return (
    <div
      style={{
        padding: 24,

        margin: 24,
        width: 500,
        paddingRight: 24,
        height: 500,
        border: "3px solid #ccc",
      }}
    >
      <h1>Random Color</h1>
      <button onClick={() => changeColor(getRandomColor())}>
        Change Background Color
      </button>
      <button onClick={undoColor} disabled={history.length <= 1}>
        Undo
      </button>
      <button onClick={toggleAutoChange}>
        {autoChange ? "Stop Auto Change" : "Start Auto Change"}
      </button>


      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2>Current Color:</h2>
          <div
            style={{
              width: 50,
              height: 50,
              backgroundColor: color,
              borderRadius: 5,
            }}
          ></div>
        </div>

        <div>
          <h2>Color History:</h2>
          <ul>
            {history.map((col, index) => (
              <li key={index} style={{ color: col }}>
                {col}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RandomColorApp;
