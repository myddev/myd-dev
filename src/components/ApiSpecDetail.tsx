import { Tabs, Typography, Divider } from 'antd';
import type { TabsProps } from 'antd';
import ApiMessageDisplay from 'src/components/ApiMessageDisplay';
import ApiSpecMetadata from 'src/components/ApiSpecMetadata'; // 1. 임포트
import type IApiSpec from 'src/types/IApiSpec';

interface ApiSpecDetailProps {
  api: IApiSpec;
}

export default function ApiSpecDetail({ api }: ApiSpecDetailProps) {
  // Request / Response 탭 아이템 구성
  const specTabs: TabsProps['items'] = [
    {
      key: 'request',
      label: '요청',
      children: <ApiMessageDisplay message={api.request} />,
    },
    {
      key: 'response',
      label: '응답',
      children: <ApiMessageDisplay message={api.response} />,
    },
  ];

  // Error Response가 있으면 탭에 추가
  if (api.errorResponse) {
    specTabs.push({
      key: 'error',
      label: 'Error Response',
      children: <ApiMessageDisplay message={api.errorResponse} />,
    });
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4 dark:border-b-gray-700">
        <Typography.Title level={3} className="mb-2">
          {api.apiName}
        </Typography.Title>
        <Typography.Paragraph type="secondary">
          {api.description}
        </Typography.Paragraph>
      </div>

      <ApiSpecMetadata api={api} />

      <Divider />

      <Tabs defaultActiveKey="request" items={specTabs} size="large" />
    </div>
  );
}