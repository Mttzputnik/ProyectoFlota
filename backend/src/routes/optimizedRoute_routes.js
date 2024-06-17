const optimizedRouteController = require('../controllers/OptimizedRouteController');
const express = require("express");
const router = express.Router();


// Rutas para las operaciones del CRUD de OptimizedRoute
router.post("/new-optimizedRoute", optimizedRouteController.createOptimizedRoute);
router.post('/calculate', optimizedRouteController.calculateRoute);
router.get("/", optimizedRouteController.listOptimizedRoute);
router.get("/:id", optimizedRouteController.getOptimizedRoute);
router.patch("/edit/:id", optimizedRouteController.editOptimizedRoute);
router.delete("/delete/:id", optimizedRouteController.deleteOptimizedRoute);

module.exports = router;
