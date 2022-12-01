import * as socketio from 'socket.io-client';

import { CodecFacade, CodecEvents, Message, COOLDOWN as CODEC_COOLDOWN } from '../common/codec_facade';
import { EventEmitter } from 'events';

export interface ClientOptions {
    name: string,
    secret: string,
}

const MAX_MESSAGES = 30;
export const COOLDOWN = CODEC_COOLDOWN;

export class Client extends EventEmitter {
    public messages: Message[] = [];

    private remoteId: number = null;
    private options: ClientOptions = null;
    private codec: CodecFacade = null;

    private socket: SocketIOClient.Socket = null;

    public constructor() {
        super();
        this.codec = new CodecFacade();
    }

    public get connected() {
        return !!this.remoteId;
    }

    public connect(options: ClientOptions) {
        this.options = options;

        if (!this.socket) {
            this.socket = socketio('', { autoConnect: false });

            this.bindEvents(this.socket);
        }

        this.socket.open();
    }

    public sendMessage(message: string) {
        this.socket.emit(CodecEvents.SEND_MESSAGE, message);
    }

    public disconnect() {
        this.remoteId = null;
        this.socket.disconnect();
    }

    private bindEvents(socket: SocketIOClient.Socket) {
        socket.on(CodecEvents.CONNECT, () => {
            this.socket.emit(CodecEvents.JOIN, this.options);
        });

        socket.on(CodecEvents.DISCONNECT, () => {
            this.remoteId = null;
            this.emit('disconnect');
        });

        socket.on(CodecEvents.ACCEPT, (data: any) => {
            this.remoteId = data;
            this.emit('connect');
        });

        socket.on(CodecEvents.NEW_MESSAGE, (data: string) => {
            this.messages.push(this.codec.decode(data));

            while (this.messages.length > MAX_MESSAGES) {
                this.messages.shift();
            }

            this.emit('message');
        });
    }
}
