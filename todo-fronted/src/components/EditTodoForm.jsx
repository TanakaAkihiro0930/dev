import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const EditTodoForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoCompleted, setTodoCompleted] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!searchParams.get("id")) {
      navigate("/");
    } else {
      axios
        .get(process.env.REACT_APP_API_BASE_URL + "/api/v1/todo/" + searchParams.get("id"))
        .then((res) => {
          setTodoTitle(res.data.todo.title);
          setTodoDescription(res.data.todo.description);
          setTodoCompleted(res.data.todo.completed);
        })
        .catch((err) => {
          setValidationError("Error: " + err.message);
        });
    }
  }, [searchParams, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // form validation check and set error message
    if (todoTitle.length === 0) {
      setValidationError("Title filed is required");
    } else if (todoDescription.length === 0) {
      setValidationError("Description filed is required");
    }

    // if validation is ok, then add new todo
    if (todoTitle && todoDescription) {
      axios
        .put(process.env.REACT_APP_API_BASE_URL + "/api/v1/todo/" + searchParams.get("id"), {
          title: todoTitle,
          description: todoDescription,
          completed: todoCompleted,
        })
        .then((res) => {
          if (res.status === 200) {
            setSuccessMessage("Todo updated successfully");

            // after 2 seconds, redirect to todo list
            setTimeout(() => {
              navigate("/");
            }, 2000);
          } else {
            setValidationError("Error: " + res.message);
          }
        })
        .catch((err) => {
          setValidationError("Error: " + err.message);
        });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setSuccessMessage("");
      setValidationError("");
    }, 3000);
  }, [successMessage, validationError]);

  return (
    <div className="bg-gray-100 w-[90%] md:w-[80%] lg:w-[50%] p-5 rounded-sm shadow-md">
      {/* Form Validation Message */}
      {validationError && (
        <div className="w-full h-[40px] bg-red-500 text-center py-2 rounded-sm">
          <p className="text-white text-md">{validationError}</p>
        </div>
      )}

      {/* Form Success Message */}
      {successMessage && (
        <div className="w-full h-[40px] bg-green-500 text-center py-2 rounded-sm">
          <p className="text-white text-md">{successMessage}</p>
        </div>
      )}

      <form
        className="flex flex-col items-center justify-center"
        onSubmit={(e) => {
          handleSubmit(e);
        }}>
        {/* TODOS TITLE INPUT FIELD */}
        <input type="text" className="w-full border-2 border-gray-500 px-5 py-2 rounded-sm my-2" placeholder="Add here todo title" value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} />

        {/* TODOS DESCRIPTION INPUT FIELD */}
        <textarea className="w-full border-2 border-gray-500 px-5 py-2 rounded-sm" cols="30" rows="3" placeholder="Add here todo description" value={todoDescription} onChange={(e) => setTodoDescription(e.target.value)} />

        {/* TODOS COMPLETED CHECKBOX INPUT FIELD */}
        <div className="w-full flex flex-row items-center justify-start my-4">
          <input
            type="checkbox"
            checked={todoCompleted}
            id="todoCheckBox"
            className="w-4 h-4 rounded-sm cursor-pointer"
            onChange={(e) => {
              setTodoCompleted(e.target.checked);
            }}
          />
          <label htmlFor="todoCheckBox" className="ml-2 text-md cursor-pointer">
            Todo Completed
          </label>
        </div>

        {/* TODOS UPDATE & BACK HOMEPAGE BUTTON */}
        <div className="w-full flex flex-row items-center justify-center">
          <button type="submit" className="bg-green-500 text-white rounded-sm shadow-md w-full my-2 py-2 mr-2 transition-all duration-100 hover:bg-green-600">
            Update Todo
          </button>

          <Link to="/" className="bg-blue-500 text-white text-center rounded-sm shadow-md w-full my-2 py-2 ml-2 transition-all duration-100 hover:bg-blue-600">
            Go Back Homepage
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditTodoForm;
