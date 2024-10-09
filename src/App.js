import React from 'react';
import ImageSearchApp from './components/ImageSearch/ImageSearchApp';
import RamdomColorApp from './components/RandomColor/RandomColorApp';
import TodoApp from './components/TodoList/TodoApp';
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <div className="app-container">
      <ImageSearchApp />
      <RamdomColorApp />
      <TodoApp />
    </div>
  );
};

export default App;
