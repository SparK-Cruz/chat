"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// using require because npm sucks with typings
var express = require("express");
var http_1 = require("http");
var room_1 = require("./server/room");
var app = express();
var server = new http_1.Server(app);
// Static files
app.use("/", express.static(__dirname + "/client"));
var STATIC_PORT = 8080;
var port = process.env.PORT || STATIC_PORT;
process.env.UV_THREADPOOL_SIZE = "30";
var room = new room_1.Room(server);
server.listen(port);
console.log("Serving on port " + port);
//# sourceMappingURL=start.js.map