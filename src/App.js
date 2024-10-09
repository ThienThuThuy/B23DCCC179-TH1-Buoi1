// src/App.js
import React from 'react';
import ImageSearchApp from './components/ImageSearchApp';
import RandomColorApp from './components/RandomColorApp';
import TodoApp from './components/TodoApp';

const App = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
      <ImageSearchApp />
      <RandomColorApp />
      <TodoApp />
    </div>
  );
};

export default App;
