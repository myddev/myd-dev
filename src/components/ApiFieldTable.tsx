import { Fragment, useEffect, useState } from 'react';
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
import { ChevronDown, ChevronRight } from 'lucide-react';

const ExpandableNote = ({
  note,
}: {note: string}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!note) {
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
          className="prose prose-sm text-wrap max-w-none mt-1 p-3 rounded-lg border bg-muted"
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
}

/**
 * 재귀적으로 렌더링될 테이블 Row 컴포넌트
 */
function ApiFieldRow({
  field,
  level,
  expandedKeys,
  onToggle,
}: {
  field: IApiSpecField;
  level: number;
  expandedKeys: React.Key[];
  onToggle: (key: React.Key) => void;
}) {
  const hasChildren = field.children && field.children.length > 0;
  const isExpanded = expandedKeys.includes(field.key);

  const indentPerLevel = 1.5; // rem

  return (
    <Fragment key={field.key}>
      <TableRow>
        <TableCell className="align-top font-medium">
          <div
            className="relative flex flex-row items-start gap-1"
            style={{ paddingLeft: `${level * indentPerLevel}rem` }}
          >
            {Array.from({ length: level }).map((_, i) => (
              <span
                key={i}
                className="absolute top-0 bottom-0 w-px bg-border" // Tailwind 'border' 색상 사용
                style={{
                  left: `calc(${i * indentPerLevel}rem + ${
                    indentPerLevel / 2
                  }rem - ${level * indentPerLevel}rem)`,
                }}
              />
            ))}

            <div className="shrink-0 w-6 pt-0.5">
              {hasChildren && (
                <button
                  onClick={() => onToggle(field.key)}
                  className="p-0 text-muted-foreground"
                >
                  {isExpanded ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-mono font-semibold">{field.name}</span>
              <div className="flex flex-row flex-wrap gap-2">
                <Badge variant="secondary">{field.type}</Badge>
                {field.isRequired ? (
                  <Badge className="bg-info">필수</Badge>
                ) : (
                  <Badge variant="outline">선택</Badge>
                )}
              </div>
            </div>
          </div>
        </TableCell>

        <TableCell className="align-top">
          <p>{field.itemDescription}</p>
          <ExpandableNote note={field.note} />
        </TableCell>
      </TableRow>

      {/* 2. 자식 Row 재귀 렌더링 */}
      {isExpanded &&
        hasChildren &&
        field.children?.map((childField) => (
          <ApiFieldRow
            key={childField.key}
            field={childField}
            level={level + 1} // ✨ 깊이 + 1
            expandedKeys={expandedKeys}
            onToggle={onToggle}
          />
        ))}
    </Fragment>
  );
}

/**
 * 메인 테이블 컴포넌트
 */
export default function ApiFieldTable({
  fields,
}: ApiFieldTableProps) {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  const handleToggle = (key: React.Key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  useEffect(() => {
    setExpandedKeys(collectAllKeys(fields))
  }, [fields]);

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">Field</TableHead>
            <TableHead className="w-[70%]">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field) => (
            <ApiFieldRow
              key={field.key}
              field={field}
              level={0}
              expandedKeys={expandedKeys}
              onToggle={handleToggle}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function collectAllKeys(fields: IApiSpecField[]): React.Key[] {
  const keys: React.Key[] = [];

  function traverse(field: IApiSpecField) {
    if (field.children && field.children.length > 0) {
      keys.push(field.key);
      field.children.forEach(traverse);
    }
  }

  fields.forEach(traverse);
  return keys;
}