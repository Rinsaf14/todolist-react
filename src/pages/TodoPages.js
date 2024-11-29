import React, { useEffect, useState } from "react";
import TodoHeader from "../components/TodoHeader";
import TodoList from "../components/TodoList";
import {
  fetchTodosApi,
  createTodosApi,
  deleteTodosApi,
  editTodosApi,
} from "../api/TodosApi";

const TodoPages = () => {
  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    const response = await fetchTodosApi();
    setTodos(response);
  };

  const createTodo = async (text) => {
    const todo = { text: text, completed: false };
    const response = await createTodosApi(todo);
    setTodos([...todos, response]);
  };
  const editTodo = async (data) => {
    const editedTodo = { ...data, completed: !data.completed };

    try {
      const response = await editTodosApi(data.id, editedTodo);

      const updatedTodos = todos.map((todo) => {
        if (todo.id === data.id) {
          return { ...todo, ...response }; // Perbarui dengan data dari response
        }
        return todo;
      });

      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };
  const deleteTodo = async (id) => {
    await deleteTodosApi(id);
    const updatedTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(updatedTodos);
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div>
      <TodoHeader addTodo={createTodo} />
      <TodoList todos={todos} editTodo={editTodo} deleteTodo={deleteTodo} />
    </div>
  );
};

export default TodoPages;
