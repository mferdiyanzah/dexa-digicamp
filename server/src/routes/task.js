const router = require("express")();
const taskController = require("../controller/task");

router.post("/", taskController.addTask);
router.get("/", taskController.getTasks);
router.delete("/:id", taskController.deleteTask);
router.put("/:id", taskController.updateTask);

module.exports = router;
