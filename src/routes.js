const { Router } = require("express");
const UserController = require("./controllers/UserCotroller");

const routes = Router();

routes.post("/users", UserController.store);
routes.get("/users", UserController.index);

module.exports = routes;
