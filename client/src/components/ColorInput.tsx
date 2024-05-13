import React from 'react';

interface Props {
   title: string;
   value: string;
   onValueChange: (arg0: string) => void;
   error?: string[];
}

const ColorInput = ({ title, value, onValueChange, error }: Props) => {
   return (
      <label
         htmlFor={title}
         className='flex flex-col'
      >
         <span className='text-sm text-gray-600'>{title}</span>
         <input
            className={`h-12 w-12 cursor-pointer rounded-md border-2 p-2 ${
               error && error.length > 0 ? 'border-red-600' : undefined
            }`}
            type='color'
            name={title}
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
         />
         {error && error.length > 0 && (
            <span className='text-xs text-red-600'>{error[0]}</span>
         )}
      </label>
   );
};

export default ColorInput;
