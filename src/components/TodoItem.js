import React from "react";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={todo.completed ? "completed" : ""}>
      <div className="todo-text" onClick={() => onToggle(todo.id)}>
        {todo.completed ? "✓ " : "○ "}
        {todo.text}
      </div>
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        ×
      </button>
    </li>
  );
};

export default TodoItem;
