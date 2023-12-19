import axios from "axios";
import { DELETE_TODOS_FAILURE, DELETE_TODOS_REQUEST, DELETE_TODOS_SUCCESS, GET_TODOS_FAILURE, GET_TODOS_REQUEST, GET_TODOS_SUCCESS, POST_TODOS_FAILURE, POST_TODOS_REQUEST, POST_TODOS_SUCCESS } from "../constants/todosConstant";

// make a action to gets all todos
export const getAllTodos = async (dispatch) => {
  dispatch({ type: GET_TODOS_REQUEST });

  try {
    const res = await axios.get(process.env.REACT_APP_API_BASE_URL + "/api/v1/todos-all");
    dispatch({ type: GET_TODOS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_TODOS_FAILURE, payload: error });
  }
};

// make a action to create a todo
export const createTodo = (payload) => async (dispatch) => {
  dispatch({ type: POST_TODOS_REQUEST });

  try {
    const res = await axios.post(process.env.REACT_APP_API_BASE_URL + "/api/v1/todo/new", {
      title: payload.todoTitle,
      description: payload.todoDescription,
    });
    dispatch({ type: POST_TODOS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: POST_TODOS_FAILURE, payload: error });
  }
};

// make a action to delete a todo
export const deleteTodo = (payload) => async (dispatch) => {
  dispatch({ type: DELETE_TODOS_REQUEST });

  try {
    const res = await axios.delete(process.env.REACT_APP_API_BASE_URL + "/api/v1/todo/" + payload.todoId);
    dispatch({ type: DELETE_TODOS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: DELETE_TODOS_FAILURE, payload: error });
  }
};
