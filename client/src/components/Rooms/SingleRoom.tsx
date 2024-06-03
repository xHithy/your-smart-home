import React, { useState } from 'react';
import { SubSection, SubSectionWithSection } from '../../models/sectionModel';
import { TbDots, TbPin } from 'react-icons/tb';
import OptionDialog from '../OptionDialog/OptionDialog';
import DialogContainer from '../Dialog/DialogContainer';
import EditSubsectionDialog from '../Dialog/EditSubsectionDialog';
import { deleteRoom } from '../../queries/deleteRoom';
import { API_RESPONSE } from '../../queries/responses';
import { MESSAGE_TYPES } from '../../models/messageContextModel';
import { useMessages } from '../../providers/MessageContext';
import SubSectionDialog from '../Dialog/SubSectionDialog/SubSectionDialog';
import { postPinSubSection } from '../../queries/postPinSubSection';

interface Props {
   room: SubSection | SubSectionWithSection;
   onRefetch: () => void;
}

const URL_PATH = process.env.REACT_APP_BASE_URL;

const SingleRoom = ({ room, onRefetch }: Props) => {
   const { addMessage } = useMessages();
   const [isOptionDialog, setIsOptionDialog] = useState<boolean>(false);
   const [isEditDialog, setIsEditDialog] = useState<boolean>(false);
   const [isViewDialog, setIsViewDialog] = useState<boolean>(false);

   const queryDeleteRoom = async () => {
      const response = await deleteRoom(room.id);

      if (response.type === API_RESPONSE.SUCCESS) {
         addMessage(MESSAGE_TYPES.SUCCESS, response.data);
         onRefetch();
      }
      if (response.type === API_RESPONSE.API_ERROR)
         addMessage(MESSAGE_TYPES.ERROR, response.data);
      if (response.type === API_RESPONSE.GENERIC_ERROR)
         addMessage(MESSAGE_TYPES.ERROR, response.data);
   };

   const queryPinRoom = async () => {
      const response = await postPinSubSection(room.id);

      if (response.type === API_RESPONSE.SUCCESS) {
         onRefetch();
         setIsOptionDialog(false);
         addMessage(MESSAGE_TYPES.SUCCESS, response.data);
      } else {
         addMessage(
            MESSAGE_TYPES.ERROR,
            'There was an error while trying to pin the room'
         );
      }
   };

   return (
      <>
         <div
            className='flex w-full cursor-pointer flex-col overflow-hidden rounded-md bg-gray-200 text-gray-900'
            onClick={() => setIsViewDialog(true)}
         >
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
                     deleteText='Are you sure you want to delete this room? By deleting this room you will lose all temperature and humidity data connected to this room!'
                     onDelete={(e) => {
                        e.stopPropagation();
                        queryDeleteRoom();
                        setIsOptionDialog(false);
                     }}
                     onClose={(e) => {
                        e.stopPropagation();
                        setIsOptionDialog(false);
                     }}
                     onEdit={(e) => {
                        e.stopPropagation();
                        setIsOptionDialog(false);
                        setIsEditDialog(true);
                     }}
                     onPin={!room.pinned ? () => queryPinRoom() : undefined}
                     onUnpin={room.pinned ? () => queryPinRoom() : undefined}
                  />
               )}
            </div>
            <div className='flex flex-col p-3'>
               {'section' in room && room.section && (
                  <span className='mb-[-3px] text-xs text-gray-500'>
                     {room.section.name}
                  </span>
               )}
               <div className='flex items-center justify-between'>
                  <span>{room.name}</span>
                  {room.pinned ? <TbPin className='text-lg' /> : <div />}
               </div>
            </div>
         </div>
         {isEditDialog && (
            <DialogContainer>
               <EditSubsectionDialog
                  room={room.name}
                  categoryId={room.category.id}
                  id={room.id}
                  onClose={() => setIsEditDialog(false)}
                  onSuccess={() => onRefetch()}
               />
            </DialogContainer>
         )}
         {isViewDialog && (
            <DialogContainer>
               <SubSectionDialog
                  room_id={room.id}
                  name={room.name}
                  onClose={() => setIsViewDialog(false)}
               />
            </DialogContainer>
         )}
      </>
   );
};

export default SingleRoom;
