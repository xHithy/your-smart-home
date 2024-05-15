export interface Section {
   id: number;
   name: string;
   color: string;
   created_at: string;
   updated_at: string;
   sub_sections: SubSection[];
}

export interface SubSection {
   id: number;
   name: string;
   section_id: number;
   created_at: string;
   updated_at: string;
   category: Category;
}

export interface Category {
   id: number;
   name: string;
   image_path: string;
   created_at: string;
   updated_at: string;
}
