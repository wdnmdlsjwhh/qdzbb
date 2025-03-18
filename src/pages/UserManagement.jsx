/**
 * 用户管理组件
 * 实现用户的增删改查功能
 * 使用Ant Design组件库构建用户界面
 */

// 导入必要的React钩子和组件
import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

// 从Select组件中解构Option组件
const { Option } = Select;

/**
 * 用户管理主组件
 * 包含用户列表展示、添加、编辑和删除功能
 */
const UserManagement = () => {
  // 模拟用户数据 - 在实际应用中，这些数据应该从API获取
  const [users, setUsers] = useState([
    { id: 1, name: '张三', department: '技术部', role: 'admin', email: 'zhangsan@example.com', phone: '13800000001' },
    { id: 2, name: '李四', department: '运维部', role: 'user', email: 'lisi@example.com', phone: '13800000002' },
    { id: 3, name: '王五', department: '人事部', role: 'user', email: 'wangwu@example.com', phone: '13800000003' },
    { id: 4, name: '赵六', department: '财务部', role: 'user', email: 'zhaoliu@example.com', phone: '13800000004' }
  ]);

  // 部门列表 - 可选的用户部门
  const departments = ['技术部', '运维部', '人事部', '财务部', '市场部'];
  
  // 角色列表 - 用户可分配的角色
  const roles = ['admin', 'user'];

  // 控制添加/编辑用户模态框的显示状态
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 当前正在编辑的用户ID，null表示新增用户
  const [editingId, setEditingId] = useState(null);
  // 创建表单实例，用于表单操作
  const [form] = Form.useForm();

  /**
   * 表格列定义
   * 配置用户表格的各列显示内容和操作按钮
   */
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
      // 自定义角色显示，将英文角色名转换为中文显示
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
      // 自定义操作列，包含编辑和删除按钮
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

  /**
   * 处理添加用户操作
   * 重置表单并显示添加用户模态框
   */
  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  /**
   * 处理编辑用户操作
   * @param {Object} record - 当前选中的用户记录
   */
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

  /**
   * 处理删除用户操作
   * 弹出确认对话框，确认后删除用户
   * @param {number} id - 要删除的用户ID
   */
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

  /**
   * 处理表单提交
   * 根据editingId判断是添加新用户还是更新现有用户
   */
  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (editingId === null) {
        // 添加新用户 - 使用当前时间戳作为临时ID
        // 在实际应用中，ID应该由后端生成
        const newUser = {
          id: Date.now(), // 使用时间戳作为唯一ID
          ...values
        };
        setUsers([...users, newUser]);
        message.success('用户添加成功');
      } else {
        // 更新现有用户 - 保留原用户ID，更新其他字段
        setUsers(users.map(user => 
          user.id === editingId ? { ...user, ...values } : user
        ));
        message.success('用户更新成功');
      }
      setIsModalVisible(false);
    });
  };

  /**
   * 组件渲染函数
   * 包含页面标题、添加按钮、用户表格和添加/编辑用户模态框
   */
  return (
    <div>
      <h2>用户管理</h2>
      {/* 添加用户按钮 */}
      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        添加用户
      </Button>
      {/* 用户数据表格 */}
      <Table 
        columns={columns} 
        dataSource={users} 
        rowKey="id" // 指定每行的唯一键
        pagination={{ pageSize: 10 }} // 分页配置
      />

      {/* 添加/编辑用户模态框 */}
      <Modal
        title={editingId === null ? '添加用户' : '编辑用户'} // 根据操作类型显示不同标题
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)} // 关闭模态框
        onOk={handleSubmit} // 提交表单
      >
        {/* 用户表单 */}
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
              { type: 'email', message: '请输入有效的邮箱地址' } // 邮箱格式验证
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

// 导出用户管理组件
export default UserManagement;