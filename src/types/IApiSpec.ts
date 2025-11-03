import type IApiSpecMessage from "src/types/IApiSpecMessage";
import type IProviderRequesterPair from "src/types/IProviderRequesterPair";

export default interface IApiSpec {
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
  description: string;
  referenceTime?: string;
  requestContentType: string;
  responseContentType: string;
  request: IApiSpecMessage;
  response: IApiSpecMessage;
  errorResponse?: IApiSpecMessage;
}