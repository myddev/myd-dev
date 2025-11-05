import type RawApiSpecMessage from "src/types/dto/RawApiSpecMessage";
import type V1SyntheticApiSpec from "src/types/dto/V1SyntheticApISpec";
import type IApiSpec from "src/types/IApiSpec";
import type IApiSpecField from "src/types/IApiSpecField";
import type IApiSpecMessage from "src/types/IApiSpecMessage";

type RawApiSpecField = Omit<IApiSpecField, 'key'>;

const addKeysToFields = (
  fields: RawApiSpecField[],
  parentKey: string = '',
): IApiSpecField[] => {
  if (!fields || fields.length === 0) {
    return [];
  }
  return fields.map((field, index) => {
    // 부모키 + 필드명 + 인덱스로 고유키 생성
    const key = `${parentKey}${field.name}-${index}`;
    return {
      ...field,
      key: key,
      // 자식이 있으면 재귀 호출
      children: field.children
        ? addKeysToFields(field.children, `${key}-`)
        : undefined,
    };
  });
};

const processMessage = (
  message: RawApiSpecMessage,
): IApiSpecMessage => {
  return {
    headers: addKeysToFields(message.headers, 'h-'),
    body: message.body ? addKeysToFields(message.body, 'b-') : undefined,
    params: message.params ? addKeysToFields(message.params, 'p-') : undefined,
  };
};

/**
 * 3. 메인 Fetcher 함수 (useQuery의 queryFn으로 사용)
 */
export const fetchApiSpecs = async (): Promise<IApiSpec[]> => {
  const response = await fetch('/assets/md-spec.json');

  if (!response.ok) {
    throw new Error(`Failed to fetch API specs: ${response.statusText}`);
  }

  const rawData: V1SyntheticApiSpec = await response.json();

  const processedData: IApiSpec[] = rawData.list.map((spec) => ({
    ...spec,
    compositeId: `${spec.apiId}-${spec.version}`,
    request: processMessage(spec.request),
    response: processMessage(spec.response),
    errorResponse: spec.errorResponse
      ? processMessage(spec.errorResponse)
      : undefined,
  }));

  return processedData;
};