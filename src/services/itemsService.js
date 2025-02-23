export const addItem = (items, setItems, newItem, setNewItem) => {
  setItems([...items, { id: items.length + 1, item: newItem }]);
  sessionStorage.setItem(
    "items",
    JSON.stringify([...items, { id: items.length + 1, item: newItem }])
  );
  setNewItem("");
};

export const deleteItem = (id, items, setItems) => {
  setItems(items.filter((item) => item.id !== id));
  sessionStorage.setItem(
    "items",
    JSON.stringify(items.filter((item) => item.id !== id))
  );
};

export const completeItem = (id, items, setItems) => {
  const completedTask = items.filter((item) => item.id === id)[0];

  completedTask.isTaskComplete = !completedTask.isTaskComplete;
  setItems([...items]);
  sessionStorage.setItem("items", JSON.stringify([...items]));
};

export const updateItem = (id, currValue, items, setItems, setUpdatedItem) => {
  const editedItem = items.filter((item) => item.id === id)[0];
  editedItem.isEdit = true;
  setUpdatedItem(currValue);
  setItems([...items]);
  sessionStorage.setItem("items", JSON.stringify([...items]));
};
