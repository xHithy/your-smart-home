import React from 'react';
import { TbHomeCog, TbLayoutDashboard, TbSettings } from 'react-icons/tb';

export enum NAVIGATION_ICONS {
   DASHBOARD = 'dashboard',
   LAYOUT = 'layout',
   SETTINGS = 'settings',
}

interface Props {
   icon: string;
}

const NavigationIcon = ({ icon }: Props) => {
   if (icon === NAVIGATION_ICONS.DASHBOARD) {
      return <TbLayoutDashboard className='text-2xl' />;
   }

   if (icon === NAVIGATION_ICONS.LAYOUT) {
      return <TbHomeCog className='text-2xl' />;
   }

   if (icon === NAVIGATION_ICONS.SETTINGS) {
      return <TbSettings className='text-2xl' />;
   }

   return <div />;
};

export default NavigationIcon;
