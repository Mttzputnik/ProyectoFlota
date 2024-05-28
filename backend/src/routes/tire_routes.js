const tireController = require('../controllers/TireController');
const express = require("express");
const router = express.Router();


// Rutas para las operaciones del CRUD de Tire
router.post("/new-tire", tireController.createTire);
router.get("/", tireController.listTire);
router.get("/:id", tireController.getTire);
router.patch("/edit/:id", tireController.editTire);
router.delete("/delete/:id", tireController.deleteTire);

module.exports = router;
