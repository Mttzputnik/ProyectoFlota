// MenuSlide.jsx
import React, { useState } from 'react';
import { Menu } from 'antd';
import { CarOutlined, UserOutlined, OrderedListOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './MenuSlide.css';

export const MenuSlide = () => {
  const navigate = useNavigate();

  const onClick = ({ key }) => {
    console.log("key", key);
    if (key === 'users') {
      navigate('/admin/users');
    } else if (key === 'vehiculo') {
      navigate('/admin/vehicles');
    }
  };

  const items = [
    {
      key: "sub1",
      label: "Usuarios",
      icon: <UserOutlined />,
      children: [
        {
          key: "users",
          label: "Users",
        },
      ],
    },
    {
      key: "sub2",
      label: "Vehículos",
      icon: <CarOutlined />,
      children: [
        {
          key: "vehiculo",
          label: "Tareas de vehículos",
        },
      ],
    },
    {
      type: "divider",
    },
    {
      key: "sub4",
      label: "Tareas",
      icon: <OrderedListOutlined />,
      children: [
        {
          key: "9",
          label: "Option 9",
        }
      ],
    },
    {
      key: "grp",
      label: "Group",
      type: "group",
      children: [
        {
          key: "1",
          label: "Option 1",
        },
        {
          key: "2",
          label: "Option 2",
        },
      ],
    },
  ];

  const getLevelKeys = (items1) => {
    const key = {};
    const func = (items2, level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };

  const levelKeys = getLevelKeys(items);

  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['231']}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      onClick={onClick}
      style={{
        width: 256,
      }}
      items={items}
    />
  );
};

export default MenuSlide;