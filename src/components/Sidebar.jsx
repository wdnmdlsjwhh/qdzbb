// 导入React的useState钩子，用于管理组件状态
import { useState } from 'react';
// 导入Ant Design组件
// Layout: 布局组件
// Menu: 菜单组件
import { Layout, Menu } from 'antd';
// 导入React Router相关组件
// Link: 链接组件，用于导航
// useLocation: 钩子函数，用于获取当前路由信息
import { Link, useLocation } from 'react-router-dom';
// 导入Logo图片
import logoSvg from '../assets/logo.svg';
// 导入Ant Design图标组件
import {
  DashboardOutlined,  // 仪表盘图标，用于首页
  CalendarOutlined,    // 日历图标，用于日程表
  TeamOutlined,        // 团队图标，用于值班表
  UserOutlined,        // 用户图标，用于用户管理
  FileExcelOutlined,   // Excel图标，用于Excel上传
} from '@ant-design/icons';

// 从Layout组件中解构出Sider组件（侧边栏）
const { Sider } = Layout;

/**
 * 侧边栏组件
 * 提供应用的主导航菜单
 */
const Sidebar = () => {
  // 定义侧边栏折叠状态，默认为展开
  // collapsed: 当前折叠状态
  // setCollapsed: 更新折叠状态的函数
  const [collapsed, setCollapsed] = useState(false);
  
  // 使用useLocation钩子获取当前路由信息
  const location = useLocation();
  
  /**
   * 根据当前路径确定选中的菜单项
   * 返回包含菜单项key的数组
   * 
   * @returns {Array<string>} 当前选中的菜单项key数组
   */
  const getSelectedKey = () => {
    const path = location.pathname;
    // 根据路径匹配对应的菜单项
    if (path.includes('/dashboard')) return ['1']; // 首页
    if (path.includes('/schedule')) return ['2'];  // 日程表
    if (path.includes('/duty-roster')) return ['3']; // 值班表
    if (path.includes('/users')) return ['4'];     // 用户管理
    if (path.includes('/excel-upload')) return ['5']; // Excel上传
    // 默认选中首页
    return ['1'];
  };

  return (
    // 侧边栏组件，支持折叠功能
    // collapsible: 是否可折叠
    // collapsed: 当前折叠状态
    // onCollapse: 折叠状态变化时的回调函数
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      {/* Logo区域 */}
      <div className="logo">
        <img 
          src={logoSvg} 
          alt="组织管理系统" 
          style={{ 
            width: collapsed ? '80%' : '90%', 
            height: '100%',
            transition: 'all 0.3s ease'
          }} 
        />
      </div>
      {/* 菜单组件，设置主题、选中项和显示模式 */}
      <Menu theme="dark" selectedKeys={getSelectedKey()} mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/dashboard">首页</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          <Link to="/schedule">日程表</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<TeamOutlined />}>
          <Link to="/duty-roster">值班表</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          <Link to="/users">用户管理</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<FileExcelOutlined />}>
          <Link to="/excel-upload">Excel上传</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;