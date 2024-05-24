import React from 'react';

interface Value {
   id: number | string;
   name: string;
}

interface Props {
   minWidth?: number;
   values: Value[];
   text?: string;
   title?: string;
   error?: string[];
   isDisabled?: boolean;
   value: number | string | undefined;
   onValueChange: (args0: number) => void;
}

const Select = ({
   minWidth,
   values,
   text,
   error,
   title,
   value,
   isDisabled,
   onValueChange,
}: Props) => {
   return (
      <label
         htmlFor={title && title}
         className='flex flex-col'
      >
         {title && <span className='text-sm text-gray-600'>{title}</span>}
         <select
            style={{
               cursor: isDisabled ? 'not-allowed' : 'pointer',
               minWidth: minWidth ? minWidth : undefined,
            }}
            disabled={isDisabled}
            className={`w-full rounded-md border-2 bg-gray-200 px-3 py-3 text-sm text-gray-900 focus:outline-gray-900 ${
               error && error.length > 0 ? 'border-red-500' : 'border-gray-200'
            }`}
            onChange={(e) => onValueChange(parseInt(e.target.value))}
            defaultValue={value}
         >
            {text && <option hidden>{text}</option>}
            {values.map((value: Value, index) => (
               <option
                  key={index}
                  value={value.id}
               >
                  {value.name}
               </option>
            ))}
         </select>
         {error && error.length > 0 && (
            <span className='text-xs text-red-600'>{error[0]}</span>
         )}
      </label>
   );
};

export default Select;
