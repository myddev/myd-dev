// src/components/ApiFieldTable.tsx
import { Alert, Button, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import type IApiSpecField from 'src/types/IApiSpecField';

const ExpandableNote: React.FC<{ note: string; isSimple: boolean }> = ({
  note,
  isSimple,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!note || isSimple) {
    return null;
  }

  return (
    <div className="mt-2">
      <Button
        type="link"
        size="small"
        className="p-0"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? '비고 접기' : '비고'}
      </Button>

      {isExpanded && <Alert message={note} />}
    </div>
  );
};

interface ApiFieldTableProps {
  fields: IApiSpecField[];
  isSimple?: boolean;
}

export default function ApiFieldTable({
  fields,
  isSimple = false,
}: ApiFieldTableProps) {
  const columns: ColumnsType<IApiSpecField> = [
    {
      title: 'Field',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <span className="font-mono font-semibold">{record.name}</span>
          <Space size="small">
            <Tag color="cyan" bordered={false} className="m-0">
              {record.type}
            </Tag>
            {record.isRequired ? (
              <Tag color="red" bordered={false} className="m-0">
                필수
              </Tag>
            ) : (
              <Tag color="default" bordered={false} className="m-0">
                선택
              </Tag>
            )}
          </Space>
        </Space>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'itemDescription',
      key: 'itemDescription',
      width: '70%',
      render: (desc, record) => (
        <div>
          <Typography.Text>{desc}</Typography.Text>
          <ExpandableNote note={record.note} isSimple={isSimple} />
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={fields}
      pagination={false}
      rowKey="key"
      size="small"
    />
  );
}
