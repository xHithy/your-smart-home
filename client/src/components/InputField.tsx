import React from 'react';

interface Props {
   title: string;
   placeholder?: string;
   value: string;
   maxWidth?: number;
   error?: string[];
   isPassword?: boolean;
   onValueChange: (arg0: string) => void;
}

const InputField = ({
   title,
   placeholder,
   value,
   maxWidth,
   error,
   isPassword,
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
            className={`w-full rounded-md border-2 bg-gray-200 px-4 py-3 text-sm text-gray-900 focus:outline-gray-900 ${
               error && error.length > 0 ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder={placeholder}
            name={title}
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            type={isPassword ? 'password' : 'text'}
         />
         {error && error.length > 0 && (
            <span className='text-xs text-red-600'>{error[0]}</span>
         )}
      </label>
   );
};

export default InputField;
