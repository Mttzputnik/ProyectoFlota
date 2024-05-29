const documentController = require('../controllers/DocumentController');
const express = require("express");
const router = express.Router();


// Rutas para las operaciones del CRUD de Document
router.post("/new-document", documentController.createDocument);
router.get("/", documentController.listDocument);
router.get("/:id", documentController.getDocument);
router.patch("/edit/:id", documentController.editDocument);
router.delete("/delete/:id", documentController.deleteDocument);

module.exports = router;
