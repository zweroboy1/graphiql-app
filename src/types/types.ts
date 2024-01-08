export interface RootObject {
  data: Data;
}

export interface Data {
  __schema: Schema;
}

export interface Schema {
  queryType: QueryType;
  types: Type[];
}

export interface Type {
  kind: string;
  name: string;
  description: string;
  fields?: Field[];
  inputFields?: Field[];
  interfaces?: string[];
  enumValues?: Field[];
  possibleTypes?: string;
  ofType?: Type;
}

export interface Field {
  name: string;
  description?: null | string;
  args?: Arg[];
  type: Type;
}

export interface Arg {
  name: string;
  description: string;
  type: Type;
  defaultValue?: string;
}

export interface QueryType {
  name: string;
}
