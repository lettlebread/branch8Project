require("module-alias/register");
const express = require("express");
const session = require("express-session");

const { getMongoClient } = require("@root/utils/mongodb");
const { getRoutes } = require("@root/routes/routes");

let app;
let sessionInstance;

const setupApp = async () => {
  let mongoClient = await getMongoClient();

  if (typeof app === "undefined") {
    app = await generateApp(mongoClient);
  }

  return app;
};

const generateApp = async (mongoClient) => {
  const app = express();
  let userSession;

  try {
    userSession = getSession(mongoClient);
  } catch (e) {
    console.log(e);
  }

  app.use(express.json());

  app.use("*", userSession);

  app.use("/api/", getRoutes());

  return app;
};

const getSession = (mongoClient) => {
  if (typeof sessionInstance !== "undefined") {
    return sessionInstance;
  }

  sessionInstance = session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }});

  return sessionInstance;
};

exports.setupApp = setupApp;