import React from 'react';
import NavigationItem from './NavigationItem';
import { NAVIGATION_ICONS } from './NavigationIcon';

const NavigationBar = () => {
   return (
      <div className='fixed bottom-0 left-0 grid w-full grid-cols-3 items-center gap-2 px-5 pb-3 pt-2 md:static md:px-0 md:pt-0'>
         <NavigationItem
            name='Dashboard'
            route='/dashboard'
            icon={NAVIGATION_ICONS.DASHBOARD}
         />
         <NavigationItem
            name='House'
            route='/house'
            icon={NAVIGATION_ICONS.LAYOUT}
         />
         <NavigationItem
            name='Settings'
            route='/settings'
            icon={NAVIGATION_ICONS.SETTINGS}
         />
      </div>
   );
};

export default NavigationBar;
