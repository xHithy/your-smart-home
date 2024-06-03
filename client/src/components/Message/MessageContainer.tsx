import React from 'react';
import { useMessages } from '../../providers/MessageContext';
import SingleMessage from './SingleMessage';

const MessageContainer = () => {
   const { messages, removeMessage } = useMessages();

   return (
      <div className='fixed right-0 top-0 z-50 flex h-auto flex-col-reverse pt-5'>
         {messages.map((msg, index) => (
            <SingleMessage
               key={index}
               message={msg.message}
               type={msg.type}
               token={msg.token}
               onRemove={() => removeMessage(msg.id)}
            />
         ))}
      </div>
   );
};

export default MessageContainer;
