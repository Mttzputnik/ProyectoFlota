const UserResponsabilityController = require('../controllers/UserResponsabilityController');
const express = require("express");
const router = express.Router();
const path = require('path');


// Rutas para las operaciones del CRUD de usuarios
router.post("/new-user", UserResponsabilityController.createUserResponsability);
router.get("/", UserResponsabilityController.listUserResponsability);
router.get("/:id", UserResponsabilityController.getUserResponsability);
router.patch("/edit/:id", UserResponsabilityController.editUserResponsability);

module.exports = router;
