import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "./store/todo-slice";
import "./Todo.css";

const TodoApp = () => {
  const [inputText, setInputText] = useState("");
  
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const addTodoHandler = () => {
    if (inputText.trim() !== "") {
      dispatch(
        todoActions.addTodo({
          id: Date.now(),
          text: inputText,
        })
      );
      setInputText("");
    }
  };

  const removeTodoHandler = (id) => {
    dispatch(todoActions.removeTodo(id));
  };

  return (
    <div className="container">
      <h2>Todo</h2>
      <div className="input-container">
        <input type="text" value={inputText} onChange={handleInputChange} />
        <button onClick={addTodoHandler}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li>
            <span>{todo.text}</span>
            <button onClick={() => removeTodoHandler(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
