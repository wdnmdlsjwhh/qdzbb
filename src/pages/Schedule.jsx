/**
 * 日程管理组件
 * 实现日程的查看、添加功能
 * 使用日历形式展示日程安排
 */

// 导入必要的React钩子和组件
import { useState } from 'react';
import { Calendar, Badge, Modal, Form, Input, DatePicker, Select, Button, message } from 'antd';
// 导入日期处理库
import dayjs from 'dayjs';

// 从Select组件中解构Option组件
const { Option } = Select;
// 从Input组件中解构TextArea组件
const { TextArea } = Input;

/**
 * 日程表主组件
 * 包含日程展示、添加功能
 */
const Schedule = () => {
  // 模拟日程数据 - 在实际应用中，这些数据应该从API获取
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

  // 控制添加日程模态框的显示状态
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 创建表单实例，用于表单操作
  const [form] = Form.useForm();
  // 当前选中的日期
  const [selectedDate, setSelectedDate] = useState(null);

  // 日程类型对应的徽章颜色映射
  // 不同类型的日程使用不同颜色标识
  const typeColors = {
    personal: 'blue',
    team: 'green',
    important: 'red'
  };

  /**
   * 在日历单元格中渲染日程项目
   * @param {dayjs} value - 日历单元格的日期值
   * @returns {ReactNode} 渲染的日程列表
   */
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

  /**
   * 显示日程详情模态框
   * @param {Object} schedule - 日程对象
   */
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

  /**
   * 获取日程类型的中文标签
   * @param {string} type - 日程类型的英文标识
   * @returns {string} 日程类型的中文标签
   */
  const getTypeLabel = (type) => {
    const types = {
      personal: '个人',
      team: '团队',
      important: '重要'
    };
    return types[type] || type;
  };

  /**
   * 处理日期单元格点击事件
   * 点击日期后打开添加日程的模态框
   * @param {dayjs} date - 点击的日期
   */
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

  /**
   * 处理添加日程操作
   * 验证表单并创建新的日程记录
   */
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

  /**
   * 组件渲染函数
   * 包含日历组件和添加日程的模态框
   */
  return (
    <div>
      <h2>日程表</h2>
      {/* 日历组件，用于展示和选择日程 */}
      <Calendar 
        dateCellRender={dateCellRender} // 自定义日期单元格渲染函数
        onSelect={onSelect} // 日期选择事件处理函数
      />
      
      {/* 添加日程的模态框 */}
      <Modal
        title="添加日程"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)} // 关闭模态框
        footer={null} // 不使用默认的页脚按钮
      >
        {/* 日程表单 */}
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

// 导出日程表组件
export default Schedule;