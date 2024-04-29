import { MESSAGE_TYPES } from '../../models/messageContextModel';
import { TbX } from 'react-icons/tb';

interface Props {
   message: string;
   type: MESSAGE_TYPES;
   onRemove: () => void;
}

const SingleMessage = ({ message, type, onRemove }: Props) => {
   if (type === MESSAGE_TYPES.SUCCESS) {
      return (
         <div className='mb-2 flex w-[200px] flex-col rounded-l-md bg-green-500 text-gray-100 shadow-md'>
            <div className='flex w-full items-center justify-between px-3 py-1'>
               <span className='font-bold'>Success!</span>
               <TbX
                  className='cursor-pointer text-xl'
                  onClick={onRemove}
               />
            </div>
            <p className='p-3 pt-0'>{message}</p>
         </div>
      );
   }

   if (type === MESSAGE_TYPES.ERROR) {
      return (
         <div className='mb-2 flex w-[200px] flex-col rounded-l-md bg-red-500 text-gray-100 shadow-md'>
            <div className='flex w-full items-center justify-between px-3 py-1'>
               <span className='font-bold'>Whoops!</span>
               <TbX
                  className='cursor-pointer text-xl'
                  onClick={onRemove}
               />
            </div>
            <p className='p-3 pt-0'>{message}</p>
         </div>
      );
   }

   return <div />;
};

export default SingleMessage;
