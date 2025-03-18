// 导入React核心库，用于创建React组件
import React from 'react'
// 导入ReactDOM客户端渲染库，用于将React组件渲染到DOM中
import ReactDOM from 'react-dom/client'
// 导入根组件App
import App from './App.jsx'
// 导入全局样式文件
import './index.css'

// 创建React根实例，并将其挂载到id为'root'的DOM元素上
// 使用createRoot API是React 18的新特性，支持并发渲染
ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode是一个用于突出显示应用程序中潜在问题的工具
  // 它不会渲染任何可见的UI，但会进行额外的检查和警告
  <React.StrictMode>
    {/* 渲染App组件作为应用程序的根组件 */}
    <App />
  </React.StrictMode>,
)