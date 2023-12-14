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
  args: Arg2[];
}
export interface Arg2 {
  name: string;
  description: string;
  type: Type4;
  defaultValue?: string;
}
export interface Type4 {
  kind: string;
  name?: string;
  ofType: OfType2;
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
  type: OfType2;
  defaultValue?: string;
}
export interface Field {
  name: string;
  description?: null | string;
  args: (Arg | Args2)[];
  type: Type2;
  isDeprecated: boolean;
  deprecationReason?: string;
}
export interface Type2 {
  kind: string;
  name?: string;
  ofType: OfType2;
}

export interface Args2 {
  name: string;
  description?: string;
  type: OfType2;
  defaultValue: string;
}
export interface Arg {
  name: string;
  description: string;
  type: Type;
  defaultValue?: string;
}
export interface Type {
  kind: string;
  name?: string;
  ofType: OfType2;
}
export interface OfType2 {
  kind: string;
  name: string;
  ofType: string;
}
export interface QueryType {
  name: string;
}
