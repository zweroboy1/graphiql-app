export interface RootObject {
  data: Data;
}
export interface Data {
  __schema: Schema;
}
export interface Schema {
  queryType: QueryType;
  mutationType?: string;
  subscriptionType?: string;
  types: Type3[];
  directives: Directive[];
}
export interface Directive {
  name: string;
  description: string;
  locations: string[];
  args: Arg[];
}

export interface Type3 {
  kind: string;
  name: string;
  description: string;
  fields?: Field[];
  inputFields?: InputField[];
  interfaces?: string[];
  enumValues?: EnumValue[];
  possibleTypes?: string;
  ofType?: Type3;
}
export interface EnumValue {
  name: string;
  description: string;
  isDeprecated: boolean;
  deprecationReason?: string;
}
export interface InputField {
  name: string;
  description: string;
  type: Type3;
  defaultValue?: string;
}
export interface Field {
  name: string;
  description?: null | string;
  args: Arg[];
  type: Type3;
  isDeprecated: boolean;
  deprecationReason?: string;
}

export interface Arg {
  name: string;
  description: string;
  type: Type3;
  defaultValue?: string;
}

export interface QueryType {
  name: string;
}
