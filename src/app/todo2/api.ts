import { ToDo } from "./types";

const baseUrl = "http://localhost:3001";

export const getAllTodos = async () => {
  const res = await fetch(`${baseUrl}/todos`, { cache: "no-store" });
  const todos = res.json();
  return todos;
};

export const addTodo = async (todo: ToDo): Promise<ToDo> => {
  const res = await fetch(`${baseUrl}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const newTodo = await res.json();
  return newTodo;
};

export const editTodo = async (
  id: string,
  newTaskName: string
): Promise<ToDo> => {
  const res = await fetch(`${baseUrl}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskName: newTaskName }),
  });
  const editedTodo = await res.json();
  return editedTodo;
};
