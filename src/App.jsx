import { useState, useContext } from "react";
import { TodoContext } from "./TodoContext";
import "./App.css";
import TodoItem from "./components/TodoItem";

function App() {
  // these are todo items from our context
  const todoItems = useContext(TodoContext);
  console.log("todo items from context: ", todoItems);

  const [newItem, setNewItem] = useState("");
  // local storage gives you data persistency
  const [items, setItems] = useState(
    JSON.parse(sessionStorage.getItem("items")) || []
  );
  const [updatedItem, setUpdatedItem] = useState();

  const handleChangeItem = (e) => {
    setNewItem(e.target.value);
  };

  const addItem = () => {
    setItems([...items, { id: items.length + 1, item: newItem }]);
    sessionStorage.setItem(
      "items",
      JSON.stringify([...items, { id: items.length + 1, item: newItem }])
    );
    setNewItem("");
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    sessionStorage.setItem(
      "items",
      JSON.stringify(items.filter((item) => item.id !== id))
    );
  };

  const completeTask = (id) => {
    const completedTask = items.filter((item) => item.id === id)[0];

    completedTask.isTaskComplete = !completedTask.isTaskComplete;
    setItems([...items]);
    sessionStorage.setItem("items", JSON.stringify([...items]));
  };

  const saveUpdatedItem = (id) => {
    const updatedTask = items.filter((item) => item.id === id)[0];
    updatedTask.item = updatedItem;
    updatedTask.isEdit = false;

    setItems([...items]);
    sessionStorage.setItem("items", JSON.stringify([...items]));
    setUpdatedItem();
  };

  const handleClickEdit = (id, currValue) => {
    const editedItem = items.filter((item) => item.id === id)[0];
    editedItem.isEdit = true;
    setUpdatedItem(currValue);
    setItems([...items]);
    sessionStorage.setItem("items", JSON.stringify([...items]));
  };

  const cancelEdit = (id) => {
    const editedItem = items.filter((item) => item.id === id)[0];
    editedItem.isEdit = false;
    setItems([...items]);
    sessionStorage.setItem("items", JSON.stringify([...items]));
  };

  const resetStorage = () => {
    sessionStorage.clear();
    setItems([]);
  };

  return (
    <>
      <h1>Todo App</h1>
      <button
        style={{ display: "block", marginBottom: "10px" }}
        onClick={resetStorage}
      >
        Reset local storage
      </button>
      <input
        placeholder="Add a new todo"
        onChange={handleChangeItem}
        value={newItem}
      />
      <button onClick={addItem}>Add</button>

      <div>
        <p>Things to do today:</p>
        <ul>
          {JSON.parse(sessionStorage.getItem("items"))?.map((item) => {
            return (
              <TodoItem
                key={item.id}
                item={item}
                completeTask={() => completeTask(item.id)}
                deleteItem={() => deleteItem(item.id)}
                handleClickEdit={() => handleClickEdit(item.id, item.item)}
                updatedItem={updatedItem || ""}
                onChangeEditItem={(e) => setUpdatedItem(e.target.value)}
                saveUpdatedItem={() => saveUpdatedItem(item.id)}
                cancelEdit={() => cancelEdit(item.id)}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
