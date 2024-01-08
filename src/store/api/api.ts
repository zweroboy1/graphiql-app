import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getIntrospectionQuery } from 'graphql';
import { RootObject } from '../../types/types';

type RequestParams = {
  query: string;
  url: string;
  variables?: Record<string, string>;
  headers?: Record<string, string>;
};

type GraphlRequestParams = {
  query: string;
  variables?: Record<string, string>;
};

export const schemasApi = createApi({
  reducerPath: 'schemasApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: (builder) => ({
    getGraphQlSchema: builder.query<RootObject, string>({
      query: (url) => {
        return {
          url,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: getIntrospectionQuery() }),
        };
      },
    }),

    fetchGraphQlResponse: builder.mutation<unknown, RequestParams>({
      query: ({ query, url, variables, headers }) => {
        const requestBody: GraphlRequestParams = { query: query };
        if (variables) {
          requestBody.variables = variables;
        }
        const requestHeaders = {
          'Content-Type': 'application/json',
          ...(headers || {}),
        };
        return {
          url: url,
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: requestHeaders,
        };
      },
    }),
    fetchGraphQlSchema: builder.mutation<void, string>({
      query: (url) => {
        return {
          url,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: getIntrospectionQuery() }),
        };
      },
    }),
  }),
});

export const {
  useGetGraphQlSchemaQuery,
  useFetchGraphQlSchemaMutation,
  useFetchGraphQlResponseMutation,
} = schemasApi;
