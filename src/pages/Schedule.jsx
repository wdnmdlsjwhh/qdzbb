import { useState } from 'react';
import { Calendar, Badge, Modal, Form, Input, DatePicker, Select, Button, message } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

const Schedule = () => {
  // 模拟日程数据
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      title: '团队会议',
      date: '2023-09-15',
      type: 'team',
      description: '讨论本周工作进展',
      status: 'confirmed'
    },
    {
      id: 2,
      title: '项目评审',
      date: '2023-09-20',
      type: 'important',
      description: '评审新项目提案',
      status: 'confirmed'
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(null);

  // 日程类型对应的徽章颜色
  const typeColors = {
    personal: 'blue',
    team: 'green',
    important: 'red'
  };

  // 在日历上显示日程
  const dateCellRender = (value) => {
    const date = value.format('YYYY-MM-DD');
    const dateSchedules = schedules.filter(schedule => schedule.date === date);
    
    return (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {dateSchedules.map(schedule => (
          <li key={schedule.id} style={{ marginBottom: '3px' }}>
            <Badge 
              color={typeColors[schedule.type]} 
              text={schedule.title} 
              style={{ cursor: 'pointer' }}
              onClick={() => showScheduleDetails(schedule)}
            />
          </li>
        ))}
      </ul>
    );
  };

  // 显示日程详情
  const showScheduleDetails = (schedule) => {
    Modal.info({
      title: schedule.title,
      content: (
        <div>
          <p><strong>日期：</strong>{schedule.date}</p>
          <p><strong>类型：</strong>{getTypeLabel(schedule.type)}</p>
          <p><strong>描述：</strong>{schedule.description}</p>
          <p><strong>状态：</strong>{schedule.status === 'confirmed' ? '已确认' : '待确认'}</p>
        </div>
      )
    });
  };

  // 获取类型标签
  const getTypeLabel = (type) => {
    const types = {
      personal: '个人',
      team: '团队',
      important: '重要'
    };
    return types[type] || type;
  };

  // 点击日期单元格
  const onSelect = (date) => {
    setSelectedDate(date.format('YYYY-MM-DD'));
    form.setFieldsValue({
      date: date,
      type: 'personal',
      title: '',
      description: ''
    });
    setIsModalVisible(true);
  };

  // 添加新日程
  const handleAddSchedule = () => {
    form.validateFields().then(values => {
      const newSchedule = {
        id: Date.now(),
        title: values.title,
        date: values.date.format('YYYY-MM-DD'),
        type: values.type,
        description: values.description,
        status: 'confirmed'
      };
      
      setSchedules([...schedules, newSchedule]);
      message.success('日程添加成功！');
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div>
      <h2>日程表</h2>
      <Calendar 
        dateCellRender={dateCellRender} 
        onSelect={onSelect}
      />
      
      <Modal
        title="添加日程"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddSchedule}>
          <Form.Item
            name="date"
            label="日期"
            rules={[{ required: true, message: '请选择日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入日程标题' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择日程类型' }]}
          >
            <Select>
              <Option value="personal">个人</Option>
              <Option value="team">团队</Option>
              <Option value="important">重要</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="description"
            label="描述"
          >
            <TextArea rows={4} />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              保存
            </Button>
            <Button onClick={() => setIsModalVisible(false)}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Schedule;