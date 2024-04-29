import React, { createContext, useState, useContext, ReactNode } from 'react';
import {
   Message,
   MESSAGE_TYPES,
   MessageContextModel,
} from '../models/messageContextModel';

const MessageContext = createContext<MessageContextModel>({
   messages: [],
   addMessage: () => {},
   removeMessage: () => {},
});

interface Props {
   children: ReactNode;
}

export const MessageProvider = ({ children }: Props) => {
   const [messages, setMessages] = useState<Message[]>([]);

   const addMessage = (type: MESSAGE_TYPES, message: string) => {
      const id = Date.now();
      setMessages([...messages, { id, type, message }]);
      setTimeout(() => removeMessage(id), 7000);
   };

   const removeMessage = (id: number) => {
      setMessages(messages.filter((msg) => msg.id !== id));
   };

   return (
      <MessageContext.Provider value={{ messages, addMessage, removeMessage }}>
         {children}
      </MessageContext.Provider>
   );
};

export const useMessages = () => useContext(MessageContext);
