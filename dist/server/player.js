"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = exports.PlayerEvents = void 0;
var codec_facade_1 = require("../common/codec_facade");
var EventEmitter = require('events');
var getUuid = require('uuid-by-string');
var SALT = "Genesis 11:9";
var PlayerEvents;
(function (PlayerEvents) {
    PlayerEvents.Join = 'join';
    PlayerEvents.Disconnect = 'disconnect';
    PlayerEvents.SendMessage = 'message';
})(PlayerEvents = exports.PlayerEvents || (exports.PlayerEvents = {}));
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(socket, room) {
        var _this = _super.call(this) || this;
        _this.socket = socket;
        _this.room = room;
        _this.name = "Nemo";
        _this.uid = null;
        _this.lastMessage = null;
        _this.setupListeners();
        return _this;
    }
    Player.prototype.setupListeners = function () {
        var _this = this;
        this.socket.on(codec_facade_1.CodecEvents.JOIN, function (data) {
            _this.onJoin(data);
        });
        this.socket.on(codec_facade_1.CodecEvents.SEND_MESSAGE, function (data) {
            _this.onInput(data);
        });
        this.socket.once(codec_facade_1.CodecEvents.DISCONNECT, function () {
            _this.emit(PlayerEvents.Disconnect);
        });
        this.socket.once('error', function () {
            _this.socket.disconnect(true);
        });
    };
    Player.prototype.onJoin = function (data) {
        this.name = data.name;
        this.uid = getUuid(data.uid + SALT);
        this.emit(PlayerEvents.Join);
    };
    Player.prototype.onInput = function (data) {
        var now = Math.floor(new Date().getTime() / 1000);
        if (now - this.lastMessage < codec_facade_1.COOLDOWN)
            return;
        this.lastMessage = now;
        this.emit(PlayerEvents.SendMessage, data);
    };
    return Player;
}(EventEmitter));
exports.Player = Player;
//# sourceMappingURL=player.js.map