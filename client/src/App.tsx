import { useEffect, useState } from "react";
import "./App.css";
import Task, { ITask, TaskStatus } from "./components/Task";
import { addTask, getTasks } from "./services/api";
import { message } from "antd";

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    handleGetTasks();
  }, []);

  const handleGetTasks = () => {
    getTasks().then((res) => {
      setTasks(res.data.tasks || []);
      setLoading(false);
    });
  };

  const handleAddTask = () => {
    const task: ITask = {
      id: Math.floor(Math.random() * 10000),
      title: newTask,
      description: "",
      status: TaskStatus.Active,
    };

    addTask(task).then((res) => {
      setTasks([...tasks, res.data.task]);
      message.success("Task added successfully");
      setNewTask("");
      handleGetTasks();
    });
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="bg-slate-500 h-full grid place-items-center">
      <div className="w-1/3 j">
        <div className="w-full flex justify-center">
          <input
            type="text"
            className="p-2 mr-1 w-full"
            placeholder="Add New Task"
            onKeyUp={handleEnter}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="bg-white p-2 w/1-4" onClick={handleAddTask}>
            Add
          </button>
        </div>
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : tasks.length === 0 ? (
          <p className="text-white">No tasks</p>
        ) : (
          tasks.map((task) => (
            <Task handleGetTasks={handleGetTasks} key={task.id} {...task} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
