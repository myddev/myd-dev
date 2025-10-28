import type IApiSpecField from "src/types/IApiSpecField";

export default interface IApiSpecMessage {
  headers: IApiSpecField[];
  body?: IApiSpecField[];
  params?: IApiSpecField[];
}