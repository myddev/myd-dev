import type React from "react";

export default interface IApiSpecField {
  key: React.Key;
  name: string;
  itemDescription: string;
  isRequired: boolean;
  type: string;
  note: string;
  children?: IApiSpecField[];
}