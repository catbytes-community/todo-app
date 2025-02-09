import { useState } from "react";
import "./App.css";

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [updatedItem, setUpdatedItem] = useState();

  const handleChangeItem = (e) => {
    setNewItem(e.target.value);
  };

  const addItem = () => {
    setItems([...items, { id: items.length + 1, item: newItem }]);
    setNewItem("");
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const completeTask = (id) => {
    const completedTask = items.filter((item) => item.id === id)[0];

    completedTask.isTaskComplete = !completedTask.isTaskComplete;
    setItems([...items]);
  };

  const saveUpdatedItem = (id) => {
    const updatedTask = items.filter((item) => item.id === id)[0];
    updatedTask.item = updatedItem;
    updatedTask.isEdit = false;

    setItems([...items]);
    setUpdatedItem();
  };

  const handleClickEdit = (id, currValue) => {
    const editedItem = items.filter((item) => item.id === id)[0];
    editedItem.isEdit = true;
    setUpdatedItem(currValue);
    setItems([...items]);
  };

  const cancelEdit = (id) => {
    const editedItem = items.filter((item) => item.id === id)[0];
    editedItem.isEdit = false;
    setItems([...items]);
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
        <ul>
          {items.map((item) => {
            return (
              <li key={item.id}>
                <div className="todo-list-container">
                  {/* ternary operator */}
                  <p
                    style={{
                      textDecoration: item.isTaskComplete
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {item.item}
                  </p>
                  <button
                    onClick={() => completeTask(item.id)}
                    className="todo-item-btn"
                  >
                    {/* ternary operators for conditional rendering */}
                    {item.isTaskComplete ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="todo-item-btn"
                  >
                    Delete
                  </button>
                  <button
                    className="todo-item-btn"
                    onClick={() => handleClickEdit(item.id, item.item)}
                  >
                    Edit
                  </button>
                </div>

                {item.isEdit && (
                  <div>
                    <input
                      placeholder="Specify updated item"
                      value={updatedItem}
                      onChange={(e) => setUpdatedItem(e.target.value)}
                    />
                    <button onClick={() => saveUpdatedItem(item.id)}>
                      Save
                    </button>
                    <button onClick={() => cancelEdit(item.id)}>Cancel</button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
