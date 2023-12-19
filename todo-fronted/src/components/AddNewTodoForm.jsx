import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../redux/actions/todosAction";

const AddNewTodoForm = () => {
  const dispatch = useDispatch();
  const { isLoadingPost, successPost, errorPost } = useSelector((state) => state.todos);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      setTodoTitle("");
      setTodoDescription("");
      setValidationError("");

      // add new todo to the list
      dispatch(createTodo({ todoTitle, todoDescription }));
    }
  };

  useEffect(() => {
    if (successPost) {
      setSuccessMessage(successPost.message);
    } else if (errorPost) {
      setValidationError("Error: " + errorPost.message);
    }
  }, [successPost, errorPost]);

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

        {/* TODOS ADD BUTTON */}
        <button type="submit" className="bg-blue-500 text-white rounded-sm shadow-md w-full my-2 py-2 transition-all duration-100 hover:bg-blue-600">
          {isLoadingPost ? "Adding ... !!!" : "Add Todo"}
        </button>
      </form>
    </div>
  );
};

export default AddNewTodoForm;
