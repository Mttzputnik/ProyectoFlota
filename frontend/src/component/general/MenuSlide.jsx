// MenuSlide.jsx
import React, { useState } from 'react';
import { Menu } from 'antd';
import { CarOutlined, UserOutlined, OrderedListOutlined, HarmonyOSOutlined, DingdingOutlined , ScanOutlined , AlertOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './MenuSlide.css';

export const MenuSlide = () => {
  const navigate = useNavigate();

  const onClick = ({ key }) => {
    console.log("key", key);
    if (key === 'users') {
      navigate('/admin/users');
    } else if (key === 'taskvehiculo') {
      navigate('/admin/vehicles');
    }
    else if (key === 'listVehicles') {
      navigate('/admin/listVehicles');
    }
    else if (key === 'addVehicles') {
      navigate('/admin/addVehicles');
    }
    else if (key === 'ListTrips') {
      navigate('/admin/ListTrips');
    }
    else if (key === 'listTires') {
      navigate('/admin/ListTires');
    }
    else if (key === 'listMantenimiento') {
      navigate('/admin/ListMantenimiento');
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
          label: "Lista de usuarios",
        },
      ],
    },
    {
      key: "sub2",
      label: "Vehículos",
      icon: <CarOutlined />,
      children: [
       
        {
          key: "listVehicles",
          label: "Lista de vehículos",
        },
        {
          key: "addVehicles",
          label: "Agregar vehículos",
        },
      ],
    },
    {
      key: "sub4",
      label: "Mantenimiento",
      icon: <AlertOutlined />,
      children: [
        {
          key: "listMantenimiento",
          label: "Lista de mantenimientos",
        },
      ],
    },
    {
      key: "sub5",
      label: "Tareas",
      icon: <OrderedListOutlined />,
      children: [
        {
          key: "taskvehiculo",
          label: "Tareas de vehículos",
        },
      ],
    },
    {
      key: "sub6",
      label: "monitoreo",
      icon: <ScanOutlined/>,
      children: [
        {
          icon: <DingdingOutlined />,
          key: "ListTrips",
          label: "Viajes",
        },
        {
          icon: <HarmonyOSOutlined />,
          key: "listTires",
          label: "Lista de llantas",
        },
      ],
      },
      {
        type: "divider",
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
