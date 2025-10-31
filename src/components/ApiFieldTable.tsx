import { Fragment, useState } from 'react';
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
  isSimple?: boolean;
}

/**
 * 재귀적으로 렌더링될 테이블 Row 컴포넌트
 */
function ApiFieldRow({
  field,
  isSimple,
  level,
  expandedKeys,
  onToggle,
}: {
  field: IApiSpecField;
  isSimple: boolean;
  level: number;
  expandedKeys: React.Key[];
  onToggle: (key: React.Key) => void;
}) {
  const hasChildren = field.children && field.children.length > 0;
  const isExpanded = expandedKeys.includes(field.key);

  // ✨ 각 레벨 당 들여쓰기 크기 (rem)
  const indentPerLevel = 1.5;

  return (
    <Fragment key={field.key}>
      {/* 1. 부모 Row 렌더링 */}
      <TableRow>
        <TableCell className="align-top font-medium">
          {/*            * ✨ 'relative' 클래스 추가
           * 'paddingLeft'를 style에서 여기로 이동
           */}
          <div
            className="relative flex flex-row items-start gap-1"
            style={{ paddingLeft: `${level * indentPerLevel}rem` }}
          >
            {/* ✨ 1. 세로줄(Tree Guides) 렌더링 */}
            {Array.from({ length: level }).map((_, i) => (
              <span
                key={i}
                className="absolute top-0 bottom-0 w-px bg-border" // Tailwind 'border' 색상 사용
                style={{
                /*
                 * 'left' 위치 계산:
                 * 1. (i * indentPerLevel)rem: 현재 레벨(i)의 라인 시작 위치
                 * 2. + (indentPerLevel / 2)rem: 라인을 들여쓰기 공간의 중앙에 배치
                 * 3. - (level * indentPerLevel)rem: 부모 div의 paddingLeft 값을 빼서 
                 * Cell의 왼쪽 끝을 기준으로 위치를 잡음 (음수 left 값 활용)
                 */
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
          <ExpandableNote note={field.note} isSimple={isSimple} />
        </TableCell>
      </TableRow>

      {/* 2. 자식 Row 재귀 렌더링 */}
      {isExpanded &&
        hasChildren &&
        field.children?.map((childField) => (
          <ApiFieldRow
            key={childField.key}
            field={childField}
            isSimple={isSimple}
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
  isSimple = false,
}: ApiFieldTableProps) {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  const handleToggle = (key: React.Key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

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
          <ApiFieldRow
            key={field.key}
            field={field}
            isSimple={isSimple}
            level={0}
            expandedKeys={expandedKeys}
            onToggle={handleToggle}
          />
        ))}
      </TableBody>
    </Table>
  );
}