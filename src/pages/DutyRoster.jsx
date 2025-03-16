import { useState } from 'react';
import { Table, Button, Modal, Form, DatePicker, Select, Input, message, Tag, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

const DutyRoster = () => {
  // 模拟值班数据
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

  // 模拟用户数据
  const users = [
    { id: 1, name: '张三', department: '技术部' },
    { id: 2, name: '李四', department: '运维部' },
    { id: 3, name: '王五', department: '人事部' },
    { id: 4, name: '赵六', department: '财务部' }
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();

  // 表格列定义
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

  // 处理添加值班记录
  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // 处理编辑值班记录
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

  // 处理删除值班记录
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

  // 处理表单提交
  const handleSubmit = () => {
    form.validateFields().then(values => {
      const [startDate, endDate] = values.dateRange.map(date => date.format('YYYY-MM-DD'));
      
      if (editingId === null) {
        // 添加新值班记录
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
        // 更新现有值班记录
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

  return (
    <div>
      <h2>值班表</h2>
      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        添加值班记录
      </Button>
      <Table 
        columns={columns} 
        dataSource={dutyRosters} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingId === null ? '添加值班记录' : '编辑值班记录'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
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
              <Option value="技术部">技术部</Option>
              <Option value="运维部">运维部</Option>
              <Option value="人事部">人事部</Option>
              <Option value="财务部">财务部</Option>
              <Option value="市场部">市场部</Option>
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

export default DutyRoster;