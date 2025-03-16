import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Layout, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

// 导入组件
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Schedule from './pages/Schedule'
import DutyRoster from './pages/DutyRoster'
import UserManagement from './pages/UserManagement'
import Sidebar from './components/Sidebar'
import HeaderComponent from './components/HeaderComponent'

import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        {isLoggedIn ? (
          <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout>
              <HeaderComponent setIsLoggedIn={setIsLoggedIn} />
              <Layout.Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/duty-roster" element={<DutyRoster />} />
                  <Route path="/users" element={<UserManagement />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Layout.Content>
              <Layout.Footer style={{ textAlign: 'center' }}>
                组织管理系统 ©{new Date().getFullYear()} 版权所有
              </Layout.Footer>
            </Layout>
          </Layout>
        ) : (
          <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </Router>
    </ConfigProvider>
  )
}

export default App