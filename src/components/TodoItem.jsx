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
  const buttonStyle = "p-2 rounded text-white";

  return (
    <li key={item.id} className="list-disc ml-5">
      <div className="flex items-center gap-5">
        {/* ternary operator */}
        <p className={item.isTaskComplete && "line-through"}>{item.item}</p>
        <button
          onClick={() => completeTask(item.id)}
          className={`bg-green-500 ${buttonStyle}`}
        >
          {/* ternary operators for conditional rendering */}
          {item.isTaskComplete ? "Undo" : "Complete"}
        </button>
        <button
          onClick={() => deleteItem(item.id)}
          className="p-2 rounded bg-red-500 text-white"
        >
          Delete
        </button>
        <button
          onClick={() => handleClickEdit(item.id, item.item)}
          className="p-2 rounded bg-cyan-500 text-white"
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
            className="bg-white p-2 rounded w-[250px] mt-5 mr-5"
          />
          <button
            className={`${buttonStyle}  bg-indigo-500 mr-5`}
            onClick={() => saveUpdatedItem(item.id)}
          >
            Save
          </button>
          <button
            className={`${buttonStyle}  bg-pink-500`}
            onClick={() => cancelEdit(item.id)}
          >
            Cancel
          </button>
        </div>
      )}
    </li>
  );
}
