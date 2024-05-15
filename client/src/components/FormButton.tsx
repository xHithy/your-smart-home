import React from 'react';

interface Props {
   title: string;
   warning?: boolean;
   onSubmit: (e: any) => void;
}

const FormButton = ({ title, onSubmit, warning = false }: Props) => {
   return (
      <button
         className={`self-end rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-gray-50 shadow-sm outline outline-2 outline-blue-600 transition-colors duration-200 hover:bg-opacity-70 ${
            warning
               ? 'bg-red-600 text-gray-200 outline-red-600 hover:bg-opacity-70'
               : undefined
         }`}
         onClick={onSubmit}
      >
         {title}
      </button>
   );
};

export default FormButton;
