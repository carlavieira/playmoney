const { Router } = require("express");
const UserController = require("./controllers/UserCotroller");

const routes = Router();

routes.post("/newuser", UserController.store);
routes.get("/users", UserController.index);
routes.post("/login", UserController.login);
routes.post("/forgotpassword", UserController.forgotPassword);

module.exports = routes;
