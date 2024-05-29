const fuelConsumptionController = require('../controllers/FuelConsumptionController');
const express = require("express");
const router = express.Router();


// Rutas para las operaciones del CRUD de FuelConsumption
router.post("/new-fuelConsumption", fuelConsumptionController.createFuelConsumption);
router.get("/", fuelConsumptionController.listFuelConsumption);
router.get("/:id", fuelConsumptionController.getFuelConsumption);
router.patch("/edit/:id", fuelConsumptionController.editFuelConsumption);
router.delete("/delete/:id", fuelConsumptionController.deleteFuelConsumption);

module.exports = router;
