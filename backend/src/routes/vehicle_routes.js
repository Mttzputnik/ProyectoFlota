const vehicleController = require('../controllers/VehicleController');
const express = require("express");
const router = express.Router();


// Rutas para las operaciones del CRUD de Vehicle
router.post("/new-vehicle", vehicleController.createVehicle);
router.get("/", vehicleController.listVehicle);
router.get("/:id", vehicleController.getVehicle);
router.patch("/edit/:id", vehicleController.editVehicle);
router.delete("/delete/:id", vehicleController.deleteVehicle);

module.exports = router;
