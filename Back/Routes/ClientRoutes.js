const express = require("express")
const router = express.Router()

const ClientController = require("../Controllers/ClientController")

router.post("/signup-client",ClientController.Signup)
router.post("/login-user",ClientController.LoginUser)
router.put("/changerStatut-user",ClientController.changerStatut)
router.get("/profile-user",ClientController.profileuser)
//router.post("/add-avis",ClientController.ajouterAvis)

module.exports = router;

