import { Tabs, Typography, Divider } from 'antd';
import type { TabsProps } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
      key: 'error-response',
      label: '에러 응답',
      children: <ApiMessageDisplay message={api.errorResponse} />,
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <Typography.Title level={3} className="mb-2">
          {`[${api.apiId}] ${api.apiName}`}
        </Typography.Title>
        <div className="prose prose-sm prose-secondary max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]} // GFM(테이블, 줄바꿈 등) 활성화
          >
            {api.description}
          </ReactMarkdown>
        </div>
      </div>

      <ApiSpecMetadata api={api} />

      <Divider />

      <Tabs defaultActiveKey="request" items={specTabs} size="large" />
    </div>
  );
}
