const tripController = require('../controllers/TripController');
const express = require("express");
const router = express.Router();


// Rutas para las operaciones del CRUD de Trip
router.post("/new-trip", tripController.createTrip);
router.get("/", tripController.listTrip);
router.get("/:id", tripController.getTrip);
router.patch("/edit/:id", tripController.editTrip);
router.delete("/delete/:id", tripController.deleteTrip);

module.exports = router;
