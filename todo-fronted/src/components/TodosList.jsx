import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTodo, getAllTodos } from "../redux/actions/todosAction";

const TodosList = () => {
  const dispatch = useDispatch();
  const { isLoading, todos, error, isLoadingPost, isLoadingDelete } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(getAllTodos);
  }, [dispatch, isLoadingPost, isLoadingDelete]);

  // make a function to handle delete a todo
  const handleDeleteTodo = (todoId) => {
    dispatch(deleteTodo({ todoId }));
  };

  return (
    <div className="flex flex-col items-center justify-center w-[90%] md:w-[80%] lg:w-[50%] my-5">
      {/* Loading & Error Redux State */}
      {isLoading && <h2 className="text-black text-2xl font-bold my-2">Loading ... !!!</h2>}
      {error && <h2 className="text-red-500 text-2xl font-bold my-2">Error: {error.message}</h2>}

      {/* Todos List */}
      {todos.length === 0 ? (
        <h2 className="text-black text-2xl font-bold my-2">Sorry! No Todos Found.</h2>
      ) : (
        todos.todos.map((todo, index) => (
          <div key={index} className="bg-gray-100 w-full rounded-sm shadow-md p-5 my-2 transition-all duration-100 hover:shadow-lg">
            <h2 className="text-black text-2xl font-bold my-2">
              <span className="text-blue-500 font-bold">Title: </span>
              <span className={todo.completed ? "line-through decoration-green-500" : "none"}>{todo.title}</span>
            </h2>

            <p className="text-black text-lg font-normal text-justify my-2">
              <span className="text-blue-500 font-bold">Description: </span>
              {todo.description}
            </p>

            <div className="flex flex-row items-center justify-center mt-2">
              <Link to={`edit-todo/?id=${todo._id}`} className="bg-blue-500 text-white text-center rounded-sm shadow-md w-full my-2 py-2 mr-2 transition-all duration-100 hover:bg-blue-600">
                Edit
              </Link>

              <button className="bg-red-500 text-white rounded-sm shadow-md w-full my-2 py-2 ml-2 transition-all duration-100 hover:bg-red-600" onClick={() => handleDeleteTodo(todo._id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TodosList;
