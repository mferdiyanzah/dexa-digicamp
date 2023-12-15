import { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { deleteTask, updateTask } from "../services/api";
import { Checkbox, message } from "antd";
import EditModal from "./EditModal";

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  Active = "active",
  Completed = "completed",
}

interface ITaskProps extends ITask {
  handleGetTasks: () => void;
}

export default function Task({
  id,
  title,
  description,
  status,
  handleGetTasks,
}: ITaskProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleDeleteTask = () => {
    deleteTask(id)
      .then(() => {
        message.success("Task deleted successfully");
        handleGetTasks();
      })
      .catch(() => {
        message.error("Error deleting task");
      });
  };

  const updateStatus = () => {
    updateTask(id, {
      id,
      title,
      description,
      status:
        status === TaskStatus.Active ? TaskStatus.Completed : TaskStatus.Active,
    }).then(() => {
      message.success("Task updated successfully");
      handleGetTasks();
    });
  };

  return (
    <div className="bg-white p-2 rounded-lg mt-1 flex justify-between">
      <div className="flex justify-start gap-3">
        <Checkbox
          defaultChecked={status === TaskStatus.Completed}
          onChange={updateStatus}
        />
        <div
          className={
            status === TaskStatus.Completed ? "line-through text-gray-300" : ""
          }
        >
          <h3 className="font-semibold">{title}</h3>
          <h5 className="text-sm">
            {description || (
              <span className="text-gray-400">No Description</span>
            )}
          </h5>
        </div>
      </div>

      <p className="gap-2 flex justify-center items-center">
        <span className="text-sm capitalize">{status}</span>
        <AiFillEdit className="cursor-pointer" onClick={() => setOpen(true)} />
        <AiFillDelete
          className="text-red-400 cursor-pointer"
          onClick={handleDeleteTask}
        />
      </p>
      <EditModal
        handleGetTasks={handleGetTasks}
        task={{ id, title, description, status }}
        open={open}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
}
