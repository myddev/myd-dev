import type IApiSpec from '@/types/IApiSpec';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface ApiSpecMetadataProps {
  api: IApiSpec;
}

export default function ApiSpecMetadata({ api }: ApiSpecMetadataProps) {
  const {
    apiId,
    apiCode, // ✨ 추가
    httpMethod,
    resource,
    version,
    industry,
    scope,
    requestContentType,
    responseContentType,
    transmissionCycle,
    referenceTime, 
    providerRequesters, 
  } = api;

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="w-48 font-medium">API ID (Version)</TableCell>
          <TableCell>
            {/* ✨ apiId와 version을 함께 표시 */}
            <span className="font-mono">{apiId}</span>
            <Badge variant="outline" className="ml-2">
              {apiCode}
            </Badge>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-medium">Resource</TableCell>
          <TableCell>
            <Badge
              className={cn(
                api.httpMethod === 'GET' ? 'bg-warn' : 'bg-success',
                'font-bold',
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

        <TableRow>
          <TableCell className="font-medium">Response Type</TableCell>
          <TableCell>
            <code className="bg-muted p-1.5 rounded-sm font-mono text-sm">
              {responseContentType}
            </code>
          </TableCell>
        </TableRow>

        {transmissionCycle && (
          <TableRow>
            <TableCell className="font-medium">Transmission Cycle</TableCell>
            <TableCell>{transmissionCycle}</TableCell>
          </TableRow>
        )}

        {referenceTime && (
          <TableRow>
            <TableCell className="font-medium">Reference Time</TableCell>
            <TableCell>{referenceTime}</TableCell>
          </TableRow>
        )}

        {providerRequesters && providerRequesters.length > 0 && (
          <TableRow>
            <TableCell className="font-medium">Provider/Requester</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-2">
                {providerRequesters.map((pair, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1.5"
                  >
                    <span>{pair.provider}</span>
                    <ArrowRight className="size-3" />
                    <span>{pair.requester}</span>
                  </Badge>
                ))}
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}