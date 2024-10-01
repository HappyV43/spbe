import { Avatar, Button } from "antd"
import { Header } from "antd/es/layout/layout"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Image from "next/image"


function AppHeader() {
  return(
    <Header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button
            type="text"
            // icon={collapsed ? <MenuUnfoldOutlined className='text-white'/> : <MenuFoldOutlined className='text-white' />}
            // onClick={() => setCollapsed(!collapsed)}
            className="text-lg w-16 h-16 "
          />
        <Image src="/assets/logo.png" alt="Logo" className="p-4" width={100} height={100} />
        <div>PKMU</div>
      </div>
      <div className="flex items-center gap-2 text-white">
        <Avatar icon={<UserOutlined />} />
        <div>User Dummy</div>
      </div>
    </Header>
  )
}

export default AppHeader