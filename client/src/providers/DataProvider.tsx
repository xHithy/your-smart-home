import React, { ReactNode, useState, createContext, useEffect } from 'react';
import { DataContextModel } from '../models/dataContextModel';
import { getSections } from '../queries/getSections';
import { API_RESPONSE } from '../queries/responses';
import { MESSAGE_TYPES } from '../models/messageContextModel';
import { useMessages } from './MessageContext';

export const DataContext = createContext<DataContextModel>({
   sections: [],
   setSections: () => {},
   sectionDataLoading: true,
   setSectionDataLoading: () => {},
});

interface Props {
   children: ReactNode[] | ReactNode;
}

const DataProvider = ({ children }: Props) => {
   const { addMessage } = useMessages();

   const [sections, setSections] = useState<any[]>([]);
   const [sectionDataLoading, setSectionDataLoading] = useState<boolean>(true);

   const queryGetSections = async () => {
      const response = await getSections(setSections);

      if (response.type === API_RESPONSE.GENERIC_ERROR) {
         addMessage(MESSAGE_TYPES.ERROR, response.data);
      }

      setSectionDataLoading(false);
   };

   useEffect(() => {
      queryGetSections();
   }, []);

   return (
      <DataContext.Provider
         value={{
            sections,
            setSections,
            sectionDataLoading,
            setSectionDataLoading,
         }}
      >
         {children}
      </DataContext.Provider>
   );
};

export default DataProvider;
