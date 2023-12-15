const express = require("express");
const taskRouter = require("./src/routes/task");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/task", taskRouter);

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
