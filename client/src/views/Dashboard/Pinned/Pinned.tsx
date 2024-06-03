import React, { useEffect, useState } from 'react';
import { SubSectionWithSection } from '../../../models/sectionModel';
import { getPinnedSubsections } from '../../../queries/getPinnedSubSections';
import { API_RESPONSE } from '../../../queries/responses';
import { useMessages } from '../../../providers/MessageContext';
import { MESSAGE_TYPES } from '../../../models/messageContextModel';
import SingleRoom from '../../../components/Rooms/SingleRoom';

const Pinned = () => {
   const { addMessage } = useMessages();
   const [isLoading, setIsLoading] = useState(true);
   const [pinned, setPinned] = useState<SubSectionWithSection[]>([]);

   const queryGetPinned = async () => {
      setIsLoading(true);
      const response = await getPinnedSubsections();

      if (response.type === API_RESPONSE.SUCCESS) {
         setPinned(response.data);
      } else {
         addMessage(
            MESSAGE_TYPES.ERROR,
            'There was an error whilst fetching pinned rooms'
         );
      }

      setIsLoading(false);
   };

   useEffect(() => {
      queryGetPinned();
   }, []);

   return (
      <div className='flex flex-col text-gray-800'>
         <h2>Pinned rooms</h2>
         {isLoading ? (
            <span>Loading...</span>
         ) : (
            <div className='grid grid-cols-4'>
               {pinned.map((room, index) => (
                  <SingleRoom
                     key={index}
                     room={room}
                     onRefetch={() => queryGetPinned()}
                  />
               ))}
            </div>
         )}
      </div>
   );
};

export default Pinned;
