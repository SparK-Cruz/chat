const Vue = require('vue/dist/vue');
import Layout from './frontend/layout';

new Vue({
    el: '#app',
    template: `
        <Layout />
    `,
    components: { Layout },
});
