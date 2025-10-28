import type IProviderRequesterPair from "src/types/IProviderRequesterPair";
import type RawApiSpecMessage from "src/types/dto/RawApiSpecMessage";

// 2. IApiSpec의 원본 타입
export default interface RawApiSpec {
  apiCode?: string;
  apiId: string;
  apiName: string;
  version: string;
  industry?: string[];
  scope?: string[];
  resource: string;
  httpMethod: string;
  transmissionCycle?: string;
  providerRequesters: IProviderRequesterPair[];
  uri: string;
  description: string;
  referenceTime?: string;
  requestContentType: string;
  responseContentType: string;
  request: RawApiSpecMessage;
  response: RawApiSpecMessage;
  errorResponse?: RawApiSpecMessage;
}