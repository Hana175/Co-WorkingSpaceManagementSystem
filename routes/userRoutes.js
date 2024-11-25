const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const { getCurrentUser, registerUser, loginUser } = require("../controllers/userController");

router.post("/register", registerUser); //register new user
router.post("/login", loginUser); //login, get token

//authorization/protected routes
router.get("/me", validateToken, getCurrentUser); // current logged in user

module.exports = router;
