"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodecEvents = exports.CodecFacade = exports.COOLDOWN = exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Action"] = 0] = "Action";
    MessageType[MessageType["Text"] = 1] = "Text";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
exports.COOLDOWN = 3;
var fastjson = require('fast-json-stringify');
var flatstr = require('flatstr');
var stringify = fastjson({
    title: 'Message',
    type: 'object',
    properties: {
        type: {
            type: 'string',
        },
        text: {
            type: 'string',
        },
        user: {
            type: 'string',
        },
        uid: {
            type: 'string',
        }
    },
});
var CodecFacade = /** @class */ (function () {
    function CodecFacade() {
    }
    CodecFacade.prototype.encode = function (message) {
        return flatstr(stringify(message));
    };
    CodecFacade.prototype.decode = function (message) {
        return JSON.parse(flatstr(message));
    };
    return CodecFacade;
}());
exports.CodecFacade = CodecFacade;
var CodecEvents;
(function (CodecEvents) {
    // client reads
    CodecEvents.CONNECT = "connect";
    CodecEvents.ACCEPT = "accept";
    CodecEvents.NEW_MESSAGE = "new_message";
    // server reads
    CodecEvents.SEND_MESSAGE = "input";
    CodecEvents.JOIN = "join";
    CodecEvents.DISCONNECT = "disconnect";
    CodecEvents.CONNECTION = "connection";
})(CodecEvents = exports.CodecEvents || (exports.CodecEvents = {}));
//# sourceMappingURL=codec_facade.js.map