import React from 'react';

export interface DataContextModel {
   sections: any[];
   setSections: React.Dispatch<React.SetStateAction<any[]>>;
   sectionDataLoading: boolean;
   setSectionDataLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
