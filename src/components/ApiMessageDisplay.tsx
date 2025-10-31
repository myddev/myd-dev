import ApiFieldTable from './ApiFieldTable';
import type IApiSpecMessage from '@/types/IApiSpecMessage';

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

  const defaultTab = hasBody ? 'body' : hasParams ? 'params' : undefined;

  return (
    <div className="space-y-4">
      {message.headers && message.headers.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Headers</h3>
          <ApiFieldTable fields={message.headers} isSimple />
        </div>
      )}

      {defaultTab && (
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList>
            {hasBody && <TabsTrigger value="body">Body</TabsTrigger>}
            {hasParams && <TabsTrigger value="params">Query Params</TabsTrigger>}
          </TabsList>

          {hasBody && (
            <TabsContent value="body">
              <ApiFieldTable fields={message.body!} />
            </TabsContent>
          )}
          {hasParams && (
            <TabsContent value="params">
              <ApiFieldTable fields={message.params!} />
            </TabsContent>
          )}
        </Tabs>
      )}
    </div>
  );
}