"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vue = require('vue/dist/vue');
var user_store_1 = require("./user_store");
exports.default = Vue.extend({
    name: 'JoinForm',
    template: "\n        <div>\n            <header><h1>Chat</h1></header>\n            <form @submit.prevent=\"submit\" id=\"join-form\">\n                <div class=\"top-row\">\n                    <div id=\"name\" class=\"input\">\n                        <input ref=\"name\" v-model=\"name\" :placeholder=\"namePlaceholder\" />\n                        <label>Name</label>\n                    </div>\n                    <div id=\"secret\" class=\"input\">\n                        <input ref=\"secret\" v-model=\"secret\" :placeholder=\"secretPlaceholder\" />\n                        <label>Secret</label>\n                    </div>\n                </div>\n                <button class=\"main\" type=\"submit\">JOIN CHAT</button>\n            </form>\n        </div>\n    ",
    components: {},
    data: function () { return ({
        name: '',
        secret: '',
    }); },
    created: function () {
        var _this = this;
        user_store_1.default.load();
        this.name = user_store_1.default.data.name;
        this.secret = user_store_1.default.data.secret;
        this.$nextTick(function () { _this.$refs.name.select(); });
    },
    methods: {
        submit: function () {
            user_store_1.default.data.name = this.name;
            user_store_1.default.data.secret = this.secret;
            user_store_1.default.save();
            this.$emit('join', user_store_1.default.dump());
        },
    },
    computed: {
        namePlaceholder: function () {
            return user_store_1.default.data.defaultName;
        },
        secretPlaceholder: function () {
            return user_store_1.default.data.defaultSecret;
        }
    }
});
//# sourceMappingURL=join_form.js.map