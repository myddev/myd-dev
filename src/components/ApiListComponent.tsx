import { Link } from '@tanstack/react-router';
import type IApiSpec from '@/types/IApiSpec';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Props {
  apis: IApiSpec[];
}

export default function ApiListComponent({ apis }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {apis.map((api) => (
        <Link
          key={api.apiId}
          to="/search"
          search={{ apiId: api.apiId }}
          className="w-full"
          activeProps={() => ({
            className: 'active-link', // 예시 클래스
          })}
        >
          {({ isActive }) => (
            <Card
              className={cn(
                'transition-colors hover:bg-muted shadow-none p-4 gap-1',
                isActive && 'border-primary',
              )}
            >
              <CardHeader className="p-0">
                <CardTitle className="text-lg">
                  <span className="mr-1">[{api.apiId}]</span>
                  {api.apiName}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        api.httpMethod === 'GET' ? 'secondary' : 'default'
                      }
                    >
                      {api.httpMethod}
                    </Badge>
                    {api.apiCode && (
                      <Badge variant="outline">{api.apiCode}</Badge>
                    )}
                  </div>
                  <code className="text-xs">{api.resource}</code>
                </div>
              </CardContent>
            </Card>
          )}
        </Link>
      ))}
    </div>
  );
}