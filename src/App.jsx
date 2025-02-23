import { useState, useContext } from "react";
import { TodoContext } from "./TodoContext";
import "./App.css";
import TodoItem from "./components/TodoItem";
import {
  addItem,
  deleteItem,
  completeItem,
  updateItem,
} from "./services/itemsService.js";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const counter = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

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

  const saveUpdatedItem = (id) => {
    const updatedTask = items.filter((item) => item.id === id)[0];
    updatedTask.item = updatedItem;
    updatedTask.isEdit = false;

    setItems([...items]);
    sessionStorage.setItem("items", JSON.stringify([...items]));
    setUpdatedItem();
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
    <div className="bg-teal-100 h-screen p-10">
      <h1 className="font-bold text-center">Counter</h1>
      <div className="flex justify-center items-center gap-5 mb-10">
        <button
          onClick={() => {
            dispatch({ type: "counter/decrement" });
          }}
          className="p-2 rounded bg-pink-500 text-white"
        >
          Decrease
        </button>
        <p>{counter}</p>
        <button
          onClick={() => {
            dispatch({ type: "counter/increment" });
          }}
          className="p-2 rounded bg-pink-500 text-white"
        >
          Increase
        </button>
      </div>
      <h1 className="font-bold mb-10 text-center">Todo App</h1>
      <button
        onClick={resetStorage}
        className="bg-teal-500 text-white p-2 rounded mb-5"
      >
        Reset local storage
      </button>
      <div>
        <input
          placeholder="Add a new todo"
          onChange={handleChangeItem}
          value={newItem}
          className="bg-white p-2 rounded w-[250px]"
        />
        <button
          onClick={() => {
            addItem(items, setItems, newItem, setNewItem);
          }}
          className="bg-teal-500 text-white p-2 rounded ml-2"
        >
          Add
        </button>
      </div>

      <div>
        <p className="mt-10 underline">Things to do today:</p>
        <ul>
          {JSON.parse(sessionStorage.getItem("items"))?.map((item) => {
            return (
              <TodoItem
                key={item.id}
                item={item}
                completeTask={() => completeItem(item.id, items, setItems)}
                deleteItem={() => deleteItem(item.id, items, setItems)}
                handleClickEdit={() =>
                  updateItem(
                    item.id,
                    item.item,
                    items,
                    setItems,
                    setUpdatedItem
                  )
                }
                updatedItem={updatedItem || ""}
                onChangeEditItem={(e) => setUpdatedItem(e.target.value)}
                saveUpdatedItem={() => saveUpdatedItem(item.id)}
                cancelEdit={() => cancelEdit(item.id)}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
