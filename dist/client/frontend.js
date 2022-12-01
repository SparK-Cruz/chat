"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vue = require('vue/dist/vue');
var layout_1 = require("./frontend/layout");
new Vue({
    el: '#app',
    template: "\n        <Layout />\n    ",
    components: { Layout: layout_1.default },
});
//# sourceMappingURL=frontend.js.map