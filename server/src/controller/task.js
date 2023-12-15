const taskService = require("../services/task");

const addTask = async (req, res) => {
  try {
    const data = req.body;
    data.status = "Active";
    const newTask = await taskService.addTask(data);
    res.status(201).json({
      status: "success",
      data: {
        task: newTask,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks();
    res.status(201).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    await taskService.deleteTask(id);
    res.status(201).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (err) {
    console.error(err.message);
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedTask = await taskService.updateTask(id, data);
    res.status(201).json({
      status: "success",
      data: {
        task: updatedTask,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  addTask,
  getTasks,
  deleteTask,
  updateTask,
};
