/**
 * 值班表管理组件
 * 实现值班记录的增删改查功能
 * 使用表格形式展示值班安排
 */

// 导入必要的React钩子和组件
import { useState } from 'react';
import { Table, Button, Modal, Form, DatePicker, Select, Input, message, Tag, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
// 导入日期处理库
import dayjs from 'dayjs';

// 从DatePicker组件中解构RangePicker组件，用于选择日期范围
const { RangePicker } = DatePicker;
// 从Select组件中解构Option组件
const { Option } = Select;

/**
 * 值班表主组件
 * 包含值班记录的展示、添加、编辑和删除功能
 */
const DutyRoster = () => {
  // 模拟值班数据 - 在实际应用中，这些数据应该从API获取
  const [dutyRosters, setDutyRosters] = useState([
    {
      id: 1,
      user: '张三',
      department: '技术部',
      startDate: '2023-09-15',
      endDate: '2023-09-16',
      type: 'day',
      notes: '日常值班'
    },
    {
      id: 2,
      user: '李四',
      department: '运维部',
      startDate: '2023-09-17',
      endDate: '2023-09-18',
      type: 'night',
      notes: '夜间值班'
    }
  ]);

  // 模拟用户数据 - 用于值班人员选择
  const users = [
    { id: 1, name: '张三', department: '技术部' },
    { id: 2, name: '李四', department: '运维部' },
    { id: 3, name: '王五', department: '人事部' },
    { id: 4, name: '赵六', department: '财务部' }
  ];

  // 控制添加/编辑值班记录模态框的显示状态
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 当前正在编辑的值班记录ID，null表示新增记录
  const [editingId, setEditingId] = useState(null);
  // 创建表单实例，用于表单操作
  const [form] = Form.useForm();

  /**
   * 表格列定义
   * 配置值班表格的各列显示内容和操作按钮
   */
  const columns = [
    {
      title: '值班人员',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: '结束日期',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: '值班类型',
      dataIndex: 'type',
      key: 'type',
      // 自定义值班类型显示，使用不同颜色的标签区分
      render: (type) => (
        <Tag color={type === 'day' ? 'blue' : 'purple'}>
          {type === 'day' ? '日班' : '夜班'}
        </Tag>
      )
    },
    {
      title: '备注',
      dataIndex: 'notes',
      key: 'notes',
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
   * 处理添加值班记录操作
   * 重置表单并显示添加值班记录模态框
   */
  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  /**
   * 处理编辑值班记录操作
   * @param {Object} record - 当前选中的值班记录
   */
  const handleEdit = (record) => {
    setEditingId(record.id);
    form.setFieldsValue({
      user: record.user,
      department: record.department,
      dateRange: [dayjs(record.startDate), dayjs(record.endDate)],
      type: record.type,
      notes: record.notes
    });
    setIsModalVisible(true);
  };

  /**
   * 处理删除值班记录操作
   * 弹出确认对话框，确认后删除值班记录
   * @param {number} id - 要删除的值班记录ID
   */
  const handleDelete = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条值班记录吗？',
      onOk() {
        setDutyRosters(dutyRosters.filter(roster => roster.id !== id));
        message.success('值班记录已删除');
      },
    });
  };

  /**
   * 处理表单提交
   * 根据editingId判断是添加新值班记录还是更新现有值班记录
   */
  const handleSubmit = () => {
    form.validateFields().then(values => {
      const [startDate, endDate] = values.dateRange.map(date => date.format('YYYY-MM-DD'));
      
      if (editingId === null) {
        // 添加新值班记录 - 使用当前时间戳作为临时ID
        // 在实际应用中，ID应该由后端生成
        const newRoster = {
          id: Date.now(),
          user: values.user,
          department: values.department,
          startDate,
          endDate,
          type: values.type,
          notes: values.notes || ''
        };
        setDutyRosters([...dutyRosters, newRoster]);
        message.success('值班记录添加成功');
      } else {
        // 更新现有值班记录 - 保留原记录ID，更新其他字段
        setDutyRosters(dutyRosters.map(roster => 
          roster.id === editingId ? { 
            ...roster, 
            user: values.user,
            department: values.department,
            startDate,
            endDate,
            type: values.type,
            notes: values.notes || ''
          } : roster
        ));
        message.success('值班记录更新成功');
      }
      setIsModalVisible(false);
      form.resetFields(); // 重置表单，避免下次打开时显示上次的数据
    }).catch(error => {
      console.error('表单验证失败:', error);
    });
  };

  /**
   * 组件渲染函数
   * 包含页面标题、添加按钮、值班表格和添加/编辑值班记录模态框
   */
  return (
    <div>
      <h2>值班表</h2>
      {/* 添加值班记录按钮 */}
      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        添加值班记录
      </Button>
      {/* 值班数据表格 */}
      <Table 
        columns={columns} 
        dataSource={dutyRosters} 
        rowKey="id" // 指定每行的唯一键
        pagination={{ pageSize: 10 }} // 分页配置
      />

      {/* 添加/编辑值班记录模态框 */}
      <Modal
        title={editingId === null ? '添加值班记录' : '编辑值班记录'} // 根据操作类型显示不同标题
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)} // 关闭模态框
        onOk={handleSubmit} // 提交表单
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="user"
            label="值班人员"
            rules={[{ required: true, message: '请选择值班人员' }]}
          >
            <Select>
              {users.map(user => (
                <Option key={user.id} value={user.name}>{user.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="department"
            label="部门"
            rules={[{ required: true, message: '请选择部门' }]}
          >
            <Select>
              <Option value="程序部">程序部</Option>
              <Option value="外联部">外联部</Option>
              <Option value="采编部">采编部</Option>
              <Option value="美工部">美工部</Option>
              <Option value="视频部">视频部</Option>
              <Option value="文产部">文产部</Option>
              <Option value="运营部">运营部</Option>
              <Option value="微博部">微博部</Option>
              <Option value="办公室">办公室</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dateRange"
            label="值班日期范围"
            rules={[{ required: true, message: '请选择值班日期范围' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="type"
            label="值班类型"
            rules={[{ required: true, message: '请选择值班类型' }]}
          >
            <Select>
              <Option value="day">日班</Option>
              <Option value="night">夜班</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="notes"
            label="备注"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

// 导出值班表组件
export default DutyRoster;