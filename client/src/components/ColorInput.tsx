import React from 'react';

interface Props {
   title: string;
   value: string;
   onValueChange: (arg0: string) => void;
}

const ColorInput = ({ title, value, onValueChange }: Props) => {
   return (
      <label
         htmlFor={title}
         className='flex flex-col'
      >
         <span className='text-sm text-gray-600'>{title}</span>
         <input
            className='h-12 w-12 rounded-md border-0 bg-gray-200 p-2'
            type='color'
            name={title}
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
         />
      </label>
   );
};

export default ColorInput;
