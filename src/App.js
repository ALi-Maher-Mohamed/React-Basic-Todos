import ThemeToggle from "./components/ThemeToggle";
import TodoItem from "./components/TodoItem";
import { useState, useRef, useCallback, useEffect } from "react";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

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
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const handleDelete = (id) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="app-container">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      <div className="todo-app">
        <h1>Task Master</h1>

        <div className="input-section">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
            placeholder="Add a new task..."
          />
          <button className="add-btn" onClick={handleAddTodo}>
            Add
          </button>
        </div>

        <div className="todos-list">
          {todos.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                opacity: 0.6,
                color: "var(--stats-text)",
              }}
            >
              No tasks for today. Relax! ☕
            </p>
          ) : (
            <ul>
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleComplete}
                  onDelete={handleDelete}
                />
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

      <footer className="footer">
        Designed & Built by <b>Ali Maher</b>
      </footer>
    </div>
  );
}

export default App;
