import type IApiSpecMessage from '@/types/IApiSpecMessage';
import ApiFieldTable from '@/components/ApiFieldTable';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface ApiMessageDisplayProps {
  message: IApiSpecMessage;
}

export default function ApiMessageDisplay({ message }: ApiMessageDisplayProps) {
  const hasBody = message.body && message.body.length > 0;
  const hasParams = message.params && message.params.length > 0;

  const showTabs = hasBody && hasParams;
  const showContent = hasBody || hasParams;

  return (
    <div className="space-y-4">
      {message.headers && message.headers.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Headers</h3>
          <ApiFieldTable fields={message.headers} />
        </div>
      )}

      {showContent && (
        <>
          {showTabs ? (
            <Tabs defaultValue="body" className="w-full">
              <TabsList>
                <TabsTrigger value="body">Body</TabsTrigger>
                <TabsTrigger value="params">Query Params</TabsTrigger>
              </TabsList>
              <TabsContent value="body">
                <ApiFieldTable fields={message.body!} />
              </TabsContent>
              <TabsContent value="params">
                <ApiFieldTable fields={message.params!} />
              </TabsContent>
            </Tabs>
          ) : (
            <>
              {hasBody && (
                <div>
                    {/* 탭 트리거 대신 제목 추가 */}
                  <h3 className="text-lg font-semibold mb-2">Body</h3>
                  <ApiFieldTable fields={message.body!} />
                </div>
              )}
              {hasParams && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Query Params</h3>
                  <ApiFieldTable fields={message.params!} />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}