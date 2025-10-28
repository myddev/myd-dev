import { Tabs, Typography } from 'antd';
import type { TabsProps } from 'antd';
import ApiFieldTable from './ApiFieldTable';
import type IApiSpecMessage from 'src/types/IApiSpecMessage';

interface ApiMessageDisplayProps {
  message: IApiSpecMessage;
}

export default function ApiMessageDisplay({ message }:ApiMessageDisplayProps) {
  const tabItems: TabsProps['items'] = [];

  // 1. Body 탭 (데이터가 있을 때만 동적 추가)
  if (message.body && message.body.length > 0) {
    tabItems.push({
      key: 'body',
      label: 'Body',
      // 'isSimple' prop을 넘기지 않음 (풀 기능 테이블)
      children: <ApiFieldTable fields={message.body} />,
    });
  }

  // 2. Query Params 탭 (데이터가 있을 때만 동적 추가)
  if (message.params && message.params.length > 0) {
    tabItems.push({
      key: 'params',
      label: 'Query Params',
      // 'isSimple' prop을 넘기지 않음 (풀 기능 테이블)
      children: <ApiFieldTable fields={message.params} />,
    });
  }

  return (
    <div className="space-y-4">
      {message.headers && message.headers.length > 0 && (
        <div>
          <Typography.Title level={5} className="mb-2">
            Headers
          </Typography.Title>
          <ApiFieldTable fields={message.headers} isSimple />
        </div>
      )}

      {tabItems.length > 0 && (
        <Tabs
          defaultActiveKey={tabItems[0].key}
          items={tabItems}
          type="card"
        />
      )}
    </div>
  );
};
