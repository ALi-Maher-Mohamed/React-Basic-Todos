import { useState, useRef, useCallback, useEffect } from "react";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

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

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = useCallback(() => {
    const trimmedText = inputValue.trim();
    if (!trimmedText) {
      inputRef.current?.focus();
      return;
    }

    const newTodo = {
      id: crypto.randomUUID(),
      text: trimmedText,
      completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setInputValue("");
    inputRef.current?.focus();
  }, [inputValue]);

  const handleToggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAddTodo();
  };

  return (
    <div className="app-container">
      {/* Theme Button */}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        title="Switch Theme"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <div className="todo-app">
        <h1>Task Master</h1>

        <div className="input-section">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task..."
            autoFocus
          />
          <button className="add-btn" onClick={handleAddTodo}>
            Add
          </button>
        </div>

        <div className="todos-list">
          {todos.length === 0 ? (
            <p style={{ textAlign: "center", opacity: 0.6, padding: "1rem" }}>
              No tasks for today. Relax! ☕
            </p>
          ) : (
            <ul>
              {todos.map((todo) => (
                <li key={todo.id} className={todo.completed ? "completed" : ""}>
                  <div
                    className="todo-text"
                    onClick={() => handleToggleComplete(todo.id)}
                  >
                    {todo.completed ? "✓ " : "○ "}
                    {todo.text}
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(todo.id)}
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
            {todos.filter((t) => t.completed).length} of {todos.length} tasks
            completed
          </div>
        )}
      </div>

      {/* Your Branding Footer */}
      <footer className="footer">
        Designed & Built by <b>Ali Maher</b>
      </footer>
    </div>
  );
}

export default App;
