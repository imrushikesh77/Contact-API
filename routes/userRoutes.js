const express = require("express");
const route = express.Router();
const {
    registerUser,
    loginUser,
    currentUser
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

route.post("/register", registerUser)
route.post("/login", loginUser)
route.get("/current",validateToken, currentUser)

module.exports = route;