import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useState } from 'react';
import ApiMessageDisplay from '@/components/ApiMessageDisplay';
import ApiSpecMetadata from '@/components/ApiSpecMetadata';
import type IApiSpec from '@/types/IApiSpec';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Route as SearchRoute } from '@/routes/search';
import { Check, Copy, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ApiSpecDetailProps {
  api: IApiSpec;
}

export default function ApiSpecDetail({ api }: ApiSpecDetailProps) {
  const hasErrorResponse = !!api.errorResponse;
  const [copied, setCopied] = useState(false);

  const navigate = SearchRoute.useNavigate();
  const currentSearch = SearchRoute.useSearch();

  const handleClose = () => {
    const newSearch = {
      ...currentSearch,
      id: undefined,
    };

    navigate({
      search: newSearch,
    });
  };

  const handleCopySpec = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(api.rawSpec, null, 2));
      setCopied(true);
    } catch (error) {
      console.error('Failed to copy API spec as JSON', error);
    }
  };

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <div className="space-y-6">
      <div className="flex flex-row gap-2 items-center my-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="h-8 w-8"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </Button>
        <h2 className="text-2xl font-semibold tracking-tight">
          {`[${api.apiId}] ${api.apiName}`}
        </h2>
        <Badge variant="default">{api.version}</Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopySpec}
          className="ml-auto"
        >
          {copied ? (
            <Check className="h-4 w-4 mr-1" />
          ) : (
            <Copy className="h-4 w-4 mr-1" />
          )}
          {copied ? '복사됨' : 'JSON 복사'}
        </Button>
      </div>

      <div className="prose prose-sm prose-muted max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {api.description}
        </ReactMarkdown>
      </div>

      <ApiSpecMetadata api={api} />

      <Separator />

      <Tabs defaultValue="request" className="w-full">
        <TabsList>
          <TabsTrigger value="request">요청</TabsTrigger>
          <TabsTrigger value="response">응답</TabsTrigger>
          {hasErrorResponse && (
            <TabsTrigger value="error-response">에러 응답</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="request" className="mt-4">
          <ApiMessageDisplay message={api.request} />
        </TabsContent>
        <TabsContent value="response" className="mt-4">
          <ApiMessageDisplay message={api.response} />
        </TabsContent>
        {hasErrorResponse && (
          <TabsContent value="error-response" className="mt-4">
            <ApiMessageDisplay message={api.errorResponse!} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
