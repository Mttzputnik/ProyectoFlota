const userController = require('../controllers/userController');
const express = require("express");
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/avatars");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage });

// Rutas para las operaciones del CRUD de usuarios
router.post("/new-user", upload.single('avatar'), userController.createUser);
router.get("/", userController.listUsers);
router.get("/:id", userController.getUser);
router.patch("/edit/:id", upload.single('avatar'), userController.editUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;