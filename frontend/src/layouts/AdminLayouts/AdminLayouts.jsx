import React from 'react';
import { MenuSlide } from '../../component/general/MenuSlide';
import { SmileOutlined } from '@ant-design/icons';
import './AdminLayouts.css';

export const AdminLayouts = ({ children }) => {
  return (
    <div className='admin-layout'>
      <div className='admin-layout-left'>
        <span className="menu-slide-title">Titulo Empresa <SmileOutlined />  </span>
        <MenuSlide />
      </div>
      <div className='admin-layout-right'>
        <div className='admin-layout-right-header'>
          <span></span>
        </div>
        <div className='admin-layout-content'>
          {children}
        </div>
      </div>
    </div>
  );
};
