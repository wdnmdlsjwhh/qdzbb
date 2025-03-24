/**
 * 用户注册组件
 * 实现新用户注册功能
 * 使用Ant Design组件库构建用户界面
 */

// 导入必要的React钩子和组件
import { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

// 从Select组件中解构Option组件
const { Option } = Select;

/**
 * 用户注册主组件
 * 包含注册表单和验证逻辑
 */
const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // 部门列表 - 可选的用户部门
  const departments = ['程序部', '外联部', '采编部', '美工部', '视频部', '文产部', '运营部', '微博部', '办公室'];

  /**
   * 处理表单提交
   * 验证表单并创建新用户
   */
  const onFinish = (values) => {
    setLoading(true);
    // 模拟注册请求
    setTimeout(() => {
      // 在实际应用中，这里应该调用注册API
      console.log('注册信息:', values);
      message.success('注册成功！请登录');
      // 注册成功后跳转到登录页
      navigate('/login');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">用户注册</h2>
        <Form
          name="register"
          initialValues={{ role: 'user' }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名！' },
              { min: 4, message: '用户名至少4个字符' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名" 
              size="large" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码！' },
              { min: 6, message: '密码至少6个字符' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码！' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致！'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="确认密码"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="name"
            rules={[{ required: true, message: '请输入姓名！' }]}
          >
            <Input 
              placeholder="姓名" 
              size="large" 
            />
          </Form.Item>

          <Form.Item
            name="department"
            rules={[{ required: true, message: '请选择部门！' }]}
          >
            <Select placeholder="选择部门" size="large">
              {departments.map(dept => (
                <Option key={dept} value={dept}>{dept}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱！' },
              { type: 'email', message: '请输入有效的邮箱地址！' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="邮箱" 
              size="large" 
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: '请输入手机号！' },
              { pattern: /^1\d{10}$/, message: '请输入有效的手机号！' }
            ]}
          >
            <Input 
              prefix={<PhoneOutlined />} 
              placeholder="手机号" 
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
              注册
            </Button>
          </Form.Item>

          <Form.Item>
            <div style={{ textAlign: 'center' }}>
              已有账号？<Link to="/login">立即登录</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;