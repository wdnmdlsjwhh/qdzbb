// 导入React的useState钩子，用于管理组件状态
import { useState } from 'react'
// 导入React Router相关组件，用于实现路由功能
// Router: 路由器组件，提供路由上下文
// Routes: 路由容器，用于包裹Route组件
// Route: 路由组件，定义路径和对应的组件
// Navigate: 导航组件，用于重定向
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// 导入Ant Design组件
// Layout: 布局组件
// ConfigProvider: 全局配置组件，用于配置主题、语言等
import { Layout, ConfigProvider } from 'antd'
// 导入Ant Design的中文语言包
import zhCN from 'antd/locale/zh_CN'

// 导入组件
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Schedule from './pages/Schedule'
import DutyRoster from './pages/DutyRoster'
import UserManagement from './pages/UserManagement'
import ExcelUpload from './pages/ExcelUpload'
import Sidebar from './components/Sidebar'
import HeaderComponent from './components/HeaderComponent'

import './App.css'

/**
 * App组件 - 应用程序的根组件
 * 负责整体布局和路由配置，实现基本的登录状态管理
 */
function App() {
  // 定义登录状态，默认为未登录
  // isLoggedIn: 当前登录状态
  // setIsLoggedIn: 更新登录状态的函数
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  return (
    // 配置Ant Design组件使用中文语言包
    <ConfigProvider locale={zhCN}>
      {/* 路由器组件，为整个应用提供路由功能 */}
      <Router>
        {/* 根据登录状态条件渲染不同的内容 */}
        {isLoggedIn ? (
          /* 已登录状态：显示主应用布局 */
          <Layout style={{ minHeight: "100vh" }}>
            {/* 侧边栏组件 */}
            <Sidebar />
            <Layout>
              {/* 顶部导航栏组件，传入setIsLoggedIn函数用于实现登出功能 */}
              <HeaderComponent setIsLoggedIn={setIsLoggedIn} />
              {/* 内容区域 */}
              <Layout.Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
                {/* 路由配置 */}
                <Routes>
                  {/* 首页路由 */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  {/* 日程表路由 */}
                  <Route path="/schedule" element={<Schedule />} />
                  {/* 值班表路由 */}
                  <Route path="/duty-roster" element={<DutyRoster />} />
                  {/* 用户管理路由 */}
                  <Route path="/users" element={<UserManagement />} />
                  {/* Excel上传路由 */}
                  <Route path="/excel-upload" element={<ExcelUpload />} />
                  {/* 通配符路由，重定向到首页 */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Layout.Content>
              {/* 页脚 */}
              <Layout.Footer style={{ textAlign: 'center' }}>
                组织管理系统 ©{new Date().getFullYear()} 版权所有
              </Layout.Footer>
            </Layout>
          </Layout>
        ) : (
          /* 未登录状态：显示登录页面和注册页面 */
          <Routes>
            {/* 登录页路由，传入setIsLoggedIn函数用于实现登录功能 */}
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            {/* 注册页路由 */}
            <Route path="/register" element={<Register />} />
            {/* 通配符路由，重定向到登录页 */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </Router>
    </ConfigProvider>
  )
}

export default App