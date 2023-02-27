const authController = require("../controllers/auth.controller");

const express = require("express");
const Joi = require("joi");
const functions = require("../global/functions");

const router = express.Router();

router.post("/", authController.login);
router.post("/register", authController.register);

module.exports = router;
