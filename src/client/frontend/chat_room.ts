const Vue = require('vue/dist/vue');

export default Vue.extend({
    name: 'ChatRoom',
    template: `
        <div>
            <div id="chat-wrapper">
                <div :class="parseInt(message.type)?'text':'action'" class="message" v-for="message in messages">
                    <span class="user" :style="{color: '#'+message.uid.substr(0,6)}">{{ message.user }} <span class="uid" :alt="message.uid">{{ message.uid.substr(0,6) }}</span></span> {{ message.text }}
                </div>
            </div>
            <form id="chat-form" @submit.prevent="submit">
                <div id="text" class="input">
                    <input type="text" v-model="text" />
                    <label>Message</label>
                </div>
                <button class="main" type="submit" :disabled="disabled">SEND</button>
            </form>
        </div>
    `,
    props: [
        'messages',
        'cooldown'
    ],
    data: () => ({
        text: '',
        disabled: false,
    }),
    methods: {
        submit() {
            if (!this.text)
                return;

            this.$emit('send', this.text);
            this.text = '';

            this.disabled = true;
            setTimeout(() => {
                this.disabled = false;
            }, this.cooldown * 1000);
        },
    },
});