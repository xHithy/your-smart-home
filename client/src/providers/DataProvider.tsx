import React, { ReactNode, useState, createContext, useEffect } from 'react';
import { DataContextModel } from '../models/dataContextModel';
import { getSections } from '../queries/getSections';
import { API_RESPONSE } from '../queries/responses';
import { MESSAGE_TYPES } from '../models/messageContextModel';
import { useMessages } from './MessageContext';
import { Category, Section } from '../models/sectionModel';
import { getCategories } from '../queries/getCategories';

export const DataContext = createContext<DataContextModel>({
   categories: [],
   sections: [],
   sectionDataLoading: true,
   setCategories: () => {},
   setSections: () => {},
   setSectionDataLoading: () => {},
});

interface Props {
   children: ReactNode[] | ReactNode;
}

const DataProvider = ({ children }: Props) => {
   const { addMessage } = useMessages();

   const [sections, setSections] = useState<Section[]>([]);
   const [categories, setCategories] = useState<Category[]>([]);
   const [sectionDataLoading, setSectionDataLoading] = useState<boolean>(true);

   const queryGetSections = async () => {
      const response = await getSections(setSections);

      if (response.type === API_RESPONSE.GENERIC_ERROR) {
         addMessage(MESSAGE_TYPES.ERROR, response.data);
      }

      setSectionDataLoading(false);
   };

   const queryGetCategories = async () => {
      const response = await getCategories(setCategories);

      if (response.type === API_RESPONSE.GENERIC_ERROR) {
         addMessage(MESSAGE_TYPES.ERROR, response.data);
      }
   };

   useEffect(() => {
      queryGetSections();
      queryGetCategories();
   }, []);

   return (
      <DataContext.Provider
         value={{
            categories,
            sections,
            sectionDataLoading,
            setCategories,
            setSections,
            setSectionDataLoading,
         }}
      >
         {children}
      </DataContext.Provider>
   );
};

export default DataProvider;
