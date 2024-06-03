import React from 'react';
import { SubSection } from '../../models/sectionModel';
import SingleRoom from './SingleRoom';

interface Props {
   rooms: SubSection[];
   onRefetch: () => void;
}

const RoomGrid = ({ rooms, onRefetch }: Props) => {
   return (
      <div className='grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4'>
         {rooms &&
            rooms.map((room, index) => (
               <SingleRoom
                  key={index}
                  room={room}
                  onRefetch={onRefetch}
               />
            ))}
         {rooms.length === 0 && (
            <div className='col-span-4 flex w-full flex-col rounded-md bg-gray-200 px-2 py-4 text-center leading-tight text-gray-800'>
               <h2 className='font-semibold'>No rooms found...</h2>
               <p className='text-gray-500'>Try creating a new room!</p>
            </div>
         )}
      </div>
   );
};

export default RoomGrid;
