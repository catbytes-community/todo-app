import PropTypes from "prop-types";
import { useContext } from "react";
import { TodoContext } from "../TodoContext";

TodoItem.propTypes = {
  item: PropTypes.object.isRequired,
  completeTask: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  handleClickEdit: PropTypes.func.isRequired,
  updatedItem: PropTypes.string.isRequired,
  onChangeEditItem: PropTypes.func.isRequired,
  saveUpdatedItem: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
};

export default function TodoItem({
  item,
  completeTask,
  deleteItem,
  handleClickEdit,
  updatedItem,
  onChangeEditItem,
  saveUpdatedItem,
  cancelEdit,
}) {
  const todoItems = useContext(TodoContext);
  console.log("todo items from context in Todo component: ", todoItems);

  return (
    <li key={item.id}>
      <div className="todo-list-container">
        {/* ternary operator */}
        <p
          style={{
            textDecoration: item.isTaskComplete ? "line-through" : "none",
          }}
        >
          {item.item}
        </p>
        <button onClick={() => completeTask(item.id)} className="todo-item-btn">
          {/* ternary operators for conditional rendering */}
          {item.isTaskComplete ? "Undo" : "Complete"}
        </button>
        <button onClick={() => deleteItem(item.id)} className="todo-item-btn">
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
            onChange={onChangeEditItem}
          />
          <button onClick={() => saveUpdatedItem(item.id)}>Save</button>
          <button onClick={() => cancelEdit(item.id)}>Cancel</button>
        </div>
      )}
    </li>
  );
}
