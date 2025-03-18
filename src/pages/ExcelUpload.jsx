/**
 * Excel表格上传组件
 * 实现Excel文件的上传、预览和导入功能
 */

// 导入必要的React钩子和组件
import { useState } from 'react';
import { Upload, Button, Table, Card, message, Modal, Select, Space, Alert } from 'antd';
import { UploadOutlined, FileExcelOutlined, EyeOutlined, ImportOutlined } from '@ant-design/icons';
// 导入xlsx库用于解析Excel文件
import * as XLSX from 'xlsx';

// 从Select组件中解构Option组件
const { Option } = Select;

/**
 * Excel表格上传主组件
 * 包含文件上传、数据预览和导入功能
 */
const ExcelUpload = () => {
  // 存储上传的文件
  const [file, setFile] = useState(null);
  // 存储解析后的Excel数据
  const [excelData, setExcelData] = useState([]);
  // 存储Excel文件中的工作表列表
  const [sheets, setSheets] = useState([]);
  // 当前选中的工作表
  const [currentSheet, setCurrentSheet] = useState('');
  // 表格列定义
  const [columns, setColumns] = useState([]);
  // 预览模态框显示状态
  const [previewVisible, setPreviewVisible] = useState(false);
  // 导入目标选择模态框显示状态
  const [importModalVisible, setImportModalVisible] = useState(false);
  // 导入目标
  const [importTarget, setImportTarget] = useState('schedule');

  /**
   * 处理文件上传前的验证
   * @param {File} file - 上传的文件对象
   * @returns {boolean|Promise} 是否允许上传
   */
  const beforeUpload = (file) => {
    // 检查文件类型
    const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                    file.type === 'application/vnd.ms-excel';
    if (!isExcel) {
      message.error('只能上传Excel文件！');
      return false;
    }
    
    // 检查文件大小，限制为10MB
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('文件大小不能超过10MB！');
      return false;
    }
    
    // 设置文件对象到状态
    setFile(file);
    return false; // 阻止自动上传，我们将手动处理文件
  };

  /**
   * 解析Excel文件
   */
  const parseExcel = () => {
    if (!file) {
      message.warning('请先选择Excel文件！');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // 获取所有工作表名称
        const sheetNames = workbook.SheetNames;
        setSheets(sheetNames);
        
        if (sheetNames.length > 0) {
          // 默认选择第一个工作表
          const firstSheet = sheetNames[0];
          setCurrentSheet(firstSheet);
          
          // 解析工作表数据
          const worksheet = workbook.Sheets[firstSheet];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          if (jsonData.length > 0) {
            // 使用第一行作为表头
            const headers = jsonData[0];
            // 创建表格列定义
            const tableColumns = headers.map((header, index) => ({
              title: header,
              dataIndex: `col${index}`,
              key: `col${index}`,
            }));
            
            // 转换数据格式以适应Table组件
            const tableData = jsonData.slice(1).map((row, rowIndex) => {
              const rowData = { key: rowIndex };
              row.forEach((cell, cellIndex) => {
                rowData[`col${cellIndex}`] = cell;
              });
              return rowData;
            });
            
            setColumns(tableColumns);
            setExcelData(tableData);
            setPreviewVisible(true);
          } else {
            message.warning('Excel文件中没有数据！');
          }
        } else {
          message.warning('Excel文件中没有工作表！');
        }
      } catch (error) {
        console.error('解析Excel文件出错：', error);
        message.error('解析Excel文件失败，请检查文件格式！');
      }
    };
    
    reader.onerror = () => {
      message.error('读取文件失败！');
    };
    
    reader.readAsArrayBuffer(file);
  };

  /**
   * 切换工作表
   * @param {string} sheetName - 工作表名称
   */
  const handleSheetChange = (sheetName) => {
    setCurrentSheet(sheetName);
    
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // 解析选中的工作表数据
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        if (jsonData.length > 0) {
          // 使用第一行作为表头
          const headers = jsonData[0];
          // 创建表格列定义
          const tableColumns = headers.map((header, index) => ({
            title: header,
            dataIndex: `col${index}`,
            key: `col${index}`,
          }));
          
          // 转换数据格式以适应Table组件
          const tableData = jsonData.slice(1).map((row, rowIndex) => {
            const rowData = { key: rowIndex };
            row.forEach((cell, cellIndex) => {
              rowData[`col${cellIndex}`] = cell;
            });
            return rowData;
          });
          
          setColumns(tableColumns);
          setExcelData(tableData);
        } else {
          setColumns([]);
          setExcelData([]);
          message.warning('所选工作表中没有数据！');
        }
      };
      
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('解析工作表出错：', error);
      message.error('解析工作表失败！');
    }
  };

  /**
   * 打开导入目标选择模态框
   */
  const showImportModal = () => {
    setImportModalVisible(true);
  };

  /**
   * 处理导入操作
   */
  const handleImport = () => {
    // 在实际应用中，这里应该调用API将数据导入到系统中
    // 这里仅做模拟
    message.success(`数据已成功导入到${importTarget === 'schedule' ? '日程表' : importTarget === 'duty' ? '值班表' : '用户管理'}！`);
    setImportModalVisible(false);
    setPreviewVisible(false);
    // 重置状态
    setFile(null);
    setExcelData([]);
    setSheets([]);
    setCurrentSheet('');
    setColumns([]);
  };

  /**
   * 组件渲染函数
   * 包含文件上传区域、预览模态框和导入目标选择模态框
   */
  return (
    <div>
      <h2>Excel表格上传</h2>
      
      {/* 文件上传卡片 */}
      <Card title="上传Excel文件" style={{ marginBottom: 16 }}>
        <Alert
          message="支持的文件格式"
          description="请上传.xlsx或.xls格式的Excel文件，文件大小不超过10MB。"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        
        <Space direction="vertical" style={{ width: '100%' }}>
          <Upload
            beforeUpload={beforeUpload}
            onRemove={() => setFile(null)}
            fileList={file ? [file] : []}
            accept=".xlsx,.xls"
          >
            <Button icon={<UploadOutlined />}>选择文件</Button>
          </Upload>
          
          <Button 
            type="primary" 
            onClick={parseExcel} 
            disabled={!file}
            icon={<EyeOutlined />}
          >
            预览数据
          </Button>
        </Space>
      </Card>
      
      {/* 数据预览模态框 */}
      <Modal
        title="Excel数据预览"
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        width={800}
        footer={[
          <Button key="back" onClick={() => setPreviewVisible(false)}>
            取消
          </Button>,
          <Button 
            key="import" 
            type="primary" 
            icon={<ImportOutlined />} 
            onClick={showImportModal}
          >
            导入数据
          </Button>,
        ]}
      >
        {sheets.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <span style={{ marginRight: 8 }}>选择工作表：</span>
            <Select
              value={currentSheet}
              onChange={handleSheetChange}
              style={{ width: 200 }}
            >
              {sheets.map(sheet => (
                <Option key={sheet} value={sheet}>{sheet}</Option>
              ))}
            </Select>
          </div>
        )}
        
        <Table 
          columns={columns} 
          dataSource={excelData} 
          scroll={{ x: 'max-content' }}
          pagination={{ pageSize: 5 }}
          size="small"
        />
      </Modal>
      
      {/* 导入目标选择模态框 */}
      <Modal
        title="选择导入目标"
        open={importModalVisible}
        onCancel={() => setImportModalVisible(false)}
        onOk={handleImport}
      >
        <p>请选择要将数据导入到哪个模块：</p>
        <Select
          value={importTarget}
          onChange={setImportTarget}
          style={{ width: '100%' }}
        >
          <Option value="schedule">日程表</Option>
          <Option value="duty">值班表</Option>
          <Option value="users">用户管理</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default ExcelUpload;