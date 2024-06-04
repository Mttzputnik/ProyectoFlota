const vehicleController = require('../controllers/VehicleController');
const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configurar almacenamiento de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads/images"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombrar el archivo para evitar conflictos
  }
});
const upload = multer({ storage: storage });


// Rutas para las operaciones del CRUD de Vehicle
router.post("/new-vehicle", upload.single('image'), vehicleController.createVehicle);
router.get("/", vehicleController.listVehicle);
router.get("/:id", vehicleController.getVehicle);
router.patch("/edit/:id", upload.single('image'), vehicleController.editVehicle);
router.delete("/delete/:id", vehicleController.deleteVehicle);

module.exports = router;
