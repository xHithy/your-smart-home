import React from 'react';
import { SubSection } from '../../models/sectionModel';
import SingleRoom from './SingleRoom';

interface Props {
   rooms: SubSection[];
}

const RoomGrid = ({ rooms }: Props) => {
   return (
      <div className='grid grid-cols-4 gap-2'>
         {rooms.map((room, index) => (
            <SingleRoom
               key={index}
               room={room}
            />
         ))}
      </div>
   );
};

export default RoomGrid;
