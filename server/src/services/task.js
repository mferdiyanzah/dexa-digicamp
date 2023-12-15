const pool = require("../config/db");

const addTask = async (data) => {
  try {
    const { title, description, status } = data;
    const newTask = await pool.query(
      "INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *",
      [title, description, status]
    );
    return newTask.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

const getTasks = async () => {
  try {
    const tasks = await pool.query(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );
    return tasks.rows;
  } catch (err) {
    console.error(err.message);
  }
};

const deleteTask = async (id) => {
  try {
    const deletedTask = await pool.query("DELETE FROM tasks WHERE id = $1", [
      id,
    ]);
    return deletedTask;
  } catch (err) {
    console.error(err.message);
  }
};

const updateTask = async (id, data) => {
  try {
    const { title, description, status } = data;
    const updatedTask = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *",
      [title, description, status, id]
    );
    return updatedTask.rows[0];
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
