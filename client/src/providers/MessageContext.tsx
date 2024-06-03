import React, {
   createContext,
   useState,
   useContext,
   ReactNode,
   useEffect,
} from 'react';
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
   const messageTimeouts = new Set<number>();

   const addMessage = (
      type: MESSAGE_TYPES,
      message: string,
      token?: string
   ) => {
      const id = Date.now();
      setMessages((prevMessages) => [
         ...prevMessages,
         { id, type, message, token },
      ]);
      const timeoutId = window.setTimeout(() => removeMessage(id), 7000);
      messageTimeouts.add(timeoutId);
   };

   const removeMessage = (id: number) => {
      setMessages((prevMessages) =>
         prevMessages.filter((msg) => msg.id !== id)
      );
   };

   useEffect(() => {
      return () => {
         messageTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
         messageTimeouts.clear();
      };
   }, []);

   return (
      <MessageContext.Provider value={{ messages, addMessage, removeMessage }}>
         {children}
      </MessageContext.Provider>
   );
};

export const useMessages = () => useContext(MessageContext);
