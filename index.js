require("module-alias/register");

const { setupApp } = require("@root/main/app");

const port = process.env.PORT || 8080;

const serveDev = async () => {
  const app = await setupApp();
  const server = require("http").createServer(app);

  server.listen(port, (err) => {
    if (err) throw err;
    console.log("Server listening at port %d", port);
  });
};

serveDev();
