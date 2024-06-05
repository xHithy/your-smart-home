import React, { useEffect, useState } from 'react';
import { SubSectionWithSection } from '../../../models/sectionModel';
import { getPinnedSubsections } from '../../../queries/getPinnedSubSections';
import { API_RESPONSE } from '../../../queries/responses';
import { useMessages } from '../../../providers/MessageContext';
import { MESSAGE_TYPES } from '../../../models/messageContextModel';
import SingleRoom from '../../../components/Rooms/SingleRoom';
import { TbPin } from 'react-icons/tb';

const LoadingSkeletonItem = () => {
   return (
      <div className='h-[221px] animate-pulse rounded-md bg-gray-200'>
         <div className='h-[160px] rounded-md bg-gray-300' />
      </div>
   );
};

const LoadingSkeleton = () => {
   return (
      <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
         <LoadingSkeletonItem />
         <LoadingSkeletonItem />
         <LoadingSkeletonItem />
         <LoadingSkeletonItem />
      </div>
   );
};

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
         <div className='flex items-center space-x-1 pb-1 text-lg font-semibold'>
            <TbPin className='text-xl' />
            <span>Pinned rooms</span>
         </div>
         {isLoading ? (
            <LoadingSkeleton />
         ) : (
            <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
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
