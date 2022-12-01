"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vue = require('vue/dist/vue');
exports.default = Vue.extend({
    name: 'ChatRoom',
    template: "\n        <div>\n            <div id=\"chat-wrapper\">\n                <div :class=\"parseInt(message.type)?'text':'action'\" class=\"message\" v-for=\"message in messages\">\n                    <span class=\"user\" :style=\"{color: '#'+message.uid.substr(0,6)}\">{{ message.user }} <span class=\"uid\" :alt=\"message.uid\">{{ message.uid.substr(0,6) }}</span></span> {{ message.text }}\n                </div>\n            </div>\n            <form id=\"chat-form\" @submit.prevent=\"submit\">\n                <div id=\"text\" class=\"input\">\n                    <input type=\"text\" v-model=\"text\" />\n                    <label>Message</label>\n                </div>\n                <button class=\"main\" type=\"submit\" :disabled=\"disabled\">SEND</button>\n            </form>\n        </div>\n    ",
    props: [
        'messages',
        'cooldown'
    ],
    data: function () { return ({
        text: '',
        disabled: false,
    }); },
    methods: {
        submit: function () {
            var _this = this;
            if (!this.text)
                return;
            this.$emit('send', this.text);
            this.text = '';
            this.disabled = true;
            setTimeout(function () {
                _this.disabled = false;
            }, this.cooldown * 1000);
        },
    },
});
//# sourceMappingURL=chat_room.js.map