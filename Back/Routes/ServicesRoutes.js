const express = require("express");
const router = express.Router();
const serviceController = require("../Controllers/ServiceController")



router.post("/add-service",serviceController.AddService)
router.get("/services", serviceController.getAllServices);
router.get("/services/:id", serviceController.getServiceDetails);
router.get("/filtre-service",serviceController.getServicesByCategory)
router.get("/servicesusers", serviceController.getServicesWithUsers);



module.exports = router;