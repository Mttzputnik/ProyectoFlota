import React from 'react';
import { MenuSlide } from '../../component/general/MenuSlide';

export const AdminLayouts = ({ children }) => {
  return (
    <div className='admin-layout'>
      <div className='admin-layout-left'>
        <MenuSlide />
      </div>
      <div className='admin-layout-right'>
        <div className='admin-layout-right-header'>
          <span>Dashboard</span>
        </div>
        <div className='admin-layout-content'>
          {children}
        </div>
      </div>
    </div>
  );
};
