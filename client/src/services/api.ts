import axios from "axios";
import { ITask } from "../components/Task";

const api = axios.create({
  baseURL: "http://localhost:8080/",
});

export const addTask = async (data: ITask) => {
  try {
    const res = await api.post("/task", data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getTasks = async () => {
  try {
    const res = await api.get("/task");
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteTask = async (id: number) => {
  try {
    const res = await api.delete(`/task/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateTask = async (id: number, data: ITask) => {
  try {
    const res = await api.put(`/task/${id}`, data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
