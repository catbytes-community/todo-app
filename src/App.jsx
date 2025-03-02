import { useState } from "react";
// import { TodoContext } from "./TodoContext";
import "./App.css";
import TodoItem from "./components/TodoItem";
import {
  // addItem,
  deleteItem,
  completeItem,
  updateItem,
} from "./services/itemsService.js";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const counter = useSelector((state) => state.counter.value);
  const tasks = useSelector((state) => state.tasks.value);

  const dispatch = useDispatch();

  // these are todo items from our context
  // const todoItems = useContext(TodoContext);

  const [newItem, setNewItem] = useState("");
  // local storage gives you data persistency
  const [items, setItems] = useState(
    JSON.parse(sessionStorage.getItem("items")) || []
  );
  const [updatedItem, setUpdatedItem] = useState();

  const handleChangeItem = (e) => {
    setNewItem(e.target.value);
  };

  // const saveUpdatedItem = (id) => {
  //   const updatedTask = items.filter((item) => item.id === id)[0];
  //   updatedTask.item = updatedItem;
  //   updatedTask.isEdit = false;

  //   setItems([...items]);
  //   sessionStorage.setItem("items", JSON.stringify([...items]));
  //   setUpdatedItem();
  // };

  // const cancelEdit = (id) => {
  //   const editedItem = items.filter((item) => item.id === id)[0];
  //   editedItem.isEdit = false;
  //   setItems([...items]);
  //   sessionStorage.setItem("items", JSON.stringify([...items]));
  // };

  const resetStorage = () => {
    sessionStorage.clear();
    setItems([]);
  };

  const addItemToRedux = () => {
    dispatch({
      type: "tasks/addTask",
      payload: { id: tasks.length + 1, item: newItem },
    });
    setNewItem("");
  };

  const deleteItemFromRedux = (id) => {
    dispatch({
      type: "tasks/deleteTask",
      payload: { id },
    });
  };

  const completeTaskInRedux = (id) => {
    dispatch({
      type: "tasks/completeTask",
      payload: id,
    });
  };

  const updateTaskInRedux = (id, currentItemValue) => {
    dispatch({
      type: "tasks/updateTask",
      payload: { id, item: currentItemValue },
    });
  };

  const saveUpdatedItemInRedux = (id) => {
    dispatch({
      type: "tasks/saveUpdatedItem",
      payload: { id, item: updatedItem },
    });
    setUpdatedItem("");
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
          // onClick={() => {
          //   addItem(items, setItems, newItem, setNewItem);
          // }}
          onClick={addItemToRedux}
          className="bg-teal-500 text-white p-2 rounded ml-2"
        >
          Add
        </button>
      </div>

      <div>
        <p className="mt-10 underline">Things to do today:</p>
        <ul>
          {tasks?.map((item) => {
            return (
              <TodoItem
                key={item.id}
                item={item}
                // completeTask={() => completeItem(item.id, items, setItems)}
                completeTask={() => completeTaskInRedux(item.id)}
                // deleteItem={() => deleteItem(item.id, items, setItems)}
                deleteItem={() => deleteItemFromRedux(item.id)}
                // handleClickEdit={() =>
                //   updateItem(
                //     item.id,
                //     item.item,
                //     items,
                //     setItems,
                //     setUpdatedItem
                //   )
                // }
                handleClickEdit={() => {
                  updateTaskInRedux(item.id, item.item);
                  setUpdatedItem(item.item);
                }}
                updatedItem={updatedItem || ""}
                onChangeEditItem={(e) => setUpdatedItem(e.target.value)}
                saveUpdatedItem={() => saveUpdatedItemInRedux(item.id)}
                cancelEdit={() => saveUpdatedItemInRedux(item.id)}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
