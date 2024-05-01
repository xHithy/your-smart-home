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
   id: number;
}

const SingleSection = ({ name, color, id }: Props) => {
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
      const section: Section = sections.find((section) => section.id === id);
      setSectionColor(section.color);
      setSectionName(section.name);
   }, []);

   return (
      <>
         <div
            style={{ borderLeftColor: color }}
            className='mb-2 flex w-full flex-col space-y-1 rounded-r-md border-l-4 bg-gray-200 p-3 pb-5'
         >
            <div className='relative flex w-full items-center justify-between space-x-1'>
               <span className='text-lg font-bold text-gray-800'>{name}</span>
               <TbDots
                  className='cursor-pointer text-2xl text-gray-800'
                  onClick={() => setIsDialog(true)}
               />
               {isDialog && (
                  <OptionDialog
                     onDelete={() => queryDeleteSection()}
                     onClose={() => setIsDialog(false)}
                     onEdit={() => {
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
