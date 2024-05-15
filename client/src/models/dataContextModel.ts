import React from 'react';
import { Category, Section } from './sectionModel';

export interface DataContextModel {
   sections: Section[] | [];
   categories: Category[] | [];
   sectionDataLoading: boolean;
   setSections: React.Dispatch<React.SetStateAction<Section[]>>;
   setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
   setSectionDataLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
