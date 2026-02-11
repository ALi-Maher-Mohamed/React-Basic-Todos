import "./App.css";
import { useRef, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  const inputRef = useRef();
  const handleAddButton = () => {
    const text = inputRef.current.value;
    const newItem = { completed: false, text };
    setTodos([...todos, newItem]);
    inputRef.current.value = "";
  };

  const handleItemDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };
  const handleDeleteItem = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  console.log(todos);
  return (
    <div className="App">
      <div>
        <h2>ToDo List</h2>
        <div className="todos-container">
          <ul>
            {todos.map(({ text, completed }, index) => {
              return (
                <div className="item">
                  <li
                    key={index}
                    className={completed ? "done" : ""}
                    onClick={() => handleItemDone(index)}
                  >
                    {text}
                  </li>
                  <span
                    className="delete"
                    onClick={() => handleDeleteItem(index)}
                  >
                    ❌
                  </span>
                </div>
              );
            })}
          </ul>
        </div>
        <input ref={inputRef} placeholder="Enter Item..." />
        <button onClick={handleAddButton}>Add</button>
      </div>
    </div>
  );
}

export default App;
