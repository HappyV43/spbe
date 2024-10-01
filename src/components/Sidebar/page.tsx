"use client";

import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { menuItems } from "../data/MenuItems";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const pathname = usePathname();

  // Function to update the selected key in local storage
  const updateSelectedKey = (key: string) => {
    setSelectedKeys([key]);
    localStorage.setItem("selectedKey", key);
  };

  useEffect(() => {
      if (pathname === "/dashboard/penyaluranElpiji") {
        setSelectedKeys(['2']);
      } else if (pathname === "/dashboard/alokasi") {
        setSelectedKeys(['3']);
      } else if (pathname === "/dashboard/cetakPenyaluran") {
        setSelectedKeys(['4']);
      } else if (pathname === "/masterData/agen") {
        setSelectedKeys(['6']);
      } else if (pathname === "/masterData/ptAgen") {
        setSelectedKeys(['7']);
      } else if (pathname === "/") {
        updateSelectedKey("2");
      }
  }, [pathname]);

  return <Menu theme="dark" selectedKeys={selectedKeys} mode="inline" items={menuItems} />;
};

export default Sidebar;
