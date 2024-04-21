import React, { ReactNode, useState, createContext } from 'react';
import { DataContextModel } from '../models/dataContextModel';

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
   const [sections, setSections] = useState<any[]>([]);
   const [sectionDataLoading, setSectionDataLoading] = useState<boolean>(true);

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
