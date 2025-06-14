// backend/src/routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getOneTask);
router.post("/", taskController.createTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
