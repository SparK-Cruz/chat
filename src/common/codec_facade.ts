export interface User {
    uid: string,
    name: string,
}

export enum MessageType {
    Action,
    Text,
}

export interface Message {
    type: MessageType,
    user: string,
    uid: string,
    text: string,
}

export const COOLDOWN = 3;

const fastjson = require('fast-json-stringify');
const flatstr = require('flatstr');

const stringify = fastjson({
    title: 'Message',
    type: 'object',
    properties: {
        type: {
            type: 'string',
        },
        text: {
            type: 'string',
        },
        user: {
            type: 'string',
        },
        uid: {
            type: 'string',
        }
    },
});

export class CodecFacade {
    public constructor() { }

    public encode(message: Message): string {
        return flatstr(stringify(message));
    }

    public decode(message: string): Message {
        return <Message>JSON.parse(flatstr(message));
    }
}

export namespace CodecEvents {
    // client reads
    export const CONNECT = "connect";
    export const ACCEPT = "accept";
    export const NEW_MESSAGE = "new_message";

    // server reads
    export const SEND_MESSAGE = "input";
    export const JOIN = "join"
    export const DISCONNECT = "disconnect";
    export const CONNECTION = "connection";
}
