"use client";
import React, { useState, ReactNode } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, theme } from 'antd';
import { menuItems } from '@/components/data/MenuItems';
import Image from 'next/image';
import AppHeader from '../Header/page';
import Sidebar from '../Sidebar/page';

const { Header, Sider, Content } = Layout;

interface DefaultLayoutProps {
  children?: ReactNode; 
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{minHeight:'100vh'}}>
      <Header
          className={`flex justify-between items-center`}
          style={{paddingLeft:'32px'}}
        >
          
          <div  className="flex items-center text-white">
            {/* <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined style={{fontSize:'20px', color:'white'}}/> : <MenuFoldOutlined style={{fontSize:'20px',color:'white'}} />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-lg w-16 h-16"
            /> */}
            {/* <Image src="/assets/logo.png" alt="Logo" className="p-4" width={100} height={100} /> */}
          </div>
          <Avatar icon={<UserOutlined />} />
      </Header>
      
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Sidebar/>
        </Sider>


        <Content
          className={`m-5 rounded-lg bg-slate-100`}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default DefaultLayout;