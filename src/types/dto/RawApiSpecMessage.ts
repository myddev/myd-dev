import type IApiSpecField from "src/types/IApiSpecField";

type RawApiSpecField = Omit<IApiSpecField, 'key'>;

export default interface RawApiSpecMessage {
  headers: RawApiSpecField[];
  body?: RawApiSpecField[];
  params?: RawApiSpecField[];
}