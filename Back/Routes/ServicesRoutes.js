const express = require("express");
const router = express.Router();
const serviceController = require("../Controllers/ServiceController")



router.post("/add-service",serviceController.AddService)
router.get("/services", serviceController.getAllServices);
router.get("/service/:id", serviceController.getServiceDetails);
router.get("/filtre-service",serviceController.getServicesByCategory)
router.get("/servicesusers", serviceController.getServicesWithUsers);
router.delete("/service/reject/:requestId", serviceController.rejectService);
router.put("/service/approve/:requestId",serviceController.approveService);
router.get("/servicebyuserId/:requestId",serviceController.getServiceByUserId);




module.exports = router;