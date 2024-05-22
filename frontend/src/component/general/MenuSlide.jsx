import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

export const MenuSlide = () => {
  const onClick = ({ key }) => {
    console.log("key", key);
  };

  const items = [
    {
      key: "sub1",
      label: "Usuarios",
      icon: <MailOutlined />,
      children: [
        {
          key: "g1",
          label: "Users",
        },
      ],
    },
    {
      key: "sub2",
      label: "Navigation Two",
      icon: <AppstoreOutlined />,
      children: [
        {
          key: "5",
          label: "Option 5",
        },
      ],
    },
    {
      type: "divider",
    },
    {
      key: "sub4",
      label: "Navigation Three",
      icon: <SettingOutlined />,
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
          key: "13",
          label: "Option 13",
        },
        {
          key: "14",
          label: "Option 14",
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

  const App = () => {
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
        style={{
          width: 256,
        }}
        items={items}
      />
    );
  };

  const mountNode = document.getElementById('root'); // Define correctamente mountNode

  createRoot(mountNode).render(<App />);
};

export default MenuSlide;
