import { useState } from 'react';
import type IApiSpecField from '@/types/IApiSpecField';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ExpandableNote: React.FC<{ note: string; isSimple: boolean }> = ({
  note,
  isSimple,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!note || isSimple) {
    return null;
  }

  return (
    <div className="mt-2">
      <Button
        variant="link"
        size="sm"
        className="p-0 h-auto"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? '비고 접기' : '비고'}
      </Button>

      {isExpanded && (
        <div
          className="prose prose-sm max-w-none mt-1 p-3 rounded-lg border bg-muted"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]} 
          >
            {note}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

interface ApiFieldTableProps {
  fields: IApiSpecField[];
  isSimple?: boolean;
}

export default function ApiFieldTable({
  fields,
  isSimple = false,
}: ApiFieldTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[30%]">Field</TableHead>
          <TableHead className="w-[70%]">Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields.map((field) => (
          <TableRow key={field.key}>
            <TableCell className="align-top font-medium">
              <div className="flex flex-col gap-1">
                <span className="font-mono font-semibold">{field.name}</span>
                <div className="flex flex-row flex-wrap gap-2">
                  <Badge variant="secondary">{field.type}</Badge>
                  {field.isRequired ? (
                    <Badge className='bg-info'>필수</Badge>
                  ) : (
                    <Badge variant="outline">선택</Badge>
                  )}
                </div>
              </div>
            </TableCell>
            <TableCell className="align-top">
              <p>{field.itemDescription}</p>
              <ExpandableNote note={field.note} isSimple={isSimple} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}