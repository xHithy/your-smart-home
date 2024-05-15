import React from 'react';

interface Value {
   id: number;
   name: string;
}

interface Props {
   values: Value[];
   text: string;
   title: string;
   error: string[];
   value: number | undefined;
   onValueChange: (args0: number) => void;
}

const Select = ({
   values,
   text,
   error,
   title,
   value,
   onValueChange,
}: Props) => {
   return (
      <label
         htmlFor={title}
         className='flex flex-col'
      >
         <span className='text-sm text-gray-600'>{title}</span>
         <select
            className={`w-full rounded-md border-2 bg-gray-200 px-3 py-3 text-sm text-gray-900 focus:outline-gray-900 ${
               error && error.length > 0 ? 'border-red-500' : 'border-gray-200'
            }`}
            onChange={(e) => onValueChange(parseInt(e.target.value))}
            defaultValue={value}
         >
            <option hidden>{text}</option>
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
