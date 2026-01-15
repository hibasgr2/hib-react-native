const express = require("express")
const router = express.Router()

const AdminController = require("../Controllers/AdminController")

router.post("/signup-admin",AdminController.Signup)
router.post("/login-admin",AdminController.LoginAdmin)
router.get("/stats",AdminController.getStats)

module.exports = router;