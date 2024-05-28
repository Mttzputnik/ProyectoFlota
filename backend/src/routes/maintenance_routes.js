const maintenanceController = require('../controllers/MaintenanceController');
const express = require("express");
const router = express.Router();


// Rutas para las operaciones del CRUD de Maintenance
router.post("/new-maintenance", maintenanceController.createMaintenance);
router.get("/", maintenanceController.listMaintenance);
router.get("/:id", maintenanceController.getMaintenance);
router.patch("/edit/:id", maintenanceController.editMaintenance);
router.delete("/delete/:id", maintenanceController.deleteMaintenance);

module.exports = router;
