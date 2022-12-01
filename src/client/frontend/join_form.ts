const Vue = require('vue/dist/vue');

import UserStore from './user_store';

export default Vue.extend({
    name: 'JoinForm',
    template: `
        <div>
            <header><h1>Chat</h1></header>
            <form @submit.prevent="submit" id="join-form">
                <div class="top-row">
                    <div id="name" class="input">
                        <input ref="name" v-model="name" :placeholder="namePlaceholder" />
                        <label>Name</label>
                    </div>
                    <div id="secret" class="input">
                        <input ref="secret" v-model="secret" :placeholder="secretPlaceholder" />
                        <label>Secret</label>
                    </div>
                </div>
                <button class="main" type="submit">JOIN CHAT</button>
            </form>
        </div>
    `,
    components: {},
    data: () => ({
        name: '',
        secret: '',
    }),
    created() {
        UserStore.load();
        this.name = UserStore.data.name;
        this.secret = UserStore.data.secret;
        this.$nextTick(() => { this.$refs.name.select(); });
    },
    methods: {
        submit() {
            UserStore.data.name = this.name;
            UserStore.data.secret = this.secret;
            UserStore.save();
            this.$emit('join', UserStore.dump());
        },
    },
    computed: {
        namePlaceholder() {
            return UserStore.data.defaultName;
        },
        secretPlaceholder() {
            return UserStore.data.defaultSecret;
        }
    }
});
