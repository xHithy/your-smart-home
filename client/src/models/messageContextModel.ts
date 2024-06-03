export enum MESSAGE_TYPES {
   SUCCESS,
   ERROR,
   CONNECTION_ATTEMPT,
}

export interface Message {
   id: number;
   type: MESSAGE_TYPES;
   token?: string;
   message: string;
}

export interface MessageContextModel {
   messages: Message[];
   addMessage: (type: MESSAGE_TYPES, message: string, token?: string) => void;
   removeMessage: (id: number) => void;
}
