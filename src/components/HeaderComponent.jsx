// 导入Ant Design组件
// Layout: 布局组件
// Button: 按钮组件
// Space: 间距组件，用于设置子元素之间的间距
// Avatar: 头像组件
// Dropdown: 下拉菜单组件
import { Layout, Button, Space, Avatar, Dropdown } from 'antd';
// 导入Ant Design图标组件
// UserOutlined: 用户图标
// LogoutOutlined: 登出图标
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

// 从Layout组件中解构出Header组件
const { Header } = Layout;

/**
 * 头部导航组件
 * 显示用户信息和提供登出功能
 * 
 * @param {Function} setIsLoggedIn - 更新登录状态的函数，从App组件传入
 */
const HeaderComponent = ({ setIsLoggedIn }) => {
  // 模拟用户信息，在实际应用中应该从API或状态管理中获取
  const userInfo = {
    name: '管理员', // 用户名称
    avatar: null    // 用户头像，这里为空表示使用默认头像
  };

  /**
   * 处理用户登出
   * 在实际应用中，这里应该调用登出API，清除token等
   */
  const handleLogout = () => {
    // 更新登录状态为false，触发App组件中的条件渲染逻辑
    setIsLoggedIn(false);
  };

  // 定义下拉菜单项
  const items = [
    {
      key: 'logout', // 菜单项的唯一标识
      label: (
        // 点击时触发handleLogout函数
        <a onClick={handleLogout}>
          <LogoutOutlined /> 退出登录
        </a>
      ),
    },
    // 可以在这里添加更多菜单项，如个人设置、修改密码等
  ];

  return (
    // 头部组件，设置背景样式和内边距
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {/* 右侧用户信息区域 */}
      <div className="header-right">
        {/* 使用Space组件设置子元素间距 */}
        <Space>
          {/* 显示欢迎信息和用户名 */}
          <span>欢迎，{userInfo.name}</span>
          {/* 下拉菜单，点击头像时显示 */}
          <Dropdown menu={{ items }} placement="bottomRight">
            {/* 用户头像，这里使用默认的用户图标 */}
            <Avatar icon={<UserOutlined />} />
          </Dropdown>
        </Space>
      </div>
    </Header>
  );
};

export default HeaderComponent;