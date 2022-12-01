"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
var socketio = require("socket.io");
var codec_facade_1 = require("../common/codec_facade");
var player_1 = require("./player");
var Room = /** @class */ (function () {
    function Room(server) {
        this.server = server;
        this.players = [];
        this.io = socketio(this.server);
        this.codec = new codec_facade_1.CodecFacade();
        this.setupListeners();
    }
    Object.defineProperty(Room.prototype, "playerCount", {
        get: function () {
            return this.players.length;
        },
        enumerable: false,
        configurable: true
    });
    Room.prototype.setupPlayer = function (player) {
        var _this = this;
        player.on(player_1.PlayerEvents.Join, function () {
            _this.players.push(player);
            player.socket.emit(codec_facade_1.CodecEvents.ACCEPT, player.uid);
            _this.broadcastMessage({
                user: player.name,
                uid: player.uid,
                type: codec_facade_1.MessageType.Action,
                text: "connected",
            });
        });
        player.on(player_1.PlayerEvents.Disconnect, function () {
            _this.players = _this.players.filter(function (member) { return member.uid !== player.uid; });
            _this.broadcastMessage({
                user: player.name,
                uid: player.uid,
                type: codec_facade_1.MessageType.Action,
                text: "disconnected",
            });
        });
        player.on(player_1.PlayerEvents.SendMessage, function (text) {
            _this.broadcastMessage({
                type: codec_facade_1.MessageType.Text,
                user: player.name,
                uid: player.uid,
                text: text,
            });
        });
        player.socket.emit(codec_facade_1.CodecEvents.CONNECT);
    };
    Room.prototype.broadcastMessage = function (message) {
        var payload = this.codec.encode(message);
        this.players.forEach(function (p) { return p.socket.emit(codec_facade_1.CodecEvents.NEW_MESSAGE, payload); });
    };
    Room.prototype.setupListeners = function () {
        var _this = this;
        this.io.sockets.on(codec_facade_1.CodecEvents.CONNECTION, function (socket) {
            _this.players = _this.players.filter(function (p) { return p.socket.connected; });
            var player = new player_1.Player(socket, _this);
            _this.setupPlayer(player);
        });
    };
    return Room;
}());
exports.Room = Room;
//# sourceMappingURL=room.js.map