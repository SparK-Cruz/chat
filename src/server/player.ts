import { Room } from './room';
import { CodecEvents, User, COOLDOWN } from '../common/codec_facade';
const EventEmitter = require('events');
const getUuid = require('uuid-by-string');

const SALT = "Genesis 11:9";

export module PlayerEvents {
    export const Join = 'join';
    export const Disconnect = 'disconnect';
    export const SendMessage = 'message';
}

export class Player extends EventEmitter implements User {
    public name: string = "Nemo";
    public uid: string = null;
    public lastMessage: number = null;

    public constructor(public socket: SocketIO.Socket, public room: Room) {
        super();
        this.setupListeners();
    }

    private setupListeners() {
        this.socket.on(CodecEvents.JOIN, (data: any) => {
            this.onJoin(data);
        });
        this.socket.on(CodecEvents.SEND_MESSAGE, (data: any) => {
            this.onInput(data);
        });
        this.socket.once(CodecEvents.DISCONNECT, () => {
            this.emit(PlayerEvents.Disconnect);
        });
        this.socket.once('error', () => {
            this.socket.disconnect(true);
        });
    }

    private onJoin(data: any) {
        this.name = data.name;
        this.uid = getUuid(data.uid + SALT);
        this.emit(PlayerEvents.Join);
    }

    private onInput(data: any) {
        const now = Math.floor(new Date().getTime() / 1000);
        if (now - this.lastMessage < COOLDOWN)
            return;
        
        this.lastMessage = now;
        this.emit(PlayerEvents.SendMessage, data);
    }
}
