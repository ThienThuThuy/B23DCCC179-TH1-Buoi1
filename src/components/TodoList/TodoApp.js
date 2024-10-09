import React, { useState, useEffect } from "react";

const TodoItem = ({ isEditing, onEditTodo, toggleEditing, todo, index, onToggleTodo, onDeleteTodo }) => {
  const [inputValue, setInputValue] = useState(todo.text);

  return (
    <li style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <input onClick={() => onToggleTodo(index)} type="checkbox" />
        </div>
        {!isEditing ? (
          <div>{todo.text}</div>
        ) : (
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue} // Controlled input
          />
        )}
        <div>
          <button
            onClick={() => {
              if (isEditing) {
                onEditTodo(index, inputValue);
              }
              toggleEditing(!isEditing);
            }}
          >
            {isEditing ? "Lưu lại" : "Chỉnh sửa"}
          </button>
          <button onClick={() => onDeleteTodo(index)}>Xóa</button>
        </div>
      </div>
    </li>
  );
};

const TodoList = ({ onEditTodo, isEditing, toggleEditing, todos, onToggleTodo, onDeleteTodo }) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem
          onEditTodo={onEditTodo}
          isEditing={isEditing}
          toggleEditing={toggleEditing}
          key={index}
          todo={todo}
          index={index}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
};

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const editTodo = (index, value) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, text: value } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div
      style={{
        margin: 24,
        width: 500,
        paddingRight: 24,
        height: 500,
        border: "3px solid #ccc",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>Todo List</h1>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Nội dung công việc"
        />
        <button onClick={addTodo}>Thêm</button>
      </div>
      <TodoList
        onEditTodo={editTodo}
        isEditing={isEditing}
        toggleEditing={setIsEditing}
        todos={todos}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
      />
    </div>
  );
};

export default TodoApp;
