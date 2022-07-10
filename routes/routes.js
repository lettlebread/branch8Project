require("module-alias/register");
const express = require("express");
const router = express.Router();
const sessionController = require("@root/controllers/session");
const userController = require("@root/controllers/user");
const guestController = require("@root/controllers/guest");

const { e } = require("@root/routes/errorWrapper")

const getRoutes = () => {
  router.post(`/sessions`, e(sessionController.login));
  router.post(`/users`, e(userController.register));
  router.get(`/users`, e(userController.userArea));
  router.get(`/guests`, e(guestController.guestArea));

  router.all("*", (req, res) => {
    res.status(404).json({ error: "api path not found" });
  });

  return router;
};

exports.getRoutes = getRoutes;