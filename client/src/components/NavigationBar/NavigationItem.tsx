import React from 'react';
import NavigationIcon from './NavigationIcon';
import { Link } from 'react-router-dom';

interface Props {
   name: string;
   route: string;
   icon: string;
}

const NavigationItem = ({ name, route, icon }: Props) => {
   const currentRoute = window.location.pathname;

   const isActive = currentRoute === route;

   if (isActive) {
      return (
         <div className='flex w-full cursor-pointer flex-col items-center justify-center space-x-1 rounded-sm bg-gray-300 p-3 text-gray-900 shadow-sm md:flex-row'>
            <NavigationIcon icon={icon} />
            <span className='font-semibold'>{name}</span>
         </div>
      );
   } else {
      return (
         <Link
            to={route}
            className='flex w-full cursor-pointer flex-col items-center justify-center space-x-1 self-stretch rounded-sm bg-gray-200 text-gray-900 shadow-sm transition-colors duration-200 hover:bg-gray-300 md:flex-row md:p-3'
         >
            <NavigationIcon icon={icon} />
            <span className='font-semibold'>{name}</span>
         </Link>
      );
   }
};

export default NavigationItem;
