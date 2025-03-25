import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, CalendarOutlined, TeamOutlined } from '@ant-design/icons';

const Dashboard = () => {
  // 模拟数据
  const stats = {
    totalUsers: 24,
    schedulesThisWeek: 15,
    dutyRostersThisMonth: 8
  };

  return (
    <div>
      <h2>系统概览</h2>
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="用户总数"
              value={stats.totalUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="本周日程安排"
              value={stats.schedulesThisWeek}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="本月值班安排"
              value={stats.dutyRostersThisMonth}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="系统公告">
            <p>欢迎使用湘农青年！本系统用于管理组织内部的日程安排和值班表。</p>
            <p>使用指南：</p>
            <ul>
              <li>在"日程表"页面可以查看和安排个人或团队日程</li>
              <li>在"值班表"页面可以查看和安排组织值班</li>
              <li>管理员可以在"用户管理"页面管理系统用户</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;