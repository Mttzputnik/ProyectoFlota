import React from 'react'
import { MenuSlide } from '../../component/general/MenuSlide'

export const AdminLayouts = (props) => {
    const {Children} = props.children;
  return (
    <div className='admin-layout'>
        <div className='admin-layout-left'>
            <img src="" alt="" />
            <MenuSlide />
        </div>
        <div className='admin-layout-right'>
            <div className='admin-layout-right-header'>
                <span>Dashboard</span>
            </div>
        </div>
        <div className='admin-layout-content'>
            {Children}
        </div>
    </div>
  )
}
