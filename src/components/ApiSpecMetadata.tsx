import type IApiSpec from '@/types/IApiSpec';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

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

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="w-48 font-medium">API ID</TableCell>
          <TableCell>
            <span>{apiId}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Method & Resource</TableCell>
          <TableCell>
            <Badge
              className={cn(
                api.httpMethod === 'GET' ? 'bg-warn' : 'bg-success',
                'font-bold'
              )}
            >
              {httpMethod}
            </Badge>
            <code className="ml-2 bg-muted p-1.5 rounded-sm font-mono text-sm">
              {resource}
            </code>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-medium">Industry</TableCell>
          <TableCell>
            <div className="flex flex-wrap gap-2">
              {industry?.map((ind) => (
                <Badge key={ind} variant="outline">
                  {ind}
                </Badge>
              )) ?? '-'}
            </div>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-medium">Scope</TableCell>
          <TableCell>
            <div className="flex flex-wrap gap-2">
              {scope?.map((sc) => (
                <Badge key={sc} variant="secondary">
                  {sc}
                </Badge>
              )) ?? '-'}
            </div>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-medium">Request Type</TableCell>
          <TableCell>
            <code className="bg-muted p-1.5 rounded-sm font-mono text-sm">
              {requestContentType}
            </code>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
