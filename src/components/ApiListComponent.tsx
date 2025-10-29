import { List, Card, Typography, Tag } from 'antd';
import { Link } from '@tanstack/react-router';
import type IApiSpec from 'src/types/IApiSpec';

interface Props {
  apis: IApiSpec[];
}

export default function ApiListComponent({ apis }: Props) {
  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1 }}
      dataSource={apis}
      renderItem={(api) => (
        <List.Item>
          <Link
            to="/search/$apiId"
            params={{ apiId: api.apiId }}
            // 활성 링크(현재 보고 있는 API)에 스타일 적용
            activeProps={{ className: 'ant-card-bordered ant-card-active' }}
          >
            <Card hoverable size="small">
              <Typography.Title level={5}>{api.apiName}</Typography.Title>
              <div className="flex justify-between items-center">
                <Tag color="blue">{api.httpMethod}</Tag>
                <code className="text-xs">{api.resource}</code>
              </div>
            </Card>
          </Link>
        </List.Item>
      )}
    />
  );
}
