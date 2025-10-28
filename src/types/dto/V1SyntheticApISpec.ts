import type RawApiSpec from "./RawApiSpec";

export default interface V1SyntheticApiSpec {
  version: string;
  list: RawApiSpec[];
}