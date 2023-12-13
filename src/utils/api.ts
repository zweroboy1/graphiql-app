import { buildClientSchema, getIntrospectionQuery, printSchema } from 'graphql';
import { apiUrl } from './consts';

export const fetchGraphQlSchema = async () => {
  const responce = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  });

  const res = await responce.json();
  const schema = buildClientSchema(res.data);
  const print = printSchema(schema);
  return print;
};
