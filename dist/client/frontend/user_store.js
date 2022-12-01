"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultName = 'Anon';
var defaultSecret = (10000 + Math.round(Math.random() * 89999)).toFixed(0);
exports.default = {
    data: {
        name: null,
        defaultName: defaultName,
        secret: null,
        defaultSecret: defaultSecret,
    },
    load: function () {
        this.data.name = localStorage.getItem('name') || "";
        this.data.secret = localStorage.getItem('secret') || "";
    },
    dump: function () {
        return {
            name: this.data.name || this.data.defaultName,
            uid: this.data.secret || this.data.defaultSecret,
        };
    },
    save: function () {
        localStorage.setItem('name', this.data.name || "");
        localStorage.setItem('secret', this.data.secret || this.data.defaultSecret);
    },
};
//# sourceMappingURL=user_store.js.map