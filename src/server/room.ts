import * as socketio from 'socket.io';
import { Server } from 'http';

import { CodecFacade, CodecEvents, User, MessageType, Message } from '../common/codec_facade';
import { Player, PlayerEvents } from './player';

export class Room {
    public codec: CodecFacade;

    private io: SocketIO.Server;

    private players: Player[] = [];

    public get playerCount(): number {
        return this.players.length;
    }

    public constructor(private server: Server) {
        this.io = socketio(this.server);

        this.codec = new CodecFacade();

        this.setupListeners();
    }

    public setupPlayer(player: Player) {
        player.on(PlayerEvents.Join, () => {
            this.players.push(player);
            
            player.socket.emit(CodecEvents.ACCEPT, player.uid);
            this.broadcastMessage({
                user: player.name,
                uid: player.uid,
                type: MessageType.Action,
                text: "connected",
            });
        });
        player.on(PlayerEvents.Disconnect, () => {
            this.players = this.players.filter((member) => member.uid !== player.uid);
            this.broadcastMessage({
                user: player.name,
                uid: player.uid,
                type: MessageType.Action,
                text: "disconnected",
            });
        });
        player.on(PlayerEvents.SendMessage, (text: string) => {
            this.broadcastMessage({
                type: MessageType.Text,
                user: player.name,
                uid: player.uid,
                text: text,
            });
        });

        player.socket.emit(CodecEvents.CONNECT);
    }

    private broadcastMessage(message: Message) {
        const payload = this.codec.encode(message);
        this.players.forEach(p => p.socket.emit(CodecEvents.NEW_MESSAGE, payload));
    }

    private setupListeners() {
        this.io.sockets.on(CodecEvents.CONNECTION, (socket: SocketIO.Socket) => {
            this.players = this.players.filter(p => p.socket.connected);

            const player = new Player(socket, this);
            this.setupPlayer(player);
        });
    }
}
