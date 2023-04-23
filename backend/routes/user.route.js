const express = require("express");
const userController = require("../controller/user.controller");

const Router = express.Router();
Router.route("/").post(userController.createUser).get(userController.userList);
Router.route("/:id").get(userController.userDetail);
Router.route("/create-leave").post(userController.leaveApply);


module.exports = Router;