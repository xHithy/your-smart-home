import React, { useContext, useEffect, useState } from 'react';
import { TbDots } from 'react-icons/tb';
import OptionDialog from '../OptionDialog/OptionDialog';
import { DataContext } from '../../providers/DataProvider';
import { deleteSection } from '../../queries/deleteSection';
import { useMessages } from '../../providers/MessageContext';
import { API_RESPONSE } from '../../queries/responses';
import { MESSAGE_TYPES } from '../../models/messageContextModel';
import EditSectionDialog from '../Dialog/EditSectionDialog';
import { Section } from '../../models/sectionModel';
import { editSection } from '../../queries/editSection';
import { PostSectionError } from '../../queries/postSection';
import DialogContainer from '../Dialog/DialogContainer';

interface Props {
   name: string;
   color: string;
   subsectionCount: number;
   id: number;
}

const SingleSection = ({ name, color, id, subsectionCount }: Props) => {
   const { sections, setSections } = useContext(DataContext);
   const { addMessage } = useMessages();

   const [sectionName, setSectionName] = useState('');
   const [sectionColor, setSectionColor] = useState('#000000');
   const [isDialog, setIsDialog] = useState(false);
   const [isEditDialog, setIsEditDialog] = useState(false);
   const [errors, setErrors] = useState<PostSectionError>({
      name: [],
      color: [],
   });

   const queryDeleteSection = async () => {
      const response = await deleteSection(setSections, id);

      if (response.type === API_RESPONSE.SUCCESS)
         addMessage(MESSAGE_TYPES.SUCCESS, response.data);
      if (response.type === API_RESPONSE.API_ERROR)
         addMessage(MESSAGE_TYPES.ERROR, response.data);
      if (response.type === API_RESPONSE.GENERIC_ERROR)
         addMessage(MESSAGE_TYPES.ERROR, response.data);

      setIsDialog(false);
   };

   const queryEditSection = async () => {
      const response = await editSection(
         sections,
         sectionName,
         sectionColor,
         setSections,
         id
      );

      if (response.type === API_RESPONSE.SUCCESS) {
         setIsEditDialog(false);
         setErrors({ color: [], name: [] });
         addMessage(MESSAGE_TYPES.SUCCESS, response.data);
      }

      if (response.type === API_RESPONSE.API_ERROR) {
         setErrors(response.data);
      }

      if (response.type === API_RESPONSE.GENERIC_ERROR) {
         addMessage(MESSAGE_TYPES.ERROR, response.data);
      }

      setIsDialog(false);
   };

   // Get the section data
   useEffect(() => {
      const section: Section | undefined = sections.find(
         (section) => section.id === id
      );

      if (section) {
         setSectionColor(section.color);
         setSectionName(section.name);
      }
   }, []);

   return (
      <>
         <div
            style={{ borderLeftColor: color }}
            className='mb-2 flex w-full cursor-pointer flex-col space-y-1 rounded-r-md border-l-4 bg-gray-200 p-3'
            onClick={() => (window.location.href = `/house/${id}`)}
         >
            <div className='relative flex w-full items-center justify-between space-x-1'>
               <div className='flex flex-col space-y-[-3px]'>
                  <span className='text-lg font-bold text-gray-800'>
                     {name}
                  </span>
                  <span className='text-sm text-gray-600'>
                     {subsectionCount}
                     {subsectionCount === 1 ? ' room' : ' rooms'}
                  </span>
               </div>

               <span
                  className='relative z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-800 transition-colors duration-200 hover:bg-blue-600 hover:text-gray-100'
                  onClick={(e) => {
                     e.stopPropagation();
                     setIsDialog(true);
                  }}
               >
                  <TbDots className='text-2xl' />
               </span>

               {isDialog && (
                  <OptionDialog
                     onDelete={(e) => {
                        e.stopPropagation();
                        queryDeleteSection();
                     }}
                     onClose={(e) => {
                        e.stopPropagation();
                        setIsDialog(false);
                     }}
                     onEdit={(e) => {
                        e.stopPropagation();
                        setIsEditDialog(true);
                        setIsDialog(false);
                     }}
                  />
               )}
            </div>
         </div>
         {isEditDialog && (
            <DialogContainer>
               <EditSectionDialog
                  errors={errors}
                  sectionName={sectionName}
                  sectionColor={sectionColor}
                  onClose={() => setIsEditDialog(false)}
                  onSubmit={queryEditSection}
                  setSectionName={setSectionName}
                  setSectionColor={setSectionColor}
               />
            </DialogContainer>
         )}
      </>
   );
};

export default SingleSection;
