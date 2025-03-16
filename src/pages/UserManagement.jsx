import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const UserManagement = () => {
  // 模拟用户数据
  const [users, setUsers] = useState([
    { id: 1, name: '张三', department: '技术部', role: 'admin', email: 'zhangsan@example.com', phone: '13800000001' },
    { id: 2, name: '李四', department: '运维部', role: 'user', email: 'lisi@example.com', phone: '13800000002' },
    { id: 3, name: '王五', department: '人事部', role: 'user', email: 'wangwu@example.com', phone: '13800000003' },
    { id: 4, name: '赵六', department: '财务部', role: 'user', email: 'zhaoliu@example.com', phone: '13800000004' }
  ]);

  // 部门列表
  const departments = ['技术部', '运维部', '人事部', '财务部', '市场部'];
  
  // 角色列表
  const roles = ['admin', 'user'];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();

  // 表格列定义
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <span>
          {role === 'admin' ? '管理员' : '普通用户'}
        </span>
      )
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 处理添加用户
  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // 处理编辑用户
  const handleEdit = (record) => {
    setEditingId(record.id);
    form.setFieldsValue({
      name: record.name,
      department: record.department,
      role: record.role,
      email: record.email,
      phone: record.phone
    });
    setIsModalVisible(true);
  };

  // 处理删除用户
  const handleDelete = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个用户吗？',
      onOk() {
        setUsers(users.filter(user => user.id !== id));
        message.success('用户已删除');
      },
    });
  };

  // 处理表单提交
  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (editingId === null) {
        // 添加新用户
        const newUser = {
          id: Date.now(),
          ...values
        };
        setUsers([...users, newUser]);
        message.success('用户添加成功');
      } else {
        // 更新现有用户
        setUsers(users.map(user => 
          user.id === editingId ? { ...user, ...values } : user
        ));
        message.success('用户更新成功');
      }
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <h2>用户管理</h2>
      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        添加用户
      </Button>
      <Table 
        columns={columns} 
        dataSource={users} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingId === null ? '添加用户' : '编辑用户'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="department"
            label="部门"
            rules={[{ required: true, message: '请选择部门' }]}
          >
            <Select>
              {departments.map(dept => (
                <Option key={dept} value={dept}>{dept}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select>
              <Option value="admin">管理员</Option>
              <Option value="user">普通用户</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="电话"
            rules={[{ required: true, message: '请输入电话号码' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;