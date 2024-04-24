import React from 'react';

interface Props {
   title: string;
   placeholder?: string;
   value: string;
   maxWidth?: number;
   onValueChange: (arg0: string) => void;
}

const InputField = ({
   title,
   placeholder,
   value,
   maxWidth,
   onValueChange,
}: Props) => {
   return (
      <label
         htmlFor={title}
         className='flex flex-col'
      >
         <span className='text-sm text-gray-600'>{title}</span>
         <input
            style={{ maxWidth: maxWidth }}
            className='w-full rounded-md border-0 bg-gray-200 px-4 py-3 text-sm focus:outline-gray-900'
            placeholder={placeholder}
            name={title}
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
         />
      </label>
   );
};

export default InputField;
