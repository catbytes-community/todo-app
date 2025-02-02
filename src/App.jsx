import { useState, useEffect } from "react";
import "./App.css";
import projects, { useProjects } from "./projects";

function App() {
  const [newItem, setNewItem] = useState(""); // not a persistent state
  const [items, setItems] = useState([]); // ['clean the house', 'webdev lesson']
  // [{ id: 1, item: 'clean the house' },{}]

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

  // useEffect(() => {
  //   console.log("projects: ", projects);

  //   // destructuring arrays
  //   const [a, b] = projects;
  //   // console.log("project1: ", a);
  //   // console.log("project2: ", b);
  //   // const [...allElements] = projects;
  //   // console.log("all elements of the array: ", allElements);

  //   // destructuring objects
  //   // const { projectName = "defaultProjectName" } = a;
  //   const { projectName: name } = a;
  //   // projects[0].projectName
  //   console.log("project name: ", name);

  //   // custom hooks in React
  // }, []);

  const [project] = projects;
  // console.log(useProjects(project));
  const [projectName, getOwnerName] = useProjects(project);
  // console.log(projectName);
  // getOwnerName();

  const completeTask = (id) => {
    // console.log("Complete task: ", id); // isTaskComplete boolean
    const completedTask = items.filter((item) => item.id === id)[0];
    console.log("Completed task: ", completedTask);

    completedTask.isTaskComplete = !completedTask.isTaskComplete;
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
          {items.map((item, index) => {
            return (
              <li key={index}>
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
                    {item.isTaskComplete ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="todo-item-btn"
                  >
                    Delete
                  </button>
                  <button className="todo-item-btn">Edit</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
