// using require because npm sucks with typings
const express = require("express");
import { Server } from "http";
import { Room } from "./server/room";

const app = express();
const server = new Server(app);

// Static files
app.use("/", express.static(__dirname + "/client"));

const STATIC_PORT = 8080;
const port = process.env.PORT || STATIC_PORT;

process.env.UV_THREADPOOL_SIZE = "30";

const room = new Room(server);
server.listen(port);

console.log("Serving on port " + port);
