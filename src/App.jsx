import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [newItem, setNewItem] = useState(""); // not a persistent state
  const [items, setItems] = useState([]); // ['clean the house', 'webdev lesson']
  // [{ id: 1, item: 'clean the house' },{}]

  const handleChangeItem = (e) => {
    setNewItem(e.target.value);
  };

  const addItem = () => {
    setItems([...items, { id: items.length + 1, item: newItem }]);
    console.log("Items: ", items);
    setNewItem("");
  };

  useEffect(() => {
    console.log("Items from useEffect: ", items);
  }, [items]);

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <>
      <h1>Todo App</h1>
      <input
        placeholder="Add a new todo"
        onChange={handleChangeItem}
        value={newItem}
      />
      <button onClick={addItem}>Add</button>

      <div>
        <p>Things to do today:</p>
        {items.map((item, index) => {
          return (
            <div key={index} className="todo-list-container">
              <p>{item.item}</p>
              <button className="todo-item-btn">Complete</button>
              <button
                onClick={() => deleteItem(item.id)}
                className="todo-item-btn"
              >
                Delete
              </button>
              <button className="todo-item-btn">Edit</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
