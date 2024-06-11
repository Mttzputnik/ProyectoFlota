const warrantyController = require('../controllers/WarrantyController');
const express = require("express");
const router = express.Router();


// Rutas para las operaciones del CRUD de Warranty
router.post("/new-warranty", warrantyController.createWarranty);
router.get("/", warrantyController.listWarranty);
router.get("/:id", warrantyController.getWarranty);
router.patch("/edit/:id", warrantyController.editWarranty);
router.delete("/delete/:id", warrantyController.deleteWarranty);

module.exports = router;
