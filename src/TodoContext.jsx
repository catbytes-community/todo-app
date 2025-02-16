import { createContext } from "react";

const todoItems = [
  {
    id: 1,
    item: "Learn React",
    isTaskComplete: false,
    isEdit: false,
  },
  {
    id: 2,
    item: "Learn Node",
    isTaskComplete: false,
    isEdit: false,
  },
  {
    id: 3,
    item: "Learn Express",
    isTaskComplete: false,
    isEdit: false,
  },
  {
    id: 4,
    item: "Learn MongoDB",
    isTaskComplete: false,
    isEdit: false,
  },
  {
    id: 5,
    item: "Learn Redux",
    isTaskComplete: false,
    isEdit: false,
  },
];

export const TodoContext = createContext(todoItems);
