export enum MESSAGE_TYPES {
   SUCCESS,
   ERROR,
}

export interface Message {
   id: number;
   type: MESSAGE_TYPES;
   message: string;
}

export interface MessageContextModel {
   messages: Message[];
   addMessage: (type: MESSAGE_TYPES, message: string) => void;
   removeMessage: (id: number) => void;
}
