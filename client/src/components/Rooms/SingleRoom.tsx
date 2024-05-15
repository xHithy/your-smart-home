import React, { useState } from 'react';
import { SubSection } from '../../models/sectionModel';
import { TbDots } from 'react-icons/tb';
import OptionDialog from '../OptionDialog/OptionDialog';

interface Props {
   room: SubSection;
}

const URL_PATH = process.env.REACT_APP_BASE_URL;

const SingleRoom = ({ room }: Props) => {
   const [isOptionDialog, setIsOptionDialog] = useState<boolean>(false);
   return (
      <div className='flex w-full cursor-pointer flex-col overflow-hidden rounded-md bg-gray-200 text-gray-900'>
         <div className='relative h-40 w-full overflow-hidden bg-gray-300'>
            <img
               className='h-full w-full object-cover object-center'
               src={`${URL_PATH}${room.category.image_path}`}
               alt={room.name}
            />
            <span
               className='absolute right-3 top-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-gray-200 text-gray-800 transition-colors duration-200 hover:bg-blue-600 hover:text-gray-100'
               onClick={(e) => {
                  setIsOptionDialog(true);
                  e.stopPropagation();
               }}
            >
               <TbDots className='text-2xl' />
            </span>
            {isOptionDialog && (
               <OptionDialog
                  top={12}
                  right={12}
                  onDelete={(e) => {
                     e.stopPropagation();
                     setIsOptionDialog(false);
                  }}
                  onClose={(e) => {
                     e.stopPropagation();
                     setIsOptionDialog(false);
                  }}
                  onEdit={(e) => {
                     e.stopPropagation();
                     setIsOptionDialog(false);
                  }}
               />
            )}
         </div>
         <div className='flex flex-col p-3'>
            <span>{room.name}</span>
         </div>
      </div>
   );
};

export default SingleRoom;
