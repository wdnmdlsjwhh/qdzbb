import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // 模拟登录请求
    setTimeout(() => {
      // 在实际应用中，这里应该调用登录API
      if (values.username === 'admin' && values.password === 'admin') {
        message.success('登录成功！');
        setIsLoggedIn(true);
      } else {
        message.error('用户名或密码错误！');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">组织管理系统</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名" 
              size="large" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="login-form-button"
              loading={loading}
              size="large"
              block
            >
              登录
            </Button>
          </Form.Item>
          
          <Form.Item>
            <div style={{ textAlign: 'center' }}>
              没有账号？<Link to="/register">立即注册</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;