const Vue = require('vue/dist/vue');

import JoinForm from './join_form';
import ChatRoom from './chat_room';
import { Client, ClientOptions, COOLDOWN } from '../client';

export default Vue.extend({
    name: 'Layout',
    template: `
        <section id="layout">
            <JoinForm @join="joinChat" v-if="connected == false" />
            <ChatRoom @send="sendMessage" :cooldown="cooldown" :messages="client.messages" v-if="connected == true" />
        </section>
    `,
    components: {
        JoinForm,
        ChatRoom,
    },
    data: () => ({
        connected: false,
        client: new Client(),
        cooldown: COOLDOWN,
    }),
    methods: {
        joinChat(options: ClientOptions) {
            this.client.once('connect', () => {
                this.connected = true;
            });
            this.client.once('disconnect', () => {
                this.connected = false;
            });

            this.client.connect(options);
        },
        sendMessage(text: string) {
            this.client.sendMessage(text);
        },
    },
});
