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
exports.Client = exports.COOLDOWN = void 0;
var socketio = require("socket.io-client");
var codec_facade_1 = require("../common/codec_facade");
var events_1 = require("events");
var MAX_MESSAGES = 30;
exports.COOLDOWN = codec_facade_1.COOLDOWN;
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    function Client() {
        var _this = _super.call(this) || this;
        _this.messages = [];
        _this.remoteId = null;
        _this.options = null;
        _this.codec = null;
        _this.socket = null;
        _this.codec = new codec_facade_1.CodecFacade();
        return _this;
    }
    Object.defineProperty(Client.prototype, "connected", {
        get: function () {
            return !!this.remoteId;
        },
        enumerable: false,
        configurable: true
    });
    Client.prototype.connect = function (options) {
        this.options = options;
        if (!this.socket) {
            this.socket = socketio('', { autoConnect: false });
            this.bindEvents(this.socket);
        }
        this.socket.open();
    };
    Client.prototype.sendMessage = function (message) {
        this.socket.emit(codec_facade_1.CodecEvents.SEND_MESSAGE, message);
    };
    Client.prototype.disconnect = function () {
        this.remoteId = null;
        this.socket.disconnect();
    };
    Client.prototype.bindEvents = function (socket) {
        var _this = this;
        socket.on(codec_facade_1.CodecEvents.CONNECT, function () {
            _this.socket.emit(codec_facade_1.CodecEvents.JOIN, _this.options);
        });
        socket.on(codec_facade_1.CodecEvents.DISCONNECT, function () {
            _this.remoteId = null;
            _this.emit('disconnect');
        });
        socket.on(codec_facade_1.CodecEvents.ACCEPT, function (data) {
            _this.remoteId = data;
            _this.emit('connect');
        });
        socket.on(codec_facade_1.CodecEvents.NEW_MESSAGE, function (data) {
            _this.messages.push(_this.codec.decode(data));
            while (_this.messages.length > MAX_MESSAGES) {
                _this.messages.shift();
            }
            _this.emit('message');
        });
    };
    return Client;
}(events_1.EventEmitter));
exports.Client = Client;
//# sourceMappingURL=client.js.map