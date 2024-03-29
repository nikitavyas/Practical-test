"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var auth_middleware_1 = require("../middleware/auth.middleware");
var auth_controller_1 = require("../controllers/auth.controller");
var user_controller_1 = require("../controllers/user.controller");
router.post("/login", auth_controller_1.login);
router.get("/users", auth_middleware_1.verifyToken, user_controller_1.getUsers);
router.get("/user/:id", user_controller_1.getUser);
router.post("/user", user_controller_1.createUser);
router.put("/user/:id", user_controller_1.updateUser);
router.delete("/user/:id", user_controller_1.deleteUser);
exports.default = router;
