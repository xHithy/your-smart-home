import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_RESPONSE } from '../../queries/responses';
import { MESSAGE_TYPES } from '../../models/messageContextModel';
import { getSingleSection } from '../../queries/getSingleSection';
import { useMessages } from '../../providers/MessageContext';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Container from '../../components/Container';
import PageTitle from '../../components/PageTitle';
import { Section, SubSection } from '../../models/sectionModel';
import { TbLayoutGridAdd } from 'react-icons/tb';
import FormButton from '../../components/FormButton';
import DialogContainer from '../../components/Dialog/DialogContainer';
import CreateSubsectionDialog from '../../components/Dialog/CreateSubsectionDialog';
import { postSubsection } from '../../queries/postSubsection';
import RoomGrid from '../../components/Rooms/RoomGrid';

export interface PostSubSectionError {
   name: string[];
   category_id: string[];
   section_id: string[];
}

const Room = () => {
   const section_id = useParams()['section_id'];
   const { addMessage } = useMessages();

   const [rooms, setRooms] = useState<SubSection[]>([]);
   const [notFound, setNotFound] = useState<boolean>(false);
   const [section, setSection] = useState<Section>();
   const [isDialog, setIsDialog] = useState<boolean>(false);
   const [roomName, setRoomName] = useState<string>('');
   const [category, setCategory] = useState<number | undefined>(undefined);
   const [errors, setErrors] = useState<PostSubSectionError>({
      name: [],
      category_id: [],
      section_id: [],
   });

   const clearErrors = () => {
      setErrors({ name: [], category_id: [], section_id: [] });
   };

   const queryGetSingleSection = async () => {
      if (section_id) {
         const response = await getSingleSection(
            setSection,
            parseInt(section_id)
         );

         if (response.type === API_RESPONSE.SUCCESS) {
            setRooms(response.data.sub_sections);
         }

         if (response.type === API_RESPONSE.API_ERROR) {
            setNotFound(true);
            addMessage(MESSAGE_TYPES.ERROR, response.data);
         }

         if (response.type === API_RESPONSE.GENERIC_ERROR) {
            addMessage(MESSAGE_TYPES.ERROR, response.data);
         }
      }
   };

   const queryPostSubSection = async () => {
      if (section_id) {
         const response = await postSubsection(
            roomName,
            category,
            parseInt(section_id),
            setRooms
         );

         if (response.type === API_RESPONSE.SUCCESS) {
            addMessage(MESSAGE_TYPES.SUCCESS, response.data);
            setIsDialog(false);
            clearErrors();
         }

         if (response.type === API_RESPONSE.API_ERROR) {
            setErrors(response.data);
         }

         if (response.type === API_RESPONSE.GENERIC_ERROR) {
            addMessage(MESSAGE_TYPES.ERROR, response.data);
         }
      }
   };

   useEffect(() => {
      queryGetSingleSection();
   }, [section_id]);

   return (
      <Container>
         <NavigationBar />
         {section && (
            <div className='sticky top-0 z-10 flex w-full items-center justify-between space-x-1 bg-gray-100 py-3'>
               <PageTitle
                  title={`Your House`}
                  breadcrumbs={[section.name]}
               />
               <button
                  onClick={() => setIsDialog(true)}
                  className='flex items-center space-x-2 self-stretch rounded-sm bg-blue-600 p-2 font-semibold text-gray-50 shadow-sm outline outline-2 outline-blue-600 transition-colors duration-200 hover:bg-blue-600 hover:bg-opacity-70'
               >
                  <TbLayoutGridAdd className='text-2xl' />
                  <span className='text-sm'>Add Room</span>
               </button>
            </div>
         )}
         {notFound ? (
            <div className='flex w-full flex-col items-center justify-center py-10'>
               <span className='text-xl font-black text-gray-900'>
                  Section not found!
               </span>
               <span className='text-gray-500'>
                  Go to the section list and make sure this section exists
               </span>
               <div className='pt-5'>
                  <FormButton
                     title='Back to section list'
                     onSubmit={() => (window.location.href = '/house')}
                  />
               </div>
            </div>
         ) : (
            <RoomGrid rooms={rooms} />
         )}
         {isDialog && (
            <DialogContainer>
               <CreateSubsectionDialog
                  categoryId={category}
                  roomName={roomName}
                  errors={errors}
                  onClose={() => setIsDialog(false)}
                  onSubmit={queryPostSubSection}
                  setCategoryId={setCategory}
                  setRoomName={setRoomName}
               />
            </DialogContainer>
         )}
      </Container>
   );
};

export default Room;
