import { List, Card, Typography, Tag } from 'antd';
import { Link } from '@tanstack/react-router';
import type IApiSpec from 'src/types/IApiSpec';

interface Props {
  apis: IApiSpec[];
}

export default function ApiListComponent({ apis }: Props) {
  return (
    <List
      // 1. grid prop을 제거하여 한 줄에 하나의 entry만 오도록(기본 수직 리스트)
      dataSource={apis}
      renderItem={(api) => (
        <List.Item>
          <Link
            to="/search/$apiId"
            params={{ apiId: api.apiId }}
            // 활성 링크(현재 보고 있는 API)에 스타일 적용
            activeProps={{ className: 'ant-card-bordered ant-card-active' }}
            className="w-full"
          >
            <Card hoverable size="small">
              <Typography.Title level={5}>
                <span className="mr-1">
                  [{api.apiId}]
                </span>
                {api.apiName}
              </Typography.Title>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <Tag color={api.httpMethod === 'GET' ? 'success' : 'blue'}>
                    {api.httpMethod}
                  </Tag>
                  {api.apiCode && <Tag color="default">{api.apiCode}</Tag>}
                </div>
                <code className="text-xs">{api.resource}</code>
              </div>
            </Card>
          </Link>
        </List.Item>
      )}
    />
  );
}