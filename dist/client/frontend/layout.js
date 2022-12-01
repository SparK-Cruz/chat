"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vue = require('vue/dist/vue');
var join_form_1 = require("./join_form");
var chat_room_1 = require("./chat_room");
var client_1 = require("../client");
exports.default = Vue.extend({
    name: 'Layout',
    template: "\n        <section id=\"layout\">\n            <JoinForm @join=\"joinChat\" v-if=\"connected == false\" />\n            <ChatRoom @send=\"sendMessage\" :cooldown=\"cooldown\" :messages=\"client.messages\" v-if=\"connected == true\" />\n        </section>\n    ",
    components: {
        JoinForm: join_form_1.default,
        ChatRoom: chat_room_1.default,
    },
    data: function () { return ({
        connected: false,
        client: new client_1.Client(),
        cooldown: client_1.COOLDOWN,
    }); },
    methods: {
        joinChat: function (options) {
            var _this = this;
            this.client.once('connect', function () {
                _this.connected = true;
            });
            this.client.once('disconnect', function () {
                _this.connected = false;
            });
            this.client.connect(options);
        },
        sendMessage: function (text) {
            this.client.sendMessage(text);
        },
    },
});
//# sourceMappingURL=layout.js.map