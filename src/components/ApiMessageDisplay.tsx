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

  // ✨ [수정] 탭을 보여줄지 결정하는 변수 (둘 다 있어야 true)
  const showTabs = hasBody && hasParams;
  // ✨ [수정] Body 또는 Params 중 하나라도 있는지 확인
  const showContent = hasBody || hasParams;

  return (
    <div className="space-y-4">
      {message.headers && message.headers.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Headers</h3>
          <ApiFieldTable fields={message.headers} isSimple />
        </div>
      )}

      {/* ✨ [수정] 렌더링 로직 분기 */}
      {showContent && (
        <>
          {showTabs ? (
            // 1. Body와 Params 둘 다 있을 경우: 탭 사용
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
            // 2. 둘 중 하나만 있을 경우: 탭 없이 바로 렌더링
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
                    {/* 탭 트리거 대신 제목 추가 */}
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