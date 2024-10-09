// store.js
import { createStore, combineReducers } from 'redux';

// Reducer cho Image Search
const imageSearchReducer = (state = { images: [], query: '' }, action) => {
  switch (action.type) {
    case 'SET_IMAGES':
      return { ...state, images: action.payload };
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

// Reducer cho Random Color
const randomColorReducer = (state = { color: '#ffffff', history: [] }, action) => {
  switch (action.type) {
    case 'CHANGE_COLOR':
      return {
        ...state,
        color: action.payload,
        history: [...state.history, action.payload],
      };
    case 'UNDO_COLOR':
      const newHistory = state.history.slice(0, -1);
      return {
        ...state,
        color: newHistory[newHistory.length - 1] || '#ffffff',
        history: newHistory,
      };
    default:
      return state;
  }
};

// Reducer cho Todo List
const todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { text: action.payload, completed: false }];
    case 'TOGGLE_TODO':
      return state.map((todo, index) =>
        index === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'EDIT_TODO':
      return state.map((todo, index) =>
        index === action.payload.index ? { ...todo, text: action.payload.text } : todo
      );
    case 'DELETE_TODO':
      return state.filter((_, index) => index !== action.payload);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  imageSearch: imageSearchReducer,
  randomColor: randomColorReducer,
  todos: todoReducer,
});

const store = createStore(rootReducer);

export default store;
