const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");

const PORT = process.env.PORT;

const http = require("http");

const server = http.createServer(app);

server.on("listening", () => {
  console.log("Listening on port " + PORT);
});

server.listen(PORT);