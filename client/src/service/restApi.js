import axios from "axios";
import api from "./apiInterceptor.js";

const API_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:8000/api/v1";

export const signinUser = async (email, password) => {
  // console.log("aa rha h", API_URL);
  return await axios.post(
    `${API_URL}/user/signin`,
    { email, password },
    { withCredentials: true }
  );
};
export const getUserInfo = async () => {
  return await api.get("/user/getUser");
  // return await axios.get(`${API_URL}/user/getUser`, {
  //   withCredentials: true, // Include credentials if needed
  // });
};

export const signupUser = async (
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) => {
  return await axios.post(`${API_URL}/user/signup`, {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });
};

export const reFreshAccessToken = async () => {
  return await axios.get(`${API_URL}/user/regenerateAccessToken`, {
    withCredentials: true, // Include credentials if needed
  });
};

export const getNewsDetails = async () => {
  return new EventSource(`${API_URL}/news/getNews`);
  // return await api.get(`/news/getNews`);
  // return await axios.get(`${API_URL}/news/getNews`, { withCredentials: true });
};

export const getHolidayDetails = async (month, year) => {
  return await api.get(`/holiday/getHoliday`, {
    params: { month, year }, // Pass query parameters here
  });
  // return await axios.get(`${API_URL}/holiday/getHoliday`, {
  //   params: { month, year }, // Pass query parameters here
  //   withCredentials: true, // Include credentials if needed
  // });
};

export const getStocksDetails = async () => {
  return new EventSource(`${API_URL}/stock/getStocks`);
  // return await api.get(`/stock/getStocks`);
  // return await axios.get(`${API_URL}/stock/getStocks`, {
  //   withCredentials: true, // Include credentials if needed
  // });
};

export const getAiResponse = async (input) => {
  return await api.post(
    `${API_URL}/ai/getAiResponse`,
    { input } // Pass query parameters here
  );
  // Make the request to the server with streaming enabled
  // const response = await axios.post(
  //   `${API_URL}/ai/getAiResponse`,
  //   { input }, // Pass query parameters here
  //   { withCredentials: true } // Include credentials if needed
  // );

  // return response; // This will be a ReadableStream
};

export const addNewTodoItem = async (item) => {
  return await api.post(
    `${API_URL}/todo/addTodoItem`,
    item // Pass query parameters here
  );
  // console.log(item);
  // const response = await axios.post(
  //   `${API_URL}/todo/addTodoItem`,
  //   item, // Pass query parameters here
  //   { withCredentials: true } // Include credentials if needed
  // );

  // return response; // This will be a ReadableStream
};

export const deleteTodoItem = async (_id) => {
  return await api.delete(
    `/todo/deleteTodoItem/${_id}` // ID in URL path
  );
  // const response = await axios.post(
  //   `${API_URL}/todo/addTodoItem`,
  //   item, // Pass query parameters here
  //   { withCredentials: true } // Include credentials if needed
  // );

  // return response;
};

export const changeTodoItemStatus = async (_id, value) => {
  return await api.put(
    `/todo/changeTodoItemStatus`,
    { _id, status: value } // Pass query parameters here
  );

  // const response = await axios.put(
  //   `${API_URL}/todo/changeTodoItemStatus`,
  //   { _id, status: value }, // Pass query parameters here
  //   { withCredentials: true } // Include credentials if needed
  // );

  // return response;
};

export const updateTodoItem = async (
  _id,
  title,
  description,
  priority,
  dueDate
) => {
  return await api.put(
    `/todo/updateTodoItem`,
    { _id, title, description, priority, dueDate } // Pass query parameters here
  );

  // const response = await axios.put(
  //   `${API_URL}/todo/updateTodoItem`,
  //   { _id, title, description, priority, dueDate }, // Pass query parameters here
  //   { withCredentials: true } // Include credentials if needed
  // );

  // return response;
};

export const getAllTodoItems = async () => {
  return await api.get(`/todo/getTodoItem`);
  // return await axios.get(`${API_URL}/todo/getTodoItem`, {
  //   withCredentials: true, // Include credentials if needed
  // });
};
