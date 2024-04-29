import React, { useContext, useState } from 'react';
import Container from '../../components/Container';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import PageTitle from '../../components/PageTitle';
import { TbLayoutGridAdd } from 'react-icons/tb';
import { DataContext } from '../../providers/DataProvider';
import HouseSections from '../../components/HouseSections/HouseSections';
import DialogContainer from '../../components/Dialog/DialogContainer';
import CreateSectionDialog from '../../components/Dialog/CreateSectionDialog';
import { postSection, PostSectionError } from '../../queries/postSection';
import { API_RESPONSE } from '../../queries/responses';
import { useMessages } from '../../providers/MessageContext';
import { MESSAGE_TYPES } from '../../models/messageContextModel';

const House = () => {
   const { addMessage } = useMessages();
   const { setSections } = useContext(DataContext);

   const [dialog, setDialog] = useState<boolean>(false);
   const [sectionName, setSectionName] = useState<string>('');
   const [sectionColor, setSectionColor] = useState<string>('#000000');
   const [errors, setErrors] = useState<PostSectionError>({
      name: [],
      color: [],
   });

   const clearErrors = () => {
      setErrors({ color: [], name: [] });
   };

   const queryPostSection = async () => {
      const response = await postSection(
         sectionName,
         sectionColor,
         setSections
      );

      if (response.type === API_RESPONSE.SUCCESS) {
         setDialog(false);
         clearErrors();
         addMessage(MESSAGE_TYPES.SUCCESS, response.data);
      }

      if (response.type === API_RESPONSE.API_ERROR) {
         setSectionName('');
         setErrors(response.data);
      }

      if (response.type === API_RESPONSE.GENERIC_ERROR) {
         addMessage(MESSAGE_TYPES.ERROR, response.data);
      }
   };

   return (
      <Container>
         <NavigationBar />
         <div className='sticky top-0 z-10 flex w-full items-center justify-between space-x-1 bg-gray-100 py-3'>
            <PageTitle title='Your House' />
            <button
               onClick={() => setDialog(true)}
               className='flex items-center space-x-2 self-stretch rounded-sm bg-blue-600 p-2 font-semibold text-gray-50 shadow-sm outline outline-2 outline-blue-600 transition-colors duration-200 hover:bg-blue-600 hover:bg-opacity-70'
            >
               <TbLayoutGridAdd className='text-2xl' />
               <span className='text-sm'>New Section</span>
            </button>
         </div>
         <HouseSections />
         {dialog && (
            <DialogContainer>
               <CreateSectionDialog
                  onClose={() => setDialog(false)}
                  onSubmit={queryPostSection}
                  sectionName={sectionName}
                  setSectionName={setSectionName}
                  sectionColor={sectionColor}
                  setSectionColor={setSectionColor}
                  errors={errors}
               />
            </DialogContainer>
         )}
      </Container>
   );
};

export default House;
