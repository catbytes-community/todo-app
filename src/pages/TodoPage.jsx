import { useState, useEffect } from "react";
import TodoItem from "../components/TodoItem";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TodoPage() {
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks.value); // redux store

  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState("");

  const [updatedItem, setUpdatedItem] = useState();

  // on page load
  useEffect(() => {
    // check auth
    if (!localStorage.getItem("isAuth")) {
      navigate("/");
    }
    // get all items from database
    const getAllItems = async () => {
      const response = await axios.get("http://localhost:3001/items", {
        params: {
          userId: localStorage.getItem("userId"),
        },
      });
      console.log("Response from server: ", response);
      // save to redux
      dispatch({
        type: "tasks/setTasks",
        payload: response.data.map((item) => {
          return {
            id: item.id,
            item: item.item,
            isTaskComplete: item.istaskcomplete,
          };
        }),
      });
    };

    getAllItems();
  }, []);

  const handleChangeItem = (e) => {
    setNewItem(e.target.value);
  };

  const addItemToRedux = async () => {
    // save to database API call
    const response = await axios.post("http://localhost:3001/items", {
      item: newItem,
      userId: localStorage.getItem("userId"),
      isTaskComplete: false,
    });
    console.log("Save item response: ", response);

    dispatch({
      type: "tasks/addTask",
      payload: {
        id: response.data.id,
        item: response.data.item,
        userId: localStorage.getItem("userId"),
        isTaskComplete: false,
      },
    });
    setNewItem("");
  };

  const deleteItemFromRedux = async (id) => {
    dispatch({
      type: "tasks/deleteTask",
      payload: { id },
    });

    // delete from database API call
    const response = await axios.delete(`http://localhost:3001/items/${id}`);
    console.log("response delete", response);
  };

  const completeTaskInRedux = async (id, isTaskComplete) => {
    console.log("Complete task: ", id, isTaskComplete);
    dispatch({
      type: "tasks/completeTask",
      payload: id,
    });

    // update task in database to be completed
    const response = await axios.put(`http://localhost:3001/items/${id}`, {
      isTaskComplete: !isTaskComplete,
    });

    console.log("response complete task:", response);
  };

  const updateTaskInRedux = (id, currentItemValue, isTaskComplete) => {
    dispatch({
      type: "tasks/updateTask",
      payload: { id, item: currentItemValue, isTaskComplete },
    });
  };

  const saveUpdatedItemInRedux = async (id, isTaskComplete) => {
    console.log("Save updated item: ", id, isTaskComplete);
    dispatch({
      type: "tasks/saveUpdatedItem",
      payload: { id, item: updatedItem, isTaskComplete },
    });

    // save updated item in database API call
    const response = await axios.put(`http://localhost:3001/items/${id}`, {
      item: updatedItem,
      isTaskComplete,
    });

    console.log("response from server update: ", response);

    setUpdatedItem("");
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  console.log("TASKS: ", tasks);

  return (
    <div className="bg-teal-100 h-screen p-10">
      <h1 className="font-bold mb-10 text-center">Todo App</h1>
      <button className="underline mb-5" onClick={logout}>
        Logout
      </button>
      <div>
        <input
          placeholder="Add a new todo"
          onChange={handleChangeItem}
          value={newItem}
          className="bg-white p-2 rounded w-[250px]"
        />
        <button
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
                completeTask={() =>
                  completeTaskInRedux(item.id, item?.isTaskComplete)
                }
                deleteItem={() => deleteItemFromRedux(item.id)}
                handleClickEdit={() => {
                  updateTaskInRedux(item.id, item.item, item.istaskcomplete);
                  setUpdatedItem(item.item);
                }}
                updatedItem={updatedItem || ""}
                onChangeEditItem={(e) => setUpdatedItem(e.target.value)}
                saveUpdatedItem={() =>
                  saveUpdatedItemInRedux(item.id, item.isTaskComplete)
                }
                cancelEdit={() => saveUpdatedItemInRedux(item.id)}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default TodoPage;
