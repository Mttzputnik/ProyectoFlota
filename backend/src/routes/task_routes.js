const taskController = require('../controllers/TaskController');
const express = require("express");
const router = express.Router();


// Rutas para las operaciones del CRUD de Task
router.post("/new-task", taskController.createTask);
router.get("/", taskController.listTask);
router.get("/:id", taskController.getTask);
router.patch("/edit/:id", taskController.editTask);
router.delete("/delete/:id", taskController.deleteTask);

module.exports = router;
