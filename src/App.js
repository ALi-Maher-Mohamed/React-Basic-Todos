import { useState, useRef, useCallback, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  // حفظ التودوهات في localStorage كل ما يتغيروا
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = useCallback(() => {
    const trimmedText = inputValue.trim();

    if (!trimmedText) {
      alert("Please enter a valid todo item");
      inputRef.current?.focus();
      return;
    }

    const newTodo = {
      id: crypto.randomUUID(), // أفضل بكتير من index
      text: trimmedText,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]); // إضافة في البداية (أحدث أولاً)
    setInputValue("");
    inputRef.current?.focus();
  }, [inputValue]);

  const handleToggleComplete = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="app-container">
      <div className="todo-app">
        <h1>To-Do List</h1>

        <div className="input-section">
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What needs to be done?"
            autoFocus
          />
          <button onClick={handleAddTodo}>Add</button>
        </div>

        <div className="todos-list">
          {todos.length === 0 ? (
            <p className="empty-state">No tasks yet. Add one! ✨</p>
          ) : (
            <ul>
              {todos.map((todo) => (
                <li key={todo.id} className={todo.completed ? "completed" : ""}>
                  <div
                    className="todo-text"
                    onClick={() => handleToggleComplete(todo.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleToggleComplete(todo.id);
                      }
                    }}
                  >
                    {todo.text}
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(todo.id)}
                    aria-label={`Delete "${todo.text}"`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {todos.length > 0 && (
          <div className="stats">
            {todos.filter((t) => t.completed).length} / {todos.length} done
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
