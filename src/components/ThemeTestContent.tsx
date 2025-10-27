import React, { useState } from 'react';
import {
  Typography,
  Button,
  Space,
  Divider,
  Alert,
  Card,
  Input,
  Select,
  DatePicker,
  Table,
  Tag,
  Badge,
  Spin,
  Progress,
  Modal,
} from 'antd';
import { MailOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text, Link } = Typography;

// Table 컴포넌트용 데이터
const tableColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: 'active' | 'pending' | 'rejected') => {
      let color;
      if (status === 'pending') color = 'gold';
      else if (status === 'rejected') color = 'red';
      else color = 'green';
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
];

const tableData = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', status: 'active' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', status: 'pending' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', status: 'rejected' },
];

const ThemeTestContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <Space direction="vertical" className="w-full">
      {/* 1. Typography */}
      <Card title="Typography">
        <Title>h1. Ant Design</Title>
        <Title level={2}>h2. Ant Design</Title>
        <Title level={3}>h3. Ant Design</Title>
        <Paragraph>
          This is a test paragraph. It includes <Text strong>strong text</Text>,{' '}
          <Text type="secondary">secondary text</Text>, and an external{' '}
          <Link href="https://ant.design" target="_blank">
            link
          </Link>
          .
        </Paragraph>
      </Card>
      
      {/* 2. Buttons */}
      <Card title="Buttons">
        <Space wrap>
          <Button type="primary">Primary Button</Button>
          <Button>Default Button</Button>
          <Button type="dashed">Dashed Button</Button>
          <Button type="text">Text Button</Button>
          <Button type="link">Link Button</Button>
          <Button type="primary" danger>Primary Danger</Button>
        </Space>
      </Card>
      
      {/* 3. Alerts */}
      <Card title="Alerts">
        <Space direction="vertical" className="w-full">
          <Alert message="Success Text" type="success" showIcon />
          <Alert message="Info Text" type="info" showIcon />
          <Alert message="Warning Text" type="warning" showIcon />
          <Alert message="Error Text" type="error" showIcon />
        </Space>
      </Card>
      
      {/* 4. Form Controls */}
      <Card title="Form Controls">
        <Space wrap align="center">
          <Input placeholder="Basic usage" />
          <Input addonBefore={<MailOutlined />} placeholder="Input with icon" />
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
            ]}
          />
          <DatePicker />
        </Space>
      </Card>
      
      {/* 5. Data Display */}
      <Card title="Data Display">
        <Title level={4}>Table</Title>
        <Table columns={tableColumns} dataSource={tableData} pagination={false} />
        <Divider />
        <Title level={4}>Tags & Badge</Title>
        <Space>
          <Tag color="success">success</Tag>
          <Tag color="processing">processing</Tag>
          <Tag color="error">error</Tag>
          <Tag color="warning">warning</Tag>
          <Tag color="default">default</Tag>
          <Badge count={5}>
            <Button>Notifications</Button>
          </Badge>
        </Space>
      </Card>

      {/* 6. Feedback */}
      <Card title="Feedback Components">
         <Space wrap align="center">
            <Spin size="large" />
            <Progress type="circle" percent={75} />
            <Progress percent={50} status="active" />
            <Button type="primary" onClick={() => setIsModalOpen(true)}>Open Modal</Button>
         </Space>
      </Card>
      
      <Modal 
        title="Basic Modal" 
        open={isModalOpen} 
        onOk={() => setIsModalOpen(false)} 
        onCancel={() => setIsModalOpen(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

    </Space>
  );
};

export default ThemeTestContent;