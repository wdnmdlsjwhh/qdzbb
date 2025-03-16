import { Layout, Button, Space, Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;

const HeaderComponent = ({ setIsLoggedIn }) => {
  // 模拟用户信息
  const userInfo = {
    name: '管理员',
    avatar: null
  };

  const handleLogout = () => {
    // 实际应用中，这里应该调用登出API
    setIsLoggedIn(false);
  };

  const items = [
    {
      key: 'logout',
      label: (
        <a onClick={handleLogout}>
          <LogoutOutlined /> 退出登录
        </a>
      ),
    },
  ];

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <div className="header-right">
        <Space>
          <span>欢迎，{userInfo.name}</span>
          <Dropdown menu={{ items }} placement="bottomRight">
            <Avatar icon={<UserOutlined />} />
          </Dropdown>
        </Space>
      </div>
    </Header>
  );
};

export default HeaderComponent;