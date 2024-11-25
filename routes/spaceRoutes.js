const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const { getSpaces, addSpace, updateSpace, deleteSpace } = require("../controllers/spaceController");


//public routes
router.get("/", getSpaces);

//authorized/protected routes for admins

router.post("/", validateToken, addSpace);
router.patch("/:id", validateToken, updateSpace);
router.delete("/:id", validateToken, deleteSpace);

module.exports = router;
