import { Descriptions, Tag, Space } from 'antd';
import type IApiSpec from 'src/types/IApiSpec';

interface ApiSpecMetadataProps {
  api: IApiSpec;
}

export default function ApiSpecMetadata({ api }: ApiSpecMetadataProps) {
  const {
    apiId,
    httpMethod,
    resource,
    version,
    industry,
    scope,
    requestContentType,
  } = api;

  // HTTP Method에 따라 태그 색상 결정
  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case 'POST':
        return 'blue';
      case 'GET':
        return 'green';
      case 'PUT':
        return 'orange';
      case 'DELETE':
        return 'red';
      default:
        return 'default';
    }
  };

  return (
    <Descriptions bordered size="small" column={1}>
      <Descriptions.Item label="API ID">
        <span className="font-mono">{apiId}</span>
      </Descriptions.Item>

      <Descriptions.Item label="Version">
        <Tag>{version}</Tag>
      </Descriptions.Item>

      <Descriptions.Item label="Method & Resource">
        <Tag color={getMethodColor(httpMethod)} className="font-bold">
          {httpMethod}
        </Tag>
        <code className="ml-2 bg-background-layout dark:bg-background p-1 rounded">
          {resource}
        </code>
      </Descriptions.Item>

      <Descriptions.Item label="Industry">
        <Space wrap size={[0, 8]}>
          {industry?.map((ind) => <Tag key={ind}>{ind}</Tag>)}
        </Space>
      </Descriptions.Item>

      <Descriptions.Item label="Scope">
        <Space wrap size={[0, 8]}>
          {scope?.map((sc) => (
            <Tag key={sc} color="purple">
              {sc}
            </Tag>
          ))}
        </Space>
      </Descriptions.Item>

      <Descriptions.Item label="Request Type">
        <code className="text-xs">{requestContentType}</code>
      </Descriptions.Item>
    </Descriptions>
  );
}