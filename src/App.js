import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState();
  const todoBody = useRef();
  const todoDone = useRef();

  const fetchTodo = () => {
    fetch("http://localhost:3001/todo")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTodos(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => fetchTodo(), []);

  const todoList = (todoData) => {
    return todoData.map((t) => {
      return (
        <tr key={t.id}>
          <td>{t.id}</td>
          <td>{t["body"]}</td>
          <td>{t["done"].toString()}</td>

          <td>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              view
            </a>
          </td>

          <td>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                deleteTodo(t.id);
              }}
            >
              delete
            </a>
          </td>
          <td>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              modify
            </a>
          </td>
        </tr>
      );
    });
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:3001/todo/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      // .then((response) => response.json())
      .then(() => {
        fetchTodo();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const addTodo = (body, done) => {
    fetch("http://localhost:3001/todo/create", {
      method: "POST",
      body: JSON.stringify({
        body: body,
        done: done,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        fetchTodo();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      Todos:
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(todoBody.current, todoDone.current);
        }}
      >
        <input
          type="text"
          placeholder="todo body..."
          onChange={(e) => (todoBody.current = e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="true ? false"
          onChange={(e) => (todoDone.current = e.target.value)}
        ></input>
        <button type="submit">create</button>
      </form>
      {/* {todos === undefined ? "undefiend" : todos[0]["body"]}{" "} */}
      {todos === undefined ? (
        "undefiend"
      ) : (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>body</th>
              <th>done</th>
            </tr>
          </thead>
          <tbody>{todoList(todos)}</tbody>
        </table>
      )}
    </div>
  );
}
export default App;
