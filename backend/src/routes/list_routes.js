const listController = require('../controllers/ListController');
const express = require("express");
const router = express.Router();


// Rutas para las operaciones del CRUD de List
router.post("/new-list", listController.createList);
router.get("/", listController.listList);
router.get("/:id", listController.getList);
router.patch("/edit/:id", listController.editList);
router.delete("/delete/:id", listController.deleteList);

module.exports = router;
